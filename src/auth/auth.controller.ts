import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guards/google.guard";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google/login")
  @UseGuards(GoogleGuard)
  handleLogin() {
    return { message: "Google authentication" };
  }

  @Get("google/redirect")
  @UseGuards(GoogleGuard)
  async handleRedirect(@Res({ passthrough: true }) res: Response) {
    res.redirect("/");
  }

  @Get("status")
  user(@Req() req: Request) {
    return req.user;
  }
}
