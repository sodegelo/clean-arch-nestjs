import {CreateRouteUseCase} from "./create-route.use-case"
import { RouteDbRepository } from "../infra/db/memory/route-db.repository";
describe("Create use case Route Test",()=>{
    it("should create new route",async ()=>{
        const repository = new RouteDbRepository()
        const createUseCase = new CreateRouteUseCase(repository);
        const values = {
            title:'my new title',
            startPosition: {lat: 0, lng:1},
            endPosition: {lat:4, lng:2} 
        };
        const outPut = await createUseCase.execute(values);
        expect(repository.items).toHaveLength(1);
        expect(outPut).toStrictEqual({
            id:repository.items[0].id,
            ...values,
            points:[]
        });
       



    })
})