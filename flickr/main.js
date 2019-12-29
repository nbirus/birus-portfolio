// setup
require('dotenv').config()
const key = process.env.VUE_APP_KEY
const secret = process.env.VUE_APP_SECRET
const user = '138936915@N05'
const album = '72157660844106223'

// imports
const Flickr = require('flickr-sdk')
const flickrAPI = new Flickr(key, secret)
const fs = require('fs')

main()

async function main() {
	// get photos from album and write them to json
	try {
		const response = await getPhotos()
		writeJSON(response)
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
				.then(res => {
					resolve(res.body.photoset.photo.map(processPhoto))
				})
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

// take in response and produce array of photo objets
function processPhoto(photo) {
	return {
		id: photo.id,
		name: photo.title,
		url_med: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
		url_big: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
		url_org: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_o.jpg`,
	}
}
