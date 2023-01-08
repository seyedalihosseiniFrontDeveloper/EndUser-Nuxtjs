<template>
	<l-map ref="map" :center="center" :zoom="zoom" @click="is_marker_click = false" @dblclick="onMapClick">
		<l-tile-layer :attribution="tileProvider.attribution" :url="tileProvider.url" />

		<l-geosearch v-show="isSearchable" :options="geoSearchOptions"></l-geosearch>

		<l-marker
			v-if="center.lat && center.lng"
			:draggable="isDraggable"
			:icon="icon"
			:lat-lng.sync="center"
			visible
			@click="is_marker_click = !is_marker_click"
			@dragend="dragging = false"
			@dragstart="dragging = true"
		>
			<l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
		</l-marker>
	</l-map>
</template>

<script>
import "leaflet/dist/leaflet.css"
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet"

import "leaflet-geosearch/dist/geosearch.css"
import LGeosearch from "vue2-leaflet-geosearch"

import { OpenStreetMapProvider } from "leaflet-geosearch"
import { icon } from "leaflet"

export default {
	components: { LMap, LTileLayer, LMarker, LTooltip, LGeosearch },

	props: {
		value: {
			type: Object,
		},

		isDraggable: {
			type: Boolean,
			default: false,
		},

		markerIcon: {
			default: false,
		},

		isSearchable: {
			type: Boolean,
			default: false,
		},

		defaultLocation: {
			type: Object,
			default: () => ({
				lat: 1,
				lng: 1,
			}),
		},
	},

	data() {
		return {
			zoom: 12,
			address: "",
			loading: true,
			dragging: false,
			is_marker_click: false,

			geoSearchOptions: {
				provider: new OpenStreetMapProvider(),
				showMarker: false,
				autoClose: true,
			},

			center: {
				lat: (this.value && this.value.lat) || this.defaultLocation.lat,
				lng: (this.value && this.value.lng) || this.defaultLocation.lng,
			},

			icon: icon({
				iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
				iconUrl: this.markerIcon ? this.markerIcon : require("leaflet/dist/images/marker-icon.png"),
				shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
				iconSize: [40],
			}),

			tileProvider: {
				url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				attribution: `&copy; ${process.env.APP_NAME}`,
			},
		}
	},

	watch: {
		center: {
			async handler(value) {
				const obj = await this.getAddress()

				this.address = obj ? obj.display_name : ""

				this.$emit("input", { ...value, more: obj })
			},

			immediate: true,
			deep: true,
		},

		loading(v) {
			this.$emit("changePending", v)
		},
	},

	computed: {
		tooltipContent() {
			if (this.dragging) {
				return "؟؟؟"
			}

			if (this.loading) {
				return "... جار التحميل"
			}

			return this.is_marker_click
				? `
                <strong>
                    ${this.address ? this.address.replaceAll(",", "<br/>") : ""}
                </strong>
                <hr/>
                <strong>lat:</strong> ${this.center.lat}
                <br/>
                <strong>lng:</strong> ${this.center.lng}
            `
				: "<span style='padding: 0'></span>"
		},
	},

	methods: {
		async getAddress() {
			this.loading = true

			try {
				const { lat, lng } = this.center

				const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`

				const { data, status } = await this.$axios.get(url)

				if (status === 200) {
					this.loading = false

					return data
				}
			} catch (e) {
				this.loading = false

				console.error("Reverse Geocode Error->", e)
			}
		},

		async onMapClick({ latlng }) {
			if (this.isDraggable && latlng) {
				this.center = latlng
			}
		},

		onSearch({ location }) {
			this.center = { lat: location.y, lng: location.x }
		},

		async getUserPosition() {
			if (navigator.geolocation) {
				// get GPS center
				navigator.geolocation.getCurrentPosition(pos => {
					// set the user location
					this.center = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					}
				})
			}
		},
	},

	mounted() {
		if (this.isDraggable) {
			this.getUserPosition()
		}

		this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch)
	},
}
</script>
