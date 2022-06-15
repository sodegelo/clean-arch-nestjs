import {CreateRouteUseCase} from "./create-route.use-case"
import { RouteDbRepository } from "../infra/db/memory/route-db.repository";
import { ListRoutesUseCase } from "./list-routes.use-case";
describe("List use case Route Test",()=>{
    it("should List all routes",async ()=>{
        const repository = new RouteDbRepository()
        const createUseCase = new CreateRouteUseCase(repository);
        const listUseCase = new ListRoutesUseCase(repository);
        const values = {
            title:'my new title',
            startPosition: {lat: 0, lng:1},
            endPosition: {lat:4, lng:2} 
        };
        let outPut = await createUseCase.execute(values);


        expect(repository.items).toHaveLength(1);
        expect(outPut).toStrictEqual({
            id:repository.items[0].id,
            ...values,
            points:[]
        });

        let outPutList = await  listUseCase.execute();

        expect(outPutList).toHaveLength(1);

        outPut = await createUseCase.execute(values);


        expect(repository.items).toHaveLength(2);
        expect(outPut).toStrictEqual({
            id:repository.items[1].id,
            ...values,
            points:[]
        });

        outPutList = await  listUseCase.execute();

        expect(outPutList).toHaveLength(2);




       



    })
})