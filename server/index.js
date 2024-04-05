require('dotenv').config();

const app = require('./app');
const Connection = require('./Connection');


const port = process.env.PORT;

Connection();

app.listen(port, ()=>console.log(`Server started http://localhost:${port}`));