import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './entities/weather.entity';
import { Model } from 'mongoose';

@Injectable()
export class WeatherService {
  constructor(@InjectModel(Weather.name) private weatherMode: Model<Weather>) {}

  async create(createWeatherDto: CreateWeatherDto) {
    try {
      const createdWeather = new this.weatherMode(createWeatherDto);
      return await createdWeather.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
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
