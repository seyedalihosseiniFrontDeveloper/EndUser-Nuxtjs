<template>
	<div class="date-pickerTest h-[30vh] bg-transparent lg:h-fit w-fit">
		<date-picker
			ref="datePicker"
			:disabled="data.attrs.disabled"
			:locale-config="localeConfig"
			:max="newMax || data.attrs.max"
			:min="data.attrs.min"
			:value="data.attrs.val"
			display-format="YYYY-MM-DD"
			format="YYYY-MM-DD"
			lang="ar"
			locale="ar"
			simple
			v-bind="{ ...data.attrs, localeConfig, locale: 'ar' }"
			@input="value = $event"
			v-on="$listeners"
		>
			<template #cancel-btn>
				<div class="">
					<app-checkbox
						v-if="data.is_married"
						id="checkedMarriage"
						ref="checkedMarriage"
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
	</div>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker"
import moment from "moment"
import ar from "moment/locale/ar-sa"

moment.updateLocale("ar-iq", { ...ar, postformat: str => str })
export default {
	components: {
		datePicker: VuePersianDatetimePicker,
	},
	data() {
		return {
			value: "",
			document: "",
			newMax: null,
		}
	},
	watch: {
		value(val) {
			this.value = val
			this.$modal.close(this.name, val)
		},
	},

	computed: {
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
	},

	methods: {
		showModal() {
			this.$modal.visible("info-attention", {
				callBack: data => {
					console.log(data, "close")
					if (data == "close") {
						this.$refs.checkedMarriage.value = false
						return
					}
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
	props: { name: {}, data: {} },
	mounted() {
		this.$refs.datePicker.visible = true
	},
}
</script>
<style scoped>
.date-pickerTest::v-deep .vpd-actions {
	display: flex;
	align-items: center;
}

.date-pickerTest::v-deep .vpd-wrapper .vpd-container .vpd-content .vpd-actions .move-placeholder {
	direction: rtl !important;
	align-items: end;
}
</style>
