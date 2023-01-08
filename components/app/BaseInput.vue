<template>
	<validation-provider v-slot="{ errors }" :rules="rules" class="w-full relative" tag="div">
		<div
			:class="[
				classes,
				{
					disabled: $attrs.disabled,
					'border border-blue-44 shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)]': focused,
				},
				errors.length > 0 ? 'shadow-[0_0.5px_3px] shadow-red-8 !border-red-8' : 'border-gray-14',
			]"
			class="move-placeholder relative border rounded-[13px] border-gray-14 flex items-center bg-white transition-all duration-300"
		>
			<span v-if="$attrs.slotIcon !== undefined" class="px-2">
				<i class="icon-font-edit text-blue-43 multi-gradient-gold"></i>
			</span>
			<span v-else-if="$slots.icon" class="px-2">
				<slot name="icon" />
			</span>
			<input
				:id="name"
				ref="input"
				:accept="type === 'file' ? '.png,.jpg,.pdf' : ''"
				:class="classesInput"
				:name="name"
				:style="{
					'padding-right': $slots.icon ? '5px !important' : icon ? '30px' : 'auto',
				}"
				:type="type"
				:value="inputHandler && inputHandler.get()"
				class="px-4 py-4 outline-0 w-[85%] h-[56px] md:h-[60px] !rounded-[45px] cursor-[inherit]"
				v-bind="{ placeholder: ' ', ...$attrs }"
				@focusin="focused = true"
				@focusout="focused = false"
				v-on="{ ...$listeners, input }"
			/>

			<label
				ref="label"
				:for="name"
				class="pointer-events-none absolute right-9 top-[50%] translate-y-[-50%] transition-all duration-200"
			>
				{{ label }}
			</label>

			<template v-if="icon === 'edit'">
				<i
					:style="{
						filter: $attrs.disabled ? 'grayscale(1)' : 'unset',
					}"
					class="icon-font-edit absolute right-2 text-[#25b4ff]"
				></i>
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

		classes: {},

		icon: {
			default: false,
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
			type: [String, Object],
		},

		errorBoxIsVisible: {
			type: Boolean,
			default: true,
		},

		tools: {
			type: String,
			default: "",
		},
		classesInput: {
			type: String,
			default: "",
		},
	},

	data() {
		return {
			type: this.$attrs.type || "text",
			inputHandler: null,
			focused: false,
		}
	},

	computed: {
		inputRef() {
			return this.$refs.input
		},
	},

	methods: {
		focus() {
			this.$refs?.input?.focus()
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

	&.disabled {
		@apply bg-gray-51;
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

.error {
	@apply border-red-8;
}
</style>

<!--<template>-->
<!--	<validation-provider v-slot="{ errors }" :rules="rules" class="w-full relative" tag="div">-->
<!--		<div-->
<!--			:class="[-->
<!--				classes,-->
<!--				{-->
<!--					disabled: $attrs.disabled,-->
<!--					'border border-blue-44 shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)]': focused,-->
<!--				},-->
<!--				errors.length > 0 ? '!border-red-8' : 'border-gray-14',-->
<!--			]"-->
<!--			class="move-placeholder relative border rounded-[30px] border-gray-14 flex items-center bg-white transition-all duration-300"-->
<!--		>-->
<!--			<span v-if="$slots.icon" class="px-2">-->
<!--				<slot name="icon" />-->
<!--			</span>-->

<!--			<input-->
<!--				:id="name"-->
<!--				ref="input"-->
<!--				:name="name"-->
<!--				:style="{-->
<!--					'padding-right': $slots.icon ? '5px !important' : icon ? '30px' : 'auto',-->
<!--				}"-->
<!--				:type="type"-->
<!--				:class="inputClass"-->
<!--				:value="inputHandler && inputHandler.get()"-->
<!--				class="px-4 py-4 outline-0 w-[85%] h-[56px] md:h-[60px] rounded-[30px]"-->
<!--				v-bind="{ placeholder: ' ', ...$attrs }"-->
<!--				@focusin="focused = true"-->
<!--				@focusout="focused = false"-->
<!--				v-on="{ ...$listeners, input }"-->
<!--			/>-->

<!--			<label-->
<!--				ref="label"-->
<!--				:for="name"-->
<!--				class="pointer-events-none absolute right-9 top-[50%] translate-y-[-50%] transition-all duration-200"-->
<!--			>-->
<!--				{{ label }}-->
<!--			</label>-->

<!--			<template v-if="icon === 'edit'">-->
<!--				<i-->
<!--					:style="{-->
<!--						filter: $attrs.disabled ? 'grayscale(1)' : 'unset',-->
<!--					}"-->
<!--					class="icon-font-edit absolute right-2 text-[#25b4ff]"-->
<!--				></i>-->
<!--			</template>-->
<!--		</div>-->

<!--		<helper-input-error v-if="errorBoxIsVisible" :errors="errors" />-->
<!--	</validation-provider>-->
<!--</template>-->

<!--<script>-->
<!--import { inputHandler } from "@/share/utils"-->
<!--import { ValidationProvider } from "vee-validate"-->

<!--export default {-->
<!--	components: { ValidationProvider },-->

<!--	inheritAttrs: false,-->

<!--	props: {-->
<!--		value: {},-->

<!--		classes: {},-->

<!--		icon: {-->
<!--			default: false,-->
<!--		},-->

<!--		name: {-->
<!--			type: String,-->
<!--			required: true,-->
<!--		},-->

<!--		label: {-->
<!--			type: String,-->
<!--			required: true,-->
<!--		},-->

<!--		rules: {-->
<!--			type: [String, Object],-->
<!--		},-->

<!--		errorBoxIsVisible: {-->
<!--			type: Boolean,-->
<!--			default: true,-->
<!--		},-->

<!--		tools: {-->
<!--			type: String,-->
<!--			default: "",-->
<!--		},-->
<!--		inputClass: {-->
<!--			type: String,-->
<!--			default: "",-->
<!--		},-->
<!--	},-->

<!--	data() {-->
<!--		return {-->
<!--			type: this.$attrs.type || "text",-->
<!--			inputHandler: null,-->
<!--			focused: false,-->
<!--		}-->
<!--	},-->

<!--	computed: {-->
<!--		inputRef() {-->
<!--			return this.$refs.input-->
<!--		},-->
<!--	},-->

<!--	methods: {-->
<!--		focus() {-->
<!--			this.$refs.input.focus()-->
<!--		},-->

<!--		input({ target }) {-->
<!--			this.inputHandler.set(target.value)-->

<!--			this.$emit("input", this.inputHandler.value)-->

<!--			setTimeout(() => this.focus())-->
<!--		},-->
<!--	},-->

<!--	watch: {-->
<!--		value: {-->
<!--			handler(value) {-->
<!--				this.inputHandler = new inputHandler({ value, type: this.type }, this.tools)-->

<!--				this.inputHandler.set(value)-->

<!--				this.type = this.inputHandler.type-->
<!--			},-->

<!--			immediate: true,-->
<!--		},-->

<!--		"$attrs.type"(type) {-->
<!--			this.type = type-->
<!--		},-->
<!--	},-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.move-placeholder {-->
<!--	&:focus-within {-->
<!--		@apply shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)] border-blue-44;-->
<!--	}-->

<!--	&.disabled {-->
<!--		@apply bg-gray-51;-->
<!--	}-->
<!--}-->

<!--input {-->
<!--	&:focus,-->
<!--	&:not(:placeholder-shown) {-->
<!--		+ label {-->
<!--			@apply translate-y-[-205%] md:translate-y-[-215%] text-sm;-->
<!--			&::before {-->
<!--				@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[12px] right-[-15px] z-[-1] transition-all;-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--}-->

<!--input:-webkit-autofill,-->
<!--input:-webkit-autofill:hover,-->
<!--input:-webkit-autofill:focus,-->
<!--input:-webkit-autofill:active {-->
<!--	-webkit-box-shadow: 0 0 0 30px white inset !important;-->
<!--}-->

<!--.error {-->
<!--	@apply border-red-8;-->
<!--}-->
<!--</style>-->
