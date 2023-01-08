<template>
	<div>
		<div v-if="table && !disabled" class="flex justify-between px-2 !mt-0">
			<div class="flex flex-wrap gap-7 justify-center items-start mb-8">
				<app-btn
					v-tooltip="'إدراج جدول'"
					class="!h-[60px] w-[60px] !p-3 flex items-center"
					color="gold"
					type="button"
					@click="insertTable"
				>
					<i class="icon-font-add-table !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px]">إدراج جدول</span>-->
				</app-btn>
				<!--				<button class="bg-blue" type="button" @click="insertTable">Insert Table</button>-->
				<app-btn
					v-tooltip="'حذف الجدول'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="deleteTable"
				>
					<i class="icon-font-remove-table !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px] before:font-bold">حذف الجدول</span>-->
				</app-btn>
				<!--				<button type="button" @click="deleteTable">Delete Table</button>-->

				<app-btn
					v-tooltip="'إدراج صف لأعلى'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="insertRowAbove"
				>
					<i class="icon-font-add-row-top !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px]">إدراج صف لأعلى</span>-->
				</app-btn>
				<!--				<button type="button" @click="insertRowAbove">Insert Row Above</button>-->
				<app-btn
					v-tooltip="'إدراج صف لأسفل'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="insertRowBelow"
				>
					<i class="icon-font-add-row-bottom !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px]">إدراج صف لأسفل</span>-->
				</app-btn>
				<!--				<button type="button" @click="insertRowBelow">Insert Row Below</button>-->
				<app-btn
					v-tooltip="'احذف صف'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="deleteRow"
				>
					<i class="icon-font-remove-row !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px] before:font-bold">احذف صف</span>-->
				</app-btn>
				<!--		<button type=-->

				<app-btn
					v-tooltip="'أدخل العمود إلى اليسار'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="insertColumnLeft"
				>
					<i class="icon-font-add-column-left !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px]">أدخل العمود إلى اليسار</span>-->
				</app-btn>
				<!--			<button type="button" @click="insertColumnLeft">Insert Column Left</button>-->
				<app-btn
					v-tooltip="'أدخل العمود إلى اليمين'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="insertColumnRight"
				>
					<i class="icon-font-add-column-right !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px]">أدخل العمود إلى اليمين</span>-->
				</app-btn>
				<!--				<button type="button" @click="insertColumnRight">Insert Column Right</button>-->
				<app-btn
					v-tooltip="'حذف العمود'"
					class="!h-[60px] w-[60px] !p-3"
					color="gold"
					type="button"
					@click="deleteColumn"
				>
					<i class="icon-font-remove-column !m-0 !text-[40px]"></i>
					<!--					<span class="mt-[1px] before:font-bold">حذف العمود</span>-->
				</app-btn>
				<!--				<button type="button" @click="deleteColumn">Delete Column</button>-->
			</div>
		</div>

		<div ref="editor" class="context-body"></div>
	</div>
</template>

<script>
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"

import Quill from "quill"

const Embed = Quill.import("blots/embed")

class AttachmentBlot extends Embed {
	static create({ title, parameterKey, parameterTypeId }) {
		let node = super.create()

		node.dataset["parameterKey"] = parameterKey
		node.dataset["parameterTypeId"] = parameterTypeId

		node.setAttribute("readonly", true)

		node.innerText = title

		return node
	}

	static value(node) {
		console.log(node)
		return { ...node.dataset, title: node.innerText }
	}
}

AttachmentBlot.blotName = "key"
AttachmentBlot.tagName = "span"
AttachmentBlot.className = "key"

Quill.register(AttachmentBlot)

export default {
	props: {
		table: {
			type: Boolean,
			default: false,
		},

		value: {},

		toolbar: {
			default: () => [
				["bold", "italic", "underline", "strike"], // toggled buttons
				["blockquote"],

				[{ list: "ordered" }, { list: "bullet" }],

				[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
				[{ direction: "rtl" }], // text direction\

				[{ size: ["small", false, "large", "huge"] }], // custom dropdown
				[{ header: [1, 2, 3, 4, 5, 6, false] }],

				[{ color: [] }, { background: [] }], // dropdown with defaults from theme

				["clean"], // remove formatting button
			],
		},

		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			quill: {},
		}
	},

	methods: {
		insertTable() {
			const table = this.quill.getModule("table")
			table.insertTable(2, 2)
		},

		insertRowAbove() {
			const table = this.quill.getModule("table")
			table.insertRowAbove(2, 2)
		},

		insertRowBelow() {
			const table = this.quill.getModule("table")
			table.insertRowBelow(2, 2)
		},

		insertColumnLeft() {
			const table = this.quill.getModule("table")
			table.insertColumnLeft(2, 2)
		},

		insertColumnRight() {
			const table = this.quill.getModule("table")
			table.insertColumnRight(2, 2)
		},

		deleteRow() {
			const table = this.quill.getModule("table")
			table.deleteRow(2, 2)
		},

		deleteColumn() {
			const table = this.quill.getModule("table")
			table.deleteColumn(2, 2)
		},

		deleteTable() {
			const table = this.quill.getModule("table")
			table.deleteTable(2, 2)
		},
	},

	watch: {
		value(newVal) {
			const text = this.$refs.editor.children[0].innerHTML

			if (this.quill && newVal !== text) {
				this.$refs.editor.children[0].innerHTML = newVal
				this.$emit("input", newVal)
			} else if (!newVal) {
				this.quill.setText("")
				this.$emit("input", newVal)
			}
		},

		disabled: {
			handler(bool) {
				this.$nextTick(() => {
					document.querySelector(".ql-editor").setAttribute("contenteditable", !bool)
					document.querySelector(".ql-toolbar")?.classList.toggle("hidden", bool)
				})
			},

			immediate: true,
		},
	},

	mounted() {
		this.quill = new Quill(".context-body", {
			theme: "snow",

			modules: {
				toolbar: this.toolbar,

				table: this.table,
			},
		})

		if (this.value) {
			// this.quill.setText(this.value)
			this.quill.clipboard.dangerouslyPasteHTML(this.value)
			// this.$refs.editor.children[0].innerHTML = this.value
		}

		this.quill.on("text-change", (delta, oldDelta, source) => {
			let html = this.$refs.editor.children[0].innerHTML

			this.$emit("input", html === "<p><br></p>" ? "" : html)
		})
	},

	beforeDestroy() {
		this.quill = null

		delete this.quill
	},
}
</script>

<style lang="scss">
.ql-editor[contenteditable="false"] {
	background: whitesmoke;
}

.ql-editor {
	@apply min-h-[140px];
	.key {
		margin: 0 7px;
		display: inline-block;
		width: auto;
		background: #fbfbfb;
		padding: 3px;
		border: 1px solid silver;
		border-radius: 7px;
		box-shadow: 0px 0px 3px rgb(168 168 168 / 9%);
		color: #000000;
		font-weight: bold;
	}
}

.ql-toolbar {
	border-radius: 10px 10px 0 0;
	text-align: right;

	.ql-formats {
		text-align: end !important;
	}
}

.ql-container {
	&.ql-snow {
		border-radius: 0 0 10px 10px;
	}
}

.ql-toolbar.ql-snow.hidden ~ .ql-container.ql-snow {
	border: 1px solid #ccc !important;
	border-radius: 10px;
	overflow: hidden;
}
</style>
