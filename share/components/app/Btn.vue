<template>
	<button
		v-wave="{
			color: colorWave || '#737e80',
			easing: 'ease-out',
			initialOpacity: !disabled && !is_loading ? 0.2 : 0,
			finalOpacity: !disabled && !is_loading ? 0.1 : 0,
		}"
		:class="[color, color && 'default relative', { disabled: disabled || is_loading }]"
		:type="type"
		v-bind="$attrs"
		@click="click"
	>
		<helper-spinner
			:class="{
				invisible: !is_loading,
			}"
			:color="loadingColor"
			class="!absolute inset-0 m-auto w-full"
		/>

		<span
			:class="{
				invisible: is_loading,
			}"
			class="justify-center items-center flex-1 inline-flex"
		>
			<slot></slot>
		</span>
	</button>
</template>

<script>
export default {
	props: {
		is_loading: {
			type: Boolean,
			default: false,
		},

		type: {
			default: "button",
		},

		color: {
			validator(value) {
				return [
					"red",
					"blue-bold",
					"blue",
					"gray",
					"gray-bold",
					"green",
					"green-bold",
					"yellow",
					"yellow-bold",
					"gold",
					"brown",
				].includes(value)
			},
		},

		loadingColor: {
			default: "white",
		},

		colorWave: {
			default: false,
		},

		disabled: {
			type: Boolean,
		},
	},

	methods: {
		click($event) {
			if (!this.disabled && !this.is_loading) {
				this.$emit("click", $event)
			} else {
				$event.preventDefault()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.disabled {
	opacity: 0.8;
	cursor: not-allowed;
}

button {
	i {
		@apply text-white text-xl pt-1;
	}

	i {
		@apply me-3;
	}
}

.default {
	@apply relative flex items-center justify-center px-8 pt-2.5 pb-[14px] text-white bg-gradient-to-b rounded-[30px] shadow-[0_0_0_10px] hover:shadow-[0_0_0_14px] ease-in duration-200;
}

.red {
	@apply from-red-6 to-red-5 shadow-red-7-80 hover:shadow-red-7-80;
}

.blue-bold {
	@apply from-blue-53 to-blue-38 shadow-blue-3-15 hover:shadow-blue-3-15;
}

.blue {
	@apply from-blue-38 to-blue-53 shadow-blue-54-25 hover:shadow-blue-54-25;
}

.gray {
	@apply bg-white text-black-2 border border-gray-18-30 shadow-gray-12-10 hover:shadow-gray-12-10;
}

.gray-bold {
	@apply text-black-2 bg-gray-15 border border-gray-18-30 shadow-gray-12-10 hover:shadow-gray-12-10;
}

.green {
	@apply from-green-27 to-green-26 shadow-green-28-25 hover:shadow-green-28-25;
}

.green-bold {
	@apply from-green-17 to-green-5 shadow-green-14-30 hover:shadow-green-14-30;
}

.yellow {
	@apply bg-yellow-15 to-green-5 shadow-yellow-26-40 hover:shadow-yellow-26-40;
}

.yellow-bold {
	@apply from-yellow-35 to-yellow-36 shadow-yellow-37 hover:shadow-yellow-37;
}

.gold {
	@apply from-yellow-22 to-yellow-23 shadow-yellow-20-30 hover:shadow-yellow-20-30;
}

.brown {
	@apply from-brown to-brown-1 shadow-brown-2 hover:shadow-brown-2;
}
</style>
