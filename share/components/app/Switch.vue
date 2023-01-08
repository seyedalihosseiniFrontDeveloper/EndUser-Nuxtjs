<template>
	<div
		:class="{
			disabled: $attrs.disabled,
		}"
		class="relative flex items-center bg-white"
	>
		<label :for="name" class="cursor-pointer transition-all duration-200 pe-5 text-[20px] text-blue-8">
			{{ label }}
		</label>

		<div class="switch-box">
			<input
				:id="name"
				v-model="checked"
				:name="name"
				class="absolute z-[1] rounded-xl w-full h-full opacity-0 cursor-pointer"
				type="checkbox"
				v-bind="$attrs"
				v-on="{ ...$listeners, change }"
			/>
			<div></div>
		</div>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,

	props: {
		value: {},

		name: {
			type: String,
			required: true,
		},

		label: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			checked: this.value,
		}
	},

	watch: {
		value(v) {
			this.checked = !!this.value
		},
	},

	methods: {
		change({ target }) {
			this.$emit("input", target.checked)
		},
	},
}
</script>

<style lang="scss" scoped>
.switch-box {
	@apply relative h-[35px] w-[75px];
	input {
		@apply w-full;
		&:checked {
			+ div {
				@apply bg-green-18;
				@apply after:left-[0];
			}
		}
	}

	div {
		@apply relative bg-gray-45 border border-gray-39 overflow-hidden rounded-full shadow-sm h-full w-full ease-in-out duration-300;
		@apply after:content-[''] after:shadow-md after:bg-white after:w-[32px] after:h-[32px] after:absolute after:rounded-full after:ease-in-out after:duration-300;
		&::after {
			left: calc(100% - 33px);
		}
	}
}
</style>
