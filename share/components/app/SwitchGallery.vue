<template>
	<validation-provider v-slot="{ errors }" :rules="rules" class="relative" tag="div">
		<div
			:class="{
				disabled: $attrs.disabled,
				'': focused,
			}"
			class="move-placeholder relative flex items-center"
		>
			<label
				ref="label"
				:for="name"
				class="pointer-events-none transition-all duration-200 pe-5 text-[24px] text-blue-8"
				:class="classesLabel"
			>
				{{ label }}
			</label>
			<div class="switch-box">
				<input
					:id="name"
					ref="input"
					:name="name"
					:style="{
						'padding-right': $slots.icon ? '5px !important' : 'auto',
					}"
					:type="type"
					:value="inputHandler && inputHandler.get()"
					class="px-4 py-4 outline-0 absolute z-[1] rounded-xl w-full h-full opacity-0 cursor-pointer"
					@focusin="focused = true"
					@focusout="focused = false"
					v-bind="{ placeholder: ' ', ...$attrs }"
					v-on="{ ...$listeners, input, change }"
				/>
				<div></div>
			</div>
		</div>

		<!--		<helper-input-error v-if="errorBoxIsVisible" :errors="errors" />-->
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
		classesLabel: {
			type: String,
			default: "",
		},
	},

	data() {
		return {
			type: this.$attrs.type || "checkbox",
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
		change({ target }) {
			this.$emit("input", target.checked)
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
.switch-box {
	@apply relative h-[36px] w-[66px];
	input {
		@apply w-full;
		&:checked {
			+ div {
				@apply bg-blue-76-50 border-blue-76;
				@apply after:left-[5px] after:from-blue-72 after:to-blue-77 after:border-blue-78;
			}
		}
	}

	div {
		@apply relative bg-yellow-22-60 border border-yellow-24 overflow-hidden rounded-full shadow-sm h-full w-full ease-in-out duration-300;
		@apply after:content-[''] after:shadow-md after:border-2 after:border-yellow-25 after:bg-gradient-to-b after:from-yellow-22 after:to-yellow-23 after:top-[50%] after:translate-y-[-50%] after:w-[24px] after:h-[24px] after:absolute after:rounded-full after:ease-in-out after:duration-300;
		&::after {
			left: calc(100% - 30px);
		}
	}
}
</style>
