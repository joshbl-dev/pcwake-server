import { Module } from "@nestjs/common";
import { AutomationsService } from "./automations.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  exports: [AutomationsService],
  providers: [AutomationsService],
})
export class AutomationsModule {}
