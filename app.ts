import dotenv from 'dotenv'
import Server from './models/server/server';

dotenv.config();



const server= new Server()

server.listen();
