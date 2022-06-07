import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@InjectModel('User')
  private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) { }

  create(createUserDto: CreateUserDto) {    
    const hashedPassword = bcrypt.hashSync(createUserDto.password, this.configService.get('auth.saltRounds'));
    createUserDto.password=hashedPassword
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save().catch(err=>err)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(params: any) {    
    return this.userModel.findOne(params.filter).select(params.select).lean()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
