<template>
	<app-form :on-submit="submitSendDocument" class="px-0 w-full lg:w-[900px] overflow-hidden pb-4">
		<div class="flex flex-col items-center mb-2">
			<h4 class="text-[30px] text-blue-2 mx-auto">المستمسکات المطلوبة</h4>
		</div>
		<div class="rounded-xl border-2 border-blue-3 p-5 border-dashed relative">
			<span
				class="static md:absolute text-blue-6 text-[16px] md:text-2xl -top-7 bg-white right-12 border-2 rounded-full border-blue-3 border-dashed py-2 px-4 w-full md:w-auto flex justify-center"
			>
				هوية أثبات الشخصية
			</span>
			<ul class="select-type !flex flex-wrap justify-center !pt-0 mt-5 mb-3">
				<li
					class="item !h-[55px] px-8 md:flex-1 w-full md:w-auto"
					v-for="tab in tabs"
					:key="tab.id"
					@click="!readonly && changeTap(tab)"
					:class="[{ active: tab.component === currentTabComponent.component }]"
				>
					<span class="z-[2] !text-white">{{ tab.label }}</span>
				</li>
			</ul>
			<component
				:is="currentTabComponent.component"
				@uploadImageCard="updateImageUserSelected"
				:readonly="readonly"
				:id="currentTabComponent.id"
				:data="currentTabComponent.data"
			></component>
		</div>
		<div class="rounded-xl border-2 border-blue-3 p-5 border-dashed relative mt-[45px]">
			<span
				class="static md:absolute text-blue-6 text-[16px] md:text-2xl -top-7 bg-white right-12 border-2 rounded-full border-blue-3 border-dashed py-2 px-4 w-full md:w-auto flex justify-center"
			>
				هوية أثبات السكن
			</span>

			<!--			<tabs class="select-type !flex flex-col flex-nowrap" classes="!w-[220px] !flex-none"> </tabs>-->
			<ul class="select-type !flex flex-wrap justify-center !pt-0 mt-5 mb-3">
				<li
					class="item !h-[55px] px-8 md:flex-1 w-full md:w-auto"
					v-for="tab in tabsAddress"
					:key="tab.id"
					@click="!readonly && changeTapAddress(tab)"
					:class="[{ active: tab.component === currentTabAddressComponent.component }]"
				>
					<span class="z-[2] !text-white">{{ tab.title }}</span>
				</li>
			</ul>
			<component
				:is="currentTabAddressComponent.component"
				@uploadImageCard="updateImageUserSelectedAddress"
				:id="currentTabAddressComponent.id"
				:data="currentTabAddressComponent.data"
				:readonly="readonly"
			/>
		</div>
		<div class="w-full md:w-[420px] flex mx-auto flex-wrap pt-5">
			<div class="w-full md:w-1/2 mb-10 md:mb-3 px-5">
				<app-btn @click.native="close" color="gray" class="!px-4 !justify-between !w-full !border-0">
					<i
						class="icon-font-arrow-right !m-0 w-[32px] h-[32px] flex items-center justify-center bg-white !text-gray-12 rounded-[10px]"
					></i>
					<span class="!text-[18px] mx-auto">إلغاء</span>
				</app-btn>
			</div>
			<div class="w-full md:w-1/2 mb-10 md:mb-3 px-5">
				<app-btn color="blue-bold" type="submit" class="!px-4 !justify-between !w-full">
					<span class="!text-[18px] mx-auto">موافق</span>
				</app-btn>
			</div>
		</div>
	</app-form>
</template>

<script>
import TabContent from "../components/helper/TabContent"
import CitizenCard from "~/components/helper/cardId/CitizenCard"
import CitizenPass from "~/components/helper/cardId/CitizenPass"
import ReferendumCard from "~/components/helper/cardId/ReferendumCard"
import Passport from "~/components/helper/cardId/Passport"
import ConfirmAddress from "@/components/helper/addressDocument/confirmAddress"
import HouseContract from "@/components/helper/addressDocument/houseContract"

export default {
	components: {
		TabContent,
		CitizenCard,
		CitizenPass,
		ReferendumCard,
		Passport,
		ConfirmAddress,
		HouseContract,
	},
	props: ["name", "data"],
	data() {
		return {
			readonly: false,
			isActive: false,
			cardType: null,
			currentTabComponent: "CitizenCard",
			tabs: [
				{
					label: "البطاقة الموحدة",
					key: "nationalCard",
					component: "CitizenCard",
					id: 1,
					data: {
						number: "",
						issuedDate: "",
						issuedBy: "",
						firstImage: "",
						secondImage: "",
					},
				},
				{
					label: "هویة الأحوال المدنیة",
					key: "civilIdCard",
					data: {
						number: "",
						issuedBy: "",
						issuedDate: "",
						folderNumber: "",
						pageNumber: "",
						firstImage: "",
						secondImage: "",
					},
					component: "CitizenPass",
					id: 2,
				},
				{
					label: "بطاقة الناخب",
					component: "ReferendumCard",
					key: "electionCard",
					id: 3,
					data: {
						number: "",
						issuedDate: "",
						issuedBy: "",
						firstImage: "",
						secondImage: "",
					},
				},
				{
					label: "جواز السفر",
					component: "Passport",
					key: "foreignInformation",
					data: {
						number: "",
						issuedDate: "",
						issuedBy: "",
						firstImage: "",
						secondImage: "",
					},
					id: 4,
				},
			],
			tabsAddress: [
				{
					id: 1,
					title: "بطاقة السكن",
					component: "HouseContract",
					key: "residenceCard",
					data: {
						number: "",
						issuedDate: "",
						issuedBy: "",
						firstImage: "",
						secondImage: "",
					},
				},
				{
					id: 2,
					title: "تأييد السکن",
					component: "ConfirmAddress",
					key: "residenceConfirmation",
					data: {
						number: "",
						issuedDate: "",
						issuedBy: "",
						firstImage: "",
						secondImage: "",
					},
				},
			],
			currentTabAddressComponent: "",
		}
	},
	methods: {
		tabContentChange() {
			this.isActive = true
		},
		changeCardType(id) {
			this.cardType = id
		},
		changeTap(component) {
			this.currentTabComponent = component
		},
		changeTapAddress(component) {
			this.currentTabAddressComponent = component
		},
		updateImageUserSelected(id, direction, file) {
			this.currentTabComponent.data[direction] = file
			this.tabs = this.tabs.map(tab => {
				if (tab.id === id) {
					tab.data[direction] = file
				}
				return tab
			})
		},
		updateImageUserSelectedAddress(id, direction, file) {
			// this.currentTabAddressComponent.data[direction] = file
			this.tabsAddress = this.tabsAddress.map(tab => {
				if (tab.id === id) {
					tab.data[direction] = file
				}
				return tab
			})
		},
		submitSendDocument() {
			let userData
			let dataCard
			let addressData
			dataCard = this.tabs.filter(tab => {
				return tab.id === this.currentTabComponent.id
			})
			addressData = this.tabsAddress.filter(tab => {
				return tab.id === this.currentTabAddressComponent.id
			})

			userData = {
				card: dataCard[0],
				addressInfo: addressData[0],
				indexWitness: this.data.indexWitness,
			}
			if (
				this.currentTabComponent.data.firstImage &&
				this.currentTabComponent.data.secondImage &&
				this.currentTabAddressComponent.data.firstImage &&
				this.currentTabAddressComponent.data.secondImage
			) {
				this.$modal.close(this.name, userData)
			}
		},
		close() {
			this.$modal.close(this.name, "close")
		},
	},
	created() {
		if (this.data.card.id) {
			this.tabs = this.tabs.filter(tab => {
				if (tab.id === this.data.card.id) {
					tab.data = { ...this.data.card.data }
				}
				return tab
			})
		}
		if (this.data.addressInfo.id) {
			this.tabsAddress = this.tabsAddress.filter(tab => {
				if (tab.id === this.data.addressInfo.id) {
					tab.data = { ...this.data.addressInfo.data }
				}
				return tab
			})
		}
		if (this.data.hasOwnProperty("readonly")) this.readonly = this.data.readonly
		let activeTabIndex, activeTabAddressIndex
		if (this.data) {
			activeTabIndex = this.tabs.findIndex(tab => {
				if (tab.id === this.data.card.id) {
					return tab
				}
			})
			activeTabAddressIndex = this.tabs.findIndex(tab => {
				if (tab.id === this.data.addressInfo.id) {
					return tab
				}
			})
		}
		if (this.tabsAddress[activeTabAddressIndex]) {
			this.changeTapAddress(this.tabsAddress[activeTabAddressIndex])
		} else {
			this.changeTapAddress(this.tabsAddress[0])
		}

		if (this.tabs[activeTabIndex]) {
			this.changeTap(this.tabs[activeTabIndex])
		} else {
			this.changeTap(this.tabs[0])
		}
	},
}
</script>
<style scoped lang="scss">
.item {
	background: linear-gradient(
		50deg,
		theme("colors.gray-61") 0%,
		theme("colors.gray-62") 25%,
		theme("colors.gray-63") 50%,
		theme("colors.gray-64") 75%,
		theme("colors.gray-65") 100%
	);

	&:hover,
	&.active {
		background: transparent;
	}

	.text {
		@apply text-white;
	}
}
</style>
