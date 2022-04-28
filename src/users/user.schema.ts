import { Prop, Schema, SchemaFactory,raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required:true,unique:true})
  username: string;

  @Prop({select:false,required:true})
  password: string;

  @Prop(raw({
    firstname: { type: String },
    middlename: { type: String },
    lastname: { type: String },
    birthdate: { type: Date }
  }))
  profile: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);