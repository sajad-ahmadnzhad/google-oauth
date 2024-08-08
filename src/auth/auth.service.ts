import { Injectable } from "@nestjs/common";
import { UserDetails } from "./auth.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userRepository.findOneBy({ email: details.email });

    if (user) return user;

    const newUser = this.userRepository.create({
      name: details.displayName,
      email: details.email,
      avatarURL: details.photo,
    });

    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
