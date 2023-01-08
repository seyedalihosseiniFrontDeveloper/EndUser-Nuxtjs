import Vue from "vue"

const numberFormat = num => {
	return (num || "").toString().replace(/^[+-]?\d+/, function (int) {
		return int.replace(/(\d)(?=(\d{3})+$)/g, "$1,")
	})
}
const e2a = num =>  num.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d])


Vue.filter("numberFormat", number => numberFormat(number))
Vue.filter("e2a", number => e2a(number))
