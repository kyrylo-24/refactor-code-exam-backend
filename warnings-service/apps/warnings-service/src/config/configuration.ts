import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  worker: {
    url: process.env.WORKER_URL || 'http://localhost:4002',
  },
}));
