const router = require('express').Router()
const Place = require('../models/place.model')

/* GET home page */

router.get('/', (req, res, next) => {
	let toPrint

	res.render('index', toPrint)
})
router.get('/places', (req, res) => {
	let data = Place.find()
		.then((r) => {
			console.log('data :', r)
			res.status(200).json({ data: r })
		})
		.catch((err) => console.log('Error: ', err))
})
router.put('/places', (req, res) => {
	console.log('In server on update : ', req.body)
})
router.post('/places', (req, res) => {
	let { name, storeType } = req.body
	Place.create({ name, type: storeType })
		.then((result) => {
			res.status(200).json({ added: result })
		})
		.catch((err) => {
			console.log(err)
			res.status(500).jason({ error: err })
		})
})
module.exports = router
