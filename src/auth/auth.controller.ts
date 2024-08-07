import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guards/google.guard";

@Controller("auth")
export class AuthController {
  @Get("google/login")
  @UseGuards(GoogleGuard)
  handleLogin() {
    return { message: "Google authentication" };
  }

  @Get("google/redirect")
  @UseGuards(GoogleGuard)
  handleRedirect() {
    return { message: "OK" };
  }
}
