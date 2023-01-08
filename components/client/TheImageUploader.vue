<template>
	<!--  default-->

	<div
		v-show="form.relatedTo === 1"
		@click="updateImage"
		class="w-[150px] h-[150px] border-2 border-dashed rounded-3xl p-1 relative 2xl:absolute cursor-pointer z-[1] mb-10 2xl:mb-auto 2xl:mt-28"
		:class="{
			'2xl:mb-0 2xl:left-[8%] 2xl:bottom-[0%]': index > 0,
			'2xl:left-[10%] 2xl:bottom-[-30px] z-[3]': index === 0,
			'border-gray-11': form.transactionSidePictureValidate === null,
			'border-green-19': form.transactionSidePicture && form.transactionSidePictureValidate,
			'border-red-8': form.transactionSidePictureValidate === false && !form.transactionSidePicture,
		}"
	>
		<img
			v-if="!form.transactionSidePicture"
			src="/img/default-avatar2.png"
			alt="default-image"
			class="rounded-3xl w-full h-full bg-white"
			loading="lazy"
			:class="{}"
		/>
		<img
			v-else
			:src="previewSrc(form.transactionSidePicture)"
			alt="image-user"
			loading="lazy"
			class="rounded-3xl h-full object-cover"
		/>
		<div
			class="relative w-[30px] h-[30px] p-4 rounded-full border-2 border-dashed flex items-center justify-center bg-white z-1 bottom-[15px] left-[15px] mr-auto cursor-pointer"
			:class="{
				'border-gray-11': form.transactionSidePictureValidate === null,
				'border-green-19': form.transactionSidePicture && form.transactionSidePictureValidate,
				'border-red-8': form.transactionSidePictureValidate === false && !form.transactionSidePicture,
			}"
		>
			<i
				class="icon-font-edit"
				:class="{
					'text-gray-11': form.transactionSidePictureValidate === null,
					'text-green-19': form.transactionSidePicture && form.transactionSidePictureValidate,
					'text-red-8': form.transactionSidePictureValidate === false && !form.transactionSidePicture,
				}"
			></i>
		</div>
	</div>
</template>

<script>
export default {
	name: "TheImageUploader",
	props: {
		form: Object,
		previewSrc: Function,
		showUploadFaceImageModal: Function,
		index: Number,
		updateKey: Function,
	},
	methods: {
		updateImage() {
			if (this.updateKey) {
				this.updateKey()
			}
			this.showUploadFaceImageModal(this.index)
		},
	},
}
</script>

<style scoped></style>
