import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), "/.env") });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
