<template>
	<div
		:style="{
			transform: `scale(${size})`,
		}"
		class="half-circle-spinner"
	>
		<div :style="{ borderTopColor: color }" class="circle circle-1"></div>
		<div :style="{ borderBottomColor: color }" class="circle circle-2"></div>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			default: "white"
		},
		size: {
			default: 1
		}
	}
}
</script>

<style scoped>
.half-circle-spinner,
.half-circle-spinner * {
	box-sizing: border-box;
}

.half-circle-spinner {
	position: relative;
	margin: auto;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 20px;
	height: 20px;
	border-radius: 100%;
}

.half-circle-spinner .circle {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border: 2px solid transparent;
}

.half-circle-spinner .circle.circle-1 {
	animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
	animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
