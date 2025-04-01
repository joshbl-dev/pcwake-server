import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UtilsModule } from "./utils/utils.module";
import { ApiModule } from "./api/api.module";
import { DomainModule } from "./domain/domain.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    UtilsModule,
    ApiModule,
    DomainModule,
  ],
})
export class AppModule {}
