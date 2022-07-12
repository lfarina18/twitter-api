import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from "typeorm";

import { Environment } from '../common/enum/environment.enum';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {

        const isDevelopmentEnv = config.get('NODE_ENV') !== Environment.PRODUCTION;

        const dbconfig = {
            type: 'postgres',
            host: config.get('DB_HOST'),
            port: +config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: isDevelopmentEnv,
            logging: config.get('DB_LOGGING'),
        } as DataSourceOptions

        return dbconfig;
    }

})