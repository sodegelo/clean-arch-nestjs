import { create } from 'domain';
import express,{Express,Request,Response} from 'express';
import  {CreateRouteUseCase} from '../../../application/create-route.use-case';
import { ListRoutesUseCase } from '../../../application/list-routes.use-case';
import  {RouteDbRepository} from '../../db/memory/route-db.repository';
const app :Express = express();
app.use(express.json())

const port =  process.env.PORT || 3000;
const routeRepo = new RouteDbRepository();

app.get('/routes',async (req:Request,res:Response) => {
    
    const listUserCase = new ListRoutesUseCase(routeRepo);
 
    const output = await listUserCase.execute();
    res.status(200).json(output);
})

app.post('/routes',async (req:Request,res:Response) => {
    
    const creaateUserCase = new CreateRouteUseCase(routeRepo);
 
    const output = await creaateUserCase.execute(req.body);
    res.status(201).json(output);
})

app.listen(port,()=>console.log('listening on port'+port));