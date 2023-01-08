<template>
	<div>
		<ul class="select-type !flex flex-wrap justify-center !pt-0">
			<li
				class="item !h-[55px] px-8 md:flex-1 w-full md:w-auto"
				v-for="(tab, index) in tabs"
				:key="tab.title"
				@click="selectTab(index)"
				:class="[classes, { active: index == selectedIndex }]"
			>
				<span class="z-[2] !text-white">{{ tab.title }}</span>
			</li>
		</ul>
		<div>
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		classes: {},
	},
	data() {
		return {
			selectedIndex: 0, // the index of the selected tab,
			tabs: [],
		}
	},
	created() {
		this.tabs = this.$children
	},

	mounted() {
		this.selectTab(0)
	},
	methods: {
		selectTab(i) {
			this.$emit("updateCardType", this.id)
			this.selectedIndex = i
			// loop over all the tabs
			this.tabs.forEach((tab, index) => {
				tab.isActive = index === i
			})
		},
	},
}
</script>
<style scoped>
.item {
	background-image: linear-gradient(
		to right top,
		theme("colors.gray-61"),
		theme("colors.gray-62"),
		theme("colors.gray-63"),
		theme("colors.gray-65"),
		theme("colors.gray-66")
	);
	border: 0;
}
</style>
