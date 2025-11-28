import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './entities/weather.entity';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) { }

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
