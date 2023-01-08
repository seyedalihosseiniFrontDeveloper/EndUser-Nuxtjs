<template>
	<div v-if="showPage" class="flex flex-col items-center justify-start h-full overflow-auto bg-white relative">
		<div
			class="animate-box w-[90%] md:w-[80%] h-[70vh] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>
		<app-the-steps-process :processDetails="allProcessDetails" :modeSideTwo="modelSideTwo" />
		<div class="w-[85%] md:w-[78%] mx-auto z-[5] relative mb-10">
			<app-logo />
			<div class="shadow-[0_8px_3px] shadow-blue-43 rounded-[35px] overflow-hidden" v-if="!showError">
				<advocacy-text-the-static-header :process-details="processDetails" />
				<div class="shadow-admin overflow-hidden relative">
					<div class="bg-white h-auto relative overflow-hidden">
						<div class="absolute bottom-0 opacity-70 w-full flex justify-end">
							<img
								loading="lazy"
								:src="`/img/bg-glass/bg-glass-${processDetails.color}.png`"
								alt="bg glass"
							/>
						</div>
						<div class="flex flex-col items-center justify-center z-[1] relative">
							<h1 class="font-bold text-[28px] text-blue-96">{{ processDetails.title }}</h1>
							<span class="font-bold text-[20px] text-blue-97">{{ processDetails.sideTitle }}</span>
							<p class="text-gray-55 text-[18px]">
								{{ processDetails.description }}
							</p>
						</div>
						<div class="z-[1] relative">
							<advocacy-text-the-title :title="name" />
							<advocacy-text-the-form-advocacy-text
								v-if="context"
								:details="transactionParameters"
								:content="context"
							/>
							<div v-else class="h-[100vh] w-full">
								<svg class="spinner" viewBox="0 0 50 50">
									<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="showError" class="h-[60vh] flex items-center justify-center text-red-4">
				{{ errorMessage }}
			</div>
		</div>
	</div>
	<Loading v-else />
</template>

<script>
import Loading from "~/components/loading"
export default {
	data() {
		return {
			processDetails: {},
			transactionParameters: {},
			modelSideTwo: null,
			allProcessDetails: null,
			context: "",
			showPage: true,
			showError: false,
			errorMessage: "",
			isLoading: true,
			name: "",
		}
	},
	provide() {
		return {
			resetTransaction: this.getTransactionParameters,
		}
	},
	components: {
		Loading,
	},
	layout: "process",
	methods: {
		back() {
			this.$router.push({
				name: `id-lawyer`,
				params: this.$route.params,
				query: this.$route.query,
			})
		},
		getDataStepProcess() {
			this.$callHandler({
				api: "process.getDataStepProcess",
			})
				.store(this.$route.query.id)
				.then(({ data }) => {
					this.name = data.data.name
					this.allProcessDetails = data.data.details
					this.modelSideTwo = data.data.attorneyFieldsType
					this.processDetails.name = data.data.name
					this.processDetails = data.data.details[3]
					this.context = data.data.textContext
					this.transactionParameters = { context: data.data.textContext, parameters: data.data.parameters }
					this.showPage = true
					this.showError = false
					// this.context = data.data.textContext
					this.isLoading = false
				})
				.catch(error => {
					this.showError = true
					this.showPage = true
					this.errorMessage = error
				})
		},
		getTransactionContext() {
			this.showPage = false
			this.$callHandler({
				api: "process.getDataStepProcess",
				hasKey: "getContext",
			})
				.store(this.$route.query.id)
				.then(({ data }) => {
					this.showPage = true
					this.showError = false
					this.context = data.data.textContext
					this.isLoading = false
				})
				.catch(e => {
					this.showPage = true
					this.showError = true
					this.$toast.error(e)
				})
		},
	},
	async created() {
		await this.getDataStepProcess()
		///await this.getTransactionParameters()
	},
}
</script>

<style lang="scss">
.spinner {
	animation: rotate 2s linear infinite;
	z-index: 2;
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -25px 0 0 -25px;
	width: 50px;
	height: 50px;

	& .path {
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}
</style>
