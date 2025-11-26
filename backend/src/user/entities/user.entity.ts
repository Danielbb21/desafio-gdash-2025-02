import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export type WeatherDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ unique: true })
  email: string;
  @Prop()
  name: string;
  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
