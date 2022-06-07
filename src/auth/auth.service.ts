import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ filter: { username }, select: '+password _id username profile' });

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      //console.log(result, 'result');
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user, sub: user.userId };
    return {
      token: this.jwtService.sign(payload), user
    };
  }

  register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
