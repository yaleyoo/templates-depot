export type AppConfig = {
  nodeEnv: string;
  port: number;
  backendDomain: string;
  apiPrefix: string;
  name: string;
  version: string;
};

export type FileConfig = {
  driver: string;
  awsDefaultS3Bucket: string;
  // awsDefaultS3Url: string;
  // awsS3Region: string;
  maxFileSize: number;
};

export type AwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  awsRegion: string;
};

export type AuthConfig = {
  secret: string;
  expires: string;
  refreshSecret: string;
  refreshExpires: string;
};

export type DatabaseConfig = {
  url: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
  maxConnections: number;
};

export type AllConfigType = {
  app: AppConfig;
  file: FileConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  aws: AwsConfig;
};
