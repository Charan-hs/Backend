const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const path = require('path')
const {success,error} = require('consola');
const conntectToMongo = require('./db');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5050;
app.use(cors());
if (process.env.NODE_ENV==="production"){
    const buildPath = path.join(__dirname+'/schoolreact/build');
    app.use(express.static(buildPath));
}

conntectToMongo();
app.listen(PORT, () => {
    success({message:`server Started on port: ${PORT}`})
})

const router = require('./routers/controlroutes')
const user = require('./routers/users')

app.use("/data",router)
app.use('/user',user)