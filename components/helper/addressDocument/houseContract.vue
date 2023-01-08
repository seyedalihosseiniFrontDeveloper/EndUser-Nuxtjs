<template>
	<div title="بطاقة السكن" class="mt-6">
		<div class="grid grid-cols-12 gap-4 items-center justify-center relative w-full mt-2">
			<div class="col-span-full md:col-span-4">
				<AppBaseInput
					name="number"
					v-model="data.number"
					label="رقم بطاقة السكن"
					tools="integer|max:12|min:1"
					rules="required|max:12|min:1"
					:errorBoxIsVisible="false"
					:disabled="readonly"
					:classes="`!rounded-[48px] ${readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-4">
				<app-date-picker-custom
					name="issuedDate"
					simple
					@update="value => (data.issuedDate = value)"
					:submit="true"
					v-model="data.issuedDate"
					title="تاريخ البطاقة السكن"
					:disabled="readonly"
					:classes="`!rounded-[48px] ${readonly && 'disabled-inputs'}`"
					rules="required"
					:errorBoxIsVisible="false"
					slotIcon
				/>
			</div>
			<div class="col-span-full md:col-span-4">
				<AppBaseInput
					name="issuedBy"
					v-model="data.issuedBy"
					label="جهة بطاقة السكن"
					tools="max:12|min:1"
					rules="required|min:1"
					:errorBoxIsVisible="false"
					:disabled="readonly"
					:classes="`!rounded-[48px] ${readonly && 'disabled-inputs'}`"
					slotIcon
				/>
			</div>
		</div>
		<div class="grid !grid-cols-1 md:!grid-cols-2 select-type !gap-5 !pt-4 pb-4 md:px-16">
			<div
				@click="openUploadWay('firstImage')"
				:class="{
					'custom-border-dashed': isUploadfirstImage === null,
					'custom-border-dashed-green': isUploadfirstImage && isUploadfirstImage,
					'custom-border-dashed-error': isUploadfirstImage === false && !isUploadfirstImage,
				}"
				class="p-2 item !border-0 group !justify-between !h-[70px] !justify-between !h-[70px]"
			>
				<i
					v-if="!data.firstImage"
					class="icon-font-document-upload text-blue-7 group-hover:!text-white text-[60px] xl:text-[40px] 2xl:text-[60px] z-[2] pe-2"
				></i>
				<lottie
					v-else
					class="w-20 h-20"
					src="/assets/jsons/face-scan/success.json"
					autoplay="true"
					loop="true"
					speed="1"
				/>
				<div
					class="border border-gray-17 group-hover:border-white rounded-[15px] px-2 relative z-[2] flex items-center py-4"
				>
					<span class="text-black-2 group-hover:text-white pe-3 text-[12px] 3xl:text-[16px]"
						>صورة وجه بطاقة السكن</span
					>
					<i class="icon-font-add-square bg-blue-7 text-white p-[4px] rounded-[8px]"></i>
				</div>
			</div>
			<div
				@click="openUploadWay('secondImage')"
				:class="{
					'custom-border-dashed': isUploadsecondImage === null,
					'custom-border-dashed-green': isUploadsecondImage && isUploadsecondImage,
					'custom-border-dashed-error': isUploadsecondImage === false && !isUploadsecondImage,
				}"
				class="p-2 item !border-0 group !justify-between !h-[70px] !justify-between !h-[70px]"
			>
				<i
					v-if="!data.secondImage"
					class="icon-font-document-upload text-blue-7 group-hover:!text-white text-[60px] xl:text-[40px] 2xl:text-[60px] z-[2] pe-2"
				></i>
				<lottie
					v-else
					class="w-20 h-20"
					src="/assets/jsons/face-scan/success.json"
					autoplay="true"
					loop="true"
					speed="1"
				/>
				<div
					class="border border-gray-17 group-hover:border-white rounded-[15px] px-2 relative z-[2] flex items-center py-4"
				>
					<span class="text-black-2 group-hover:text-white pe-3 text-[12px] 3xl:text-[16px]"
						>صورة ظهر بطاقة السكن</span
					>
					<i class="icon-font-add-square bg-blue-7 text-white p-[4px] rounded-[8px]"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isUploadfirstImage: null,
			isUploadsecondImage: null,
		}
	},
	props: {
		readonly: Boolean,
		data: {
			type: Object,
		},
		id: {
			type: Number,
			default: 1,
		},
	},
	created() {
		this.changeImageValidate()
	},
	methods: {
		changeImageValidate() {
			this.isUploadfirstImage = !!this.data.firstImage
			this.isUploadsecondImage = !!this.data.secondImage
		},
		uploadImageCardId(direction) {
			console.log("uploadImageCardId")
			this.$emit("uploadImageCard", this.id, direction, event.target.files[0])
			this[`isUpload${direction}`] = true
		},
		openUploadWay(direction) {
			if (!this.readonly) {
				this.$modal.visible("uploader-scanner", {
					callBack: data => {
						this.$emit("uploadImageCard", this.id, direction, data)
						this[`isUpload${direction}`] = true
					},
				})
			}
		},
	},
	watch: {
		data: {
			handler(data) {
				this.$emit("changeData", this.data)
				this.changeImageValidate()
			},
			deep: true,
		},
	},
}
</script>
