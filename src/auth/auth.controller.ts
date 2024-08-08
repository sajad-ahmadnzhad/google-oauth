import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guards/google.guard";
import { Request } from "express";

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

  @Get("status")
  user(@Req() req: Request) {
    return req.user;
  }
}
