import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { AutomationsService } from "../../domain/automations/automations.service";
import { JwtAuthGuard } from "../../domain/auth/guards/jwt.guard";

@ApiBearerAuth("access-token")
@ApiTags("automations")
@Controller("automations")
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/pc")
  async startPC() {
    return this.automationsService.startPC();
  }
}
