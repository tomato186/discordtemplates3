const express = require('express'),
  es6Renderer = require('express-es6-template-engine') , 
  fs = require("fs"),
  path = require('path');

let sourceData = require("../models/add.js")
const serverless = require("serverless-http");
const router = express.Router();
const app = express();
/*
var files = fs.readdirSync('./discordtemplates', {withFileTypes: true}).filter(item => !item.isDirectory()).map(item => item.name).filter(item => item.indexOf(".html")>-1)
   */
var options = {

        root: path.join(__dirname.split("/express")[0],"/discordtemplates/")

    };

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
/////
app.use(express.static(__dirname.split("/express")[0] + "/discordtemplates"));
app.engine('html', es6Renderer);
app.set('view engine', 'html');
app.set('views', path.join(__dirname.split("/express")[0],"/discordtemplates"));
////
async function getData() {
  let Data = await sourceData.find({"id":"1"})
 Data = await Data[0].data
  return Data;
  
}




router.get('/', (req, res) => {
  var fileName = 'home';

    res.render(fileName)
  
});
router.get('/:name', async (req, res) => {
  var Name =req.params.name ;
  var fileName = 'discord-bot';
  
  let data = await getData()
 
if(data.some(e=> e.title == Name)){
  console.log(data.find(e=>e.title== Name))
  res.render(fileName,{locals:{
      data:data.find(e=>e.title == Name)}})
}else if (Name == "templates") {
  res.render(Name,{locals:{
      data:data}})
}
});

router.post("/templates", async (req, res) => {
    let data = await getData()
  // Do Something in Node here

  let data2 = data.filter(x=> x.title.toLowerCase().includes(req.body.search.toLowerCase()))
  if(!data2) data.filter(x=> x.type.toLowerCase().includes(req.body.search.toLowerCase()))
  
  res.render("templates",{locals:{
      data:data2}})
})


app.use(`/.netlify/functions/api`, router);





module.exports = app;
module.exports.handler = serverless(app);