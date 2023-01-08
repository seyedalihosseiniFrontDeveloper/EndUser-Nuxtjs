<template>
	<validation-observer ref="validation" v-slot="{ handleSubmit, valid, errors }" tag="div">
		<form
			:class="classes"
			:style="styles"
			class="w-full"
			@submit.prevent="submitted($event, handleSubmit, valid, errors)"
		>
			<slot />
		</form>
	</validation-observer>
</template>

<script>
import { ValidationObserver } from "vee-validate"

export default {
	components: {
		ValidationObserver,
	},

	props: {
		onSubmit: {
			type: Function,
			required: true,
		},
		customValidate: {
			type: Function,
			required: false,
		},

		classes: [String],

		disabled: [Boolean],

		styles: [String, Object],
	},

	methods: {
		async submitted(e, handleSubmit, valid, errors) {
			let res = true
			if (this.customValidate) {
				res = await this.customValidate({ e, handleSubmit, valid, addError: this.$refs.validation.setErrors })
			}

			await handleSubmit(() => {
				this.onSubmit()
			})

			valid = valid && res
			if (!valid) {
				const el = document.querySelector(".input-message-error.has-error:first-of-type")

				if (el) {
					el.scrollIntoView({
						behavior: "smooth",
					})
				}
			}
			return valid
		},

		addError(obj) {
			this.$refs.validation.setErrors(obj)
		},

		submit() {
			return this.$refs.validation.validate()
		},

		reset() {
			this.$refs.validation.reset()
		},
	},

	watch: {
		disabled(v) {
			this.reset()
		},
	},
}
</script>
