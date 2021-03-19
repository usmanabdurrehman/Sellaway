let router = require('express').Router()
let User = require('../Models/User')
let Item = require('../Models/Item')
let bcrypt = require('bcryptjs')
let admin = require('../config/firebase')
let multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/itemImages')
  },
  filename: function (req, file, cb) {
  	let [filename,ext] = file.originalname.split('.')
  	req.filename = `${req.user.email}-${filename}-${Date.now()}.${ext}`
    cb(null, req.filename)
  }
})
 
var upload = multer({ storage: storage })

// tested
router.get('/getInitialItems',(req,res)=>{

	let email = req.user.email

	Item.find().limit(20).sort({createdAt:-1}).lean()
	.then(items=>{
		items.forEach(item=>{item.favedByUser = item.favourites.includes(email)})
		res.send({items,status:true})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

router.post('/getItem',(req,res)=>{

	let email = req.user.email
	let id = req.body.id

	Item.findById(id).lean()
	.then(item=>{
		item.favedByUser = item.favourites.includes(email) ? true : false
		console.log(item)
		res.send({item,status:true})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

router.get('/favouriteItems',(req,res)=>{

	let email = req.user.email

	Item.find().sort({createdAt:-1}).lean()
	.then(items=>{
		let favItems = items.filter(item=>item.favourites.includes(email))
		favItems.forEach(item=>{item.favedByUser = true})
		res.send({
			status:true,
			items:favItems
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})


router.get('/yourItems',(req,res)=>{
	let email = req.user.email

	Item.find({email}).sort({createdAt:-1}).lean()
	.then(items=>{
		items.forEach(item=>{item.favedByUser = item.favourites.includes(email)})
		res.send({
			status:true,
			items
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

//tested
router.post('/addItem',upload.any(),(req,res)=>{
	let {name,location,category,price,featured} = req.body
	let email = req.user.email

	let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul'
	,'Aug','Sep','Oct','Nov','Dec']
	let d = new Date()
	let date = `${d.getDate()} ${months[d.getMonth()]}`

	let newItem = new Item({
		favourites:[],
		name,
		location,
		category,
		price,
		featured,
		date,
		filename:req.filename,
		email
	})

	newItem.save()
	.then(item=>{
		res.send({
			status:true,
			msg:'Item added successfully'
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

router.post('/updateItem',upload.any(),(req,res)=>{
	let {id,name,location,category,price,featured,filename} = req.body

	let updatedItem = {
		name,
		location,
		category,
		price,
		featured,
		filename:req.filename || filename
	}

	Item.findByIdAndUpdate(id,updatedItem)
	.then(()=>{
		res.send({
			status:true,
			msg:'Item Updated'
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

//tested
router.post('/deleteItem',(req,res)=>{
	let {id} = req.body

	Item.findByIdAndDelete(id)
	.then(items=>{
		res.send({
			status:true,
			msg:'Item Deleted'
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

//tested
router.post('/addFavourite',(req,res)=>{
	let {id} = req.body
	let email = req.user.email

	Item.findById(id).lean()
	.then(item=>{
		item.favourites.push(email)
		Item.findByIdAndUpdate(id,item)
		.then(()=>{
			res.send({
				msg:'Favourite added',
				status:true
			})
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

//tested
router.post('/removeFavourite',(req,res)=>{
	let {id} = req.body
	let email = req.user.email

	Item.findById(id).lean()
	.then(item=>{
		item.favourites = item.favourites.filter(em=>em!=email)
		Item.findByIdAndUpdate(id,item)
		.then(()=>{
			res.send({
				msg:'Favourite removed',
				status:true
			})
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

module.exports = router