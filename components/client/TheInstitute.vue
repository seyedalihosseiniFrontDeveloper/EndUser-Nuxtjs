<template>
	<div class="px-4 md:px-10 grid grid-cols-12 gap-4 items-center justify-center py-6 z-[1] relative w-full">
		<div class="col-span-full grid grid-cols-12 gap-4 items-center justify-center"></div>
		<div class="col-span-full md:col-span-6 xl:col-span-4 xs:min-w-[90%] lg:min-w-full xs:mr-6 ml-0 md:mr-0">
			<AppBaseSelect
				name="instituteType"
				:options="institute"
				title="اختر نوع المؤسسة"
				:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
				rules="required"
				:disabled="details.readonly"
				:reduce="institute => institute.id"
				v-model="details.institute.instituteType"
				:errorBoxIsVisible="false"
				slotIcon
			/>
		</div>
		<div class="col-span-full md:col-span-6 xl:col-span-4 z-0">
			<AppBaseInput
				name=""
				label="أسم المؤسسة"
				rules="required"
				:errorBoxIsVisible="false"
				:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
				:disabled="details.readonly"
				v-model="details.institute.name"
				slotIcon
			/>
		</div>
		<div class="col-span-full">
			<div class="flex justify-center items-center mt-3">
				<app-radio
					name="radio-group-3"
					class="text-blue-4 !w-auto px-5"
					@click="details.institute.isLawyer = false"
					:disabled="details.readonly"
					:checked="!details.institute.isLawyer ? 'checked' : ''"
					label="المخول"
				>
				</app-radio>
				<app-radio
					name="radio-group-3"
					class="text-blue-4 !w-auto px-5"
					@click="details.institute.isLawyer = true"
					:disabled="details.readonly"
					:checked="details.institute.isLawyer ? 'checked' : ''"
					label="المحامی"
				>
				</app-radio>
			</div>
		</div>
		<div
			v-if="!details.institute.isLawyer"
			class="grid grid-cols-12 gap-4 items-center justify-center col-span-full"
		>
			<div class="col-span-full md:col-span-6 xl:col-span-2">
				<AppBaseInput
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					name="nameInstitute"
					v-model="details.name"
					label="اسم"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-2">
				<AppBaseInput
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					name="fatherNameInstitute"
					label="اسم الاب"
					v-model="details.fatherName"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-2">
				<AppBaseInput
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					name="grandFatherNameInstitute"
					v-model="details.grandFatherName"
					label="اسم الجد"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2">
				<app-date-picker-custom
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					name="birthDateInstitute"
					:submit="true"
					v-model="details.dateOfBirth"
					simple
					:min="dateMin"
					:max="dateMax"
					title="تاريخ الولادة"
					@update="value => (details.dateOfBirth = value)"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2">
				<AppBaseSelect
					label="label"
					name="isHealthy"
					:disabled="details.readonly"
					:options="isHealthy"
					:classes="`!rounded-[48px] border-transparent ${details.readonly && 'disabled-inputs'}`"
					:reduce="data => data.label"
					:errorBoxIsVisible="false"
					v-model="details.isHealthy"
					rules="required"
					title="الحالة الصحية"
				>
				</AppBaseSelect>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2">
				<AppBaseSelect
					:options="genderType"
					v-model="details.genderType"
					:reduce="data => data.id"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					name="genderType"
					title="الجنس"
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
				>
				</AppBaseSelect>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2">
				<AppBaseInput
					rules=""
					tools="integer"
					name="userPhone"
					:disabled="details.readonly"
					v-model="details.phone"
					:classes="`!rounded-[48px] border-transparent ${details.readonly && 'disabled-inputs'}`"
					:errorBoxIsVisible="false"
					label="رقم الهاتف (أختياري)"
				>
				</AppBaseInput>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2">
				<AppBaseSelect
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					:options="cites"
					label="name"
					:reduce="data => data.id"
					v-model="details.cityId"
					name="selectedCity"
					title="أختيار المحافظة"
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
				>
				</AppBaseSelect>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2">
				<AppBaseInput
					name="street"
					:disabled="details.readonly"
					v-model="details.street"
					:errorBoxIsVisible="false"
					label="القضاء / الناحية "
					rules="required"
					slotIcon
					:classes="`!rounded-[48px] border-transparent ${details.readonly && 'disabled-inputs'}`"
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2" details>
				<AppBaseInput
					name="neighbourhood"
					:disabled="details.readonly"
					v-model="details.neighbourhood"
					:errorBoxIsVisible="false"
					label="الحي / المحلة "
					rules="required"
					slotIcon
					:classes="`!rounded-[48px] border-transparent ${details.readonly && 'disabled-inputs'}`"
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-1">
				<AppBaseInput
					name="alley"
					:disabled="details.readonly"
					v-model="details.alley"
					:errorBoxIsVisible="false"
					label="الزقاق "
					rules="required"
					slotIcon
					:classes="`!rounded-[48px] border-transparent ${details.readonly && 'disabled-inputs'}`"
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-1">
				<AppBaseInput
					name="noNumber"
					rules="required"
					:disabled="details.readonly"
					v-model="details.noNumber"
					:errorBoxIsVisible="false"
					label="رقم الدار "
					slotIcon
					:classes="`!rounded-[48px] border-transparent ${details.readonly && 'disabled-inputs'}`"
				/>
			</div>

			<div
				@click="showUploadModal(index)"
				class="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-2 flex items-center justify-around border-2 border-dashed rounded-[20px] p-1 cursor-pointer relative"
				:class="
					details.uploadModalValidate === null || details.uploadModalValidate
						? 'border-blue-7'
						: '!border-red-8'
				"
			>
				<span class="text-blue-7 text-[18px]">المستمسكات المطلوبة</span>
				<i class="icon-font-document-upload text-blue-7 text-[46px]"></i>
			</div>
		</div>

		<!-- if institute type 2		-->
		<div v-else class="grid grid-cols-12 gap-4 items-center justify-center col-span-full">
			<div class="col-span-full md:col-span-6 xl:col-span-3">
				<AppBaseInput
					name="firstName"
					v-model="details.name"
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					label="الاسم الاول"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-3">
				<AppBaseInput
					name="secondName"
					v-model="details.fatherName"
					:disabled="details.readonly"
					rules="required"
					:errorBoxIsVisible="false"
					label="اسم الاب"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-3">
				<AppBaseInput
					name="grandFatherName"
					v-model="details.grandFatherName"
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					label="اسم الجد"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-3">
				<AppBaseInput
					name="serialNumber"
					v-model="details.institute.lawyer.number"
					rules="required"
					tools="integer"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					label="رقم هوية نقابة المحامين"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-3">
				<AppBaseInput
					name="numberLawyer"
					label="رقم الوكالة"
					tools="integer"
					v-model="details.institute.lawyer.agencyNumber"
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-6 xl:col-span-3">
				<app-date-picker-custom
					name="dateLawyer"
					v-model="details.institute.lawyer.agencyDate"
					simple
					:submit="true"
					rules="required"
					:errorBoxIsVisible="false"
					:disabled="details.readonly"
					title="تاريخ الوكالة"
					:classes="`!rounded-[48px] ${details.readonly && 'disabled-inputs'}`"
					@update="value => (details.institute.lawyer.agencyDate = value)"
					slotIcon
				/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			mode: 1,
			institute: [
				{
					id: 1,
					label: "حكومية",
				},
				{
					id: 2,
					label: "غیره",
				},
			],
			genderType: [
				{ id: 1, label: "ذکر" },
				{ id: 2, label: "أثني" },
			],
		}
	},
	props: {
		details: Object,
		cites: Array,
		index: Number,
		showUploadModal: Function,
		dateMin: String,
		dateMax: String,
	},
	inject: ["isHealthy"],
	methods: {
		changeMode(value) {
			this.mode = value
			this.$emit("updateInstitute", value)
		},
	},
	watch: {
		"details.dateOfBirth"(value) {},
	},
}
</script>
