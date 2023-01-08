<template>
	<div>
		<!--			handle show side-->
		<div class="p-4" v-for="(side, index) in sides">
			<div
				class="custom-border-dashed flex flex-wrap lg:flex-nowrap justify-center p-4 mt-3 relative !overflow-visible mb-6"
			>
				<span
					class="absolute custom-border-dashed p-4 !top-[-15px] !right-[50px] bg-white w-fit h-[30px] !overflow-visible flex items-center justify-center text-green-21"
				>
					<!--					{{ title }} {{ convertNumbersToArabicWords(index) }}-->
				</span>
				<ul class="w-full overflow-hidden flex flex-col justify-between order-last lg:order-first pt-5">
					<li class="flex flex-wrap" v-if="side.name || side.fatherName || side.grandFatherName">
						<span class="text-black-2 text-[16px] font-bold pe-3">الاسم الثلاثي</span>
						<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
							{{ side.name + " " + side.fatherName + " " + side.grandFatherName }}
						</p>
					</li>
					<li
						class="flex flex-wrap"
						v-if="side.city && side.street && side.neighbourhood && side.alley && side.noNumber"
					>
						<span class="text-black-2 text-[16px] font-bold pe-3">العنوان الدائم</span>
						<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
							{{ `${side.city}/${side.street}/${side.neighbourhood}/${side.alley}/${side.noNumber}` }}
						</p>
					</li>
					<li v-if="side.cardType && side[card[side.cardType - 1][0]]?.number !== 0" class="flex flex-wrap">
						<span class="text-black-2 text-[16px] font-bold pe-3">{{ card[side.cardType - 1][1] }}</span>
						<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
							{{ side[card[side.cardType - 1][0]]?.number }}
							<span class="text-[16px] font-bold text-black-2"> / تاريخ الإصدار : </span>
							<span class="text-[24px] text-green-24 font-bold">{{
								side[card[side.residenceType - 1][0]].issuedDate?.slice(0, 10)
							}}</span>
							<span class="text-[16px] font-bold text-black-2"> / جهة الإصدار : </span>
							<span
								class="text-[24px] text-green-24 font-bold"
								v-text="side[card[side.residenceType - 1][0]].issuedBy"
							/>
						</p>
					</li>

					<li
						v-if="side.residenceType && side[address[side.residenceType - 1][0]]?.number !== 0"
						class="flex flex-wrap"
					>
						<span class="text-black-2 text-[16px] font-bold pe-3">{{
							address[side.residenceType - 1][1]
						}}</span>
						<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
							{{ side[address[side.residenceType - 1][0]]?.number }}
							<span class="text-[16px] font-bold text-black-2"> / تاريخ الإصدار : </span>
							<span class="text-[24px] text-green-24 font-bold">{{
								side[address[side.residenceType - 1][0]].issuedDate?.slice(0, 10)
							}}</span>
							<span class="text-[16px] font-bold text-black-2"> / جهة الإصدار : </span>
							<span
								class="text-[24px] text-green-24 font-bold"
								v-text="side[address[side.residenceType - 1][0]].issuedBy"
							/>
						</p>
					</li>
				</ul>
				<div class="flex-shrink-0 text-center order-first lg:order-last">
					<template v-if="side.transactionSidePicture">
						<img
							loading="lazy"
							class="rounded-[20px] w-[150px] h-[150px]"
							:src="side.transactionSidePicture"
							alt="profile"
						/>
						<!--						<span class="text-[12px]">صورة {{ title }}</span>-->
					</template>
					<div v-else class="w-[150px]"></div>
				</div>
			</div>

			<!--			handle show witness-->
			<template v-if="side.sideType == 1 && side.witnesses.length > 0">
				<div
					v-for="(witness, index) in side.witnesses"
					class="custom-border-dashed flex flex-wrap lg:flex-nowrap justify-center p-4 mt-3 relative !overflow-visible mb-6"
				>
					<span
						class="absolute custom-border-dashed p-4 !top-[-15px] !right-[50px] bg-white w-fit h-[30px] !overflow-visible flex items-center justify-center text-green-21"
					>
						{{ detectSide(witness) }} {{ convertNumbersToArabicWords(index) }}
					</span>
					<template>
						<ul class="w-full overflow-hidden flex flex-col justify-between order-last lg:order-first pt-5">
							<li
								class="flex flex-wrap"
								v-if="witness.name || witness.fatherName || witness.grandFatherName"
							>
								<span class="text-black-2 text-[16px] font-bold pe-3">الاسم الثلاثي</span>
								<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
									{{ witness.name + " " + witness.fatherName + " " + witness.grandFatherName }}
								</p>
							</li>
							<li
								class="flex flex-wrap"
								v-if="
									witness.city &&
									witness.street &&
									witness.neighbourhood &&
									witness.alley &&
									witness.noNumber
								"
							>
								<span class="text-black-2 text-[16px] font-bold pe-3">العنوان الدائم</span>
								<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
									{{
										`${witness.city}/${witness.street}/${witness.neighbourhood}/${witness.alley}/${witness.noNumber}`
									}}
								</p>
							</li>
							<li
								v-if="witness.cardType && witness[card[witness.cardType - 1][0]]?.number !== 0"
								class="flex flex-wrap"
							>
								<span class="text-black-2 text-[16px] font-bold pe-3">{{
									card[witness.cardType - 1][1]
								}}</span>
								<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
									{{ witness[card[witness.cardType - 1][0]]?.number }}
									<span class="text-[16px] font-bold text-black-2"> / تاريخ الإصدار : </span>
									<span class="text-[24px] text-green-24 font-bold">{{
										side[card[witness.residenceType - 1][0]].issuedDate?.slice(0, 10)
									}}</span>
									<span class="text-[16px] font-bold text-black-2"> / جهة الإصدار : </span>
									<span
										class="text-[24px] text-green-24 font-bold"
										v-text="witness[card[witness.residenceType - 1][0]].issuedBy"
									/>
								</p>
							</li>

							<li
								v-if="
									witness.residenceType &&
									witness[address[witness.residenceType - 1][0]]?.number !== 0
								"
								class="flex flex-wrap"
							>
								<span class="text-black-2 text-[16px] font-bold pe-3">{{
									address[witness.residenceType - 1][1]
								}}</span>
								<p class="sm:truncate text-black-2 text-[16px] w-full lg:w-[80%] lg:ms-auto">
									{{ witness[address[side.residenceType - 1][0]]?.number }}
									<span class="text-[16px] font-bold text-black-2"> / تاريخ الإصدار : </span>
									<span class="text-[24px] text-green-24 font-bold">{{
										witness[address[witness.residenceType - 1][0]].issuedDate?.slice(0, 10)
									}}</span>
									<span class="text-[16px] font-bold text-black-2"> / جهة الإصدار : </span>
									<span
										class="text-[24px] text-green-24 font-bold"
										v-text="witness[address[witness.residenceType - 1][0]].issuedBy"
									/>
								</p>
							</li>
						</ul>
						<div class="flex-shrink-0 text-center order-first lg:order-last">
							<template v-if="witness.transactionSidePicture">
								<img
									loading="lazy"
									class="rounded-[20px] w-[150px] h-[150px]"
									:src="witness.transactionSidePicture"
									alt="profile"
								/>
								<!--								<span class="text-[12px]">صورة {{ detectSide(witness) }}</span>-->
							</template>
							<div v-else class="w-[150px]"></div>
						</div>
					</template>
				</div>
			</template>
		</div>

	</div>
</template>
<script>
export default {
	props: ["sides", "title"],
	data() {
		return {
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
		}
	},
	methods: {
		detectSide(side) {
			if (side.witnessType === 1) {
				return "شاهد"
			}
			if (side.witnessType === 2) {
				return "المترجم"
			}
		},
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
				"الحادي عشر",
			]
			return array[number]
		},
	},
}
</script>
