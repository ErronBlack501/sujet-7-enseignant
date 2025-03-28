"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const teacher_entity_1 = require("../teachers/entities/teacher.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.dataSourceOptions = {
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: configService.getOrThrow('DB_PORT'),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_NAME'),
    entities: [teacher_entity_1.Teacher],
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=database.config.js.map