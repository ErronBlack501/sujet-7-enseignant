import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Teacher } from '../teachers/entities/teacher.entity';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  entities: [Teacher],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
