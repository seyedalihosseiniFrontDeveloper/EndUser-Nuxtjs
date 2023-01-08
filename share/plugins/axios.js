export default ({ app, $axios, $cookies, route, redirect }) => {
	// app.nuxt.error = () => {}

	$axios.onError(async e => {
		if (!e.response) {
			return Promise.reject(e) // cfg plugin handle network
		}

		const { $toast } = app
		let statusCode = e.response.status
		let message = e.response.data.message
		let errors = e.response.data.errors

		if ([400].includes(statusCode)) {
			$toast.error(message || errors[0])
		}

		if ([401].includes(statusCode)) {
			localStorage.clear()
			$cookies.removeAll()

			if (route.name !== "login") {
				return redirect(process.env.ROUTE_LOGIN)
			} else {
				$toast.error(errors[0])
			}
		}

		if ([403].includes(statusCode)) {
			$toast.error(message || errors[0])
		}

		if ([404].includes(statusCode)) {
			// $toast.error("خطا 404")
		}

		if ([422].includes(statusCode)) {
			let i = 0

			for (let err of e.response.data.errors) {
				setTimeout(() => $toast.error(err[0]), i * 350)

				i++
			}
		}

		if ([500].includes(statusCode)) {
			$toast.error("خطا 500")
		}

		return Promise.reject(e)
	})
}
