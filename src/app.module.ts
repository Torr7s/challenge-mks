import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from '@config/typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env.development',
      isGlobal: true 
    }),
    TypeOrmModule.forRoot(ormConfig)
  ]
})
export class AppModule {}
