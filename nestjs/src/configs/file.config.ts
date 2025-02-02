import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

import validateConfig from '../utils/validate-config';
import { FileConfig } from './config.type';

enum FileDriver {
  LOCAL = 'local',
  S3 = 's3',
}

class EnvironmentVariablesValidator {
  @IsEnum(FileDriver)
  FILE_DRIVER: FileDriver;

  @IsString()
  @ValidateIf((envValues) => envValues.FILE_DRIVER === FileDriver.S3)
  AWS_DEFAULT_S3_BUCKET: string;

  // @IsString()
  // @ValidateIf((envValues) => envValues.FILE_DRIVER === FileDriver.S3)
  // AWS_DEFAULT_S3_URL: string;

  // @IsString()
  // @ValidateIf((envValues) => envValues.FILE_DRIVER === FileDriver.S3)
  // AWS_S3_REGION: string;
}

export default registerAs<FileConfig>('file', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    driver: process.env.FILE_DRIVER ?? 'local',
    awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
    // awsDefaultS3Url: process.env.AWS_DEFAULT_S3_URL,
    // awsS3Region: process.env.AWS_S3_REGION,
    maxFileSize: 5242880,
  };
});
