import{Position, Route,RouteProps} from './route.entity';

describe('Route Tests', () => {
    test('constructor',()=> {
        let routeProps: RouteProps ={
            title:'minha rota',
            startPosition: {lat: 0, lng:12},
            endPosition: {lat:12, lng:123}
        };
        let route1 =  Route.create(routeProps);
        expect(route1.id).toBeDefined();
        expect(route1.props).toStrictEqual({
            ...routeProps,points:[]
        });


        routeProps  ={
            title:'minha rota',
            startPosition: {lat: 0, lng:12},
            endPosition: {lat:12, lng:123},
            points:[
                {lat:12, lng:123}
            ]
        };
        let route2 =  Route.create(routeProps);
        expect(route2.props).toStrictEqual({
            ...routeProps,
            points:[
                {lat:12, lng:123}
            ]
        })
    } );

    test('Update Tille  ',()=> {
        let routeProps: RouteProps ={
            title:'minha rota',
            startPosition: {lat: 0, lng:12},
            endPosition: {lat:12, lng:123}
        };
        let route = Route.create(routeProps);
        route.updateTitle('Title updated');
        expect(route.title).toStrictEqual('Title updated');

    });

    
    test('Update Position',()=> {
        let routeProps: RouteProps ={
            title:'minha rota',
            startPosition: {lat: 0, lng:12},
            endPosition: {lat:12, lng:123}
        };
        let route = Route.create(routeProps);
        const startPosition:Position ={lat:123, lng:2};
        const endPosition:Position ={lat:0, lng:1}
        route.updatePosition(startPosition,endPosition);
        expect(route.startPosition).toStrictEqual(startPosition);
        expect(route.endPosition).toStrictEqual(endPosition);

    });

    test('Update Points',()=> {

        let routeProps: RouteProps ={
            title:'minha rota',
            startPosition: {lat: 0, lng:12},
            endPosition: {lat:12, lng:123}
        };
        let route = Route.create(routeProps);
        const points:Position[] =[
            {lat:123, lng:2},
            {lat:50, lng:1},
            {lat:4, lng:13},
            {lat:11, lng:14}
        ]; 
        route.updatePoints(points);
        expect(route.points).toHaveLength(4);
        expect(route.points).toStrictEqual(points); 

    });
})