<template>
	<validation-provider v-slot="{ errors }" :name="name" :rules="rules" class="w-full relative" tag="div">
		<div v-if="label" class="absolute right-8 top-[-0.8rem] px-2 bg-white">
			<span class="text-sm">{{ label }}</span>
		</div>

		<textarea
			ref="input"
			:class="[
				classes,
				{
					'text-gray-75': $attrs.disabled,
				},
				errors.length > 0 ? '!border-red-8 !shadow-red-8' : '',
			]"
			:name="name"
			:style="{
				backgroundColor: $attrs.disabled ? '#f4f4f5' : '#fff',
			}"
			:value="inputHandler && inputHandler.get()"
			class="w-full rounded-2xl font-15 p-3 border border-gray-14"
			v-bind="{ ...$attrs }"
			v-on="{ ...$listeners, input }"
		/>

		<helper-input-error v-if="errorBoxIsVisible" :errors="errors" />
	</validation-provider>
</template>

<script>
import { inputHandler } from "@/share/utils"
import { ValidationProvider } from "vee-validate"

export default {
	components: { ValidationProvider },

	inheritAttrs: false,

	props: {
		value: {},

		name: {
			type: String,
			required: true,
		},

		label: {
			type: String,
		},

		rules: {
			type: String,
		},

		errorBoxIsVisible: {
			type: Boolean,
			default: true,
		},

		classes: {
			type: String,
		},

		tools: {
			type: String,
			default: "",
		},
		resize: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			inputHandler: null,
		}
	},

	computed: {
		getAria() {
			return this.$refs.input
		},
	},

	methods: {
		focus() {
			this.$refs.input.focus()
		},

		input({ target }) {
			this.inputHandler.set(target.value)

			this.$emit("input", this.inputHandler.value)

			setTimeout(() => this.focus())
		},
	},

	watch: {
		value: {
			handler(value) {
				this.inputHandler = new inputHandler({ value }, this.tools)

				this.inputHandler.set(value)
			},

			immediate: true,
		},
	},
}
</script>

<style lang="scss" scoped>
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0 30px white inset !important;
}

textarea {
	@apply transition-[box-shadow,border] duration-300;
	&:focus-within {
		@apply shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)] border-blue-44;
	}
}

.error {
	@apply border-red-8;
}
</style>
