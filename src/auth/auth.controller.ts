import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guards/google.guard";
import { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  @Get("google/login")
  @UseGuards(GoogleGuard)
  googleHandleLogin() {
    return { message: "Google authentication" };
  }

  @Get("google/redirect")
  @UseGuards(GoogleGuard)
  async googleHandleRedirect(@Res({ passthrough: true }) res: Response) {
    res.redirect("/");
  }

  @Get("github/login")
  @UseGuards(AuthGuard("github"))
  githubHandleLogin() {
    return { message: "Github authentication" };
  }

  @Get("github/redirect")
  @UseGuards(AuthGuard("github"))
  async githubHandleRedirect(@Res({ passthrough: true }) res: Response) {
    res.redirect("/");
  }

  @Get("status")
  user(@Req() req: Request) {
    return req.user;
  }
}
