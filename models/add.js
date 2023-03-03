
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tomato186:tomato186@cluster0.fkhvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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
