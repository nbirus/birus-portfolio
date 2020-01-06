// setup
require('dotenv').config()
const key = process.env.VUE_APP_KEY
const secret = process.env.VUE_APP_SECRET
const user = '138936915@N05'
const album = '72157705881479424'

// imports
const calculateAspectRatios = require('calculate-aspect-ratio').default
const Flickr = require('flickr-sdk')
const flickrAPI = new Flickr(key, secret)
const fs = require('fs')

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
	let photoSize = await getPhotoSize(photo.id)
	return {
		id: photo.id,
		name: photo.title,
		date: photoInfo.dates.taken,
		description: photoInfo.description._content,
		width: photoSize.width,
		height: photoSize.height,
		aspect: getAspectRatio(photoSize.width, photoSize.height),
		position: [0, 0],
		url_md: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
		url_lg: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
		url_og: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_o.jpg`,
	}
}
function getAspectRatio(w, h) {
	// let ratio = calculateAspectRatios(w, h)
	if (h > w) {
		return 'vertical'
	}
	if (w - h > 500) {
		return 'panorama'
	}
	return 'normal'
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
		flickrAPI.photos
			.getSizes({
				api_key: key,
				photo_id: photoId,
			})
			.then(res => {
				resolve(res.body.sizes.size.find(size => size.label === 'Large'))
			})
			.catch(err => reject(err))
	})
}
