import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './entities/weather.entity';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { GoogleGenAI } from '@google/genai';
import { AiRecommendation } from './interface/aiRecomendation.interface';

@Injectable()
export class WeatherService {
  private readonly ai: GoogleGenAI;
  constructor(@InjectModel(Weather.name) private weatherModel: Model<Weather>) {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async getAiActivityRecommendation(): Promise<AiRecommendation> {
    const weatherData = await this.getWeatherDashboard();

    const latest = weatherData.latest!;
    const temps = weatherData.temperatures
      .map((t) => `${t.hora}: ${t.temp}°C`)
      .join(', ');
    const rain = weatherData.rainProbability
      .map((r) => `${r.hora}: ${r.prob}%`)
      .join(', ');

    const prompt = `
      Você é um assistente de clima que recomenda atividades.
      Com base nos dados de clima a seguir, gere uma análise e uma lista de 5 a 7 atividades ideais.
      
      Clima atual:
      - Temperatura: ${latest.temp}°C
      - Condição: ${latest.condicao}
      - Probabilidade de Chuva Imediata: ${latest.prob}%
      
      Histórico de Temperaturas do Dia (Hora: Temp): ${temps}
      
      Histórico de Probabilidade de Chuva do Dia (Hora: Prob): ${rain}
      
      A saída DEVE ser um objeto JSON que siga o esquema:
      {
        "summary": "Breve análise do clima e sugestão geral de atividades.",
        "recommendations": [
          { "activity": "Nome da atividade", "reason": "Motivo da sugestão com base no clima." }
        ]
      }
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const jsonText = response?.text?.trim() || '';
      return JSON.parse(jsonText) as AiRecommendation;
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      throw new BadRequestException(
        'Não foi possível obter a recomendação da IA.',
      );
    }
  }
  private getDiaAtual(): string {
    return new Date()
      .toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      .split('/')
      .reverse()
      .join('-');
  }

  async create(createWeatherDto: CreateWeatherDto) {
    try {
      const createdWeather = new this.weatherModel(createWeatherDto);
      return await createdWeather.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async exportCSV(): Promise<string> {
    const data = await this.weatherModel.find().lean();

    if (data.length === 0) return '';

    const headers = Object.keys(data[0]).filter(
      (key) => key !== '_id' && key !== '__v',
    );

    const csvRows = [
      headers.join(','), // header
      ...data.map((item) =>
        headers.map((header) => JSON.stringify(item[header] ?? '')).join(','),
      ),
    ];

    return csvRows.join('\n');
  }

  async exportXLSX(): Promise<Buffer> {
    const data = await this.weatherModel.find().lean();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cleanedData = data.map(({ _id, __v, ...rest }) => rest);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Weather');

    const keys = Object.keys(cleanedData[0] ?? {});
    sheet.columns = keys.map((key) => ({
      header: key,
      key,
      width: 20,
    }));

    cleanedData.forEach((row) => sheet.addRow(row));

    const retrunData = await workbook.xlsx.writeBuffer();

    return Buffer.from(retrunData);
  }

  findAll() {
    return `This action returns all weather`;
  }

  async listLatestWeatherOfTheDay() {
    try {
      const diaHoje = this.getDiaAtual();

      return await this.weatherModel
        .findOne({ dia: diaHoje })
        .sort({ hora: -1 })
        .lean()
        .exec();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async listTemperatureDuringTheDay() {
    try {
      const diaHoje = this.getDiaAtual();
      return await this.weatherModel
        .find({ dia: diaHoje })
        .select('hora temp -_id')
        .sort({ hora: 1 })
        .lean()
        .exec();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async listRainProbabilityDuringTheDay() {
    try {
      const diaHoje = this.getDiaAtual();
      return await this.weatherModel
        .find({ dia: diaHoje })
        .select('hora prob -_id')
        .sort({ hora: 1 })
        .lean()
        .exec();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getWeatherDashboard() {
    try {
      const diaHoje = this.getDiaAtual();

      const [latest, temps, rain] = await Promise.all([
        this.weatherModel.findOne({ dia: diaHoje }).sort({ hora: -1 }).lean(),

        this.weatherModel
          .find({ dia: diaHoje })
          .select('hora temp -_id')
          .sort({ hora: 1 })
          .lean(),

        this.weatherModel
          .find({ dia: diaHoje })
          .select('hora prob -_id')
          .sort({ hora: 1 })
          .lean(),
      ]);

      return {
        latest,
        temperatures: temps,
        rainProbability: rain,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
