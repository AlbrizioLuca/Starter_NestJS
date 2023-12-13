import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // -------------------------  METHODES CRUD ------------------

  async create(createUserDto: CreateUserDto) {
    // Encoder le mot de passe
    createUserDto.password = await hash(createUserDto.password, 10);
    // Enregistre le nouveau user dans la DB
    const newUser = await this.usersRepository.save(createUserDto);
    return newUser;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(
        `Aucun utilisateur trouvé avec l'id renseigné: ${id}`,
      );
    }
    return user;
  }

  async findOneBy(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException(
        `Aucun utilisateur trouvé avec l'email renseigné: ${email}`,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    // Vérifier si le mot de passe a été modifié
    if (updateUserDto.password && updateUserDto.password !== user.password) {
      // Hasher le nouveau mot de passe
      updateUserDto.password = await hash(updateUserDto.password, 10);
    } else {
      // Conserver l'ancien mot de passe
      updateUserDto.password = user.password;
    }

    await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
    return user;
  }
} //! end of UserService class