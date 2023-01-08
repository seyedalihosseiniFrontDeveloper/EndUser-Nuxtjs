<template>
	<validation-provider v-slot="{ errors, changed }" :name="name" :rules="rules" class="w-full" tag="div">
		<date-picker
			ref="datePicker"
			:data-parameter-key="$attrs.dataParameterKey"
			:disabled="attrs.disabled"
			:locale-config="localeConfig"
			:max="newMax || attrs.max"
			:min="attrs.min"
			display-format="YYYY-MM-DD"
			format="YYYY-M-DD"
			lang="ar"
			locale="ar"
			simple
			v-bind="attrs"
			@input="value = $event"
			v-on="$listeners"
		>
			<template #cancel-btn>
				{{ is_married }}
				<div v-if="is_married" class="">
					<app-checkbox
						id="checkedMarriage"
						classesLabel="!text-[12px] !pr-2 !mb-0"
						label="نعم أنا متزوج وأريد تقديم طلب معاملة"
						name="checkedMarriage"
						@change="showModal"
					/>
				</div>
			</template>
			<template #submit-btn>
				<button type="button" @click="submit" v-text="'موافق'" />
			</template>
		</date-picker>
		<div
			:class="[
				classes,
				$refs.datePicker?.visible === true ? '!border-blue-44' : '',
				errors.length > 0 ? 'shadow-[0_0.5px_3px] shadow-red-8 !border-red-8' : 'border-gray-14',
			]"
			class="relative cursor-pointer border border-gray-14 bg-white rounded-[15px] p-4"
			@click="open"
		>
			<slot :value="value || emptyMessage" name="value">
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
						class="datepicker_label pointer-events-none absolute right-9 top-[30px] translate-y-[-60%] transition-all duration-200"
					>
						{{ title }}
					</label>

					<div
						:style="{
							border: $attrs.disabled ? 'solid 1px transparent !important' : '0 !important',
						}"
						class="custom-input h-[25px]"
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
import moment from "moment"
/*import ar from "moment/locale/ar-sa"
moment.updateLocale("ar-iq", { ...ar, postformat: str => str })*/
//:locale-config="localeConfig"
export default {
	components: {
		datePicker: VuePersianDatetimePicker,
		ValidationProvider,
	},
	data() {
		return {
			newMax: null,
		}
	},
	props: {
		name: {
			type: String,
			required: true,
		},
		title: [String],
		is_married: {
			default: false,
		},
		emptyMessage: {
			type: String,
			default: "is empty field",
		},
		rules: [String],
		classes: [String, Array, Object],
		tag: {
			type: String,
			default: "div",
		},
		errorBoxIsVisible: {
			type: Boolean,
			default: true,
		},
		placeholder: {
			type: String,
			default: "تاريخ الولادة",
		},
	},

	computed: {
		attrs() {
			return { "display-format": "YYYY-MM-DD", format: "YYYY-MM-DD", ...this.$attrs, autoSubmit: false }
		},

		localeConfig() {
			return {
				ar: {
					dow: 6,
					dir: "rtl",
					displayFormat: null,
					lang: {
						label: "التاريخ",
						submit: "موافق",
						cancel: "إلغاء",
						now: "الآن",
						nextMonth: "الشهر الماضي",
						prevMonth: "الشهر القادم",
						year: "السنة",
						month: "الشهر",
						day: "اليوم",
					},
				},
			}
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
			if (this.$attrs.disabled) {
				return
			}
			this.$modal.visible("datepicker", {
				data: {
					is_married: this.is_married,
					attrs: this.$attrs,
				},
				callBack: data => {
					this.$emit("update", data)
				},
			})
		},
		showModal() {
			this.$modal.visible("info-attention", {
				callBack: data => {
					console.log(data, "data")
					this.document = data
					let now = new Date(this.$moment())
					this.newMax = `${now.getFullYear() - 15}/${now.getMonth()}/${now.getDate()}`
				},
			})
		},
		submit() {
			let date = new Date(this.$refs.datePicker.selectedDates[0]._i)
			let day = date.getDate()
			let month = date.getMonth()
			let year = date.getFullYear()
			let fullDate = `${year}/${month}/${day}`
			if (this.document) {
				this.$modal.close(this.name, {
					date: fullDate,
					doc: this.document,
				})
			} else {
				this.$modal.close(this.name, fullDate)
			}
			this.$refs.datePicker.visible = year >= 2007
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
