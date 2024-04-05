import 'dotenv/config';
import app from "./app.js";
import Connection from './Connection.js';

const port = process.env.PORT;

Connection();

app.listen(port, ()=>console.log(`Server started http://localhost:${port}`));