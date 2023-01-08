<template>
	<div v-if="showPage" class="flex flex-col items-center justify-start mb-16 bg-white relative">
		<div
			class="animate-box w-[90%] md:w-[80%] h-[70vh] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>

		<AppTheStepsProcess :processDetails="allProcessDetails" :modeSideTwo="modelSideTwo" />

		<div
			v-if="transactionData"
			class="shadow-[0_8px_3px] shadow-blue-43 rounded-[35px] mx-auto w-[85%] lg:w-[950px]"
		>
			<div class="w-full z-[5] relative">
				<div class="logo">
					<img
						loading="lazy"
						class="absolute top-[-60px] w-[115px] h-[115px] inset-x-0 mx-auto"
						src="/img/logo.svg"
						alt="logo"
					/>
				</div>
				<div class="rounded-[35px] shadow-admin overflow-hidden">
					<div class="flex">
						<span class="flex w-full bg-white"></span>
						<img loading="lazy" class="mx-auto w-[280px]" src="/img/bg/crew.png" alt="crew" />
						<span class="flex w-full bg-white"></span>
					</div>
					<div class="bg-white h-auto relative overflow-hidden">
						<div class="absolute bottom-0 opacity-70 left-0">
							<img loading="lazy" class="w-full" src="/img/bg-glass/bg-glass-gray.png" alt="bg glass" />
						</div>
						<div class="flex flex-col items-center justify-center z-[1] relative px-3">
							<h1 class="font-bold text-[28px] text-blue-96">
								{{ transactionData.details.title }}
							</h1>
							<span class="font-bold text-[20px] text-blue-97">{{
								transactionData.details.sideTitle
							}}</span>
							<p class="text-gray-55 text-[18px]">
								{{ transactionData.details.description }}
							</p>
						</div>
						<div class="px-6">
							<div class="custom-border-dashed bg-white rounded-[30px] relative z-[1] my-6 shadow-sm">
								<div class="flex">
									<div class="w-[23%] flex-shrink-0 hidden lg:block">
										<img loading="lazy" class="w-full" src="/img/bg/preview-logo.png" alt="logo" />
									</div>
									<ul
										class="bg-gradient-to-t from-blue-98 to-blue-99 lg:h-[70px] pe-5 flex flex-wrap items-center justify-between w-full"
									>
										<li class="flex items-center px-2 my-3 lg:my-0">
											<span class="flex pe-3 truncate">نوع المعاملة</span>
											<span class="flex bg-white-60 p-2 truncate rounded-[10px]">{{
												transactionData.transaction.transactionType
											}}</span>
										</li>
										<li class="flex items-center px-2 my-3 lg:my-0">
											<span class="flex pe-3 truncate">المحافظة</span>
											<span class="flex bg-white-60 p-2 truncate rounded-[10px]">{{
												transactionData.transaction.cityName
											}}</span>
										</li>
										<li class="flex items-center px-2 my-3 lg:my-0">
											<span class="flex pe-3 truncate">مكتب</span>
											<span class="flex bg-white-60 p-2 truncate rounded-[10px]">
												{{ transactionData.transaction.officeName }}</span
											>
										</li>
										<li class="flex items-center px-2 my-3 lg:my-0">
											<span class="flex pe-3 truncate">عدد النسخ</span>
											<span class="flex bg-white-60 p-2 truncate rounded-[10px]"
												>{{ transactionData.transaction.countPrint }} عدد</span
											>
										</li>
									</ul>
								</div>
								<div class="px-4 pt-4">
									<h3 class="text-[20px]">
										{{ transactionData.sides[0].name }}
									</h3>
									<p
										v-if="transactionData.transaction.text"
										class="text-black-2"
										v-html="transactionData.transaction.text.replace(/data\-title/g, 'value')"
									/>
								</div>
								<!--								sides one-->
								<preview-the-side-details
									:title="transactionData.transaction.clientTitle"
									:sides="sidesOne"
								/>
								<!--								sides two-->
								<preview-the-side-details
									:title="transactionData.transaction.attorneyTitle"
									:sides="sidesTwo"
								/>

								<!--								<div class="p-4" v-for="(side, index) in transactionData.sides">-->
								<!--									<div-->
								<!--										class="custom-border-dashed flex flex-wrap lg:flex-nowrap justify-center p-4 mt-3 relative !overflow-visible mb-6"-->
								<!--									>-->
								<!--										<span-->
								<!--											class="absolute custom-border-dashed p-4 !top-[-15px] !right-[50px] bg-white w-fit h-[30px] !overflow-visible flex items-center justify-center text-green-21"-->
								<!--										>-->
								<!--											{{ handleTitle(side, index) }}-->
								<!--										</span>-->
								<!--										<ul-->
								<!--											class="w-full overflow-hidden flex flex-col justify-between order-last lg:order-first pt-5"-->
								<!--										>-->
								<!--											<li-->
								<!--												class="flex flex-wrap"-->
								<!--												v-if="side.name || side.fatherName || side.grandFatherName"-->
								<!--											>-->
								<!--												<span class="text-black-2 text-[16px] font-bold pe-3"-->
								<!--													>الاسم الثلاثي</span-->
								<!--												>-->
								<!--												<p-->
								<!--													class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--												>-->
								<!--													{{ side.name + " " + side.fatherName + " " + side.grandFatherName }}-->
								<!--												</p>-->
								<!--											</li>-->
								<!--											<li-->
								<!--												class="flex flex-wrap"-->
								<!--												v-if="-->
								<!--													side.city &&-->
								<!--													side.street &&-->
								<!--													side.neighbourhood &&-->
								<!--													side.alley &&-->
								<!--													side.noNumber-->
								<!--												"-->
								<!--											>-->
								<!--												<span class="text-black-2 text-[16px] font-bold pe-3"-->
								<!--													>العنوان الدائم</span-->
								<!--												>-->
								<!--												<p-->
								<!--													class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--												>-->
								<!--													{{-->
								<!--														`${side.city}/${side.street}/${side.neighbourhood}/${side.alley}/${side.noNumber}`-->
								<!--													}}-->
								<!--												</p>-->
								<!--											</li>-->
								<!--											<li-->
								<!--												v-if="side.cardType && side[card[side.cardType - 1][0]]?.number !== 0"-->
								<!--												class="flex flex-wrap"-->
								<!--											>-->
								<!--												<span class="text-black-2 text-[16px] font-bold pe-3">{{-->
								<!--													card[side.cardType - 1][1]-->
								<!--												}}</span>-->
								<!--												<p-->
								<!--													class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--												>-->
								<!--													{{ side[card[side.cardType - 1][0]]?.number }}-->
								<!--													<span class="text-[16px] font-bold text-black-2">-->
								<!--														/ تاريخ الإصدار :-->
								<!--													</span>-->
								<!--													<span class="text-[24px] text-green-24 font-bold">{{-->
								<!--														side[card[side.residenceType - 1][0]].issuedDate?.slice(0, 10)-->
								<!--													}}</span>-->
								<!--													<span class="text-[16px] font-bold text-black-2">-->
								<!--														/ جهة الإصدار :-->
								<!--													</span>-->
								<!--													<span-->
								<!--														class="text-[24px] text-green-24 font-bold"-->
								<!--														v-text="side[card[side.residenceType - 1][0]].issuedBy"-->
								<!--													/>-->
								<!--												</p>-->
								<!--											</li>-->

								<!--											<li-->
								<!--												v-if="-->
								<!--													side.residenceType &&-->
								<!--													side[address[side.residenceType - 1][0]]?.number !== 0-->
								<!--												"-->
								<!--												class="flex flex-wrap"-->
								<!--											>-->
								<!--												<span class="text-black-2 text-[16px] font-bold pe-3">{{-->
								<!--													address[side.residenceType - 1][1]-->
								<!--												}}</span>-->
								<!--												<p-->
								<!--													class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--												>-->
								<!--													{{ side[address[side.residenceType - 1][0]]?.number }}-->
								<!--													<span class="text-[16px] font-bold text-black-2">-->
								<!--														/ تاريخ الإصدار :-->
								<!--													</span>-->
								<!--													<span class="text-[24px] text-green-24 font-bold">{{-->
								<!--														side[address[side.residenceType - 1][0]].issuedDate?.slice(-->
								<!--															0,-->
								<!--															10-->
								<!--														)-->
								<!--													}}</span>-->
								<!--													<span class="text-[16px] font-bold text-black-2">-->
								<!--														/ جهة الإصدار :-->
								<!--													</span>-->
								<!--													<span-->
								<!--														class="text-[24px] text-green-24 font-bold"-->
								<!--														v-text="side[address[side.residenceType - 1][0]].issuedBy"-->
								<!--													/>-->
								<!--												</p>-->
								<!--											</li>-->
								<!--										</ul>-->
								<!--										<div class="flex-shrink-0 text-center order-first lg:order-last">-->
								<!--											<template v-if="side.transactionSidePicture">-->
								<!--												<img-->
								<!--													loading="lazy"-->
								<!--													class="rounded-[20px] w-[150px] h-[150px]"-->
								<!--													:src="side.transactionSidePicture"-->
								<!--													alt="profile"-->
								<!--												/>-->
								<!--												<span class="text-[12px]">صورة {{ detectSide(side) }}</span>-->
								<!--											</template>-->
								<!--											<div v-else class="w-[150px]"></div>-->
								<!--										</div>-->
								<!--									</div>-->
								<!--									<template v-if="side.sideType == 1 && side.witnesses.length > 0">-->
								<!--										<div-->
								<!--											v-for="(witness, index) in side.witnesses"-->
								<!--											class="custom-border-dashed flex flex-wrap lg:flex-nowrap justify-center p-4 mt-3 relative !overflow-visible mb-6"-->
								<!--										>-->
								<!--											<span-->
								<!--												class="absolute custom-border-dashed p-4 !top-[-15px] !right-[50px] bg-white w-fit h-[30px] !overflow-visible flex items-center justify-center text-green-21"-->
								<!--											>-->
								<!--												{{ detectSide(witness) }} {{ convertNumbersToArabicWords(index) }}-->
								<!--											</span>-->
								<!--											<template>-->
								<!--												<ul-->
								<!--													class="w-full overflow-hidden flex flex-col justify-between order-last lg:order-first pt-5"-->
								<!--												>-->
								<!--													<li-->
								<!--														class="flex flex-wrap"-->
								<!--														v-if="-->
								<!--															witness.name ||-->
								<!--															witness.fatherName ||-->
								<!--															witness.grandFatherName-->
								<!--														"-->
								<!--													>-->
								<!--														<span class="text-black-2 text-[16px] font-bold pe-3"-->
								<!--															>الاسم الثلاثي</span-->
								<!--														>-->
								<!--														<p-->
								<!--															class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--														>-->
								<!--															{{-->
								<!--																witness.name +-->
								<!--																" " +-->
								<!--																witness.fatherName +-->
								<!--																" " +-->
								<!--																witness.grandFatherName-->
								<!--															}}-->
								<!--														</p>-->
								<!--													</li>-->
								<!--													<li-->
								<!--														class="flex flex-wrap"-->
								<!--														v-if="-->
								<!--															witness.city &&-->
								<!--															witness.street &&-->
								<!--															witness.neighbourhood &&-->
								<!--															witness.alley &&-->
								<!--															witness.noNumber-->
								<!--														"-->
								<!--													>-->
								<!--														<span class="text-black-2 text-[16px] font-bold pe-3"-->
								<!--															>العنوان الدائم</span-->
								<!--														>-->
								<!--														<p-->
								<!--															class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--														>-->
								<!--															{{-->
								<!--																`${witness.city}/${witness.street}/${witness.neighbourhood}/${witness.alley}/${witness.noNumber}`-->
								<!--															}}-->
								<!--														</p>-->
								<!--													</li>-->
								<!--													<li-->
								<!--														v-if="-->
								<!--															witness.cardType &&-->
								<!--															witness[card[witness.cardType - 1][0]]?.number !== 0-->
								<!--														"-->
								<!--														class="flex flex-wrap"-->
								<!--													>-->
								<!--														<span class="text-black-2 text-[16px] font-bold pe-3">{{-->
								<!--															card[witness.cardType - 1][1]-->
								<!--														}}</span>-->
								<!--														<p-->
								<!--															class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--														>-->
								<!--															{{ witness[card[witness.cardType - 1][0]]?.number }}-->
								<!--															<span class="text-[16px] font-bold text-black-2">-->
								<!--																/ تاريخ الإصدار :-->
								<!--															</span>-->
								<!--															<span class="text-[24px] text-green-24 font-bold">{{-->
								<!--																side[-->
								<!--																	card[witness.residenceType - 1][0]-->
								<!--																].issuedDate?.slice(0, 10)-->
								<!--															}}</span>-->
								<!--															<span class="text-[16px] font-bold text-black-2">-->
								<!--																/ جهة الإصدار :-->
								<!--															</span>-->
								<!--															<span-->
								<!--																class="text-[24px] text-green-24 font-bold"-->
								<!--																v-text="-->
								<!--																	witness[card[witness.residenceType - 1][0]].issuedBy-->
								<!--																"-->
								<!--															/>-->
								<!--														</p>-->
								<!--													</li>-->

								<!--													<li-->
								<!--														v-if="-->
								<!--															witness.residenceType &&-->
								<!--															witness[address[witness.residenceType - 1][0]]?.number !== 0-->
								<!--														"-->
								<!--														class="flex flex-wrap"-->
								<!--													>-->
								<!--														<span class="text-black-2 text-[16px] font-bold pe-3">{{-->
								<!--															address[witness.residenceType - 1][1]-->
								<!--														}}</span>-->
								<!--														<p-->
								<!--															class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto"-->
								<!--														>-->
								<!--															{{ witness[address[side.residenceType - 1][0]]?.number }}-->
								<!--															<span class="text-[16px] font-bold text-black-2">-->
								<!--																/ تاريخ الإصدار :-->
								<!--															</span>-->
								<!--															<span class="text-[24px] text-green-24 font-bold">{{-->
								<!--																witness[-->
								<!--																	address[witness.residenceType - 1][0]-->
								<!--																].issuedDate?.slice(0, 10)-->
								<!--															}}</span>-->
								<!--															<span class="text-[16px] font-bold text-black-2">-->
								<!--																/ جهة الإصدار :-->
								<!--															</span>-->
								<!--															<span-->
								<!--																class="text-[24px] text-green-24 font-bold"-->
								<!--																v-text="-->
								<!--																	witness[address[witness.residenceType - 1][0]]-->
								<!--																		.issuedBy-->
								<!--																"-->
								<!--															/>-->
								<!--														</p>-->
								<!--													</li>-->
								<!--												</ul>-->
								<!--												<div class="flex-shrink-0 text-center order-first lg:order-last">-->
								<!--													<template v-if="witness.transactionSidePicture">-->
								<!--														<img-->
								<!--															loading="lazy"-->
								<!--															class="rounded-[20px] w-[150px] h-[150px]"-->
								<!--															:src="witness.transactionSidePicture"-->
								<!--															alt="profile"-->
								<!--														/>-->
								<!--														<span class="text-[12px]">صورة {{ detectSide(witness) }}</span>-->
								<!--													</template>-->
								<!--													<div v-else class="w-[150px]"></div>-->
								<!--												</div>-->
								<!--											</template>-->
								<!--										</div>-->
								<!--									</template>-->
								<!--								</div>-->
								<!--							-->
							</div>
						</div>
						<div class="w-full sm:w-[60%] flex flex-wrap py-5 relative z-[1] mx-auto">
							<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
								<app-btn @click="back" color="gray" class="!px-4 !justify-between !w-full !border-0">
									<i
										class="icon-font-arrow-right !m-0 w-[32px] h-[32px] flex items-center justify-center bg-white !text-gray-12 rounded-[10px]"
									></i>
									<span class="!text-[18px] mx-auto">رجوع</span>
								</app-btn>
							</div>
							<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
								<app-btn
									@click="$router.push({ name: 'home' })"
									color="red"
									class="!px-4 !justify-between !w-full !border-0"
								>
									<span class="!text-[18px] mx-auto">الغاء</span>
									<i
										class="icon-font-close-square !m-0 w-[32px] h-[32px] flex items-center justify-center bg-white !text-red-11 rounded-[10px]"
									></i>
								</app-btn>
							</div>
							<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
								<app-btn
									@click="showDownloadModal"
									color="blue-bold"
									class="!px-4 !justify-between !w-full"
								>
									<span class="!text-[18px] mx-auto">التالي</span>
									<i
										class="icon-font-arrow-left !m-0 w-[32px] h-[32px] flex items-center justify-center bg-white !text-blue-3 rounded-[10px]"
									></i>
								</app-btn>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Loading v-else />
</template>

<script>
import Loading from "~/components/loading"
export default {
	layout: "process",
	data: () => ({
		transactionData: null,
		allProcessDetails: null,
		modelSideTwo: null,
		card: [
			["nationalCard", "البطاقة الموحدة"],
			["civilIdCard", "هوية الأحوال المدنية"],
			["electionCard", "بطاقة الناخب"],
			["foreignInformation", "جواز السفر"],
		],
		address: [
			["residenceCard", "بطاقة السكن"],
			["residenceConfirmation", "تأييد السكن"],
		],
		showPage: true,
		sidesTwo: [],
		sidesOne: [],
	}),
	computed: {
		processId() {
			return this.$route.query.id
		},
		transactionId() {
			return +this.$route.params.id
		},
		createAddress(data) {
			console.log("address:", data.city)
			if (data.city && data.street && data.neighbourhood && data.alley && data.noNumber) {
				return
			} else {
				return false
			}
		},
	},
	validate({ params, query }) {
		return !!+params.id && !!+query.id
	},
	components: {
		Loading,
	},
	async created() {
		this.showPage = false
		this.$callHandler({
			api: "process.getCurrentTransaction",
			hasKey: "getCurrentTransaction",
		})
			.store(this.transactionId)
			.then(({ data: { data } }) => {
				this.transactionData = data
			})
			.then(() => {
				this.getDataSides()
			})
			.then(() => {
				this.showPage = true
			})
		await this.getDataStepProcess()
	},
	methods: {
		handleTitle(side, index) {
			return side.sideType == 2
				? `${this.detectSide(side)}  ${this.convertNumbersToArabicWords(0)}`
				: `${this.detectSide(side)}  ${this.convertNumbersToArabicWords(index)}`
		},
		convertNumbersToArabicWords(number) {
			const array = [
				"الأول",
				"الثاني",
				"الثالث",
				"الرابع",
				"الخامس",
				"السادس",
				"السابع",
				"الثامن",
				"التاسع",
				"العاشر",
				"المُعلن",
			]
			return array[number]
		},
		back() {
			this.$router.push({
				name: `id-advocacy-text`,
				params: this.$route.params,
				query: this.$route.query,
			})
		},
		showDownloadModal() {
			this.$modal.visible("download", {
				data: {
					text: this.transactionData.transaction.trackingCode,
					options: {
						errorCorrectionLevel: "H",
						type: "image/jpeg",
						quality: 0.3,
						margin: 1,
						color: {
							dark: "#000000",
							light: "#ffffff",
						},
					},
				},
				callBack: data => {
					if (data === "print") {
						this.$router.push({
							name: `id-print-request`,
							params: this.$route.params,
							query: this.$route.query,
						})
					} else if (data === "download") {
						this.$router.push({
							name: `id-print-request`,
							params: this.$route.params,
							query: {
								id: this.$route.query,
								mode: "download",
							},
						})
					}
				},
			})
		},
		async getDataSides() {
			try {
				const { id } = this.$route.params

				const { data } = (await this.$api.process.getDataSide(id)).data
				let clients = []
				let attorney = []
				data.forEach(person => {
					if (person.sideType === 1) {
						clients.push(person)
						this.sidesTwo.push(person)
					} else {
						attorney.push(person)
						this.sidesOne.push(person)
					}
				})

				const persons = {
					nameClient: [],
					nameAttorney: [],
					addressClient: [],
					addressAttorney: [],
					office: [],
					cityClient: [],
					cityAttorney: [],
					clientCardIssuedDate: [],
					clientCardType: [],
					clientResidenceType: [],
					clientCardNumber: [],
					clientResidenceIssuedDate: [],
					clientResidenceIssuedBy: [],
					clientCardIssuedBy: [],
					clientResidenceNumber: [],
					attorneyCardIssuedDate: [],
					attorneyCardType: [],
					attorneyResidenceType: [],
					attorneyCardNumber: [],
					attorneyResidenceIssuedDate: [],
					attorneyResidenceIssuedBy: [],
					attorneyResidenceNumber: [],
					attorneyCardIssuedBy: [],
				}
				let cardType = [
					{
						id: 1,
						name: "nationalCard",
						title: "البطاقة الموحدة",
					},
					{
						id: 2,
						name: "civilIdCard",
						title: "هویة الأحوال المدنیة",
					},
					{
						id: 3,
						name: "electionCard",
						title: "بطاقة الناخب",
					},
					{
						id: 4,
						name: "foreignInformation",
						title: "جواز السفر",
					},
				]
				let documentHouse = [
					{
						id: 1,
						name: "residenceCard",
						title: "بطاقة السكن",
					},
					{
						id: 2,
						name: "residenceConfirmation",
						title: "تأييد السکن",
					},
				]

				//side One
				clients.forEach(person => {
					let card = cardType.find(card => {
						return card.id == person.cardType
					})
					let docHouse = documentHouse.find(doc => {
						return doc.id == person.residenceType
					})
					persons.nameClient.push(`${person.name} ${person.fatherName} ${person.grandFatherName}`)
					if (
						person.street !== null &&
						person.alley !== null &&
						person.neighbourhood !== null &&
						person.noNumber !== null
					) {
						persons.addressClient.push(
							`${person.street}/${person.neighbourhood}/${person.neighbourhood}/${person.noNumber}`
						)
					}
					persons.cityClient.push(person.city)
					persons.office.push(person.office)

					if (!person.relatedTo == 1) {
						persons.clientCardType.push(card.title)
						persons.clientResidenceType.push(docHouse.title)
						persons.clientCardIssuedDate.push(person[card.name].issuedDate)

						persons.clientCardNumber.push(person[card.name].number)
						persons.clientResidenceIssuedDate.push(person[docHouse.name].issuedDate)
						persons.clientResidenceIssuedBy.push(person[docHouse.name].issuedBy)
						persons.clientCardIssuedBy.push(person[card.name].issuedBy)
						persons.clientResidenceNumber.push(person[docHouse.name].number)
					}
				})
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientName}",
					` ( ${persons.nameClient.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientCardType}",
					` ( ${persons.clientCardType.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientResidenceType}",
					` ( ${persons.clientResidenceType.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientCardNumber}",
					` ( ${persons.clientCardNumber.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientCardIssuedDate}",
					` ( ${persons.clientCardIssuedDate.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientCardIssuedBy}",
					` ( ${persons.clientCardIssuedBy.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientCardIssuedBy}",
					` ( ${persons.clientCardIssuedBy.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientResidenceNumber}",
					` ( ${persons.clientResidenceNumber.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientResidenceIssuedDate}",
					` ( ${persons.clientResidenceIssuedDate.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientResidenceIssuedBy}",
					` ( ${persons.clientResidenceIssuedBy.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientAddress}",
					` ( ${persons.addressClient.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{ClientCity}",
					` ( ${persons.cityClient.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{Office}",
					` ( ${persons.office.join(" و ")} ) `
				)
				//side two
				attorney.forEach(person => {
					let card = cardType.find(card => {
						return card.id === person.cardType
					})
					let docHouse = documentHouse.find(doc => {
						return doc.id === person.residenceType
					})
					persons.nameAttorney.push(`${person.name} ${person.fatherName} ${person.grandFatherName}`)
					if (
						person.street !== null &&
						person.alley !== null &&
						person.neighbourhood !== null &&
						person.noNumber !== null
					) {
						persons.addressAttorney.push(
							`${person.street}/${person.neighbourhood}/${person.neighbourhood}/${person.noNumber}`
						)
					}
					persons.cityAttorney.push(person.city)
					persons.attorneyCardIssuedDate.push(person[card.name].issuedDate)
					persons.attorneyCardType.push(card.title)
					persons.attorneyResidenceType.push(docHouse.title)
					persons.attorneyCardNumber.push(person[card.name].number)
					persons.attorneyResidenceIssuedDate.push(person[docHouse.name].issuedDate)
					persons.attorneyResidenceIssuedBy.push(person[docHouse.name].issuedBy)
					persons.attorneyResidenceNumber.push(person[docHouse.name].number)
				})
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyName}",
					` ( ${persons.nameAttorney.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyCardType}",
					` ( ${persons.attorneyCardType.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyResidenceType}",
					` ( ${persons.attorneyResidenceType.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyCardNumber}",
					` ( ${persons.attorneyCardNumber.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyCardIssuedDate}",
					` ( ${persons.attorneyCardIssuedDate.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyCardIssuedby}",
					` ( ${persons.attorneyCardIssuedBy.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyResidenceNumber}",
					` ( ${persons.attorneyResidenceNumber.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyResidenceIssuedDate}",
					` ( ${persons.attorneyResidenceIssuedDate.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyResidenceIssuedBy}",
					` ( ${persons.attorneyResidenceIssuedBy.join(" و ")} ) `
				)
				if (persons.addressAttorney.length > 0) {
					this.context = this.context.replaceAll("{AttorneyAddress}", ` ( ${persons.addressAttorney[0]} ) `)
				} else {
					this.context = this.context.replaceAll("{AttorneyAddress}", ` ( ) `)
				}
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{AttorneyCity}",
					` ( ${persons.cityAttorney.join(" و ")} ) `
				)
				this.transactionData.transaction.text = this.transactionData.transaction.text.replaceAll(
					"{Office}",
					` ( ${persons.office.join(" و ")} ) `
				)
			} catch (e) {}
		},
		async getDataStepProcess() {
			this.$callHandler({
				api: "process.getDataStepProcess",
			})
				.store(this.$route.query.id)
				.then(({ data }) => {
					this.allProcessDetails = data.data.details
					this.modelSideTwo = data.data.attorneyFieldsType
				})
				.catch(error => {})
		},
		detectSide(side) {
			// if (side.sideType === 1 && side.witnessType == 0) {
			// 	return " الموکل"
			// }
			// if (side.sideType === 2 && side.witnessType == 0) {
			// 	return "الوکیل"
			// }
			if (side.witnessType === 1) {
				return "شاهد"
			}
			if (side.witnessType === 2) {
				return "المترجم"
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.select-type {
	@apply pt-4 grid gap-[10px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3;
	.item {
		@apply relative flex items-center justify-center border border-blue-4 rounded-[25px] h-[82px] overflow-hidden cursor-pointer hover:before:opacity-100 hover:text-white text-gray-56;
		@apply before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-l before:from-blue-18 before:to-blue-11 before:opacity-0 before:ease-in-out before:duration-300;
		&.active {
			@apply before:opacity-100 text-white;
		}

		.text {
			@apply relative z-[1] text-[16px];
		}
	}
}
</style>
