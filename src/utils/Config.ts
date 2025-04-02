import { Injectable } from "@nestjs/common";

@Injectable()
export class Config {
  nodeEnv: string;
  baseUrl: string;
  jwtSecret: string;
  etherwakeMac: string;
  admin: string;

  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.baseUrl = process.env.BASE_URL;
    this.jwtSecret = process.env.JWT_SECRET;
    this.etherwakeMac = process.env.ETHERWAKE_ADDRESS;
    this.admin = process.env.ADMIN;
  }
}
