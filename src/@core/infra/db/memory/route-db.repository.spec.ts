import { Route, RouteProps } from "../../../domain/route.entity";
import { RouteDbRepository } from "./route-db.repository";

describe('Route Repository DB Test', () => {

    it("Should insert a new Route", async ()=>{
        const repository = new RouteDbRepository();
            let routeProps: RouteProps ={
                title:'minha rota',
                startPosition: {lat: 0, lng:12},
                endPosition: {lat:12, lng:123}
            };
            let route =  Route.create(routeProps);
            expect(route.props).toStrictEqual({
                ...routeProps,
                points:[]
            }); 
            await repository.insert(route);
            expect(repository.items).toHaveLength(1);
            expect(repository.items).toStrictEqual([route]);
       
    
    })  
});