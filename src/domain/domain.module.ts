import { Module } from "@nestjs/common";
import { AutomationsModule } from "./automations/automations.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [AuthModule, AutomationsModule],
  exports: [AuthModule, AutomationsModule],
})
export class DomainModule {}
