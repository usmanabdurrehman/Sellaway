let express = require('express')
let app = express()
let cors = require('cors')
let jwt = require('jsonwebtoken')

let db = require('./config/db')

app.use(cors({
	origin:true,
	credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',require('./api/generalapi'))
app.use('/user',require('./api/userapi'))

app.use('/user',(req,res,next)=>{
	let token = req.headers['authorization']

	if(typeof token !== 'undefined'){
		jwt.verify(token,'secret',(err,decoded)=>{
			if(err) return res.sendStatus(403)
			req.user = decoded
			console.log(decoded)
			next()
		})
	}
	else{
		return res.sendStatus(403)
	}
})

app.listen(7000,()=>{
	console.log('Listening on port 7000')
})
