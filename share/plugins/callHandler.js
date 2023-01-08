export default ({ app, $api, $axios, $toast, $hasKey }, inject) => {
	class callHandler {
		constructor({ api, hasKey, toast }) {
			if (typeof api === "string") {
				for (let key of api.split(".")) {
					this.api = this.api ? this.api[key] : $api[key]
				}

				if (this.api === undefined) {
					throw `is not defined (${api}) service !`
				}
			} else {
				this.api = api
			}

			this.hasKey = hasKey
			this.toast = toast
		}

		store() {
			return this.handler(...arguments)
		}

		update() {
			return this.handler(...arguments)
		}

		destroy() {
			return this.handler(...arguments)
		}

		async handler() {
			$hasKey.push(this.hasKey)

			const c = this.api(...arguments)

			c.then(r => this.toast && $toast.success(this.toast === true ? r.data.message : this.toast))

			c.finally(res => $hasKey.remove(this.hasKey))

			return c
		}
	}

	app.$callHandler = obj => new callHandler(obj)
	inject("callHandler", obj => new callHandler(obj))
}
