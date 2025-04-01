import {
  Inject,
  Injectable,
  Logger,
  Scope,
  UnauthorizedException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { User } from "../../data/entities/User";
import { Config } from "../../utils/Config";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(REQUEST) private request: Request,
    private config: Config,
  ) {}

  validateAdmin() {
    const username = (<User>this.request.user).username;
    if (username !== this.config.admin) {
      this.logger.warn("Unauthorized admin request by " + username);
      throw new UnauthorizedException("Admin credentials required!");
    }
  }
}
