import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { forwardRef, Inject } from "@nestjs/common";

export class GoogleStrategy extends PassportStrategy(Strategy, "oauth") {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    super({
      clientID:
        "427087515565-69m45ua445baiq2vhfageqgp4qaeukl1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/v1/auth/google/redirect",
      scope: ["profile", "email"],
      accessType: "offline",
      prompt: "consent",
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(
      "accessToken => ",
      accessToken,
      " refreshToken => ",
      refreshToken,
      " profile => ",
      profile
    );

    const user = await this.authService.validateUser({
      displayName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    });

    return user || null;
  }
}
