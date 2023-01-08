<template>
	<lottie-player v-if="is_lottie" :src="source" v-bind="$attrs" />
	<img v-else :src="source" v-bind="$attrs" />
</template>

<script>
// import * as LottiePlayer from "@lottiefiles/lottie-player"
import * as LottiePlayer from "@lottiefiles/lottie-player"

export default {
	props: {
		src: {
			type: String,
			required: true,
		},
	},

	computed: {
		is_lottie() {
			return this.src.split(".").slice(-1)[0] === "json"
		},

		source() {
			if (this.is_lottie) {
				return this.src
			} else {
				return this.src.replace("assets/jsons", "assets/gifs").replace(".json", ".gif")
			}
		},
	},
}
</script>
