<template lang="html">
	<div v-show="isActive">
		<slot></slot>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: "Tab",
		},
		id: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			isActive: true,
		}
	},
}
</script>
