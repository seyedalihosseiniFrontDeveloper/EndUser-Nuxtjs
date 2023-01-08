<template>
	<div className="col-span-full mt-5">
		<client-detail
			v-for="item in items"
			:key="item.name"
			:index="index"
			:id="id"
			:data="item"
			:delete-child="deleteChild"
		/>
	</div>
</template>
<script>
export default {
	name: "TheListOfChildren",
	props: {
		items: {
			type: Array,
			default: () => {},
		},
		deleteChild: {
			type: Function,
			default: () => {},
		},
		id: Number,
		index: Number,
	},
}
</script>
