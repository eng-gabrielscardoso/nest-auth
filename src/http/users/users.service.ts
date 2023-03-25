import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

import { encrypt } from 'src/utilities/security/crypt';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const encryptedPassword = await encrypt(createUserDto.password);
    const user = { ...createUserDto, password: encryptedPassword };

    try {
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });

    try {
      return users;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });

    try {
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new BadRequestException('The requested user does not exist.');

    const updatedUser = Object.assign(user, updateUserDto);

    try {
      return this.userRepository.save(updatedUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
