import{Position, Route } from '../domain/route.entity';
import { RouteRepositoryInterface } from '../domain/route.repository';

export type CreateRouteInput ={
    title:string;
    startPosition:Position;
    endPosition:Position;
    points?:Position[];
}
export type CreateRouteOutput ={
    id:string;
    title:string;
    startPosition:Position;
    endPosition:Position;
    points?:Position[];
}

export class CreateRouteUseCase{
    constructor(private routeRepo: RouteRepositoryInterface){        
    }

    async execute(input:CreateRouteInput):Promise<CreateRouteOutput>{
        const route =  Route.create(input);
        
        await this.routeRepo.insert(route);
        return route.toJSON();
    }

}
 