import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { RouteDbRepository } from 'src/@core/infra/db/memory/route-db.repository';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { RouteRepositoryInterface } from 'src/@core/domain/route.repository';
import { ListRoutesUseCase } from 'src/@core/application/list-routes.use-case';

@Module({
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide:  RouteDbRepository,
      useClass: RouteDbRepository
    },
    {
      provide:  CreateRouteUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface)=>{
        return new CreateRouteUseCase(routeRepo);
      },
      inject: [RouteDbRepository]
    },
    {
      provide:  ListRoutesUseCase,
      useFactory: (routeRepo: RouteRepositoryInterface)=>{
        return new ListRoutesUseCase(routeRepo);
      },
      inject: [RouteDbRepository]
    }
  ]
})
export class RoutesModule {}
