<template>
	<div class="w-full lg:w-[60%] flex flex-wrap justify-center py-5 relative mx-auto ssss">
		<template v-if="!readonly && editForm">
			<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
				<app-btn
					:disabled="disableSuccess"
					:is_loading="loadingNextSuccess"
					color="blue"
					class="!px-4 !justify-between !w-full !border-0"
					@click.native="saveEditedForm(index)"
				>
					<span class="!text-[18px] mx-auto">حفظ</span>
				</app-btn>
			</div>
			<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
				<app-btn
					:disabled="disableCancel"
					:is_loading="loadingNextCancel"
					color="red"
					class="!px-4 !justify-between !w-full !border-0"
					@click.native="changeStatus(false, index)"
				>
					<span class="!text-[18px] mx-auto">إلغاء</span>
				</app-btn>
			</div>
		</template>
		<div v-if="readonly && !editForm" class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
			<app-btn
				color="blue-bold"
				class="!px-4 !justify-between !w-full"
				@click.native="changeStatus(true, index)"
				:is_loading="loadingNext"
			>
				<span class="!text-[18px] mx-auto">تعديل</span>
			</app-btn>
		</div>
	</div>
</template>
<script>
export default {
	name: "TheEditButtons",
	props: {
		index: Number,
		loadingNextSuccess: Boolean,
		loadingNextCancel: Boolean,
		loadingNext: Boolean,
		editForm: Boolean,
		readonly: Boolean,
		saveEditedForm: Function,
		disableSuccess: Boolean,
		disableCancel: Boolean,
	},
	methods: {
		changeStatus(status, index) {
			console.log("1")
			this.$emit("update", status, index)
		},
	},
}
</script>
