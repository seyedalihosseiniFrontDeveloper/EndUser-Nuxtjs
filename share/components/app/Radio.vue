<template>
	<div class="w-full relative">
		<label
			:class="{
				disabled: $attrs.disabled,
			}"
			class="move-placeholder relative flex items-center mb-2"
		>
			<div class="radio-btn !shadow-blue-5">
				<input
					:checked="$attrs.checked"
					:name="name"
					:value="value"
					class="cursor-pointer scale-[2] mt-[-4px]"
					type="radio"
					v-bind="{ ...$attrs }"
					v-on="{ ...$listeners, change }"
				/>

				<span></span>
			</div>

			<span class="cursor-pointer text-[20px] ps-5 text-gray-36">
				{{ label }}
			</span>
		</label>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,

	props: {
		value: {},

		name: {
			type: String,
			required: true,
		},

		label: {
			type: String,
			required: true,
		},
	},

	methods: {
		change(e) {
			this.$emit("change", e.target.value)
		},
	},
}
</script>

<style lang="scss" scoped>
.radio-btn {
	width: 20px;
	height: 20px;
	position: relative;
	overflow: hidden;
	@apply rounded-[50%] flex justify-center items-center shadow-[0_0_0_2px];

	input {
		opacity: 0;
		position: absolute;
		inset: 0;

		&:checked {
			+ span {
				transform: scale(1);
			}
		}
	}

	span {
		position: absolute;
		@apply inset-[4px] rounded-[50%] shadow-[inset_0_0_0_20px] shadow-[inherit];
		transform: scale(0);
		transition: all 0.3s ease;
	}
}
</style>
