export default ({ app, store, $axios }, inject) => {
	store.registerModule("cfg", myStore)

	const cfg = {
		isDev: process.env.NODE_ENV === "development",
		axiosTimeoutCall: 30 * 1000,
		isConnected: () => store.state["cfg"].is_connected,
	}

	$axios.onRequest(() => {
		store.commit("cfg/connected") // check network connection
	})

	$axios.onError(e => {
		if (e.response === undefined) {
			// check network connection
			store.commit("cfg/disconnected")
		}
	})

	app.$cfg = cfg
	inject("cfg", cfg)
}

const myStore = {
	namespaced: true,

	state: () => ({
		is_connected: true,
	}),

	mutations: {
		connected(state) {
			state.is_connected = true
		},

		disconnected(state) {
			state.is_connected = false
		},
	},
}
