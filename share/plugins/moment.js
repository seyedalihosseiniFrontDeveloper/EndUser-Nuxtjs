import moment from "jalali-moment"

export default ({ app }, inject) => {
	const plugin = (...args) => moment(...args).locale("en")

	app.$moment = plugin
	inject("moment", plugin)
}
