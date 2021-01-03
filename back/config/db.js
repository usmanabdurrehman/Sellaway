const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb+srv://QWERTY:QWERTY@cluster0.usc1l.mongodb.net/sellaway?retryWrites=true&w=majority',{
	useUnifiedTopology: true ,
	useNewUrlParser: true
})
.then(()=>{
	console.log('Mongodb connected')
})

// await mongoose.connect('mongodb+srv://QWERTY:QWERTY@cluster0.usc1l.mongodb.net/sellaway?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });