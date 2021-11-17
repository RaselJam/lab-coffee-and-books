let _axios = axios.create({
	baseURL: 'http://localhost:3000',
})

document.addEventListener(
	'DOMContentLoaded',
	async () => {
		console.log('lab-coffee-and-books JS imported successfully!')
		console.log('laoding .....')
		let loaded = await loadAll()
		console.log('Loaded : ', loaded)
		populateAll(loaded.data.data)
		document.getElementById('submit-e').addEventListener('click', async function (e) {
			//Updating :
			e.preventDefault()
			let name = document.getElementById('name-e').value
			let storeType = document.getElementById('storeType-e').value
			_axios
				.put('/places', { id, name, storeType })
				.then((r) => {
					console.log('Updated')
				})
				.catch((err) => console.log(err))
			let loaded = await loadAll()
			populateAll(loaded.data.data)
		})
		document.getElementById('submit').addEventListener('click', async function (e) {
			e.preventDefault()
			let name = document.getElementById('name').value
			let storeType = document.getElementById('storeType').value
			let resultonPost = _axios
				.post('/places', { name, storeType })
				.then((r) => {
					let container = document.getElementById('places-container')
					populateRecord(r.data.added, container)
				})
				.catch((err) => console.log('Error: ', err))
		})
	},
	false
)

function populateRecord(place, targetHTML) {
	let { name, type, id } = place
	console.log('in single pop: ', name, type)
	let toPriint = `<div onClick=getEditForm.bind(${id},${name},${type}) id=${id} class="place"><div>NAME : ${name}</div><div> Type : ${type}</div></div>`

	targetHTML.innerHTML += toPriint
}
async function loadAll() {
	return await _axios.get('/places')
}

function populateAll(data) {
	console.log('in pop', data[0])
	let container = document.getElementById('places-container')
	for (let i = 0; i < data.length; i++) {
		console.log('data', data)
		populateRecord(data[i], container)
	}
}
function getEditForm(id, name, type) {
	console.log('hey')
	console.log(id, name, type)
}
