import Vue from "vue"
import Toast, { createToastInterface } from "vue-toastification"

import "vue-toastification/dist/index.css"

Vue.use(Toast)

export default ({ app, $axios }, inject) => {
	const $toast = createToastInterface()

	$toast.updateDefaults({
		maxToasts: 6,
		timeout: 4 * 1000,
	})

	const defaultOptions = {
		position: "top-right",
	}

	const toast = {
		success(msg) {
			$toast.success(msg, {
				...defaultOptions,
			})
		},

		info(msg) {
			$toast.info(msg, {
				...defaultOptions,
			})
		},

		error(msg) {
			$toast.error(msg, {
				...defaultOptions,
			})
		},

		warn(msg) {
			$toast.warning(msg, {
				...defaultOptions,
			})
		},
	}

	inject("toast", toast)
	app.$toast = toast
}
