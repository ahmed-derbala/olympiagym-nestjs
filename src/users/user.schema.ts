import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  middlename: string;

  @Prop()
  username: string;

  @Prop()
  birthdate: Date;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);