<template>
	<div class="px-1 inline-flex z-[6]">
		<div
			class="border-2 border-dashed border-gray-17 rounded-[30px] bg-purple-11 min-w-[200px] h-[50px] px-5 py-3 justify-between flex items-center gap-2"
			:class="classes"
		>
			<div class="flex gap-2 mt-1">
				<span class="text-purple-10">{{ data.name }}</span>
				<span class="text-purple-10">{{ data.fatherName }}</span>
				<span class="text-purple-10"> {{ data.grandFatherName }}</span>
			</div>
			<i
				class="icon-font-close-square text-[22px] text-purple-10 cursor-pointer hover:text-red-4 hover:scale-[1.1] transition-all duration-3"
				@click="deleteChild(data.name, id, index)"
			></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		classes: {},
		deleteChild: Function,
		data: Object,
		id: Number,
		index: Number,
	},
}
</script>
