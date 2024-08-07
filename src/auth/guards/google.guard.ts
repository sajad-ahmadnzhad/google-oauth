import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class GoogleGuard extends AuthGuard("oauth") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest() as Request;
    await super.logIn(req);

    return activate;
  }
}
