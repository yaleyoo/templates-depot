import { RequestMethod, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@src/app.module";
import { devWinstonLogger } from "@src/log/dev.logger";
import { prodWinstonLogger } from "@src/log/prod.logger";
import { HttpExceptionFilter } from "@src/utils/filters/http-exception.filter";
import { WinstonModule } from "nest-winston";
import * as cors from 'cors';

async function bootstrap() {
  console.log('App starting... ENV:', process.env.NODE_ENV);
  const logger = WinstonModule.createLogger({
    instance:
      process.env.NODE_ENV === 'development'
        ? devWinstonLogger
        : prodWinstonLogger,
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // Enable CORS
  // if (process.env.NODE_ENV === 'development') {
  app.use(cors());
  // }

  // Set the global exception catch for all routes
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  // Set the global prefix for all routes
  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'home', method: RequestMethod.GET },
    ],
  });
  // Use the versioning for the whole app
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
