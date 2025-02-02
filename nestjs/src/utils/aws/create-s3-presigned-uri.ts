import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import {
  getSignedUrl,
  S3RequestPresigner,
} from '@aws-sdk/s3-request-presigner';

export const createPresignedUri = async (
  key: string,
  expiredIn: number,
): Promise<string> => {
  const s3: S3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
    Key: key,
  });
  return await getSignedUrl(s3, command, { expiresIn: expiredIn });
};
