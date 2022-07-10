import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['src/modules/**/infra/typeorm/entities/*.{js,ts}'],
  migrations: ['src/shared/typeorm/migrations/*.{js,ts}'],
  synchronize: true
}