import { configure, extend } from "vee-validate"

import { digits, email, max, min, numeric, required } from "vee-validate/dist/rules"

extend("required", required)
extend("min", min)
extend("max", max)
extend("numeric", numeric)
extend("digits", digits)
extend("email", email)

export default ({ i18n }) => {
	configure({
		defaultMessage: (field, values) => {
			return i18n.t(`validation.${values._rule_}`, {
				...values,
				_field_: i18n.t(`${field}`),
			})
		},
	})
}
