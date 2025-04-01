import { Module } from "@nestjs/common";
import { DomainModule } from "../../domain/domain.module";
import { AutomationsController } from "./automations.controller";

@Module({
  imports: [DomainModule],
  controllers: [AutomationsController],
})
export class AutomationsAPIModule {}
