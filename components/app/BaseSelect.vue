<template>
	<validation-provider v-slot="{ errors, changed }" :name="name" :rules="rules || {}" class="w-full" tag="div">
		<div
			:class="[
				is_open ? 'border-blue-44 shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)]' : 'border-gray-14',
				$attrs.disabled ? 'disabled' : '',
				errors.length > 0 ? 'shadow-[0_0.5px_3px] shadow-red-8 !border-red-8' : '',
			]"
			class="select-box relative border rounded-[30px] flex items-center justify-between"
		>
			<label :for="name" class="select__label relative" :class="{ active: is_open || value }">
				{{ title }}
			</label>

			<span v-if="$attrs.slotIcon !== undefined" class="px-2">
				<i class="icon-font-edit text-blue-43 multi-gradient-gold"></i>
			</span>
			<span v-else-if="$slots.icon" class="px-2">
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
					overflow: 'hidden',
				}"
				dir="ltr"
				class="flex-1 rounded-[30px] test__item"
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
	data() {
		return {
			value: this.$attrs.value,
			is_open: false,
			OpenIndicator: {
				render: createElement => createElement("i", { class: "icon-font-sidebar-bottom text-blue-45 text-xl" }),
			},
		}
	},

	components: {
		"vue-select": vSelect,
		ValidationProvider,
	},

	inheritAttrs: false,

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
		labelClass: String,
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
	&.disabled {
		@apply bg-gray-51;
	}
}

[role="listbox"] {
	background-color: transparent !important;
	position: absolute;
	width: 100%;

	li {
		@apply text-blue-6 hover:bg-blue-7-47 hover:text-blue-10;
	}
}

.select__label {
	@apply text-sm z-10 absolute right-9 top-[30px] text-sm transition-all duration-200;
  &.active {
    @apply -top-[2px] text-sm;
    &::before {
      @apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[11px] right-[-15px] z-[-1] transition-all;
    }
  }
}

.select__label.active {
	@apply translate-y-[-50%] text-sm;
	&::before {
		@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[11px] right-[-15px] z-[-1] transition-all;
	}
}

input.vs__search::placeholder {
	font-size: 15px;
}

.vs__dropdown-menu {
	background: white !important;
	top: 55px;
	border-radius: 25px;
	max-height: 200px;
}

.vs__dropdown-option {
	color: #a9a9a9;
	text-align: right;
	font-size: 18px;
}

.vs__selected-options {
	align-items: center;
	direction: rtl;
}

.vs__selected-options .vs__selected {
	color: #1c1c1c;
}

.vs__actions .vs__open-indicator {
	fill: rgb(115, 115, 115);
}

.vs__actions .vs__clear {
	margin-left: 10px;
	fill: #ff9494;
}

.vs__dropdown-toggle {
	flex-direction: row-reverse;
	height: 100%;
	background: white;
	border: none !important;
	padding: 10px;
	border-radius: 25px;
}
</style>
