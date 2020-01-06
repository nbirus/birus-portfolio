<template>
	<div id="map" class="map"></div>
</template>

<script>
import FetchResource from '@/utils/FetchResource'
const mapSrc =
	'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js'
const styleSrc =
	'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css'

export default {
	name: 'open-map',
	props: ['position'],
	data() {
		return {
			error: false,
			loading: true,
			map: undefined,
		}
	},
	mounted() {
		// get map resources
		FetchResource(mapSrc, 'script', 'mapjs')
			.then(FetchResource(styleSrc, 'style', 'mapcss'))
			.then(() => {
				this.loading = false
				this.initMap()
			})
			.catch(() => {
				this.loading = false
				this.error = true
			})
	},
	methods: {
		initMap() {
			this.map = new window.ol.Map({
				target: 'map',
				layers: [
					new window.ol.layer.Tile({
						source: new window.ol.source.OSM(),
					}),
				],
				view: new window.ol.View({
					center: window.ol.proj.fromLonLat(this.position),
					// center: window.ol.proj.fromLonLat([37.41, 8.82]),
					zoom: 6,
				}),
			})

			// add marker
			let features = [
				new window.ol.Feature({
					geometry: new window.ol.geom.Point(
						window.ol.proj.transform(this.position, 'EPSG:4326', 'EPSG:3857')
					),
				}),
			]
			let vectorSource = new window.ol.source.Vector({ features })
			let vectorLayer = new window.ol.layer.Vector({
				source: vectorSource,
			})
			this.map.addLayer(vectorLayer)
		},
	},
}
</script>

<style>
.map {
	height: 350px;
	width: 100%;
	background-color: var(--c-grey1);
	border: solid thin var(--c-border);
}
</style>
