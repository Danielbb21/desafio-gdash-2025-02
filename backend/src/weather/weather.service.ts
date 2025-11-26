import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './entities/weather.entity';
import { Model } from 'mongoose';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

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

  findAll() {
    return `This action returns all weather`;
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
