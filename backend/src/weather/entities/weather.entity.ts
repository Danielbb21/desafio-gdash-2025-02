import { HydratedDocument } from 'mongoose';
import { IWeather } from '../interface/weather.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WeatherDocument = HydratedDocument<Weather>;

@Schema()
export class Weather implements IWeather {
  @Prop()
  lat: string;
  @Prop()
  lng: string;
  @Prop()
  hora: string;
  @Prop()
  dia: string;
  @Prop()
  prob: number;
  @Prop()
  condicao: string;
  @Prop()
  temp: string;
  @Prop()
  umid: number;
  @Prop()
  vento: string;
}
export const WeatherSchema = SchemaFactory.createForClass(Weather);
