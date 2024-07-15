import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database.config';
import { Author } from './entities/author.entity';
import { Article } from './entities/article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfigService],
      useFactory: (databaseConfigService: DatabaseConfigService) => {
        return {
          type: 'postgres',
          host: databaseConfigService.databaseConfig.host,
          port: databaseConfigService.databaseConfig.port,
          username: databaseConfigService.databaseConfig.username,
          password: databaseConfigService.databaseConfig.password,
          database: databaseConfigService.databaseConfig.database,

          entities: [Author, Article],
          synchronize: true,
        };
      },
      extraProviders: [DatabaseConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
