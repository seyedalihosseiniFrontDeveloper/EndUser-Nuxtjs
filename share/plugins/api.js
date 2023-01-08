export default ({ app, $axios }, inject) => {
	const api = {}

	const files = require.context("../../api", true, /\.js/)

	files.keys().forEach(async file => {
		file = file.substr(2).slice(0, -3)

		const tempObject = {}
		let container = tempObject
		const split = file.split("/")

		split.map(async (k, i, values) => {
			container = container[k] = i === values.length - 1 ? require("@/api/" + file).default($axios) : {}
		})

		api[split[0]] = tempObject[split[0]]
	})

	inject("api", api)
	app.$api = api
}
