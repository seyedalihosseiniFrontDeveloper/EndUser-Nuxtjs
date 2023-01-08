export default {
	data: () => ({
		fingerprint: "",
		myHub: null,
		getData: null,
		maxTime: 120,
		timer: 0,
	}),
	methods: {
		disconnect() {
			//$.connection.hub.reconnect(null)
			this.myHub.server.received()
			$.connection.hub.stop()
			$.connection.hub.url = null
		},
		getDataFunc(data, type) {
			this.disconnect()
			this.fingerprint = data
			if (this.getData) this.getData(data, type)
		},
		received() {
			console.log("received")
		},
		fetchHub() {
			fetch(process.env.JQUERY_SIGNALR_HUB)
				.then(res => {
					const script = document.createElement("script")
					script.src = process.env.JQUERY_SIGNALR_HUB
					document.body.appendChild(script)
					this.myConnection()
				})
				.catch(err => {
					console.log("Hub not found")

					if (this.timer < this.maxTime)
						setTimeout(() => {
							this.timer++
							this.fetchHub()
						}, 1000)
				})
		},
		/*
		 * type = fingerprint | scanner
		 * */
		openWindowsApp(type, event) {
			const a = document.createElement("a")
			//a.href = process.env.FINGERPRINT_URL_PROTOCOL
			if (type === "scanner")
				a.href = process.env.SCANNER_URL_PROTOCOL + `?userId=${this.$auth.user.profile.userId}`
			else if (type === "fingerprint")
				a.href = process.env.FINGERPRINT_URL_PROTOCOL + `?userId=${this.$auth.user.profile.userId}`
			a.click()
		},
		myConnection() {
			let vm = this
			try {
				$.connection.hub.url = process.env.JQUERY_SIGNALR_URL
				let status = ["connecting", "connected", "reconnecting", "", "disconnected"]
				this.myHub = $.connection.myHub
				this.myHub.client.getData = this.getDataFunc

				$.connection.hub.start().done(function () {
					//vm.myHub.server.Received = vm.received
					setTimeout(() => console.log("connection state:", status[$.connection.hub.state]), 200)
				})
				/*$.connection.hub.disconnected(function () {
          setTimeout(function () {
            $.connection.hub.start()
          }, 2000) // Restart connection after 5 seconds.
        })*/
			} catch (e) {
				console.log("error", e)
				setTimeout(() => {
					vm.myConnection()
				}, 1000)
			}
		},
	},
}
