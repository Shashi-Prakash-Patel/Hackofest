require('dotenv').config();

const app = require('./app.js');
const Connection = require('./Connection.js');


const port = process.env.PORT;

Connection();

app.listen(port, ()=>console.log(`Server started http://localhost:${port}`));