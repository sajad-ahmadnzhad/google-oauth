import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import * as path from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(process.cwd(), "/.env"),
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: "mysql",
          host: configService.get("DB_HOST"),
          port: parseInt(configService.get("DB_PORT")),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_NAME"),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      async useFactory() {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        });

        return { store };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
