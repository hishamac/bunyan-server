import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // setting cookie parser
  app.use(cookieParser());

  app.use(json({limit: '100mb'}));

  // cors origin
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT || 8080);
}
export default bootstrap();
