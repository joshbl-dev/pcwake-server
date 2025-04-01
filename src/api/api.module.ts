import { Module } from "@nestjs/common";
import { AutomationsAPIModule } from "./automations/automationsAPI.module";

@Module({
  imports: [AutomationsAPIModule],
})
export class ApiModule {}
