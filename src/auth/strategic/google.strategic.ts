import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

export class GoogleStrategy extends PassportStrategy(Strategy, "oauth") {
  constructor() {
    super({
      clientID:
        "427087515565-69m45ua445baiq2vhfageqgp4qaeukl1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/v1/auth/google/redirect",
      scope: ["profile", "email"],
    });
  }
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(
      "accessToken => ",
      accessToken,
      " refreshToken => ",
      refreshToken,
      " profile => ",
      profile
    );
  }
}
