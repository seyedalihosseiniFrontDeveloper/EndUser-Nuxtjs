<template>
	<validation-provider v-slot="{ errors }" :rules="rules" class="w-full relative" tag="div">
		<div
			:class="[
				classes,
				{
					disabled: $attrs.disabled,
					'border border-blue-44 shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)]': focused,
				},
			]"
			class="move-placeholder relative border rounded-[13px] border-gray-14 flex items-center h-full bg-white transition-all duration-300"
		>
			<span class="px-2">
				<slot name="icon" />
			</span>

			<input
				:id="name"
				ref="input"
				:name="name"
				:style="{
					'padding-right': $slots.icon ? '5px !important' : 'auto',
				}"
				:type="type"
				:value="inputHandler && inputHandler.get()"
				class="px-4 py-4 outline-0 w-[90%] h-[56px] md:h-[60px] rounded-xl"
				:class="classInput"
				@focusin="focused = true"
				@focusout="focused = false"
				v-bind="{ placeholder: ' ', ...$attrs }"
				v-on="{ ...$listeners, input }"
			/>
			<label
				ref="label"
				:for="name"
				class="pointer-events-none absolute right-9 top-[50%] translate-y-[-50%] transition-all duration-200"
			>
				{{ label }}
			</label>
			<i :class="iconShow" class="pe-5 cursor-pointer" @click="chnageTypeInput"></i>
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
		classInput: {},

		name: {
			type: String,
			required: true,
		},

		label: {
			type: String,
			required: true,
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
			type: "password",
			inputHandler: null,
			focused: false,
			iconShow: "icon-font-eye",
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
		chnageTypeInput() {
			this.type = this.type == "password" ? "text" : "password"
			this.iconShow = this.iconShow == "icon-font-eye" ? "icon-font-eye-hidden" : "icon-font-eye"
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

<style scoped lang="scss">
.move-placeholder {
	&:focus-within {
		@apply shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)] border-blue-44;
	}
}

input {
	&:focus,
	&:not(:placeholder-shown) {
		+ label {
			@apply translate-y-[-205%] md:translate-y-[-215%] text-sm;
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
