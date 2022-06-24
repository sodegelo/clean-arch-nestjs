import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteDbRepository } from 'src/@core/infra/db/memory/route-db.repository';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { RouteRepositoryInterface } from 'src/@core/domain/route.repository';
import { Route  } from 'src/@core/domain/route.entity';
import { ListRoutesUseCase } from 'src/@core/application/list-routes.use-case';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { RouteSchema } from 'src/@core/infra/db/typeorm/route.schema';
import { RouteTypeOrmRepository } from 'src/@core/infra/db/typeorm/route-typeorm.repository';
import { DataSource } from 'typeorm';
import { RoutesGateway } from './routes.gateway';

@Module({
  imports: [ TypeOrmModule.forFeature([RouteSchema])],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide:  RouteTypeOrmRepository,
      useFactory: (dataSource: DataSource)=>{
        return new RouteTypeOrmRepository(dataSource.getRepository(Route));
      }, 
      inject: [getDataSourceToken()]
    },
    {
      provide:  RouteDbRepository,
      useClass: RouteDbRepository
    },
    {
      provide:  CreateRouteUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface)=>{
        return new CreateRouteUseCase(routeRepo);
      },
      inject: [RouteTypeOrmRepository]
    },
    {
      provide:  ListRoutesUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface)=>{
        return new ListRoutesUseCase(routeRepo);
      },
      inject: [RouteTypeOrmRepository]
    },
    RoutesGateway
  ]
})
export class RoutesModule {}
