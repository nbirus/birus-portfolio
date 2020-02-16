// setup
require('dotenv').config()
const key = process.env.VUE_APP_KEY
const secret = process.env.VUE_APP_SECRET
const user = '138936915@N05'
const album = '72157705881479424'

// imports
const ColorThief = require('colorthief')
const Flickr = require('flickr-sdk')
const flickrAPI = new Flickr(key, secret)
const fs = require('fs')
const request = require('request')
const {
	resolve
} = require('path')

main()

async function main() {
	// get photos from album and write them to json
	try {
		const photos = await getPhotos()
		// const photos = JSON.parse(fs.readFileSync('src/assets/photos.json', 'utf-8'))

		const formattedPhotos = await formatPhotos(photos)
		writeJSON(formattedPhotos)
	} catch (error) {
		console.log(`Failed to get photos: ${error}`)
	}
}

// go to flickr to retrieve photos
function getPhotos() {
	return new Promise((resolve, reject) => {
		try {
			flickrAPI.photosets
				.getPhotos({
					api_key: key,
					user_id: user,
					photoset_id: album,
				})
				.then(res => resolve(res.body.photoset.photo))
				.catch(err => reject(err))
		} catch (error) {
			console.log(error)
		}
	})
}

// save json to photos.json
function writeJSON(json) {
	console.log(json);

	fs.writeFile('src/assets/photos.json', JSON.stringify(json), err => {
		if (err) throw err
	})
}

async function formatPhotos(photos) {
	return Promise.all(photos.map(photo => processPhoto(photo)))
}

// take in response and produce array of photo objets
async function processPhoto(photo) {
	let photoInfo = await getPhotoInfo(photo.id)
	let photoSizes = await getPhotoSize(photo.id)
	let placeholderColor = await getPlaceholderColor(photo)
	let description = photoInfo.description._content

	return {
		id: photo.id,
		name: photo.title,
		date: photoInfo.dates.taken,
		description,
		width: photoSizes.Large.width,
		height: photoSizes.Large.height,
		aspect: getAspectRatio(photoSizes.Large.width, photoSizes.Large.height),
		placeholderColor,
		position: description.substring(
			description.lastIndexOf("(") + 1,
			description.lastIndexOf(")")
		),
		urls: photoSizes
	}
}

function getAspectRatio(w, h) {
	if (h > w) {
		return 'v'
	} else if (w - h > 700) {
		return 'p'
	} else if (w === h) {
		return 's'
	} else {
		return 'h'
	}
}
async function getPlaceholderColor(photo) {
	const imgURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
	const imgFileName = `flickr/temp/${photo.id}.jpg`
	return new Promise(r => {
		download(imgURL, imgFileName, () => {
			const img = resolve(process.cwd(), imgFileName)
			ColorThief.getColor(img)
				.then(color => {
					r(color)
				})
				.catch(err => {
					console.log(err)
				})
		})
	})
}
async function getPhotoInfo(photoId) {
	return new Promise((resolve, reject) => {
		flickrAPI.photos
			.getInfo({
				api_key: key,
				photo_id: photoId,
			})
			.then(res => resolve(res.body.photo))
			.catch(err => reject(err))
	})
}
async function getPhotoSize(photoId) {
	return new Promise((resolve, reject) => {
		let sizeMap = {}
		let sizes = ['Small', 'Medium', 'Large', 'Original']
		flickrAPI.photos
			.getSizes({
				api_key: key,
				photo_id: photoId,
			})
			.then(res => {
				res.body.sizes.size.forEach(size => {
					if (sizes.includes(size.label)) {
						sizeMap[size.label] = size
					}
				})
				// resolve(res.body.sizes.size.find(size => size.label === 'Large'))
				resolve(sizeMap)
			})
			.catch(err => reject(err))
	})
}

var download = function (uri, filename, callback) {
	request.head(uri, () => {
		request(uri)
			.pipe(fs.createWriteStream(filename))
			.on('close', callback)
	})
}