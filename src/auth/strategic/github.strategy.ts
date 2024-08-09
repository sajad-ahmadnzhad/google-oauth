import { forwardRef, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";
import { VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/github/redirect",
      scope: ["profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const user = await this.authService.validateUser({
      displayName: profile.displayName,
      email: profile.username,
      photo: profile.photos[0].value,
      isVerifyEmail: true,
    });

    done(null, user);
  }
}
