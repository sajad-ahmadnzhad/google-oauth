import { PassportSerializer } from "@nestjs/passport";
import { User } from "../entities/user.entity";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class SessionSerialize extends PassportSerializer {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, { id: user.id });
  }

  async deserializeUser(payload: { id: number }, done: Function) {
    const user = await this.authService.findUser(payload.id);

   user ? done(null, user) : done(null, null);
  }
}
