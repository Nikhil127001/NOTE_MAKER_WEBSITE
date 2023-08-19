const express = require('express')
const app = express();
const apiRoutes = require('./Routes/apiRoutes');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
// createing next function
require('./Database/db');
require('dotenv').config();

app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({extended : true}))
app.use('/apiRoutes', apiRoutes);


app.use(express.static(path.join(__dirname,"./frontend/build")))

app.get('*', function (_,res){
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"),function(err){ res.status(500).send(err)
    })
})


app.use((err,req,res,next)=>{
    res.json({
        message : err.message
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Starting server on port ${PORT}` );
})


