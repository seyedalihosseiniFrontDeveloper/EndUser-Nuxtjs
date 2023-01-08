<template>
	<div v-if="!isLoading" class="the-form bg-white rounded-b-[35px]">
		<transition-group name="fade" tag="div">
			<template v-for="(form, index) in forms">
				<app-form v-if="form" :key="index" :ref="`form-person-${index}`" :on-submit="submitAddSide">
					<template v-if="index === 0">
						<client-the-main-person
							:key="key + 1"
							:add-has-legal-excuse="addHasLegalExcuse"
							:cites="cites"
							:disabled-edit-cancel="form.disableCancel"
							:disabled-edit-success="form.disableSuccess"
							:form="form"
							:index="(indexForm = index)"
							:process-details="processDetails"
							:remove-child="removeChild"
							:save-edited-form="saveEditedForm"
							:show-upload-face-image-modal="showUploadFaceImageModal"
							:show-upload-modal="showUploadModal"
							:update-key="key"
							@showTranslator="showTranslator"
							@showWitness="showWitness"
							@toggle="editableForm"
							@toggleIsHasLegalExcuse="updateIsHasLegalExcuse"
							@updateMartyrCardImageStatus="updateMartyrCardImageStatus"
							@updateMartyrCardImage="addMartyrCardImage"
						/>
						<client-the-translator
							v-if="form.isShowTranslator"
							:data="form.translator[0]"
							:index="index"
							:index-form="indexForm"
							:show-upload-modal="showUploadModal"
							@addImageWitness="addImageWitness"
							@updateKey="updateKey"
						/>
						<template v-if="form.isShowWitness">
							<client-the-witness
								v-for="(witness, index) in form.witness"
								:key="index"
								:data="witness"
								:index="index"
								:index-form="indexForm"
								:show-upload-modal="showUploadModal"
								@addImageWitness="addImageWitness"
								@updateKey="updateKey"
							/>
						</template>
					</template>
					<template v-else>
						<client-the-main-person
							:key="key"
							:add-has-legal-excuse="addHasLegalExcuse"
							:cites="cites"
							:delete-person="deletePerson"
							:disabled-edit-cancel="form.disableCancel"
							:disabled-edit-success="form.disableSuccess"
							:form.sync="form"
							:index="index"
							:process-details="processDetails"
							:remove-child="removeChild"
							:save-edited-form="saveEditedForm"
							:show-upload-face-image-modal="showUploadFaceImageModal"
							:show-upload-modal="showUploadModal"
							@toggle="editableForm"
							@showTranslator="showTranslator"
							@showWitness="showWitness"
						/>
						<client-the-translator
							v-if="form.isShowTranslator"
							:data="form.translator[0]"
							:index="index"
							:index-form="indexForm"
							:show-upload-modal="showUploadModal"
							@addImageWitness="addImageWitness"
							@updateKey="updateKey"
						/>
						<template v-if="form.isShowWitness">
							<client-the-witness
								v-for="(witness, index) in form.witness"
								:key="index"
								:data="witness"
								:index="index"
								:index-form="indexForm"
								:show-upload-modal="showUploadModal"
								@addImageWitness="addImageWitness"
								@updateKey="updateKey"
							/>
						</template>
					</template>
					<transition-group name="fade" tag="div">
						<client-the-actions
							v-if="index === forms.length - 1"
							key="actions"
							:add-child="addChild"
							:add-new-person="submitAddSide"
							:disable="disableNavigate"
							:has-add-child="form.relatedTo === 1"
							:has-edit="!forms[forms.length - 1].readonly"
							:index="index"
							:isAddChild="isAddChild"
							:isAddNewPerson="isAddNewPerson"
							:loading-add-form="form.loadingNextAddNewSide"
							:mode="mode"
						/>
						<app-the-navigate-buttons
							v-if="index === forms.length - 1 && !disableNavigate"
							key="navigate"
							:disabled-back="disableNavigate"
							:disabled-next="disableNavigate"
							:go-to-back="goToBack"
							:go-to-next="() => {}"
							:index="index"
							:isAddChild="isAddChild"
							:isAddNewPerson="isAddNewPerson"
							:loading-next="isFormLoading"
							mode="navigate"
							type="submit"
						/>
					</transition-group>
				</app-form>
			</template>
		</transition-group>
	</div>
	<div v-else class="h-[100vh] w-full">
		<!--		<Loading />-->
		<svg class="spinner" viewBox="0 0 50 50">
			<circle class="path" cx="25" cy="25" fill="none" r="20" stroke-width="5"></circle>
		</svg>
	</div>
</template>
<script>
import Loading from "~/components/loading"

export default {
	name: "TheForm",
	props: {
		processDetails: Object,
		modelSideTwo: Number,
		isAddChild: Boolean,
		isAddNewPerson: Boolean,
	},
	components: { Loading },
	data() {
		return {
			isLoading: false,
			key: 1,
			nameProcess: null,
			cites: [],
			genderType: [
				{ id: 1, label: "ذکر" },
				{ id: 2, label: "أنثى" },
			],
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
				{
					id: 4,
					label: "أصم ومتعذر البصمة",
				},
			],
			isHealthyWitness: [
				{
					id: 1,
					label: "سالم",
				},
			],
			forms: [],
			formTemp: null,
			mode: "navigate",
			isFormLoading: false,
			disableNavigate: false,
			targetForm: {},
			indexForm: null,
		}
	},
	provide() {
		return {
			gender: this.genderType,
			isHealthy: this.isHealthy,
			isHealthyWitness: this.isHealthyWitness,
			showUploadModal: this.showUploadModal,
			updateIsHasLegalExcuse: this.updateIsHasLegalExcuse,
			updateMartyrCardImageStatus: this.updateMartyrCardImageStatus,
			addHasLegalExcuse: this.addHasLegalExcuse,
			addMartyrCardImage: this.addMartyrCardImage,
		}
	},
	methods: {
		sampleForm() {
			return {
				sideId: 0,
				sideType: 1,
				name: "",
				fatherName: "",
				grandFatherName: "",
				dateOfBirth: "",
				transactionSidePicture: "",
				transactionSidePictureValidate: null,
				genderType: "",
				cityId: "",
				neighbourhood: "",
				street: "",
				alley: "",
				noNumber: "",
				address: "",
				isHealthy: "سالم",
				hasLegalExcuse: false,
				legalExcuseInformation: {
					address: "",
					description: "",
					phoneNumber: "",
					specialService: "",
					lat: "",
					lng: "",
				},
				martyrCardImage: null,
				martyrCardImageStatus: null,
				cardType: 1,
				relatedTo: 1,
				residenceType: 1,
				institute: {
					name: "",
					instituteType: "",
					isLawyer: false,
					number: "",
					lawyer: {
						name: "",
						fatherName: "",
						grandFatherName: "",
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
				childs: [],
				loadingAddForm: false,
				isShowWitness: false,
				isShowTranslator: false,
			}
		},
		sampleFormCustom() {
			return {
				readonly: false,
				editForm: false,
				saveType: 0, // 0-none 1-saveAndAddForm 2-saveAndGoToNextPage 3-edit
				uploadModalValidate: null,
			}
		},
		sampleFormWitness() {
			return {
				sideId: 0,
				sideType: 1,
				name: "",
				fatherName: "",
				grandFatherName: "",
				dateOfBirth: "",
				transactionSidePicture: "",
				transactionSidePictureValidate: null,
				genderType: "",
				cityId: "",
				neighbourhood: "",
				street: "",
				alley: "",
				noNumber: "",
				isHealthy: true,
				cardType: 1,
				relatedTo: 1,
				residenceType: 1,
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
				loadingAddForm: false,
				isShowWitness: false,
				isShowTranslator: false,
			}
		},
		updateIsHasLegalExcuse(value, index, data) {
			this.forms[index].hasLegalExcuse = value
		},
		updateMartyrCardImageStatus(value, index) {
			this.forms[index].martyrCardImageStatus = value
		},
		goToBack() {
			this.$router.push("/type")
		},
		showUploadFaceImageModal(index) {
			if (!this.forms[index].readonly) {
				this.$modal.visible("upload-image-user", {
					callBack: data => {
						// let filePath = data.name
						// console.log(typeof data, data.mode)
						// if (!data.mode) {
						// 	let ext = filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase()
						// 	let acceptedType = ["png", "jpg", "jpeg", "bmp"]
						// 	let checkedType = acceptedType.includes(ext)
						// 	if (!checkedType) {
						// 		this.$toast.error("تنسيق الملف المحدد غير صحيح")
						// 		return
						// 	}
						// }

						this.setImageFile(index, data)
					},
				})
			}
		},
		addChild(index) {
			this.$modal.visible("details-information", {
				callBack: data => {
					this.forms[index].childs.push(data)
				},
			})
		},
		deletePerson(i, id) {
			if (!this.forms[i].readonly && this.forms[i].sideId !== 0) {
				return
			}
			this.$modal.visible("delete", {
				data: { description: "هل أنت مطمأن من حذف هذه التفاصيل ؟" },
				callBack: data => (data ? this.callDeleteSide(i, id) : ""),
			})
		},
		callDeleteSide(i, id) {
			if (id) {
				this.$callHandler({
					api: "process.deleteSide",
				})
					.store(id)
					.then(({ data }) => {
						this.forms = this.forms.filter((form, index) => {
							return index !== i
						})
					})
			} else {
				this.forms = this.forms.filter((form, index) => {
					this.forms[this.forms.length - 2].loadingAddForm = false
					return index !== i
				})
			}
		},
		setImageFile(index, data) {
			if (!data) this.forms[index].transactionSidePictureValidate = false
			this.forms[index].transactionSidePictureValidate = true
			this.forms[index].transactionSidePicture = data
			this.key += 1
		},
		addImageWitness(index, mode, indexWitness, data) {
			console.log(index, mode, indexWitness, data)
			if (!data) this.forms[index][mode][indexWitness].transactionSidePictureValidate = false
			this.forms[index][mode][indexWitness].transactionSidePictureValidate = true
			this.forms[index][mode][indexWitness].transactionSidePicture = data
		},
		async submitAddSide(mode = "navigate", index = this.forms.length - 1) {
			this.mode = mode
			let form = this.forms[index]
			if (this.mode === "cancelEdit") {
				return
			}
			form.uploadModalValidate = !(!form.uploadModalValidate && form.sideId === 0 && !form.readonly)
			//check validate form
			let validForm
			if (this.$refs[`form-person-${index}`]) {
				console.log(1)
				validForm = await this.$refs[`form-person-${index}`][0]
					.submit()
					.then(response => {
						return response
					})
					.catch(e => {
						return false
					})
			}
			if (this.forms[index].sideId !== 0 && this.mode === "addNewPerson") {
				this.forms[index].loadingAddForm = true
				this.addFormPerson()
				this.forms[index].loadingAddForm = false
				return
			}
			if (form.relatedTo === 1) {
				if (this.forms[index].transactionSidePictureValidate === null) {
					this.forms[index].transactionSidePictureValidate = false
					return false
				} else if (this.forms[index].transactionSidePicture) {
					this.forms[index].transactionSidePictureValidate = true
				} else if (
					!this.forms[index].transactionSidePicture ||
					!this.forms[index].transactionSidePictureValidate
				) {
					return
				}
			}
			if (validForm) {
				if (form.relatedTo === 1) {
					this.forms[index].loadingAddForm = true
				} else if (form.relatedTo === 2 && form.institute.isLawyer) {
					this.forms[index].loadingAddForm = true
				}
			} else {
				return
			}
			if (!form.uploadModalValidate && form.sideId === 0 && form.relatedTo === 1) {
				return
			}
			let newSideFormData = new FormData()
			newSideFormData.append("Mobile", this.$store.state.auth.user.profile.mobile)
			newSideFormData.append("RelatedTo", form.relatedTo)
			newSideFormData.append("FatherName", form.fatherName)
			newSideFormData.append("Name", form.name)
			newSideFormData.append("SideType", "1")
			newSideFormData.append("GrandFatherName", form.grandFatherName)
			newSideFormData.append("IsHealthy", form.isHealthy === "سالم")
			if (form.martyrCardImageStatus) {
				newSideFormData.append("MartyrCardImage", form.martyrCardImage)
			}
			if (form.isHealthy !== "سالم") {
				let healthyType
				if (form.isHealthy == "تتعذر البصمة") {
					healthyType = 1
				}
				if (form.isHealthy == "أصم أو أبكم") {
					healthyType = 2
				}
				if (form.isHealthy == "البصمة") {
					healthyType = 3
				}
				if (form.isHealthy == "أصم ومتعذر البصمة") {
					healthyType = 4
				}
				//translator
				newSideFormData.append("HealthyType", healthyType)
				newSideFormData.append(`WitnessType`, 2)
				//witness formData
				let cardTypeWitness
				let residenceTypeWitness
				let cardTypeTranslator
				let residenceTypeTranslator
				if (form.witness) {
					form.witness = form.witness.map(item => {
						if (item.cardType == 1) {
							delete item.civilIdCard
							delete item.electionCard
							delete item.foreignInformation
							cardTypeWitness = "nationalCard"
						}
						if (item.cardType == 2) {
							delete item.nationalCard
							delete item.electionCard
							delete item.foreignInformation
							cardTypeWitness = "civilIdCard"
						} else if (item.cardType == 3) {
							delete item.civilIdCard
							delete item.nationalCard
							delete item.foreignInformation
							cardTypeWitness = "electionCard"
						} else if (item.cardType == 4) {
							delete item.civilIdCard
							delete item.electionCard
							delete item.nationalCard
							cardTypeWitness = "foreignInformation"
						} else if (item.residenceType == 1) {
							residenceTypeWitness = "residenceCard"
							delete item.residenceConfirmation
						} else if (item.residenceType == 1) {
							residenceTypeWitness = "residenceConfirmation"
							delete item.residenceCard
						}
						delete item.isShowWitness
						delete item.loadingAddForm
						delete item.isShowTranslator
						delete item.readonly
						delete item.editForm
						delete item.saveType
						delete item.uploadModalValidate
						return item
					})
				}
				if (form.translator) {
					form.translator = form.translator.map(item => {
						if (item.cardType == 1) {
							delete item.civilIdCard
							delete item.electionCard
							delete item.foreignInformation
							cardTypeTranslator = "nationalCard"
						} else if (item.cardType == 2) {
							delete item.nationalCard
							delete item.electionCard
							delete item.foreignInformation
							cardTypeTranslator = "civilIdCard"
						} else if (item.cardType == 3) {
							delete item.civilIdCard
							delete item.nationalCard
							delete item.foreignInformation
							cardTypeTranslator = "electionCard"
						} else if (item.cardType == 4) {
							delete item.civilIdCard
							delete item.electionCard
							delete item.nationalCard
							cardTypeTranslator = "foreignInformation"
						} else if (item.residenceType == 1) {
							delete item.residenceConfirmation
							residenceTypeTranslator = "residenceCard"
						} else if (item.residenceType == 1) {
							delete item.residenceCard
							residenceTypeTranslator = "residenceConfirmation"
						}
						delete item.isShowWitness
						delete item.loadingAddForm
						delete item.isShowTranslator
						delete item.readonly
						delete item.editForm
						delete item.saveType
						delete item.uploadModalValidate
						return item
					})
				}
				for (let i in form.witness) {
					newSideFormData.append(`Witnesses[${i}].WitnessType`, 1)

					for (let key in form.witness[i]) {
						newSideFormData.append(`Witnesses[${i}].${key}`, form.witness[i][key])
						console.log(cardTypeWitness, residenceTypeWitness)
						if (key == "cardType") {
							newSideFormData.append(`Witnesses[${i}].CardType`, form.witness[i].cardType)
						}
						if (key == cardTypeWitness) {
							continue
						}
						if (key == residenceTypeWitness) {
							continue
						}
						if (key == "cardType" && form.witness[i].cardType === 1) {
							newSideFormData.append(
								`Witnesses[${i}].NationalCard.IssuedDate`,
								form.witness[i].nationalCard.issuedDate
							)

							newSideFormData.append(
								`Witnesses[${i}].NationalCard.IssuedBy`,
								form.witness[i].nationalCard.issuedBy
							)

							newSideFormData.append(
								`Witnesses[${i}].NationalCard.Number`,
								form.witness[i].nationalCard.number
							)

							if (typeof form.witness[i].nationalCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].NationalCard.FirstImage`,
									typeof form.witness[i].nationalCard.firstImage === "string"
										? null
										: form.witness[i].nationalCard.firstImage
								)
							} else {
								if (form.witness[i].nationalCard.firstImage === "string") {
									newSideFormData.append(
										`Witnesses[${i}].NationalCard.FirstImage`,
										typeof form.witness[i].nationalCard.firstImage === "string"
											? null
											: form.witness[i].nationalCard.firstImage,
										"image.png"
									)
								} else {
									newSideFormData.append(
										`Witnesses[${i}].NationalCard.FirstImage`,
										typeof form.witness[i].nationalCard.firstImage === "string"
											? null
											: form.witness[i].nationalCard.firstImage
									)
								}
							}

							if (typeof form.nationalCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].NationalCard.SecondImage`,
									typeof form.witness[i].nationalCard.secondImage === "string"
										? null
										: form.witness[i].nationalCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].NationalCard.SecondImage`,
									typeof form.witness[i].nationalCard.secondImage === "string"
										? null
										: form.witness[i].nationalCard.secondImage,
									"image.png"
								)
							}
						}
						if (key == "cardType" && form.witness[i].cardType === 2) {
							newSideFormData.append(
								`Witnesses[${i}].CivilIdCard.FolderNumber`,
								form.civilIdCard.folderNumber
							)

							newSideFormData.append(
								`Witnesses[${i}].CivilIdCard.PageNumber`,
								form.civilIdCard.pageNumber
							)

							newSideFormData.append(
								`Witnesses[${i}].CivilIdCard.IssuedDate`,
								form.civilIdCard.issuedDate
							)

							newSideFormData.append(`Witnesses[${i}].CivilIdCard.IssuedBy`, form.civilIdCard.issuedBy)
							if (typeof form.civilIdCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].CivilIdCard.SecondImag`,
									typeof form.witness[i].civilIdCard.secondImage === "string"
										? null
										: form.witness[i].civilIdCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].CivilIdCard.SecondImag`,
									typeof form.witness[i].civilIdCard.secondImage === "string"
										? null
										: form.witness[i].civilIdCard.secondImage,
									"image.png"
								)
							}
							if (typeof form.witness[i].civilIdCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].CivilIdCard.FirstImage`,
									typeof form.witness[i].civilIdCard.firstImage === "string"
										? null
										: form.witness[i].civilIdCard.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].CivilIdCard.FirstImage`,
									typeof form.witness[i].civilIdCard.firstImage === "string"
										? null
										: form.witness[i].civilIdCard.firstImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${i}].CivilIdCard.Number`,
								form.witness[i].civilIdCard.number
							)
						}
						if (key == "cardType" && form.witness[i].cardType === 3) {
							if (typeof form.witness[i].electionCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ElectionCard.SecondImage`,
									typeof form.witness[i].witness[i].electionCard.secondImage === "string"
										? null
										: form.witness[i].electionCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ElectionCard.SecondImage`,
									typeof form.witness[i].electionCard.secondImage === "string"
										? null
										: form.witness[i].electionCard.secondImage,
									"image.png"
								)
							}
							if (typeof form.electionCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ElectionCard.FirstImage`,
									typeof form.witness[i].electionCard.firstImage === "string"
										? null
										: form.witness[i].electionCard.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ElectionCard.FirstImage`,
									typeof form.witness[i].electionCard.firstImage === "string"
										? null
										: form.witness[i].electionCard.firstImage,
									"image.png"
								)
							}
							newSideFormData.append(
								`Witnesses[${i}].ElectionCard.IssuedBy`,
								form.witness[i].electionCard.issuedBy
							)
							newSideFormData.append(
								`Witnesses[${i}].ElectionCard.IssuedDate`,
								form.witness[i].electionCard.issuedDate
							)

							newSideFormData.append("ElectionCard.Number", form.witness[i].electionCard.number)
						}
						if (key == "cardType" && form.witness[i].cardType === 4) {
							newSideFormData.append(
								`Witnesses[${i}].ForeignInformation.IssuedDate`,
								form.witness[i].foreignInformation.issuedDate
							)
							if (typeof form.witness[i].foreignInformation.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ForeignInformation.SecondImage`,
									typeof form.witness[i].foreignInformation.secondImage === "string"
										? null
										: form.witness[i].foreignInformation.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ForeignInformation.SecondImage`,
									typeof form.witness[i].foreignInformation.secondImage === "string"
										? null
										: form.witness[i].foreignInformation.secondImage,
									"image.png"
								)
							}
							if (typeof form.witness[i].foreignInformation.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ForeignInformation.FirstImage`,
									typeof form.witness[i].foreignInformation.firstImage === "string"
										? null
										: form.witness[i].foreignInformation.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ForeignInformation.FirstImage`,
									typeof form.witness[i].foreignInformation.firstImage === "string"
										? null
										: form.witness[i].foreignInformation.firstImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${i}].ForeignInformation.IssuedBy`,
								form.witness[i].foreignInformation.issuedBy
							)
							newSideFormData.append(
								`Witnesses[${i}].ForeignInformation.Number`,
								form.witness[i].foreignInformation.number
							)
						}
						if (key == "residenceType") {
							newSideFormData.append(`Witnesses[${i}].ResidenceType`, form.witness[i].residenceType)
						}
						if (key == "residenceType" && form.witness[i].residenceType === 1) {
							newSideFormData.append(
								`Witnesses[${i}].ResidenceCard.Number`,
								form.witness[i].residenceCard.number
							)
							if (typeof form.residenceCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceCard.FirstImage`,
									typeof form.witness[i].residenceCard.firstImage === "string"
										? null
										: form.witness[i].residenceCard.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceCard.FirstImage`,
									typeof form.witness[i].residenceCard.firstImage === "string"
										? null
										: form.witness[i].residenceCard.firstImage,
									"image.png"
								)
							}
							if (typeof form.residenceCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceCard.SecondImage`,
									typeof form.witness[i].residenceCard.secondImage === "string"
										? null
										: form.witness[i].residenceCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceCard.SecondImage`,
									typeof form.witness[i].residenceCard.secondImage === "string"
										? null
										: form.witness[i].residenceCard.secondImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${i}].ResidenceCard.IssuedDate`,
								form.witness[i].residenceCard.issuedDate
							)

							newSideFormData.append(
								`Witnesses[${i}].ResidenceCard.IssuedBy`,
								form.witness[i].residenceCard.issuedBy
							)
						}
						if (key == "residenceType" && form.witness[i].residenceType === 2) {
							newSideFormData.append(
								`Witnesses[${i}].ResidenceConfirmation.IssuedDate`,
								form.witness[i].residenceConfirmation.issuedDate
							)
							if (typeof form.witness[i].residenceConfirmation.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceConfirmation.SecondImage`,
									typeof form.witness[i].residenceConfirmation.secondImage === "string"
										? null
										: form.witness[i].residenceConfirmation.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceConfirmation.SecondImage`,
									typeof form.witness[i].residenceConfirmation.secondImage === "string"
										? null
										: form.witness[i].residenceConfirmation.secondImage,
									"image.png"
								)
							}
							if (typeof form.witness[i].residenceConfirmation.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceConfirmation.FirstImage`,
									typeof form.witness[i].residenceConfirmation.firstImage === "string"
										? null
										: form.witness[i].residenceConfirmation.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${i}].ResidenceConfirmation.FirstImage`,
									typeof form.witness[i].residenceConfirmation.firstImage === "string"
										? null
										: form.witness[i].residenceConfirmation.firstImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${i}].ResidenceConfirmation.IssuedBy`,
								form.witness[i].residenceConfirmation.issuedBy
							)

							newSideFormData.append(
								`Witnesses[${i}].ResidenceConfirmation.number`,
								form.witness[i].residenceConfirmation.number
							)
						}
					}
				}
				// translator formData
				let translatorIndex = 2
				for (let i in form.translator) {
					newSideFormData.append(`WitnessType[${translatorIndex}]`, 2)
					for (let key in form.translator[i]) {
						if (key == cardTypeTranslator) {
							continue
						}
						if (key == residenceTypeTranslator) {
							continue
						}
						newSideFormData.append(`Witnesses[${translatorIndex}].${key}`, form.translator[i][key])
						if (key == "cardType") {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].CardType`,
								form.translator[i].cardType
							)
						}
						if (key == "cardType" && form.translator[i].cardType === 1) {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].NationalCard.IssuedDate`,
								form.translator[i].nationalCard.issuedDate
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].NationalCard.IssuedBy`,
								form.translator[i].nationalCard.issuedBy
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].NationalCard.Number`,
								form.translator[i].nationalCard.number
							)

							if (typeof form.translator[i].nationalCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].NationalCard.FirstImage`,
									typeof form.translator[i].nationalCard.firstImage === "string"
										? null
										: form.translator[i].nationalCard.firstImage
								)
							} else {
								if (form.translator[i].nationalCard.firstImage === "string") {
									newSideFormData.append(
										`Witnesses[${translatorIndex}].NationalCard.FirstImage`,
										typeof form.translator[i].nationalCard.firstImage === "string"
											? null
											: form.translator[i].nationalCard.firstImage,
										"image.png"
									)
								} else {
									newSideFormData.append(
										`Witnesses[${translatorIndex}].NationalCard.FirstImage`,
										typeof form.translator[i].nationalCard.firstImage === "string"
											? null
											: form.translator[i].nationalCard.firstImage
									)
								}
							}

							if (typeof form.nationalCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].NationalCard.SecondImage`,
									typeof form.translator[i].nationalCard.secondImage === "string"
										? null
										: form.translator[i].nationalCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].NationalCard.SecondImage`,
									typeof form.translator[i].nationalCard.secondImage === "string"
										? null
										: form.translator[i].nationalCard.secondImage,
									"image.png"
								)
							}
						}
						if (key == "cardType" && form.translator[i].cardType === 2) {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].CivilIdCard.FolderNumber`,
								form.civilIdCard.folderNumber
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].CivilIdCard.PageNumber`,
								form.civilIdCard.pageNumber
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].CivilIdCard.IssuedDate`,
								form.civilIdCard.issuedDate
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].CivilIdCard.IssuedBy`,
								form.civilIdCard.issuedBy
							)
							if (typeof form.civilIdCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].CivilIdCard.SecondImag`,
									typeof form.translator[i].civilIdCard.secondImage === "string"
										? null
										: form.translator[i].civilIdCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].CivilIdCard.SecondImag`,
									typeof form.translator[i].civilIdCard.secondImage === "string"
										? null
										: form.translator[i].civilIdCard.secondImage,
									"image.png"
								)
							}
							if (typeof form.translator[i].civilIdCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].CivilIdCard.FirstImage`,
									typeof form.translator[i].civilIdCard.firstImage === "string"
										? null
										: form.translator[i].civilIdCard.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].CivilIdCard.FirstImage`,
									typeof form.translator[i].civilIdCard.firstImage === "string"
										? null
										: form.translator[i].civilIdCard.firstImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${translatorIndex}].CivilIdCard.Number`,
								form.translator[i].civilIdCard.number
							)
						}
						if (key == "cardType" && form.translator[i].cardType === 3) {
							if (typeof form.translator[i].electionCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ElectionCard.SecondImage`,
									typeof form.translator[i].translator[i].electionCard.secondImage === "string"
										? null
										: form.translator[i].electionCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ElectionCard.SecondImage`,
									typeof form.translator[i].electionCard.secondImage === "string"
										? null
										: form.translator[i].electionCard.secondImage,
									"image.png"
								)
							}
							if (typeof form.electionCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ElectionCard.FirstImage`,
									typeof form.translator[i].electionCard.firstImage === "string"
										? null
										: form.translator[i].electionCard.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ElectionCard.FirstImage`,
									typeof form.translator[i].electionCard.firstImage === "string"
										? null
										: form.translator[i].electionCard.firstImage,
									"image.png"
								)
							}
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ElectionCard.IssuedBy`,
								form.translator[i].electionCard.issuedBy
							)
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ElectionCard.IssuedDate`,
								form.translator[i].electionCard.issuedDate
							)

							newSideFormData.append("ElectionCard.Number", form.translator[i].electionCard.number)
						}
						if (key == "cardType" && form.translator[i].cardType === 4) {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ForeignInformation.IssuedDate`,
								form.translator[i].foreignInformation.issuedDate
							)
							if (typeof form.translator[i].foreignInformation.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ForeignInformation.SecondImage`,
									typeof form.translator[i].foreignInformation.secondImage === "string"
										? null
										: form.translator[i].foreignInformation.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ForeignInformation.SecondImage`,
									typeof form.translator[i].foreignInformation.secondImage === "string"
										? null
										: form.translator[i].foreignInformation.secondImage,
									"image.png"
								)
							}
							if (typeof form.translator[i].foreignInformation.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ForeignInformation.FirstImage`,
									typeof form.translator[i].foreignInformation.firstImage === "string"
										? null
										: form.translator[i].foreignInformation.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ForeignInformation.FirstImage`,
									typeof form.translator[i].foreignInformation.firstImage === "string"
										? null
										: form.translator[i].foreignInformation.firstImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${translatorIndex}].ForeignInformation.IssuedBy`,
								form.translator[i].foreignInformation.issuedBy
							)
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ForeignInformation.Number`,
								form.translator[i].foreignInformation.number
							)
						}
						if (key == "residenceType") {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceType`,
								form.translator[i].residenceType
							)
						}
						if (key == "residenceType" && form.translator[i].residenceType === 1) {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceCard.Number`,
								form.translator[i].residenceCard.number
							)
							if (typeof form.residenceCard.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceCard.FirstImage`,
									typeof form.translator[i].residenceCard.firstImage === "string"
										? null
										: form.translator[i].residenceCard.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceCard.FirstImage`,
									typeof form.translator[i].residenceCard.firstImage === "string"
										? null
										: form.translator[i].residenceCard.firstImage,
									"image.png"
								)
							}
							if (typeof form.residenceCard.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceCard.SecondImage`,
									typeof form.translator[i].residenceCard.secondImage === "string"
										? null
										: form.translator[i].residenceCard.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceCard.SecondImage`,
									typeof form.translator[i].residenceCard.secondImage === "string"
										? null
										: form.translator[i].residenceCard.secondImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceCard.IssuedDate`,
								form.translator[i].residenceCard.issuedDate
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceCard.IssuedBy`,
								form.translator[i].residenceCard.issuedBy
							)
						}
						if (key == "residenceType" && form.translator[i].residenceType === 2) {
							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceConfirmation.IssuedDate`,
								form.translator[i].residenceConfirmation.issuedDate
							)
							if (typeof form.translator[i].residenceConfirmation.secondImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceConfirmation.SecondImage`,
									typeof form.translator[i].residenceConfirmation.secondImage === "string"
										? null
										: form.translator[i].residenceConfirmation.secondImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceConfirmation.SecondImage`,
									typeof form.translator[i].residenceConfirmation.secondImage === "string"
										? null
										: form.translator[i].residenceConfirmation.secondImage,
									"image.png"
								)
							}
							if (typeof form.translator[i].residenceConfirmation.firstImage === "string") {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceConfirmation.FirstImage`,
									typeof form.translator[i].residenceConfirmation.firstImage === "string"
										? null
										: form.translator[i].residenceConfirmation.firstImage
								)
							} else {
								newSideFormData.append(
									`Witnesses[${translatorIndex}].ResidenceConfirmation.FirstImage`,
									typeof form.translator[i].residenceConfirmation.firstImage === "string"
										? null
										: form.translator[i].residenceConfirmation.firstImage,
									"image.png"
								)
							}

							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceConfirmation.IssuedBy`,
								form.translator[i].residenceConfirmation.issuedBy
							)

							newSideFormData.append(
								`Witnesses[${translatorIndex}].ResidenceConfirmation.number`,
								form.translator[i].residenceConfirmation.number
							)
						}
					}
				}
			}
			form.neighbourhood ? newSideFormData.append("Neighbourhood", form.neighbourhood) : ""
			form.street ? newSideFormData.append("Street", form.street) : ""
			form.alley ? newSideFormData.append("Alley", form.alley) : ""
			form.noNumber ? newSideFormData.append("NoNumber", form.noNumber) : ""

			if (form.relatedTo === 1) {
				if (typeof form.transactionSidePicture === "string") {
					newSideFormData.append("TransactionSidePicture", null)
				} else {
					newSideFormData.append("TransactionSidePicture", form.transactionSidePicture, "image.jpg")
				}
			}

			if (form.relatedTo === 1 || !form.institute.isLawyer) {
				newSideFormData.append("CityId", form.cityId)
				newSideFormData.append("DateOfBirth", form.dateOfBirth)
				newSideFormData.append("GenderType", form.genderType)
				if (form.marriage) {
					newSideFormData.append("MarriageCertificateImage", form.marriage)
				}
				newSideFormData.append("CardType", form.cardType)
				if (form.cardType === 1) {
					newSideFormData.append("NationalCard.IssuedDate", form.nationalCard.issuedDate)

					newSideFormData.append("NationalCard.IssuedBy", form.nationalCard.issuedBy)

					newSideFormData.append("NationalCard.Number", form.nationalCard.number)

					if (typeof form.nationalCard.firstImage === "string") {
						newSideFormData.append(
							"NationalCard.FirstImage",
							typeof form.nationalCard.firstImage === "string" ? null : form.nationalCard.firstImage
						)
					} else {
						newSideFormData.append(
							"NationalCard.FirstImage",
							typeof form.nationalCard.firstImage === "string" ? null : form.nationalCard.firstImage,
							"image.png"
						)
					}
					console.log(6)
					if (typeof form.nationalCard.secondImage === "string") {
						newSideFormData.append(
							"NationalCard.SecondImage",
							typeof form.nationalCard.secondImage === "string" ? null : form.nationalCard.secondImage
						)
					} else {
						newSideFormData.append(
							"NationalCard.SecondImage",
							typeof form.nationalCard.secondImage === "string" ? null : form.nationalCard.secondImage,
							"image.png"
						)
					}
				}
				if (form.cardType === 2) {
					newSideFormData.append("CivilIdCard.FolderNumber", form.civilIdCard.folderNumber)

					newSideFormData.append("CivilIdCard.PageNumber", form.civilIdCard.pageNumber)

					newSideFormData.append("CivilIdCard.IssuedDate", form.civilIdCard.issuedDate)

					newSideFormData.append("CivilIdCard.IssuedBy", form.civilIdCard.issuedBy)
					if (typeof form.civilIdCard.secondImage === "string") {
						newSideFormData.append(
							"CivilIdCard.SecondImage",
							typeof form.civilIdCard.secondImage === "string" ? null : form.civilIdCard.secondImage
						)
					} else {
						newSideFormData.append(
							"CivilIdCard.SecondImage",
							typeof form.civilIdCard.secondImage === "string" ? null : form.civilIdCard.secondImage,
							"image.png"
						)
					}
					if (typeof form.civilIdCard.firstImage === "string") {
						newSideFormData.append(
							"CivilIdCard.FirstImage",
							typeof form.civilIdCard.firstImage === "string" ? null : form.civilIdCard.firstImage
						)
					} else {
						newSideFormData.append(
							"CivilIdCard.FirstImage",
							typeof form.civilIdCard.firstImage === "string" ? null : form.civilIdCard.firstImage,
							"image.png"
						)
					}
					console.log(8)
					newSideFormData.append("CivilIdCard.Number", form.civilIdCard.number)
				}
				if (form.cardType === 3) {
					if (typeof form.electionCard.secondImage === "string") {
						newSideFormData.append(
							"ElectionCard.SecondImage",
							typeof form.electionCard.secondImage === "string" ? null : form.electionCard.secondImage
						)
					} else {
						newSideFormData.append(
							"ElectionCard.SecondImage",
							typeof form.electionCard.secondImage === "string" ? null : form.electionCard.secondImage,
							"image.png"
						)
					}
					if (typeof form.electionCard.firstImage === "string") {
						newSideFormData.append(
							"ElectionCard.FirstImage",
							typeof form.electionCard.firstImage === "string" ? null : form.electionCard.firstImage
						)
					} else {
						newSideFormData.append(
							"ElectionCard.FirstImage",
							typeof form.electionCard.firstImage === "string" ? null : form.electionCard.firstImage,
							"image.png"
						)
					}
					newSideFormData.append("ElectionCard.IssuedBy", form.electionCard.issuedBy)
					newSideFormData.append("ElectionCard.IssuedDate", form.electionCard.issuedDate)

					newSideFormData.append("ElectionCard.Number", form.electionCard.number)
				}
				if (form.cardType === 4) {
					newSideFormData.append("ForeignInformation.IssuedDate", form.foreignInformation.issuedDate)
					if (typeof form.foreignInformation.secondImage === "string") {
						newSideFormData.append(
							"ForeignInformation.SecondImage",
							typeof form.foreignInformation.secondImage === "string"
								? null
								: form.foreignInformation.secondImage
						)
					} else {
						newSideFormData.append(
							"ForeignInformation.SecondImage",
							typeof form.foreignInformation.secondImage === "string"
								? null
								: form.foreignInformation.secondImage,
							"image.png"
						)
					}
					if (typeof form.foreignInformation.firstImage === "string") {
						newSideFormData.append(
							"ForeignInformation.FirstImage",
							typeof form.foreignInformation.firstImage === "string"
								? null
								: form.foreignInformation.firstImage
						)
					} else {
						newSideFormData.append(
							"ForeignInformation.FirstImage",
							typeof form.foreignInformation.firstImage === "string"
								? null
								: form.foreignInformation.firstImage,
							"image.png"
						)
					}

					newSideFormData.append("ForeignInformation.IssuedBy", form.foreignInformation.issuedBy)
					newSideFormData.append("ForeignInformation.Number", form.foreignInformation.number)
				}
				newSideFormData.append("ResidenceType", form.residenceType)
				if (form.residenceType === 1) {
					newSideFormData.append("ResidenceCard.Number", form.residenceCard.number)
					if (typeof form.residenceCard.firstImage === "string") {
						newSideFormData.append(
							"ResidenceCard.FirstImage",
							typeof form.residenceCard.firstImage === "string" ? null : form.residenceCard.firstImage
						)
					} else {
						newSideFormData.append(
							"ResidenceCard.FirstImage",
							typeof form.residenceCard.firstImage === "string" ? null : form.residenceCard.firstImage,
							"image.png"
						)
					}
					if (typeof form.residenceCard.secondImage === "string") {
						newSideFormData.append(
							"ResidenceCard.SecondImage",
							typeof form.residenceCard.secondImage === "string" ? null : form.residenceCard.secondImage
						)
					} else {
						newSideFormData.append(
							"ResidenceCard.SecondImage",
							typeof form.residenceCard.secondImage === "string" ? null : form.residenceCard.secondImage,
							"image.png"
						)
					}

					newSideFormData.append("ResidenceCard.IssuedDate", form.residenceCard.issuedDate)

					newSideFormData.append("ResidenceCard.IssuedBy", form.residenceCard.issuedBy)
				}
				if (form.residenceType === 2) {
					newSideFormData.append("ResidenceConfirmation.IssuedDate", form.residenceConfirmation.issuedDate)
					if (typeof form.residenceConfirmation.secondImage === "string") {
						newSideFormData.append(
							"ResidenceConfirmation.SecondImage",
							typeof form.residenceConfirmation.secondImage === "string"
								? null
								: form.residenceConfirmation.secondImage
						)
					} else {
						newSideFormData.append(
							"ResidenceConfirmation.SecondImage",
							typeof form.residenceConfirmation.secondImage === "string"
								? null
								: form.residenceConfirmation.secondImage,
							"image.png"
						)
					}
					if (typeof form.residenceConfirmation.firstImage === "string") {
						newSideFormData.append(
							"ResidenceConfirmation.FirstImage",
							typeof form.residenceConfirmation.firstImage === "string"
								? null
								: form.residenceConfirmation.firstImage
						)
					} else {
						newSideFormData.append(
							"ResidenceConfirmation.FirstImage",
							typeof form.residenceConfirmation.firstImage === "string"
								? null
								: form.residenceConfirmation.firstImage,
							"image.png"
						)
					}

					newSideFormData.append("ResidenceConfirmation.IssuedBy", form.residenceConfirmation.issuedBy)

					newSideFormData.append("ResidenceConfirmation.number", form.residenceConfirmation.number)
				}
			}
			newSideFormData.append("HasLegalExcuse", form.hasLegalExcuse)
			if (form.hasLegalExcuse) {
				newSideFormData.append("LegalExcuseInformation.Address", form.legalExcuseInformation.address)
				newSideFormData.append("LegalExcuseInformation.PhoneNumber", form.legalExcuseInformation.phoneNumber)
				newSideFormData.append("LegalExcuseInformation.Description", form.legalExcuseInformation.description)
				newSideFormData.append("LegalExcuseInformation.Longitude", form.legalExcuseInformation.lng)
				newSideFormData.append("LegalExcuseInformation.Latitude", form.legalExcuseInformation.lat)
				newSideFormData.append(
					"LegalExcuseInformation.SpecialService",
					form.legalExcuseInformation.SpecialService
				)
			}
			if (form.relatedTo === 2) {
				newSideFormData.append("Institute.Name", form.institute.name)

				newSideFormData.append("Institute.InstituteType", form.institute.instituteType)

				newSideFormData.append("Institute.IsLawyer", form.institute.isLawyer)
				if (form.institute.isLawyer) {
					newSideFormData.append("Institute.Lawyer.AgencyDate", form.institute.lawyer.agencyDate)
					newSideFormData.append("Institute.Lawyer.AgencyNumber", form.institute.lawyer.agencyNumber)
				}
			}
			if (this.mode === "navigate" || this.mode === "addNewPerson") {
				newSideFormData.append("TransactionId", this.$route.params.id)
			}
			if (form.sideId) {
				newSideFormData.append("SideId", form.sideId)
			}
			if (form.institute) {
				if (form.institute.isLawyer && form.relatedTo === 2) {
					newSideFormData.append("Institute.Lawyer.Number", Number(form.institute.lawyer.number))
				}
			}
			if (this.mode === "addNewPerson" && form.relatedTo === 1) {
				form.institute = null
			}
			for (let i in form.childs) {
				for (let key in form.childs[i]) {
					newSideFormData.append(`Childs[${i}].${key}`, form.childs[i][key])
				}
			}
			this.sendRequestToAddSide(newSideFormData, index)
		},
		showUploadModal(index, mode, indexWitness) {
			console.log("Enter 3")
			let myData = {
				card: {},
				addressInfo: {},
			}
			let f
			if (indexWitness || indexWitness == 0) {
				f = this.forms[index][mode][indexWitness]
				console.log(index, indexWitness)
			} else {
				f = this.forms[index]
			}

			switch (f.cardType) {
				case 1:
					myData.card = {
						data: { ...f.nationalCard },
						id: 1,
					}
					break
				case 2:
					myData.card = {
						data: { ...f.civilIdCard },
						id: 2,
					}
					break
				case 3:
					myData.card = {
						data: { ...f.electionCard },
						id: 3,
					}
					break
				case 4:
					myData.card = {
						data: { ...f.foreignInformation },
						id: 4,
					}
					break
			}

			switch (f.residenceType) {
				case 1:
					myData.addressInfo = {
						data: { ...f.residenceCard },
						id: 1,
					}
					break
				case 2:
					myData.addressInfo = {
						data: { ...f.residenceConfirmation },
						id: 2,
					}
					break
			}
			this.$modal.visible("citizen", {
				data: {
					indexWitness: indexWitness,
					...myData,
					readonly: this.forms[index].readonly,
				},
				callBack: data => {
					if (this.forms[index].readonly) {
						return
					}
					if (data === "close" && !this.forms[index].readonly) {
						this.forms[index].uploadModalValidate = false
						return
					}

					if (data.indexWitness == undefined) {
						this.forms[index].uploadModalValidate = true
						this.forms[index][data.card.key] = { ...data.card.data }
						this.forms[index][data.addressInfo.key] = { ...data.addressInfo.data }

						this.forms[index].cardType = data.card.id
						this.forms[index].residenceType = data.addressInfo.id
					} else {
						this.forms[index][mode][indexWitness].uploadModalValidate = true
						this.forms[index][mode][indexWitness][data.card.key] = { ...data.card.data }
						this.forms[index][mode][indexWitness][data.addressInfo.key] = { ...data.addressInfo.data }
						this.forms[index][mode][indexWitness].cardType = data.card.id
						this.forms[index][mode][indexWitness].residenceType = data.addressInfo.id
					}
				},
				disabled: true,
			})
		},
		removeChild(name, id, index) {
			if (!this.forms[index].readonly) {
				this.forms[index].childs = this.forms[index].childs.filter(child => {
					return child.name !== name
				})
			}
		},
		addHasLegalExcuse(data) {
			console.log(data)
			this.forms[data.index].legalExcuseInformation = {
				...data.data,
			}
		},
		addMartyrCardImage(data) {
			this.forms[data.index] = {
				...this.forms[data.index],
				martyrCardImage: data.data,
			}
		},
		getAllCity() {
			this.$axios
				.$get(`api/city`, {
					headers: {
						Authorization: this.$auth.strategy.token.get(),
					},
				})
				.then(response => {
					localStorage.setItem("cites", JSON.stringify(response.data))
					this.cites = response.data
				})
		},
		async sendRequestToAddSide(data, index) {
			if (this.mode == "navigate") {
				this.isFormLoading = true
				this.forms[index].disableAddSide = true
				this.forms[index].disableSuccess = true
				this.forms[index].disableCancel = true
				this.disableNavigate = false
			} else if (this.mode == "addNewPerson") {
				this.forms[index].disableAddSide = true
				this.isFormLoading = false
				this.forms[index].loadingNextAddNewSide = true
				this.forms[index].loadingAddForm = true
				this.forms[index].disableAddSide = true
				this.forms[index].disableSuccess = true
				this.forms[index].disableCancel = true
				this.disableNavigate = true
			} else if (this.mode == "cancel") {
				this.forms[index].loadingNextCancel = true
				this.forms[index].disableAddSide = false
				this.forms[index].disableSuccess = false
				this.forms[index].disableCancel = false
				this.disableNavigate = false
			} else if (this.mode == "editPerson") {
				this.forms[index].loadingNextSuccess = true
				this.isFormLoading = false
				this.forms[index].disableAddSide = true
				this.forms[index].disableSuccess = true
				this.forms[index].disableCancel = true
				this.disableNavigate = true
			}

			if (this.mode === "navigate" && this.forms[index].sideId != 0) {
				if (this.modelSideTwo === 0) {
					this.isFormLoading = false
					this.$router.push(`/${this.$route.params.id}/advocacy-text?id=${this.$route.query.id}`)
				} else {
					this.isFormLoading = false
					this.$router.push(`/${this.$route.params.id}/lawyer?id=${this.$route.query.id}`)
				}

				return
			}
			this.$callHandler({
				api:
					this.mode === "editPerson" && this.forms[index].sideId !== 0
						? "process.editSide"
						: "process.sendNewSide",
				hasKey: "addSide",
			})
				.store(data)
				.then(({ data }) => {
					let details = data.data
					this.key += 1
					if (this.mode != "editPerson") {
						this.forms[index] = {
							...this.sampleForm(),
							...this.sampleFormCustom(),
							readonly: true,
							transactionSidePictureValidate: !!details.transactionSidePicture,
							...details,
							institute: {
								...details.institute,
							},
						}
						this.forms[index].loadingAddForm = false
					}
					if (this.mode == "editPerson") {
						this.forms[index].loadingAddForm = false
						this.forms[index].loadingNext = false
						this.forms[index].editForm = false
						this.forms[index].readonly = true
					}
					if (this.mode == "addNewPerson") {
						this.forms[index].loadingNextAddNewSide = false
						this.isFormLoading = false
						this.addFormPerson()
					}
					if (this.mode == "cancel") {
						this.forms[index].loadingNextCancel = false
					}
					if (this.mode === "navigate") {
						console.log("navigate", this.modelSideTwo)
						if (this.modelSideTwo == 0) {
							this.isFormLoading = false
							this.$router.push(`/${this.$route.params.id}/advocacy-text?id=${this.$route.query.id}`)
						} else {
							this.isFormLoading = false
							this.$router.push(`/${this.$route.params.id}/lawyer?id=${this.$route.query.id}`)
						}
					}
					if (this.mode === "addNewPerson") {
						this.forms[index] = {
							...details,
							legalExcuseInformation: details.legalExcuseInformation ? v.legalExcuseInformation : {},
							isHealthy: details.isHealthy ? "سالم" : "تتعذر البصمة",
							institute: {
								...details.institute,
								lawyer: { ...this.sampleForm().institute.lawyer, ...details.institute?.lawyer },
							},
							witness:
								details.witnesses?.length > 0
									? [
											{
												...details.witnesses[0],
												readonly: true,
												transactionSidePictureValidate: true,
											},
											{
												...details.witnesses[1],
												readonly: true,
												transactionSidePictureValidate: true,
											},
									  ]
									: [],
							translator: [
								{
									...details.Witness?.filter(witness => {
										return witness.WitnessType === 2
									}),
									readonly: true,
									transactionSidePictureValidate: true,
								},
							],
							isShowWitness: v.witnesses?.length > 0 ? true : false,
							isShowTranslator: v.witnesses?.length > 2 ? true : false,
							uploadModalValidate: true,
						}
						this.addFormPerson()
					} else {
						this.mode = "navigate"
						this.forms[index].loadingNextSuccess = false
					}
					this.forms[index].disableAddSide = false
					this.forms[index].disableSuccess = false
					this.forms[index].disableCancel = false
					this.disableNavigate = false
				})
				.catch(error => {
					this.isFormLoading = false
					this.forms[index].loadingAddForm = false
					if (this.mode == "editPerson") {
						this.forms[index].editForm = true
						this.forms[index].readonly = false
					}
					this.forms[index].loadingNext = false

					this.forms[index].loadingNextAddNewSide = false
					this.forms[index].loadingNextCancel = false
					this.forms[index].loadingNextSuccess = false
					this.forms[index].disableAddSide = false
					this.forms[index].disableSuccess = false
					this.forms[index].disableCancel = false
					this.disableNavigate = false
				})
		},
		async addFormPerson() {
			this.forms.push({
				...this.sampleForm(),
				institute: {
					...this.sampleForm().institute,
					lawyer: { ...this.sampleForm().institute.lawyer },
				},
				childs: [],
				...this.sampleFormCustom(),
			})
		},
		getDataSide() {
			this.isLoading = true
			this.$callHandler({
				api: "process.getDataSide",
			})
				.store(this.$route.params.id, { sideType: 1 })
				.then(({ data }) => {
					data.data.forEach(v => {
						let ketDocument = [
							"nationalCard",
							"electionCard",
							"civilIdCard",
							"foreignInformation",
							"residenceCard",
							"residenceConfirmation",
							"legalExcuseInformation",
						]
						for (let i in ketDocument) {
							if (!v[ketDocument[i]]) {
								v[ketDocument[i]] = {}
							}
						}

						this.forms.push({
							...this.sampleForm(),
							...this.sampleFormCustom(),

							readonly: true,
							transactionSidePictureValidate: !!v.transactionSidePicture,
							...v,
							legalExcuseInformation: v.legalExcuseInformation ? v.legalExcuseInformation : {},
							isHealthy: v.isHealthy ? "سالم" : "تتعذر البصمة",
							institute: {
								...v.institute,
								lawyer: { ...this.sampleForm().institute.lawyer, ...v.institute?.lawyer },
							},
							witness:
								v.witnesses?.length > 0
									? [
											{ ...v.witnesses[0], readonly: true, transactionSidePictureValidate: true },
											{ ...v.witnesses[1], readonly: true, transactionSidePictureValidate: true },
									  ]
									: [],
							translator: [
								{
									...v.Witness?.filter(witness => {
										return witness.WitnessType === 2
									}),
									readonly: true,
									transactionSidePictureValidate: true,
								},
							],
							isShowWitness: v.witnesses?.length > 0 ? true : false,
							isShowTranslator: v.witnesses?.length > 2 ? true : false,
							uploadModalValidate: true,
						})
					})
					if (data.data.length === 0) {
						this.addFormPerson()
					}
					this.isLoading = false
				})
				.catch(error => {
					console.log(error)
					if (error.response.status) {
						this.forms.push({ ...this.sampleForm(), ...this.sampleFormCustom() })
						this.isLoading = false
					}
				})
		},
		//	edit methods
		editableForm(status = true, index) {
			try {
				if (status) {
					//editable
					this.forms[index].readonly = false
					this.forms[index].editForm = true
					this.key += 10
					this.forms[index].saveType = 3
					this.formTemp = this.copy(this.forms[index])
					this.disableNavigate = true
					this.key += 10
				} else {
					//cancel
					let temp = this.copy(this.formTemp)
					temp.readonly = true
					temp.editForm = false
					temp.saveType = 0
					this.forms.splice(index, 1, temp)
					this.mode = "cancelEdit"
					this.formTemp = null
					this.disableNavigate = false
				}
			} catch (e) {
				this.$toast.error(e)
			}
		},
		async saveEditedForm(index) {
			this.mode = "editPerson"
			this.forms[index].saveType = 3
			this.submitAddSide("editPerson", index)
		},
		copy(o) {
			let output, v, key
			output = Array.isArray(o) ? [] : {}
			for (key in o) {
				v = o[key]
				output[key] = typeof v === "object" ? this.copy(v) : v
			}
			return output
		},
		showWitness(value, currentIndex) {
			this.forms[currentIndex].isShowWitness = value
			this.key += 1
			if (value) this.addSingleWitness(currentIndex)
		},
		showTranslator(value, currentIndex) {
			this.forms[currentIndex].isShowTranslator = value
			this.key += 1
			if (value) this.addOneTranslator(currentIndex)
		},
		addSingleWitness(index) {
			this.forms[index].witness = [
				{ ...this.sampleFormWitness(), ...this.sampleFormCustom(), readonly: false },
				{ ...this.sampleFormWitness(), ...this.sampleFormCustom(), readonly: false },
			]
			//this.key += 1
		},
		addOneTranslator(index) {
			this.forms[index].translator = [
				{ ...this.sampleFormWitness(), ...this.sampleFormCustom(), readonly: false },
			]
		},
		updateKey() {
			this.key += 1
		},
	},
	computed: {
		disabledPrevAndNext() {
			return !this.forms.filter(item => item.readonly).length
		},
	},
	async created() {
		await this.getAllCity()
		await this.getDataSide()
	},
}
</script>
<style lang="scss">
.shadow-yellow-43 {
	box-shadow: 0 8px 3px #fce28f;
}

.shadow-green-43 {
	box-shadow: 0 8px 3px #a6f5c8;
}

.shadow-purple-43 {
	box-shadow: 0 8px 3px #bab7f7;
}

.shadow-pink-43 {
	box-shadow: 0 8px 3px #eea0c4;
}

.shadow-orange-43 {
	box-shadow: 0 8px 3px #fce28f;
}

.shadow-gray-43 {
	box-shadow: 0 8px 3px #c5c5c5;
}

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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.vpd-content {
	border-radius: 35px;
	overflow: hidden;
	box-shadow: 0 10px 0 0 #8dcfea;
}
</style>
