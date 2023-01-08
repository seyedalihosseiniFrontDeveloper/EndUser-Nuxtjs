<template>
	<div v-if="!$hasKey('DataStepProcess')" class="flex flex-col items-center justify-start mb-16 bg-white relative">
		<div
			class="animate-box w-[90%] md:w-[80%] h-[70vh] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>
		<app-the-steps-process :processDetails="allProcessDetails" :modeSideTwo="modelSideTwo" />
		<div class="w-[85%] md:w-[78%] mx-auto relative">
			<app-logo />
			<transition-group tag="div" name="fade" v-if="processDetails">
				<div
					:key="main"
					:class="`shadow-[0_8px_3px] shadow-${processDetails.color}-43 rounded-[35px] relative`"
				>
					<div class="relative z-[2]">
						<div class="absolute right-[-18px] z-[1] top-[-93px] transaction-model">
							<img :src="`/img/title-user/title-${processDetails.color}.png`" alt="" />
							<p
								:class="`absolute top-[47%] right-[26%] text-[24px] w-[280px] sm:w-[360px] truncate text-center text-${processDetails.color}`"
							>
								{{ nameProcess }}
							</p>
						</div>
					</div>
					<div
						class="rounded-[35px] shadow-[0_10px_0_0] relative mb-5"
						:class="`shadow-${processDetails.color}-43`"
					>
						<div class="relative">
							<div class="absolute inset-0 z-[1] flex justify-between items-start multi-bg">
								<img
									class="start-image rotate-[180deg]"
									v-if="processDetails.color != 'gray'"
									:src="`/img/bg-glass/bg-glass-${processDetails.color}.png`"
									alt="bg glass"
								/>
								<img
									class="start-image rotate-[180deg]"
									v-else
									:src="`/img/bg-glass/bg-glass-gray.png`"
									alt="bg glass"
								/>
								<img
									class="end-image"
									v-if="processDetails.color != 'gray'"
									:src="`/img/bg-glass/bg-glass-${processDetails.color}.png`"
									alt="bg glass"
								/>
								<img class="end-image" v-else :src="`/img/bg-glass/bg-glass-gray.png`" alt="bg glass" />
							</div>
						</div>

						<div class="flex rounded-t-[35px] overflow-hidden">
							<span class="flex w-full bg-white"></span>
							<img loading="lazy" class="mx-auto w-[280px]" src="/img/bg/crew.png" alt="crew" />
							<span class="flex w-full bg-white"></span>
						</div>
						<div class="bg-white h-auto relative overflow-hidden">
							<div class="absolute bottom-0 opacity-70 w-full flex justify-end">
								<img loading="lazy" src="/img/bg-glass/bg-glass-gray.png" alt="bg glass" />
							</div>
							<!--section Forms-->
						</div>
						<client-the-form
							:model-side-two="modelSideTwo"
							:isAddChild="isAddChild"
							:isAddNewPerson="isAddNewPerson"
							:process-details="processDetails"
						/>
					</div>
				</div>
			</transition-group>
		</div>
	</div>
	<Loading v-else />
</template>

<script>
import Loading from "~/components/loading"
export default {
	layout: "none",
	data() {
		return {
			allProcessDetails: null,
			processDetails: null,
			nameProcess: "",
			main: "main",
			modelSideTwo: null,
			isAddChild: true,
			isAddNewPerson: true,
		}
	},
	components: { Loading },
	methods: {
		async getDataStepProcess() {
			this.$callHandler({
				api: "process.getDataStepProcess",
				hasKey: "DataStepProcess",
			})
				.store(this.$route.query.id)
				.then(({ data }) => {
					this.allProcessDetails = data.data.details
					this.modelSideTwo = data.data.attorneyFieldsType
					this.isAddChild = data.data.clientHasChild
					this.isAddNewPerson = data.data.clientHasAddingSecondSide
					this.nameProcess = data.data.name
					this.processDetails = data.data.details[1]
				})
				.catch(error => {})
		},
	},
	async created() {
		await this.getDataStepProcess()
	},
	validate({ params, query }) {
		return !!+params.id && !!+query.id
	},
}
</script>
<style>
/*dont remove this classes*/
.text-blue,
.text-orange,
.text-pink,
.text-purple,
.text-green,
.text-yellow,
.text-gray {
	/*text-shadow: 10px 10px 10px 10px #000;*/
}
.text-blue {
	color: #34c6f7;
	text-shadow: rgb(6 75 86) 1px 1px 1px;
}
.text-orange {
	color: #cb914a;
	text-shadow: rgb(126 68 7) 1px 1px 1px;
}
.text-pink {
	color: #ff92b8;
	text-shadow: rgb(63 219 255) -1px 1px 1px;
}
.text-purple {
	color: #aeb7f9;
	text-shadow: rgb(77 78 77) 1px 1px 1px;
}
.text-green {
	color: #cb914a;
	text-shadow: rgb(126 68 7) 1px 1px 1px;
}
.text-yellow {
	color: #d1b138;
	text-shadow: rgb(147 113 18) 1px 1px 1px;
}
.text-gray {
	color: #b9b1b1;
	text-shadow: rgb(77 78 77) 1px 1px 1px;
}
</style>
