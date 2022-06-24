import { SerializeOptions } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket ,MessageBody} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { ListRoutesUseCase } from 'src/@core/application/list-routes.use-case';
@WebSocketGateway({cors:true})
export class RoutesGateway {

  constructor(private listUseCase: ListRoutesUseCase){}
  
  @SubscribeMessage('get-directions')
  async handleNewDirectionsMessage(
    @ConnectedSocket() client: Socket, 
    @MessageBody() data: any
    ) {
   
      const routes = await this.listUseCase.execute();
      const route = routes.find(route => data.routeId === route.id);
      for (const path of route.points) {
        client.emit('new-position', {
          routeId: data.routeId, path
        });
        await sleep(200);
      }
     client.emit('finished-route', {routeId: data.routeId});
  } 
   
}
function sleep(ms) {
    return new Promise((resolve)=>{
      setTimeout(resolve,ms);
    })
}
