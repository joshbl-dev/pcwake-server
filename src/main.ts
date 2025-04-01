import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json, urlencoded } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import * as fs from "fs";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const version = process.env.npm_package_version;
  const env = process.env.NODE_ENV;

  let app: INestApplication;
  let httpsEnabled = false;
  if (fs.existsSync(process.env.HTTPS_PRIVATE_KEY)) {
    const httpsOptions = {
      key: fs.readFileSync(process.env.HTTPS_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.HTTPS_CERTIFICATE),
    };
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    httpsEnabled = true;
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  if (env !== "prod") {
    logger.log("Setting up swagger...");
    const config = new DocumentBuilder()
      .setTitle("PC Wake Server API")
      .setDescription("PC Wake Server Documentation")
      .setVersion(version)
      .addBearerAuth(
        { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        "access-token",
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, {
      customSiteTitle: "PC Wake Server API",
      swaggerOptions: {
        tagsSorter: "alpha",
        operationsSorter: "method",
      },
    });
  }

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);

  const address = app.getHttpServer().address().address;

  logger.log(
    `Listening at ${httpsEnabled ? "https" : "http"}://${
      address === "::" ? "localhost" : address
    }:${port}`,
  );
}

bootstrap();
