import { IsNotEmpty } from 'class-validator';
import { IWeather } from '../interface/weather.interface';

export class CreateWeatherDto implements IWeather {
  @IsNotEmpty()
  lat: string;
  @IsNotEmpty()
  lng: string;
  @IsNotEmpty()
  dia: string;
  @IsNotEmpty()
  hora: string;
  @IsNotEmpty()
  temp: string;
  @IsNotEmpty()
  condicao: string;
  @IsNotEmpty()
  vento: string;
  @IsNotEmpty()
  prob: number;
  @IsNotEmpty()
  umid: number;
}
