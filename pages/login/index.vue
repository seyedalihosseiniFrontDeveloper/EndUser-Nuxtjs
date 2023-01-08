<template>
	<div class="h-screen flex flex-col xl:flex-row items-center justify-center overflow-auto bg-white relative">
		<div
			class="animate-box w-[90%] md:w-[80%] h-[70vh] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>
		<div class="w-[85%] md:w-[772px] mx-auto z-[5] relative mb-[100px] pt-[300px] md:pt-0">
			<div class="logo">
				<img
					alt="logo"
					class="relative top-[60px] w-[115px] h-[115px] inset-x-0 mx-auto"
					loading="lazy"
					src="/img/logo.svg"
				/>
			</div>
			<div class="rounded-[35px] shadow-admin overflow-hidden">
				<div class="flex">
					<span class="flex w-full bg-white"></span>
					<img alt="crew" class="mx-auto w-[280px]" loading="lazy" src="/img/bg/crew.png" />
					<span class="flex w-full bg-white"></span>
				</div>
				<div class="bg-white bg-[url('/img/bg-glass/bg-glass.png')] h-auto bg-bottom bg-no-repeat">
					<div class="flex flex-col items-center justify-center">
						<h1 class="font-bold text-[28px] text-blue-96">إصدار وكالة جديدة</h1>
						<!--            <span class="font-bold text-[20px] text-blue-97">رقم الهاتف</span>-->
						<p class="text-[20px] text-gray-55 w-[80%] mt-4">
							إدخل رقم هاتفك الشخصي لتصلك رسالة تحتوي رمز التفعيل , كما ننوه على أن رقمك هاتفك هذا سيثبت
							للوكالة عند الإصدار..
						</p>
					</div>
					<app-form
						:on-submit="sendCode"
						classes="w-full px-5 flex flex-col items-center justify-center pb-6"
					>
						<div class="mt-5 mx-0">
							<!--							tools="integer|max:10"-->

							<AppBaseInput
								:key="key"
								v-model="numberUser"
								v-maska="'###-###-###'"
								:disabled="isDisable"
								:errorBoxIsVisible="false"
								classes="disable-edit-area !rounded-[48px] text-blue-7 relative pl-[80px] !w-full xs:!w-[300px] mx-auto text-[24px] font-sans mb-8"
								dir="ltr"
								label=""
								name="numberUser"
								placeholder="-xxx-xxx-xxx"
								rules="required|min:1"
							>
								<template #icon>
									<!--									<i-->
									<!--										class="icon-font-edit text-white text-[18px] w-[26px] h-[26px] rounded-[8px] flex items-center justify-center multi-gradient-gold ms-2"-->
									<!--									></i>-->
									<div
										:class="isDisable ? 'bg-transparent' : 'bg-white'"
										class="absolute left-4 inset-y-2 m-auto flex items-center ps-1"
									>
										<span class="text-blue-7 text-[22px] font-bold mx-2 font-sans">07</span>
										<img
											alt="iraq-flag"
											class="w-[35px]"
											loading="lazy"
											src="/img/flags/iraq-flag.svg"
										/>
									</div>
								</template>
							</AppBaseInput>
						</div>
						<div v-show="isShowOtpInput" class="mt-5 mx-0 w-full lg:w-auto">
							<div
								class="flex items-center justify-center rounded-[48px] !w-full xs:!w-[300px] mx-auto border border-gray-14 overflow-hidden h-[60px] bg-white focus-within:shadow-[0_0_40px_-15px_rgba(91,204,255,0.7)] focus-within:border-blue-44 transition-all"
							>
								<otp-input
									ref="otpInput"
									:is-input-num="true"
									:num-inputs="4"
									:should-auto-focus="true"
									input-classes="otp-input"
									separator="-"
									style="direction: ltr"
									@on-complete="handleOnComplete"
								/>
							</div>
						</div>
						<div v-show="isShowOtpInput" class="w-[60%] mt-5 flex items-center justify-center">
							<span class="text-gray-58-60 text-[26px]" style="direction: ltr !important">{{
								showTime
							}}</span>
						</div>
						<div
							v-if="isShowOtpInput"
							class="w-[100%] mt-8 flex align-center justify-center gap-8 flex-col lg:flex-row"
						>
							<app-btn class="!px-7 !justify-between" color="gray" @click="$router.push('/home')">
								<i
									class="icon-font-arrow-right !m-0 w-[32px] h-[32px] flex items-center justify-center bg-white !text-gray-35 rounded-[10px]"
								></i>
								<span class="!text-[18px] mx-auto">رجوع</span>
							</app-btn>
							<app-btn
								v-show="isShowResendCode"
								class="!px-7 !justify-between"
								color="gray"
								@click.native="resendActiveCode"
							>
								<span class="!text-[18px] mx-auto"> إعادة إرسال </span>
							</app-btn>
							<app-btn class="!px-7 !justify-between" color="gray" @click="editNumber">
								<span class="!text-[16px] mx-auto">تغیر رقم الهاتف</span>
							</app-btn>
							<app-btn
								id="submitCodeButton"
								:is_loading="isLoadingNextPage"
								class="!px-7 !gap-3 !justify-between 2xl:!w-36"
								color="blue-bold"
								@click="login"
							>
								<span class="!text-[18px] mx-auto">موافق</span>
								<i
									class="icon-font-arrow-left !m-0 w-[26px] h-[26px] flex items-center justify-center bg-white !text-blue-3 rounded-[7px]"
								></i>
							</app-btn>
						</div>

						<app-btn
							v-else
							:isLoading="isLoadingSendCode"
							:is_loading="$hasKey('otp')"
							class="!px-4 !justify-between transition-all duration-75 ease-out w-[200px]"
							color="blue-bold"
							type="submit"
						>
							<span ref="submitButton" class="!text-[18px] mx-auto pl-2"> إرسال رمز التفعيل</span>
							<i
								class="icon-font-arrow-left !m-0 w-[32px] h-[32px] flex items-center justify-center bg-white !text-blue-3 rounded-[10px]"
							></i>
						</app-btn>
					</app-form>
				</div>
			</div>
		</div>

		<div
			class="animate-box w-[90%] md:w-[80%] mx-auto rounded-t-[80px] md:rounded-t-[150px] bottom-0 relative md:absolute inset-x-0 bg-gradient-to-t from-blue-4-77 to-blue-4-12 ease-in-out duration-300 z-[2]"
		>
			<div class="mt-10 md:mt-20 py-6 px-5 mx-10 md:mx-20"></div>
		</div>
	</div>
</template>

<script>
import { maska } from "maska"
import OtpInput from "@bachdgvn/vue-otp-input"

export default {
	layout: "none",

	components: {
		OtpInput,
	},
	directives: { maska },

	data() {
		return {
			numberUser: null,
			isShowOtpInput: false,
			activeCode: null,
			enterCode: "",
			isShowResendCode: false,
			time: 120,
			userCode: null,
			editedNumber: "",
			timer: null,
			isDisable: false,
			cols: 3,
			isLoadingNextPage: false,
			isLoadingSendCode: false,
			key: 1,
		}
	},
	created() {
		this.$auth.reset()
	},
	computed: {
		showTime() {
			if (this.time === 0) {
				this.cols += 1
				this.isShowResendCode = true
			}
			let min = Math.floor(this.time / 60)
			let second = this.time - min * 60
			return min + " : " + (second > 9 ? second : "0" + second)
		},
	},
	methods: {
		sendCode() {
			this.key += 1
			let number = this.numberUser.split("-")
			this.editedNumber = `${number[0]}${number[1]}${number[2]}`
			this.isLoadingSendCode = true
			this.isDisable = true
			this.isShowOtpInput = true
			this.startTimer()
			this.isLoadingSendCode = false
			// this.$callHandler({
			// 	api: "auth.loginWithActivationCode",
			// 	hasKey: "otp",
			// })
			// 	.store({ userName: this.editedNumber })
			// 	.then(({ data }) => {
			// 		console.log(data.data.activationCode, "active Code:")
			// 		this.isDisable = true
			// 		this.isShowOtpInput = true
			// 		this.startTimer()
			// 		this.activeCode = data.data.activationCode
			// 		this.isLoadingSendCode = false
			// 	})
			// 	.catch(e => {
			// 		this.$toast.error(e.message)
			// 	})
      let otp=document.getElementsByClassName('otp-input')
      if(otp && otp.length){
          setTimeout(()=>otp[0].focus(),300)


      }

		},

		async login() {
			this.isLoadingNextPage = true
			this.$callHandler({
				api: "auth.login",
				hasKey: "login",
			})
				.store({
					userName: this.editedNumber,
					password: this.enterCode,
					activationCode: "",
				})
				.then(({ data }) => {
					this.$auth.setUserToken(data.data.accessToken).then(() => {
						this.$router.push("/type")
						this.isLoadingNextPage = false
					})
				})
				.catch(e => {
					this.isLoadingNextPage = false
					this.$toast.error(e.message)
				})
		},
		resetTimer() {
			this.time = 120
			clearInterval(this.timer)
		},
		startTimer() {
			this.timer = setInterval(() => {
				if (this.time > 0) this.time -= 1
			}, 1000)
		},
		resendActiveCode() {
			this.$refs.otpInput.clearInput()
			this.enterCode = null
			this.isShowResendCode = false
			this.cols -= 1
			this.resetTimer()
			this.sendCode()
		},
		editNumber() {
			this.enterCode = ""
			this.$refs.otpInput.clearInput()
			this.isDisable = false
			this.isShowResendCode = false
			this.isShowOtpInput = false
			this.resetTimer()
		},
		handleOnComplete(value) {
			this.enterCode = value
      this.login()
		},
	},
	destroyed() {
		this.resetTimer()
	},
}
</script>

<style lang="scss">
.otp-input {
	direction: ltr;
	width: 80px;
	height: 40px;
	padding: 5px;
	margin: 0;
	font-size: 20px;
	border-radius: 4px;
	border: 1px solid transparent;
	text-align: center;

	&.error {
		border: 1px solid red !important;
	}
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

@media screen and (max-width: 480px) {
	.otp-input {
		width: 55px !important;
	}
}

.grid-cols-3 {
	grid-template-columns: repeat(3, 1fr);
}

.Vue-Toastification__toast--error {
	background: #e66060 !important;
}

.disable-edit-area label::before {
	display: none !important;
}
</style>
