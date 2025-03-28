import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TeachersModule,
  ],
})
export class AppModule {}
