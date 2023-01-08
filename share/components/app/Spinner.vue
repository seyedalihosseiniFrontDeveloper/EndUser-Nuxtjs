<template>
	<validation-provider v-slot="{ errors }" :rules="rules" class="w-full relative flex items-center" tag="div">
		<div
			class="w-[50px] h-[50px] flex items-center justify-center border border-gray-14 rounded-[15px] cursor-pointer hover:text-blue-108 hover:bg-blue-43 hover:scale-[0.95] transition-all duration-500"
			@click="decrease"
		>
			<i
				class="icon-font-negative-bold flex items-center icon-spinner justify-center text-[28px] text-white bg-blue-3 rounded-[65px]"
			></i>
		</div>
		<div
			:class="[
				classes,
				{
					disabled: $attrs.disabled,
					'border border-blue-44 shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)]': focused,
				},
			]"
			class="move-placeholder relative flex items-center h-full bg-white transition-all duration-300 mx-2 w-[110px] border border-gray-14 rounded-[20px]"
		>
			<span v-if="$slots.icon" class="px-2 flex items-center">
				<slot name="icon" />
			</span>

			<input
				:id="name"
				ref="input"
				:name="name"
				:value="inputHandler && inputHandler.get()"
				class="outline-0 w-full h-[50px] text-center px-3 text-blue-3 text-[20px] py-[5px] transition-all rounded-[20px]"
				v-bind="{ placeholder: ' ', ...$attrs }"
				@focusin="focused = true"
				@focusout="focused = false"
				v-on="{ ...$listeners, input }"
			/>
			<label
				ref="label"
				:for="name"
				class="pointer-events-none absolute right-7 top-[50%] translate-y-[-50%] transition-all duration-200 text-[14px] text-gray-18"
			>
				{{ label }}
			</label>
		</div>
		<div
			class="w-[50px] h-[50px] flex items-center justify-center border border-gray-14 rounded-[15px] cursor-pointer hover:text-blue-108 hover:bg-blue-43 hover:scale-[0.95] transition-all duration-500"
			@click="increase"
		>
			<i
				class="icon-font-add-bold flex items-center icon-spinner justify-center text-[28px] text-white bg-blue-3 rounded-[15px]"
			></i>
		</div>
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

		classes: {},

		name: {
			type: String,
			required: true,
		},

		label: {
			type: String,
			required: false,
		},

		rules: {
			type: String,
		},

		errorBoxIsVisible: {
			type: Boolean,
			default: true,
		},

		tools: {
			type: String,
			default: "",
		},
	},

	data() {
		return {
			type: this.$attrs.type || "text",
			inputHandler: null,
			// inputFocused: false,
			focused: false,
		}
	},

	methods: {
		focus() {
			this.$refs.input.focus()
		},
		// outInput() {
		// 	if (!this.$refs.input.value) {
		// 		this.inputFocused = false
		// 	}
		// },
		input({ target }) {
			this.inputHandler.set(target.value)

			this.$emit("input", this.inputHandler.value)

			setTimeout(() => this.focus())
		},
		increase({ target }) {
			this.inputHandler.value++
			this.$emit("input", this.inputHandler.value)
		},
		decrease({ target }) {
			this.inputHandler.value--
			this.$emit("input", this.inputHandler.value)
		},
	},

	watch: {
		value: {
			handler(value) {
				this.inputHandler = new inputHandler({ value, type: this.type }, this.tools)

				this.inputHandler.set(value)

				this.type = this.inputHandler.type
			},

			immediate: true,
		},

		"$attrs.type"(type) {
			this.type = type
		},
	},
}
</script>

<style lang="scss" scoped>
.move-placeholder {
	&:focus-within {
		@apply shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)] border-blue-44;
	}
}

input {
	&:focus,
	&:not(:placeholder-shown) {
		+ label {
			@apply translate-y-[-205%] md:translate-y-[-190%] text-sm;
			&::before {
				@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[12px] right-[-15px] z-[-1] transition-all;
			}
		}
	}
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
