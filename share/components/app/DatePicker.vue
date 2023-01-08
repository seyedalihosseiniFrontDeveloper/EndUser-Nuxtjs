<template>
	<validation-provider v-slot="{ errors, changed }" :name="name" :rules="rules" class="w-full" tag="div">
		<date-picker
			ref="datePicker"
			v-model="value"
			:auto-submit="true"
			:locale="$moment().locale()"
			v-bind="attrs"
			v-on="$listeners"
		/>

		<div
			:class="[
				classes,
				$refs.datePicker?.visible === true ? '!border-blue-44' : '',
				errors.length > 0 ? '!border-red-8 !shadow-red-8' : 'border-gray-14',
				$attrs.disabled ? 'bg-gray-74' : '#fff',
			]"
			class="relative cursor-pointer border border-gray-14 bg-white rounded-[30px] p-4 h-[58px]"
			@click="open"
		>
			<slot :value="value" name="value">
				<div
					:class="{
						disabled: $attrs.disabled,
						error: errors,
					}"
					class="group"
				>
					<label
						:class="{
							active: value,
						}"
						:for="name"
						class="datepicker_label pointer-events-none absolute right-9 transition-all duration-200"
					>
						{{ title }}
					</label>

					<div
						:style="{
							border: $attrs.disabled ? 'solid 1px transparent !important' : '0 !important',
							color: $attrs.disabled ? '#a1a1aa !important' : '#000',
						}"
						class="custom-input text-[18px]"
						@click="open"
					>
						{{ value ? $moment(value).format(attrs["display-format"]) : "" }}
					</div>
				</div>
			</slot>
		</div>

		<helper-input-error v-if="errorBoxIsVisible" :errors="errors" />
	</validation-provider>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker"
import { ValidationProvider } from "vee-validate"

export default {
	components: {
		datePicker: VuePersianDatetimePicker,
		ValidationProvider,
	},

	props: {
		title: [String],

		name: {
			type: String,
			required: true,
		},

		rules: [String],

		classes: [String],

		tag: {
			type: String,
			default: "div",
		},

		errorBoxIsVisible: {
			type: Boolean,
			default: true,
		},
	},

	computed: {
		attrs() {
			return { "display-format": "YYYY-MM-DD", format: "YYYY-MM-DD", ...this.$attrs }
		},

		value: {
			get() {
				return this.$attrs.value
			},

			set(v) {
				this.$emit("input", v)
			},
		},
	},

	methods: {
		open() {
			this.$refs.datePicker.visible = true
		},
	},
}
</script>

<style lang="scss">
.vpd-input-group {
	display: none;
}

.datepicker_label {
	@apply text-sm z-10 absolute right-9 top-1/2 -translate-y-1/2 text-sm transition-all duration-200;
	&.active {
		@apply -top-[2px] text-sm;
		&::before {
			@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[11px] right-[-15px] z-[-1] transition-all;
		}
	}
}
.disabled {
	input,
	label {
		@apply text-gray-75;
	}
}
//label.datepicker_label {
//	@apply translate-y-[-205%] md:translate-y-[-215%] text-sm;
//	&::before {
//		@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[12px] right-[-15px] z-[-1] transition-all;
//	}
//}

.vpd-container::v-deep {
	z-index: 10 !important;
}
</style>
