import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 4001,
  api: {
    url: process.env.API_URL || 'http://localhost:4000',
  },
}));
