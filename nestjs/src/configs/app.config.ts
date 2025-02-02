import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

import { AppConfig } from './config.type';
import validateConfig from '../utils/validate-config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

class EnvironmentVariableValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

  @IsInt()
  @Min(0)
  @Max(70000)
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsString()
  @IsOptional()
  APP_VERSION: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariableValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    version: process.env.APP_VERSION || '0.0.0',
    backendDomain: process.env.BACKEND_DOMAIN || 'http://localhost',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
  };
});
