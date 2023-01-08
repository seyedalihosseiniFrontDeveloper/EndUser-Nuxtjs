<template>
	<validation-provider v-slot="{ errors, changed }" :name="name" :rules="rules || {}" class="w-full" tag="div">
		<div
			:class="[
				is_open ? 'border-blue-44 shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)]' : 'border-gray-14',
				$attrs.disabled ? 'disabled' : '',
				errors.length > 0 ? '!border-red-8 !shadow-red-8' : 'border-gray-14',
			]"
			class="select-box relative border rounded-[30px] flex items-center justify-between bg-white"
		>
			<label
				:class="{
					active: is_open || value !== undefined,
				}"
				:for="name"
				class="relative select__label"
			>
				{{ title }}
			</label>

			<span v-if="$slots.icon" class="px-2">
				<slot name="icon" />
			</span>

			<vue-select
				:clearable="!$attrs.disabled"
				:components="{ OpenIndicator, ...$attrs.components }"
				:inputId="name"
				:style="{
					height: $attrs.hasOwnProperty('multiple') ? 'auto' : '60px',
					padding: 0,
					margin: 0,
					'min-height': '58px',
					position: 'static',
				}"
				class="flex-1 w-full rounded-[30px] overflow-hidden"
				dir="ltr"
				v-bind="$attrs"
				@close="is_open = false"
				@open="is_open = true"
				v-on="{ ...$listeners, input }"
			>
				<template #no-options="{ search, searching, loading }">لا توجد حاليا أي خيارات لعرضها</template>
			</vue-select>
		</div>

		<helper-input-error v-if="rules !== false && errorBoxIsVisible" :errors="errors" />
	</validation-provider>
</template>

<script>
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import { ValidationProvider } from "vee-validate"

export default {
	components: {
		"vue-select": vSelect,
		ValidationProvider,
	},

	props: {
		title: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		rules: {
			type: [String, Boolean],
		},
		errorBoxIsVisible: {
			type: Boolean,
			default: true,
		},
	},

	inheritAttrs: false,

	data() {
		return {
			is_open: false,
			value: this.$attrs.value,
			OpenIndicator: {
				render: createElement => createElement("i", { class: "icon-font-sidebar-bottom text-blue-45 text-xl" }),
			},
		}
	},

	methods: {
		input(value) {
			this.value = value
			this.$emit("input", value)
		},
	},
}
</script>

<style lang="scss">
:root {
	--transparent-color: transparent;
	--vs-disabled-bg: var(--transparent-color);
}

.select-box {
	&,
	* {
		@apply transition-all duration-300;
	}

	&.disabled {
		@apply bg-gray-74;

		.vs__selected,
		label {
			@apply text-gray-75;
		}
	}

	.vs--disabled {
		i {
			color: #a1a1aa !important;
		}
	}
}

[role="listbox"] {
	position: absolute;
	width: 100%;

	li {
		@apply text-blue-6 bg-white hover:bg-blue-7-47;
		&:hover {
			color: white !important;
		}
	}
}

.select__label {
	@apply text-sm z-10 absolute right-9 top-1/2 -translate-y-1/2 text-sm transition-all duration-200;
	&.active {
		@apply -top-[2px] text-sm;
		&::before {
			@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[11px] right-[-15px] z-[-1] transition-all;
		}
	}
}

input.vs__search::placeholder {
	font-size: 15px;
}

.vs__dropdown-menu {
	/*background: #e5e5e5 !important;*/
	top: 65px;
	border-top: 1px solid silver !important;
	@apply rounded-[5px];
}

.vs__dropdown-option {
	color: #a9a9a9;
	text-align: right;
	font-size: 13px;
}

.vs__selected-options {
	align-items: center;
	direction: rtl;
}

.vs__selected-options .vs__selected {
	color: black;
}

.vs__actions .vs__open-indicator {
	fill: rgb(115, 115, 115);
}

.vs__actions .vs__clear {
	margin-left: 10px;
	fill: #ff3c3c;
}

.vs__dropdown-toggle {
	flex-direction: row-reverse;
	height: 100%;
	background: white;
	border: none !important;
	padding: 10px;
	border-radius: 15px;
}
</style>
