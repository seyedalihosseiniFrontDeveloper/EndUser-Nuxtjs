export default ({ app, store, route, $cfg }, inject) => {
	store.registerModule("hasKey", myStore)

	const HasKey = {
		timeoutAutoRemove: null,

		has(key) {
			return store.state["hasKey"].array.includes(key)
		},

		push(key, autoRemove = true) {
			if (!this.has(key) && key) {
				store.commit("hasKey/add", key)

				if (autoRemove) {
					this.timeoutAutoRemove = setTimeout(() => this.autoRemoveKey(key), $cfg.axiosTimeoutCall)
				}
			}
		},

		autoRemoveKey(key) {
			const checkRemove = () => {
				if (this.has(key)) {
					const text = `hasKey -> (${key}) path: ${route.path}`

					console.log(text)

					this.remove(key)
				}
			}

			if ($cfg.isDev) {
				setTimeout(checkRemove, 3 * 1000)
			} else {
				this.remove(key)
			}
		},

		remove(key) {
			if (this.has(key)) {
				clearTimeout(this.timeoutAutoRemove)

				setTimeout(() => store.commit("hasKey/remove", key), 100)
			}
		},

		clear() {
			store.commit("hasKey/clear")
		},
	}

	const $hasKey = key => HasKey.has(key)

	$hasKey.push = key => HasKey.push(key)

	$hasKey.remove = key => HasKey.remove(key)

	$hasKey.clear = () => HasKey.clear()

	app.$hasKey = $hasKey
	inject("hasKey", $hasKey)
}

const myStore = {
	namespaced: true,

	state: () => ({
		array: [],
	}),

	mutations: {
		add(state, key) {
			state.array.push(key)
		},

		remove(state, key) {
			const index = state.array.indexOf(key)

			if (index > -1) {
				state.array.splice(index, 1)
			}
		},

		clear(state) {
			state.array = []
		},
	},
}
