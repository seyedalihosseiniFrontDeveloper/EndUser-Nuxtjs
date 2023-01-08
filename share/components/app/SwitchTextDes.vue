<template>
	<validation-provider v-slot="{ errors }" :rules="rules" class="relative" tag="div">
		<div
			:class="{
				disabled: $attrs.disabled,
				showDescription: showDescription,
			}"
			class="move-placeholder relative flex gap-x-2 items-center"
		>
			<template v-if="showDescription">
				<input
					:id="name"
					ref="input"
					:name="name"
					:style="{
						'padding-right': $slots.icon ? '5px !important' : 'auto',
					}"
					:type="type"
					:value="inputHandler && inputHandler.get()"
					class="hidden"
					@focusin="focused = true"
					@focusout="focused = false"
					v-bind="{ placeholder: ' ', ...$attrs }"
					v-on="{ ...$listeners, input, change }"
				/>
				<label :for="name" class="switch-box relative cursor-pointer">
					<span class="absolute right-text">{{ textOn }}</span>
					<span class="absolute left-text">{{ textOff }}</span>
				</label>

				<span class="descriptionTextOff hidden">
					{{ descriptionTextOff }}
				</span>
				<span class="descriptionTextOn">
					{{ descriptionTextOn }}
				</span>
			</template>
			<template v-else>
				<div class="switch-box relative">
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
					<div>
						<span class="absolute right-text">{{ textOn }}</span>
						<span class="absolute left-text">{{ textOff }}</span>
					</div>
				</div>
			</template>
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
		textOff: {
			type: String,
			default: "جدید",
		},
		textOn: {
			type: String,
			default: "قدیم",
		},
		showDescription: { type: Boolean, default: false },
		descriptionTextOff: {
			default: "",
			type: String,
		},
		descriptionTextOn: {
			default: "",
			type: String,
		},
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
	@apply relative bg-yellow-22-60 border border-yellow-24 overflow-hidden rounded-full shadow-sm h-full w-full ease-in-out duration-300;
	@apply after:content-[''] after:shadow-md after:border-2 after:border-yellow-25 after:bg-gradient-to-b after:from-yellow-22 after:to-yellow-23 after:top-[50%] after:translate-y-[-50%] after:w-[24px] after:h-[24px] after:absolute after:rounded-full after:ease-in-out after:duration-300;
	&::after {
		left: calc(100% - 30px);
	}
	@apply relative h-[41px] w-[110px];

	& .right-text,
	& .left-text {
		top: 50%;
		transform: translate(0, -50%);
		transition: all 0.3s ease;
		pointer-events: none;
		font-size: 18px;
		right: 56%;
	}

	& .right-text {
		color: #56a8d7;
		opacity: 0;
	}

	& .left-text {
		opacity: 1;
		color: #ad9413;
	}
}
input {
	@apply w-full;
	&:checked {
		~ label {
			@apply bg-blue-76-50 border-blue-76;
			@apply after:left-[5px] after:from-blue-72 after:to-blue-77 after:border-blue-78;
			.right-text,
			.left-text {
				right: 10%;
			}
			.right-text {
				opacity: 1;
			}

			.left-text {
				opacity: 0;
			}
			& ~ .descriptionTextOff {
				display: inline !important;
			}
			& ~ .descriptionTextOn {
				display: none !important;
			}
		}
	}
}
</style>
