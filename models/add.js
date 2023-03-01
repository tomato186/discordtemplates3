
const mongoose = require('mongoose');
mongoose.connect(process.env[`data`], {
	useNewUrlParser:true, 
	useUnifiedTopology: true 
});

const server= new mongoose.Schema({
    data: {
        type: Array,
      require:true
    },
	id:{
    type:String,
    require:true
  }

	
});

let data= mongoose.model('servers', server);
module.exports =data;
