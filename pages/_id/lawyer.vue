<template>
	<div v-if="showPage" class="flex flex-col items-center justify-start mb-16 bg-white relative min-h-[100vh]">
		<div
			class="animate-box w-[90%] md:w-[80%] h-[70vh] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>
		<AppTheStepsProcess :processDetails="processDetails" :modeSideTwo="modelSideTwo" />
		<div v-if="processDetails" class="w-[85%] md:w-[78%] mx-auto z-[5] relative">
			<app-logo />
			<div :class="['shadow-[0_8px_3px] rounded-[35px] ', `shadow-${processDetails[2].color}-43`]">
				<div class="relative z-[2]" v-if="!relatedToMachine">
					<div class="absolute right-[-18px] z-[1] top-[-93px] transaction-model">
						<img :src="`/img/title-user/title-${processDetails[2].color}.png`" alt="" />
						<span
							:class="`text-${processDetails[2].color}`"
							class="absolute top-[47%] right-[26%] text-[24px] w-[280px] sm:w-[360px] truncate text-center"
							v-html="nameProcess"
						>
						</span>
					</div>
				</div>
				<div
					:class="[
						'rounded-[35px] shadow-[0_10px_0_0] overflow-hidden relative',
						`shadow-${processDetails[2].color}-43`,
					]"
					class=""
				>
					<div class="relative">
						<div class="absolute inset-0 z-[1] flex justify-between items-start multi-bg">
							<img
								v-if="processDetails[2].color != 'gray'"
								:src="`/img/bg-glass/bg-glass-${processDetails[2].color}.png`"
								alt="bg glass"
								class="start-image rotate-[180deg]"
							/><img
								v-else
								:src="`/img/bg-glass/bg-glass-gray.png`"
								alt="bg glass"
								class="start-image rotate-[180deg]"
							/>
							<img
								v-if="processDetails[2].color != 'gray'"
								:src="`/img/bg-glass/bg-glass-${processDetails[2].color}.png`"
								alt="bg glass"
								class="end-image"
							/><img v-else :src="`/img/bg-glass/bg-glass-gray.png`" alt="bg glass" class="end-image" />
						</div>
					</div>

					<div class="flex">
						<span class="flex w-full bg-white"></span>
						<img alt="crew" class="mx-auto w-[280px]" loading="lazy" src="/img/bg/crew.png" />
						<span class="flex w-full bg-white"></span>
					</div>
					<div class="bg-white h-auto relative overflow-hidden">
						<div class="absolute bottom-0 opacity-70 w-full flex justify-end">
							<img :src="`/img/bg-glass/bg-glass-${processDetails[2].color}.png`" alt="bg glass" />
						</div>

						<template v-if="forms.length > 0">
							<template v-for="(form, index) in forms">
								<app-form
									:key="form?.sideId ? form?.sideId : 'forms-' + index"
									:custom-validate="payload => customValidate(index, payload)"
									:on-submit="() => submitAddSide(index)"
								>
									<template v-if="form">
										<div class="flex flex-col items-center justify-center z-[2] relative">
											<template v-if="index === 0">
												<h1
													class="font-bold text-[28px] text-blue-96 mb-3"
													v-text="processDetails[2].title"
												/>
												<span
													class="font-bold text-[20px] text-blue-97 mb-2"
													v-text="'معلومات ' + processDetails[2].sideTitle"
												/>
												<p
													class="text-[18px] text-gray-55 2xl:w-[40%] text-center mx-auto pr-[70px] xl:pr-0"
													v-text="processDetails[2].description"
												/>
											</template>
											<TheImageUploader
												v-if="index === 0 && !relatedToMachine"
												:form="form"
												:index="index"
												:preview-src="previewSrc"
												:show-upload-face-image-modal="showUploadFaceImageModal"
											/>
										</div>
										<div
											:class="{
												'gap-4 px-4 mx-6 md:px-6 custom-border-dashed bg-gray-57 py-6 mt-16 overflow-visible ':
													index > 0,
											}"
											:style="index > 0 ? 'overflow: visible !important;' : ''"
										>
											<div
												:class="{ 'mt-10': index === 0 }"
												class="px-10 flex justify-center flex-col z-[1] relative"
											>
												<div class="flex">
													<span
														v-if="!relatedToMachine"
														class="mx-auto text-gray-56 text-center text-[20px]"
														>تفاصيل {{ processDetails[2].sideTitle }}
														{{ convertNumbersToArabicWords(index) }}</span
													>
													<template v-if="!form.readonly">
														<div
															v-if="forms.length > 1 || form.sideId"
															:class="relatedToMachine ? 'mr-auto' : ''"
															class="w-[24px] h-[24px] flex items-center justify-center rounded-[10px] bg-red-12 text-white cursor-pointer z-[2] hover:scale-110 hover:bg-red-9 ease-in-out duration-300"
														>
															<i
																class="icon-font-trash-square text-[18px]"
																@click="deleteInForm(index)"
															></i>
														</div>
													</template>
												</div>
												<template>
													<TheImageUploader
														v-if="index > 0"
														:form="form"
														:index="index"
														:preview-src="previewSrc"
														:is-normal="checkIsNormal"
														:show-upload-face-image-modal="showUploadFaceImageModal"
													/>

													<div
														v-if="isRelatedTo"
														class="flex justify-center items-center flex-col xs:flex-row mt-3"
													>
														<app-radio
															:checked="form.relatedTo === 1 ? 'checked' : ''"
															:disabled="form.readonly"
															:errorBoxIsVisible="false"
															:value="1"
															class="text-blue-4 !w-auto px-5"
															label="شخصی"
															name="relatedTo"
															rules="required"
															@change="form.relatedTo = 1"
														>
														</app-radio>
														<app-radio
															:checked="form.relatedTo === 2 ? 'checked' : ''"
															:disabled="form.readonly"
															:errorBoxIsVisible="false"
															:value="2"
															class="text-blue-4 !w-auto px-5"
															label="المؤسسات"
															name="relatedTo"
															rules="required"
															@change="form.relatedTo = 2"
														>
														</app-radio>
													</div>
												</template>
											</div>
											<template v-if="relatedToMachine"
												><lawyer-the-car-form
													:index="index"
													:cites="cites"
													:form="forms[0]"
													:key="key"
													@uploadImagesCar="uploadImagesCar"
												/>
											</template>
											<template v-if="!relatedToMachine">
												<div :class="!isRelatedTo ? 'mt-5' : ''">
													<ThePersonal
														:cites="cites"
														:date-max="dateMax"
														:date-min="dateMin"
														:form="form"
														:gender-types="genderTypes"
														:index="index"
														:is-normal="checkIsNormal"
														:show-upload-modal="showUploadModal"
													/>
													<TheInstitute
														:cites="cites"
														:date-max="dateMax"
														:date-min="dateMin"
														:form="form"
														:gender-types="genderTypes"
														:index="index"
														:is-normal="checkIsNormal"
														:show-upload-modal="showUploadModal"
													/>
												</div>
											</template>
											<div
												v-if="!relatedToMachine"
												class="w-full lg:w-[60%] flex flex-wrap justify-center py-5 relative z-[1] mx-auto"
											>
												<template v-if="!form.readonly && form.editForm">
													<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
														<app-btn
															:is_loading="form.loadingSaveEdit"
															class="!px-4 !justify-between !w-full !border-0"
															color="blue"
															@click.native="saveEditedForm(index)"
														>
															<span class="!text-[18px] mx-auto">حفظ</span>
														</app-btn>
													</div>
													<div class="w-full md:w-[33%] mb-10 md:mb-3 px-5">
														<app-btn
															:is_loading="form.loadingSaveEdit"
															class="!px-4 !justify-between !w-full !border-0"
															color="red"
															@click.native="editableForm(false, index)"
														>
															<span class="!text-[18px] mx-auto">إلغاء</span>
														</app-btn>
													</div>
												</template>
												<div
													v-if="form.readonly && !form.editForm"
													class="w-full md:w-[33%] mb-10 md:mb-3 px-5"
												>
													<app-btn
														:disabled="
															form?.loadingSaveAndAddNew ||
															form?.loadingSaveLastAndGoToNextPage
														"
														class="!px-4 !justify-between !w-full"
														color="blue-bold"
														@click="editableForm(true, index)"
													>
														<span class="!text-[18px] mx-auto">تعديل</span>
													</app-btn>
												</div>
											</div>
											<template v-if="forms.length === 1">
												<TheAddForm
													v-if="isAddNewSide"
													:addToForm="relatedToMachine ? addCar : addToForm"
													:disabled="disabledPrevAndNext"
													:index="index"
													:loading-add-form="form?.loadingSaveAndAddNew"
													:relatedToMachine="relatedToMachine"
												/>
												<AppTheNavigateButtons
													v-if="!hiddenNavigate"
													:disabled="disabledPrevAndNext"
													:go-to-back="goToPrevPage"
													:go-to-next="() => saveAndGotToNextRoute(index)"
													:loading-next="form.loadingSaveLastAndGoToNextPage"
												/>
											</template>
										</div>

										<button :ref="`addSide-${index}`" class="d-none" type="submit" />
									</template>
								</app-form>

								<template v-if="forms.length > 1 && index === forms.length - 1">
									<TheAddForm
										v-if="isAddNewSide"
										:addToForm="addToForm"
										:disabled="disabledPrevAndNext"
										:index="index"
										:loading-add-form="form?.loadingSaveAndAddNew"
									/>

									<AppTheNavigateButtons
										v-if="!hiddenNavigate"
										:disabled="disabledPrevAndNext"
										:disabled-back="disabledPrevAndNext"
										:disabled-next="disabledPrevAndNext"
										:go-to-back="goToPrevPage"
										:go-to-next="() => saveAndGotToNextRoute(index)"
										:loading-next="form?.loadingSaveLastAndGoToNextPage"
									/>
								</template>
							</template>
						</template>

						<div v-else class="h-[100vh] w-full">
							<!--		<Loading />-->
							<svg class="spinner" viewBox="0 0 50 50">
								<circle class="path" cx="25" cy="25" fill="none" r="20" stroke-width="5"></circle>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Loading v-else />
</template>

<script>
import TheAddForm from "@/components/lawyer/TheAddForm"
import TheUploadModal from "@/components/lawyer/TheUploadModal"
import ThePersonal from "@/components/lawyer/ThePersonal"
import TheInstitute from "@/components/lawyer/TheInstitute"
import TheImageUploader from "@/components/lawyer/TheImageUploader"
import Loading from "~/components/loading"

export default {
	layout: "process",
	components: {
		TheAddForm,
		TheUploadModal,
		ThePersonal,
		TheInstitute,
		TheImageUploader,
		Loading,
	},
	validate({ params, query }) {
		return !!+params.id && !!+query.id
	},
	data: () => ({
		dateMin: "1910/01/01",
		dateMax: "",
		key: 1,
		genderTypes: [
			{ id: 1, name: "ذکر" },
			{ id: 2, name: "أثني" },
		],
		cites: [],
		isHealthy: [
			{
				id: 1,
				label: "سالم",
			},
			{
				id: 2,
				label: "تتعذر البصمة",
			},
			{
				id: 3,
				label: "أصم أو أبكم",
			},
		],
		nameProcess: null,
		selectedGender: [],
		selectedCities: [],
		processDetails: null,
		sampleLawyer: {},
		forms: [],
		hiddenNavigate: false,
		showPage: true,
		modelSideTwo: null,
		relatedToMachine: null,
		checkIsNormal: null,
		isAddNewSide: true,
		isRelatedTo: true,
		mode: null,
		indexCar: 0,
	}),
	provide() {
		return {
			isHealthy: this.isHealthy,
			deleteInFormCarDetail: this.deleteInFormCarDetail,
		}
	},
	watch: {
		selectedGender() {
			this.selectedGender.map((v, i) => {
				console.log(v, i)
			})
			this.forms[this.forms.length - 1].genderType = this.selectedGender[this.forms.length - 1].id
		},
		selectedCities() {
			this.forms[this.forms.length - 1].cityId = this.selectedCities[this.forms.length - 1].id
		},
	},
	computed: {
		disabledPrevAndNext() {
			return !this.forms.filter(
				item => !item.loadingSaveEdit && !item.loadingSaveAndAddNew && !item.loadingSaveLastAndGoToNextPage
			).length
		},
		processId() {
			return this.$route.query.id
		},
		transactionId() {
			return +this.$route.params.id
		},
	},
	async created() {
		await this.getDataStepProcess()
		let now = new Date(this.$moment())

		this.dateMax = `${now.getFullYear() - 18}/${now.getMonth()}/${now.getDate()}`
		await this.getAllCity()
	},
	methods: {
		sampleFormCustom: () => ({
			readonly: false,
			editForm: false,
			saveType: 0, // 0-none 1-saveAndAddForm 2-saveAndGoToNextPage 3-edit
			uploadModalValidate: null,
			loadingSaveEdit: false,
			loadingSaveAndAddNew: false,
			loadingSaveLastAndGoToNextPage: false,
		}),
		sampleForm: () => ({
			formTemp: null, // edit temp
			sideId: "",
			sideType: 2,
			name: "",
			fatherName: "",
			grandFatherName: "",
			dateOfBirth: "",
			transactionSidePicture: "",
			transactionSidePictureValidate: null,
			genderType: "",
			cityId: "",
			address: "",
			neighbourhood: "",
			street: "",
			alley: "",
			noNumber: "",
			isHealthy: "",
			cardType: 1,
			relatedTo: 1,
			residenceType: 1,
			institute: {
				name: "",
				instituteType: "",
				isLawyer: false,
				number: "",
				lawyer: {
					number: "",
					agencyNumber: "",
					agencyDate: "",
				},
			},
			nationalCard: {
				number: "",
				issuedBy: "",
				issuedDate: "",
				firstImage: "",
				secondImage: "",
			},
			civilIdCard: {
				number: "",
				issuedDate: "",
				issuedBy: "",
				folderNumber: "",
				pageNumber: "",
				firstImage: "",
				secondImage: "",
			},
			electionCard: {
				number: "",
				issuedBy: "",
				issuedDate: "",
				firstImage: "",
				secondImage: "",
			},
			foreignInformation: {
				number: "",
				issuedBy: "",
				issuedDate: "",
				firstImage: "",
				secondImage: "",
			},
			residenceCard: {
				number: "",
				issuedBy: "",
				issuedDate: "",
				firstImage: "",
				secondImage: "",
			},
			residenceConfirmation: {
				number: "",
				issuedBy: "",
				issuedDate: "",
				firstImage: "",
				secondImage: "",
			},
		}),
		sampleFormCarOwner: () => ({
			ownerName: "",
			companyName: "",
			folderNumber: 0,
			city: null,
			district: "",
			neighbourhood: "",
			alley: "",
			segment: "",
			interrupt: "",
			machines: [],
		}),
		sampleCarFormDetail: () => ({
			machineId: "",
			price: "",
			madeIn: "",
			description: "",
			expertPrice: "",
			machineItemDetailDto: {
				typeOfMortgage: "",
				endDate: "",
				price: "",
				wager: "",
				mortgagor: "",
				startDate: "",
			},
			machineItemFiles: [],
			readonly: false,
		}),
		goToPrevPage() {
			this.$router.push({
				name: `id-client`,
				params: this.$route.params,
				query: this.$route.query,
			})
		},
		goToNextPage() {
			this.$router.push({
				name: `id-advocacy-text`,
				params: this.$route.params,
				query: this.$route.query,
			})
		},
		async editableForm(status = true, index) {
			try {
				if (status) {
					//editable
					this.hiddenNavigate = true
					this.forms[index].readonly = false
					this.forms[index].editForm = true
					this.forms[index].saveType = 3
					this.forms[index].loadingSaveEdit = false
					if (!this.forms[index].institute.lawyer)
						this.forms[index].institute.lawyer = this.sampleForm().institute.lawyer
					this.forms[index].formTemp = { ...this.forms[index] }
				} else {
					//cancel
					let temp = { ...this.forms[index].formTemp }
					temp.readonly = true
					temp.loadingSaveEdit = false
					temp.editForm = false
					temp.saveType = 0
					this.forms.splice(index, 1, temp)
					this.hiddenNavigate = false
					delete this.forms[index].formTemp
					this.$set(this.forms[index], "formTemp", {})
				}
			} catch (e) {
				this.hiddenNavigate = false
			}
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
		async saveAndGotToNextRoute(index) {
			if (this.forms[index].readonly) {
				this.goToNextPage()
			} else {
				this.forms[index].saveType = 2
				// console.log(this.$refs["addSide-" + index][0])
				this.$refs["addSide-" + index][0].click()
			}
		},
		async addToForm(index) {
			console.log("add CAer")

			if (this.forms[index]?.sideId && this.forms[index].readonly)
				this.forms.push({
					...this.sampleForm(),
					...this.sampleFormCustom(),
				})
			else {
				this.forms[index].saveType = 1
				this.$refs["addSide-" + index][0].click()
			}
		},
		async saveEditedForm(index) {
			this.hiddenNavigate = false
			this.forms[index].saveType = 3
			this.$refs["addSide-" + index][0].click()
		},
		deleteInForm(index) {
			if (this.forms[index].readonly && this.forms[index].sideId != "") {
				return
			}
			this.$modal.visible("delete", {
				data: {
					description: "هل أنت مطمأن من حذف معلومات المُنذر أو المُعلن ؟",
				},
				callBack: confirm => {
					if (confirm) {
						if (this.forms[index].sideId) {
							this.$axios
								.$delete(`api/Side/${this.forms[index].sideId}`)
								.then(response => {
									delete this.forms.splice(index, 1)
									if (this.forms.length === 0)
										this.forms.push({ ...this.sampleForm(), ...this.sampleFormCustom() })
								})
								.catch(error => {
									this.$toast.error(error)
								})
						} else if (index > 0) this.forms.splice(index, 1)
					}
				},
			})
		},

		showUploadModal(index) {
			let f = this.forms[index]
			let myData = {
				readonly: f.readonly,
				card: {},
				addressInfo: {},
			}

			switch (f.cardType) {
				case 1:
					myData.card = { data: { ...f.nationalCard }, id: 1 }
					break
				case 2:
					myData.card = { data: { ...f.civilIdCard }, id: 2 }
					break
				case 3:
					myData.card = { data: { ...f.electionCard }, id: 3 }
					break
				case 4:
					myData.card = { data: { ...f.foreignInformation }, id: 4 }
					break
			}

			switch (f.residenceType) {
				case 1:
					myData.addressInfo = { data: { ...f.residenceCard }, id: 1 }
					break
				case 2:
					myData.addressInfo = { data: { ...f.residenceConfirmation }, id: 2 }
					break
			}

			this.$modal.visible("citizen", {
				data: { ...myData },
				callBack: data => {
					if (data === "close") {
						return
					}

					this.forms[index].uploadModalValidate = true

					this.forms[index][data.card.key] = { ...data.card.data }
					this.forms[index][data.addressInfo.key] = { ...data.addressInfo.data }

					this.forms[index].cardType = data.card.id
					this.forms[index].residenceType = data.addressInfo.id
				},
				disabled: true,
			})
		},

		showUploadFaceImageModal(index) {
			this.$modal.visible("upload-image-user", {
				callBack: data => {
					let filePath = data.name
					let ext = filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase()
					let acceptedType = ["png", "jpg", "jpeg", "bmp"]
					let checkedType = acceptedType.includes(ext)
					if (!checkedType) {
						this.$toast.error("تنسيق الملف المحدد غير صحيح")
						return
					}
					this.setImageFile(data, index)
				},
			})
		},
		previewSrc(file) {
			if (typeof file === "string") return file
			else return URL.createObjectURL(file)
		},
		setImageFile(data, index) {
			this.forms[index].transactionSidePictureValidate = true
			this.forms[index].transactionSidePicture = data
		},
		async customValidate(index, payload) {
			if (this.checkIsNormal) {
				if (this.forms[index].relatedTo === 1 && !this.forms[index].transactionSidePicture) {
					this.forms[index].transactionSidePictureValidate = false
					payload.valid = false
					payload.addError({ transactionSidePicture: ["The image of the transaction side is not selected"] })
				} else {
					this.forms[index].transactionSidePictureValidate = true
				}
				if (
					(this.forms[index].relatedTo === 1 || !this.forms[index]?.institute?.isLawyer) &&
					!this.forms[index].uploadModalValidate
				) {
					payload.valid = false
					payload.addError({ transactionSidePicture: ["Modal information is not filled"] })
					this.forms[index].uploadModalValidate = false
				}
				console.log("payload.valid", payload.valid)
				return payload.valid
			} else {
				this.forms[index].transactionSidePictureValidate = true
				this.forms[index].uploadModalValidate = true
				return true
			}
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		},
		createFormDataSide(formData, form) {
			formData.append("Mobile", this.$auth.state.user.profile.mobile)
			formData.append("GenderType", form.genderType)
			formData.append("SideType", "2")
			formData.append("RelatedTo", form.relatedTo)
			formData.append("IsHealthy", form.isHealthy === "سالم")
			form.neighbourhood ? formData.append("Neighbourhood", form.neighbourhood) : ""
			form.street ? formData.append("Street", form.street) : ""
			form.alley ? formData.append("Alley", form.alley) : ""
			form.noNumber ? formData.append("NoNumber", form.noNumber) : ""

			if (form.relatedTo === 2) {
				formData.append("Institute.Name", form.institute.name)
				formData.append("Institute.InstituteType", form.institute.instituteType)
				formData.append("Institute.IsLawyer", form.institute.isLawyer)
			}

			formData.append("Name", form.name)
			formData.append("FatherName", form.fatherName)
			formData.append("GrandFatherName", form.grandFatherName)

			if (form.institute.isLawyer) {
				formData.append("Institute.Lawyer.Number", form.institute.lawyer.number)
				formData.append("Institute.Lawyer.AgencyNumber", form.institute.lawyer.agencyNumber)
				formData.append("institute.Lawyer.AgencyDate", form.institute.lawyer.agencyDate)
			}

			if (!form.institute.isLawyer) {
				if (form.transactionSidePicture && typeof form.transactionSidePicture !== "string")
					formData.append("TransactionSidePicture", form.transactionSidePicture)
				formData.append("CityId", form.cityId)
				//formData.append("Address", form.address)
				formData.append("DateOfBirth", form.dateOfBirth)
				formData.append("CardType", form.cardType)
				formData.append("ResidenceType", form.residenceType)
				let cardKey = ""
				if (form.cardType === 1) cardKey = "nationalCard"
				else if (form.cardType === 2) cardKey = "civilIdCard"
				else if (form.cardType === 3) cardKey = "electionCard"
				else if (form.cardType === 4) cardKey = "foreignInformation"

				formData.append(`${this.capitalizeFirstLetter(cardKey)}.Number`, form[cardKey].number)
				formData.append(`${this.capitalizeFirstLetter(cardKey)}.IssuedBy`, form[cardKey].issuedBy)
				formData.append(`${this.capitalizeFirstLetter(cardKey)}.IssuedDate`, form[cardKey].issuedDate)
				if (typeof form[cardKey].firstImage !== "string")
					formData.append(`${this.capitalizeFirstLetter(cardKey)}.FirstImage`, form[cardKey].firstImage)
				if (typeof form[cardKey].secondImage !== "string")
					formData.append(`${this.capitalizeFirstLetter(cardKey)}.SecondImage`, form[cardKey].secondImage)

				let residenceKey = ""
				if (form.residenceType === 1) residenceKey = "residenceCard"
				else if (form.residenceType === 2) residenceKey = "residenceConfirmation"
				formData.append(`${this.capitalizeFirstLetter(residenceKey)}.Number`, form[residenceKey].number)
				formData.append(`${this.capitalizeFirstLetter(residenceKey)}.IssuedBy`, form[residenceKey].issuedBy)
				formData.append(`${this.capitalizeFirstLetter(residenceKey)}.IssuedDate`, form[residenceKey].issuedDate)
				if (typeof form[residenceKey].firstImage !== "string")
					formData.append(
						`${this.capitalizeFirstLetter(residenceKey)}.FirstImage`,
						form[residenceKey].firstImage
					)
				if (typeof form[residenceKey].secondImage !== "string")
					formData.append(
						`${this.capitalizeFirstLetter(residenceKey)}.SecondImage`,
						form[residenceKey].secondImage
					)
			}
		},
		createFormDataMachines(form) {
			let formData = new FormData()
			let keys
			let keyCar
			let keyCarDetails
			if (this.forms[0].machines.length <= 1) {
				keys = [
					"ownerName",
					"companyName",
					"folderNumber",
					"district",
					"cityId",
					"neighbourhood",
					"alley",
					"segment",
					"interrupt",
				]
				keyCar = ["price", "madeIn", "description", "expertPrice"]
				keyCarDetails = ["typeOfMortgage", "endDate", "price", "wager", "mortgagor", "startDate"]
				keys.forEach(key => {
					formData.append(this.capitalizeFirstLetter(key), form[key])
				})
				formData.append("transactionId", this.$route.params.id)
			} else {
				keyCar = ["price", "madeIn", "description", "expertPrice", "machineItemFiles"]
				keyCarDetails = ["typeOfMortgage", "endDate", "price", "wager", "mortgagor", "startDate"]
				formData.append("MachineId", form.id)
				console.log("keyCar", keyCar)
				keyCar.forEach(key => {
					// for (let index = 0; index < form.machines.length; index++) {
					formData.append(this.capitalizeFirstLetter(key), form.machines[0][key])
					// }
					if (key === "machineItemFiles") {
						for (let i = 0; i < form.length; i++) {
							formData.append("MachineItemFiles", form.machineItemFiles[i])
						}
					}
				})
				console.log("keyCarDetails", keyCarDetails)
				keyCarDetails.forEach(key => {
					formData.append(
						`MachineItemDetailDto.` + this.capitalizeFirstLetter(key),
						form.machines[0].machineItemDetailDto[key]
					)
				})
			}

			return formData
		},
		async submitAddSide(index, ...args) {
			if (this.checkIsNormal) {
				if (this.forms[index].uploadModalValidate === null) this.forms[index].uploadModalValidate = false
				if (this.forms[index].relatedTo === 1 && !this.forms[index].transactionSidePicture) {
					return
				}
				if (
					(this.forms[index].relatedTo === 1 ||
						(this.forms[index].relatedTo === 2 && !this.forms[index]?.institute?.isLawyer)) &&
					!this.forms[index].uploadModalValidate
				) {
					return
				}
			}

			switch (this.forms[index].saveType) {
				case 1: //saveAndAddForm
					this.forms[index].loadingSaveAndAddNew = true
					break
				case 2: //saveAndGoToNextPage
					this.forms[index].loadingSaveLastAndGoToNextPage = true
					break
				case 3: //edit
					this.forms[index].loadingSaveEdit = true
					break
			}

			const d = { ...this.forms[index] }

			let newSideFormData = new FormData()
			if (this.relatedToMachine) {
				await this.addCar(this.indexCar)
			} else {
				this.createFormDataSide(newSideFormData, d)
			}
			if (this.forms[index].sideId) newSideFormData.append("SideId", d.sideId)
			else newSideFormData.append("TransactionId", this.transactionId)

			if (!this.relatedToMachine) {
				this.$callHandler({
					api: this.forms[index].editForm ? "process.editSide" : "process.sendNewSide",
					hasKey: this.forms[index].editForm ? "editSide" : "addSide",
				})
					.store(newSideFormData)
					.then(response => {
						if (response?.data?.data?.sideId) this.forms[index].sideId = response.data.data.sideId
						switch (this.forms[index].saveType) {
							case 1: //saveAndAddForm
								this.forms[index].readonly = true
								this.forms[index].uploadModalValidate = true
								this.forms.push({ ...this.sampleForm(), ...this.sampleFormCustom() })
								break
							case 2: //saveAndGoToNextPage
								this.goToNextPage()
								break
							case 3: //edit
								this.forms[index].readonly = true
								this.forms[index].loadingSaveEdit = false
								break
						}
						this.forms[index].saveType = 0
						this.forms[index].editForm = false
					})
					.catch(error => {
						this.forms[index].loadingSaveEdit = false
						this.forms[index].loadingSaveAndAddNew = false
						this.forms[index].loadingSaveLastAndGoToNextPage = false
					})
					.then(() => {
						this.forms[index].saveType = 0
						this.forms[index].loadingSaveEdit = false
						this.forms[index].loadingSaveAndAddNew = false
						this.forms[index].loadingSaveLastAndGoToNextPage = false
					})
			}
		},
		async submitOwnerCar(index) {
			let form = this.forms[0]
			let formData = this.createFormDataMachines(form)
			let flag = this.forms[0].machines.length < 2
			this.$callHandler({
				api: flag ? "car.submitOwnerCar" : "car.submitCar",
				hasKey: "submitOwnerCar",
			})
				.store(formData)
				.then(({ data }) => {
					switch (this.forms[0].saveType) {
						case 1: //saveAndAddForm
							this.forms[0].readonly = true
							this.forms[0].machines[index].readonly = true
							this.forms[0].uploadModalValidate = true
							this.forms[0].machines.push({
								...this.sampleCarFormDetail(),
								machineId: data.data.machineId,
							})
							this.indexCar += 1
							break
						case 2: //saveAndGoToNextPage
							//this.goToNextPage()
							break
						case 3: //edit
							this.forms[0].readonly = true
							this.forms[0].machines[index].readonly = true
							this.forms[0].loadingSaveEdit = false
							break
					}
					this.forms[0].saveType = 0
					this.forms[0].editForm = false
					this.mode = "addCar"
				})
				.catch(e => {
					this.$toast.error(e.message)
					if (e.message.includes("400")) {
						this.forms[0].readonly = true
						this.forms[0].machines[index].readonly = true
						this.forms[0].saveType = 1
					}
					this.forms[0].loadingSaveEdit = false
					this.forms[0].loadingSaveAndAddNew = false
					this.forms[0].loadingSaveLastAndGoToNextPage = false
				})
		},
		getAllCity() {
			this.$axios.$get(`api/city`).then(response => {
				this.cites = response.data
			})
		},
		getSide() {
			this.forms = []
			this.showPage = false
			this.$axios
				.$get(`api/side/${this.transactionId}?SideType=2`)
				.then(response => {
					if (response.hasOwnProperty("data") && Array.isArray(response.data)) {
						Object.values(response.data).map((v, i) => {
							if (!v.institute) {
								v = {
									...v,
									institute: this.sampleForm().institute,
								}
							}
							this.forms.push({ ...this.sampleForm(), ...this.sampleFormCustom(), ...v })
							this.forms[i].readonly = true
							this.forms[i].saveType = 0
							this.forms[i].editForm = false
							this.forms[i].saveType = 0
							this.forms[i].uploadModalValidate = true
						})
					} else {
						this.forms.push({ ...this.sampleForm(), ...this.sampleFormCustom() })
					}
					this.showPage = true
				})
				.catch(error => {
					this.showPage = true
					if (error?.response?.status === 404) {
						this.forms.push({ ...this.sampleForm(), ...this.sampleFormCustom() })
					}
				})
		},
		getDataCar() {
			this.$axios
				.get(`api/Machine/${this.$route.params.id}`)
				.then(({ data }) => {
					this.forms[0] = {
						machines: [],
						...this.sampleFormCustom(),
						readonly: true,
						...data.data.machine,
					}
					for (let i in data.data.items) {
						this.forms[0].machines[i] = {
							...data.data.items[i],
							readonly: true,
						}
					}
					this.relatedToMachine = false
					this.relatedToMachine = true
				})
				.catch(e => {
					this.forms.push({
						...this.sampleFormCarOwner(),
						...this.sampleFormCustom(),
						machines: [{ ...this.sampleCarFormDetail() }],
					})
					this.$toast.error(e.message)
				})
		},
		async addCar(index) {
			if (this.relatedToMachine) {
				if (this.forms[0].machines[this.forms[0].machines.length - 1].machineId) {
					this.forms[0].machines.push({
						...this.sampleCarFormDetail(),
						readonly: false,
					})
					this.key += 1
					return
				}
				// this.$toast.error("أولاً ، أضف شخصًا وجهازًا")
				// return
			}

			this.submitOwnerCar(index).then(() => {
				this.forms[0].machines.push({ ...this.sampleCarFormDetail() })
			})
		},
		deleteInFormCarDetail(index) {
			this.forms[0].machines = this.forms[0].machines.filter((machine, i) => {
				return i !== index
			})
		},
		async getDataStepProcess() {
			this.$axios
				.$get(`api/TransactionType/${this.processId}`)
				.then(({ data }) => {
					this.nameProcess = data.name
					this.processDetails = data.details
					this.modelSideTwo = data.attorneyFieldsType
					this.relatedToMachine = data.attorneyFieldsType === 3
					this.checkIsNormal = data.attorneyFieldsType === 1
					this.isAddNewSide = data.attorneyHasAddingSecondSide
					this.isRelatedTo = data.AttorneyHasRelatedTo
					if (this.relatedToMachine) {
						this.getDataCar()
					} else {
						this.getSide()
					}
				})
				.catch(error => {
					this.$toast.error(error)
				})
		},
		uploadImagesCar(index, data) {
			if (!this.forms[0].readonly) {
				this.forms[0].machines[index].machineItemFiles.push(data)
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

@media only screen and (min-width: 1500px) and (max-width: 1800px) {
	.transaction-model {
		transform: scale(0.8);
		right: -90px;
	}
}

@media only screen and (max-width: 1500px) {
	.transaction-model {
		transform: rotate(90deg) scale(0.9);
		right: -350px;
		top: 180px;
	}
}

@media only screen and (max-width: 420px) {
	.transaction-model {
		transform: rotate(90deg) scale(0.6);
		right: -98%;
	}
}

input[type=file], /* FF, IE7+, chrome (except button) */
input[type=file]::-webkit-file-upload-button {
	/* chromes and blink button */
	cursor: pointer;
}
</style>
