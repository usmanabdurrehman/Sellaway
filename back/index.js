let express = require('express')
let app = express()
let cors = require('cors')

let db = require('./config/db')

app.use(cors({
	origin:true,
	credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',require('./api/generalapi'))
app.use('/user',require('./api/userapi'))

app.listen(7000,()=>{
	console.log('Listening on port 7000')
})
