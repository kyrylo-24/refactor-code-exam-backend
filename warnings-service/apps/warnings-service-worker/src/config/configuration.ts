import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  ftp: {
    host: process.env.FTP_HOST || 'ftp.bom.gov.au',
    secure: false,
    poolSize: parseInt(process.env.FTP_POOL_SIZE, 10) || 5,
    tempDir: process.env.TEMP_DIR || '/tmp',
    retryAttempts: parseInt(process.env.FTP_RETRY_ATTEMPTS, 10) || 3,
    retryDelay: parseInt(process.env.FTP_RETRY_DELAY, 10) || 1000,
  },
  service: {
    url: process.env.SERVICE_URL || 'http://localhost:3000',
  }
}));
