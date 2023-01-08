<template>
	<span :class="{
    'has-error':errors[0]
	}" class="input-message-error d-block" style="height: 30px; color: red; font-size: 13px">
		{{ errors[0] }}
	</span>
</template>

<script>
export default {
	props: {
		errors: {
			type: Array,
			required: true
		}
	}
}
</script>
