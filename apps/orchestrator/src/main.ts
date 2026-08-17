import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

@Controller('healthz')
class HealthController {
  @Get()
  getHealth() {
    return { status: 'ok', service: 'operations-copilot-orchestrator', gateway: 'graphql-websocket' };
  }
}

@Module({
  controllers: [HealthController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`[Orchestrator] NestJS GraphQL & WebSocket Gateway running on port ${port}`);
}
bootstrap();
