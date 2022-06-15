import {DataSource} from 'typeorm';
import { Route } from '../../../domain/route.entity';
import { RouteSchema } from './route.schema';

describe('Route Schema Tests',   ()=>{
    test('create', async ()=>{
        const dataSource =  new DataSource({
            type:'sqlite', 
            database:':memory:',
            synchronize:true,
            logging:false,
            entities:[RouteSchema]
        });

        await dataSource.initialize();
        const route =  Route.create({
            title:'minha rota',
            startPosition: {lat: 0, lng:4},
            endPosition: {lat: 0, lng:2},
            points: [{lat: 0, lng:2}]
        })

        const routeRepo = dataSource.getRepository(Route);
        await routeRepo.save(route);
        console.log( await routeRepo.findOneBy({id: route.id}));
    })
})