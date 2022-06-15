import { Route, RouteProps } from "../../../domain/route.entity";
import { RouteTypeOrmRepository } from "./route-typeorm.repository";
import {DataSource} from 'typeorm'; 
import { RouteSchema } from './route.schema';

  
describe('Route Repository Tests',   ()=>{
    test('Should insert a new route', async ()=>{
        
        const dataSource = new DataSource({
            type:'sqlite', 
            database:':memory:',
            synchronize:true,
            logging:false,
            entities:[RouteSchema]
        });
        await dataSource.initialize();
        const ormRepo = dataSource.getRepository(Route);
        const repository = new RouteTypeOrmRepository(ormRepo);
        
        const routeProps: RouteProps ={
            title:'minha rota',
            startPosition: {lat: 0, lng:12},
            endPosition: {lat:12, lng:123},
        };
        const route =  Route.create(routeProps);
    
        await repository.insert(route);

        const routeFound =  await ormRepo.findOneBy({id: route.id}); 
      
        expect(routeFound.toJSON()).toStrictEqual(  route.toJSON() );
    
    });
})