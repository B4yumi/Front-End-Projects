
const projectData = {};


const express = require('express');

const app = express();

const port = 8000;

app.get('/',function(req,res){
    res.send('Server is up!');
});

app.listen(port,function(){
    console.log(`App on Port:${port}`)

});


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


app.use(express.static('website'));


app.post('/addData',addData);

function addData(req,res){
    let newData = req.body;
    let newEntry = {
        temperature: newData.temperature,
        date: newData.date,
        userResponse: newData.userResponse
    }
    
    Object.assign(projectData,newEntry);
   console.log(projectData);
}

app.get('/all',sendData);

function sendData(req,res){
    res.send(projectData);
};