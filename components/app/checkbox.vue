<template>
	<validation-provider v-slot="{ errors }" :rules="rules" class="w-full relative" tag="div">
		<div
			:class="{
				disabled: $attrs.disabled,
			}"
			class="move-placeholder relative flex items-center sss"
		>
			<div class="check-btn shadow-blue-5 flex-shrink-0">
				<input
					:id="name"
					ref="input"
					:name="name"
					:checked="value"
					type="checkbox"
					class="cursor-pointer scale-[2] mt-[-4px]"
					v-bind="{ ...$attrs }"
					v-on="{ ...$listeners, input }"
				/>
				<span class="icon-font-tick-2 flex items-center justify-center"></span>
			</div>

			<label ref="label" :for="name" class="cursor-pointer text-[20px] ps-5 text-gray-36" :class="classesLabel">
				{{ label }}
			</label>
		</div>
	</validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate"
import Input from "~/share/components/app/Input"

export default {
	components: { Input, ValidationProvider },

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
			type: [String, Object],
		},
		classesLabel: String,
	},

	methods: {
		input({ target }) {
			this.$emit("input", target.value)
		},
	},
}
</script>

<style scoped lang="scss">
.check-btn {
	@apply w-[25px] h-[25px] relative overflow-hidden;
	&:before {
		@apply content-[''] absolute inset-[2px] rounded-[4px] shadow-[0_0_0_2px];
	}

	input {
		@apply inset-[0] absolute opacity-0;

		&:checked {
			+ span {
				box-shadow: 0 0 0 20px inset;
				&:before {
					@apply scale-100;
				}
			}
		}
	}

	span {
		@apply absolute inset-[2px] pointer-events-none transition-all duration-300;
		&:before {
			@apply transition-all duration-300 font-bold text-[20px] text-white scale-0;
		}
	}
}
</style>
