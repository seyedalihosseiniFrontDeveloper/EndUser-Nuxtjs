<template>
	<div class="px-0 w-full lg:w-[900px] h-[80vh] overflow-auto pb-4">
		<div class="flex flex-col items-center mb-2">
			<h4 class="text-[30px] text-blue-2 mx-auto">CopyTransaction</h4>
		</div>
		<div class="flex gap-5">
			<div class="flex-1">
				<div class="mb-5 w-full">
					<app-input
						:value="data.transactionType"
						classInput="text-blue-107"
						classes="md:ml-2"
						disabled
						label="transactionType"
						name="transactionType"
					>
						<template #icon>
							<i class="icon-font-edit text-blue-107"></i>
						</template>
					</app-input>
				</div>
				<div class="mb-5 w-full">
					<app-input
						:value="data.owner"
						classInput="text-blue-107"
						classes="md:ml-2"
						disabled
						label="owner"
						name="owner"
					>
						<template #icon>
							<i class="icon-font-edit text-blue-107"></i>
						</template>
					</app-input>
				</div>
				<div class="mb-5 w-full">
					<app-input
						:value="data.city"
						classInput="text-blue-107"
						classes="md:ml-2"
						disabled
						label="city"
						name="city"
					>
						<template #icon>
							<i class="icon-font-edit text-blue-107"></i>
						</template>
					</app-input>
				</div>
				<div class="mb-5 w-full">
					<app-input
						:value="data.office"
						classInput="text-blue-107"
						classes="md:ml-2"
						disabled
						label="office"
						name="office"
					>
						<template #icon>
							<i class="icon-font-edit text-blue-107"></i>
						</template>
					</app-input>
				</div>
				<div class="mb-5 w-full">
					<app-input
						:value="data.issuedDate"
						classInput="text-blue-107"
						classes="md:ml-2"
						disabled
						label="office"
						name="issuedDate"
					>
						<template #icon>
							<i class="icon-font-edit text-blue-107"></i>
						</template>
					</app-input>
				</div>

				<div class="mb-5 w-full flex flex-row justify-center gap-8">
					<app-btn class="w-[120px] !p-3 flex items-center" color="blue" type="button" @click="accept">
						<i class="icon-font-tick-square"></i>
						حفظ
					</app-btn>
					<app-btn
						class="w-[120px] !p-3 flex items-center"
						color="red"
						type="button"
						@click="$modal.close(name)"
					>
						<i class="icon-font-close-square"></i>
						إلغاء
					</app-btn>
				</div>
			</div>
			<div class="mb-5">
				<div class="w-[240px] h-[240px] rounded-[45px] p-4 shadow-md flex-shrink-0 mb-5 md:mb-0">
					<img v-if="qrImgUrl" :src="qrImgUrl" alt="qr" class="w-full h-full" loading="lazy" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { toDataURL } from "qrcode"

export default {
	props: ["name", "data"],
	data() {
		return {
			qrImgUrl: "",
		}
	},
	methods: {
		accept() {
			console.log("this.data", this.data)
			this.$callHandler({
				api: "transaction.copyTransaction",
				hasKey: "copyTransaction",
			})
				.store({
					transactionId: this.data.transactionId,
					officeId: this.data.officeId,
					transactionTypeId: this.data.transactionTypeId,
				})
				.then(({ data: { data }, status }) => {
					if (status === 200) {
						this.$router.push({
							name: `id-print-request`,
							params: { id: this.data.transactionId },
							query: {
								id: this.data.transactionTypeId,
								mode: "download",
							},
						})
					}
					this.$modal.close(this.name)
				})
				.catch(error => {})
		},
	},
	async mounted() {
		let vm = this
		await toDataURL(
			this.data.trackingCode,
			{
				errorCorrectionLevel: "H",
				type: "image/jpeg",
				quality: 1,
				margin: 1,
				color: {
					dark: "#000000",
					light: "#ffffff",
				},
			},
			function (err, url) {
				if (err) throw err
				vm.qrImgUrl = url
			}
		)
	},
}
</script>
<style lang="scss" scoped></style>
