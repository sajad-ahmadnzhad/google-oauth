import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { forwardRef, Inject } from "@nestjs/common";

export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/google/redirect",
      scope: ["profile", "email"],
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
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
      isVerifyEmail: profile.emails[0].verified,
    });

    done(null, user);
  }
}
