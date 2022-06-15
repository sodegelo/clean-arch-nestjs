import{Position, Route } from '../domain/route.entity';
import { RouteRepositoryInterface } from '../domain/route.repository';
 
export type ListRouteOutput ={
    id:string;
    title:string;
    startPosition:Position;
    endPosition:Position;
    points?:Position[];
}

export class ListRoutesUseCase{
    constructor(private routeRepo: RouteRepositoryInterface){        
    }

    async execute():Promise<ListRouteOutput[]>{
        const routes = await this.routeRepo.findAll();
         
        return routes.map(r=> r.toJSON());
    }

}
 