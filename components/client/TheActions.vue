<template>
	<div class="col-span-4 flex flex-col lg:flex-row items-center justify-center gap-3 mt-5 mb-3 z-[1] relative">
		<div
			v-if="isAddNewPerson"
			@click="addNewPerson('addNewPerson', index)"
			class="border-2 border-dashed border-gray-17 rounded-[30px] bg-blue-43-7 hover:bg-blue-53 py-5 px-6 item group flex flex-wrap items-center cursor-pointer ease-in-out duration-300 z-[1]"
		>
			<app-btn
				:disabled="disable"
				class="w-full z-50 item group flex flex-wrap items-center"
				:ref="'addSide-' + index"
				type="button"
			>
				<span
					class="text-black-2 group-hover:text-white pe-10 text-[12px] 3xl:text-[16px] ease-in-out duration-300"
					>أضف شخص أخر</span
				>
				<i
					v-if="!loadingAddForm"
					class="icon-font-add-square !text-blue-7 group-hover:!text-white text-[30px] ease-in-out duration-300 !ml-0 !mt-0"
				></i>
				<helper-spinner v-else-if="loadingAddForm" color="black" />
			</app-btn>
		</div>
		<app-btn
			:disabled="disable"
			v-if="isAddChild && hasAddChild && hasEdit"
			@click="addChild(index)"
			class="border-2 border-dashed border-gray-17 rounded-[30px] bg-purple-11 hover:bg-blue-53 py-5 px-5 item group flex flex-wrap items-center cursor-pointer ease-in-out duration-300 z-[1]"
		>
			<span
				class="text-purple-10 group-hover:text-white pe-10 text-[12px] 3xl:text-[18px] ease-in-out duration-300"
			>
				أضفً قاصر</span
			>
			<i
				class="icon-font-add-square !text-purple-10 group-hover:!text-white text-[30px] ease-in-out duration-300 !ml-0 !mt-0"
			></i>
		</app-btn>
	</div>
</template>
<script>
export default {
	props: {
		addChild: {
			type: Function,
		},
		addNewPerson: {
			type: Function,
		},
		sendData: {
			type: Function,
		},
		hasAddChild: Boolean,
		index: Number,
		loadingAddForm: Boolean,
		mode: String,
		hasEdit: Boolean,
		disable: Boolean,
		disableAddSide: Boolean,
		isAddChild: Boolean,
		isAddNewPerson: Boolean,
	},
}
</script>
