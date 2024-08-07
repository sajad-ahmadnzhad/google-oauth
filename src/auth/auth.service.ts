import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
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
    console.log("AuthService", details);

    const user = await this.userRepository.findOneBy({ email: details.email });

    if (user) return user;

    const newUser = this.userRepository.create({
      name: details.displayName,
      email: details.email,
      avatarURL: details.photo,
    });

    return this.userRepository.save(newUser);
  }
}
