import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "akshaykuomar",
      database: "google_oauth",
      synchronize: true,
      autoLoadEntities: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      async useFactory() {
        const store = await redisStore({
          socket: {
            host: "localhost",
            port: 3306,
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
