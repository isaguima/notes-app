import 'source-map-support/register'
import { Server } from './main/server'


const server = new Server();
server.up();