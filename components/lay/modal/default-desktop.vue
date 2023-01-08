<template>
	<div>
		<transition mode="out-in" name="modal-fade">
			<div
				v-if="is_show"
				:style="{ 'z-index': zIndex }"
				class="fixed inset-0 h-screen w-screen bg-[#00000044] m-auto"
				@click="close"
			></div>
		</transition>

		<transition mode="out-in" name="modal-slide">
			<div
				v-if="is_show"
				:style="{
					'z-index': zIndex,
				}"
				class="h-fit sm:w-[95%] mx-2 sm:mx-auto w-full md:w-max fixed inset-0 bg-white m-auto p-5 rounded-[34px] drop-shadow-2xl shadow-admin"
			>
				<slot />
			</div>
			yarn dev
		</transition>
	</div>
</template>

<script>
import mixin from "@s3rver/nuxt-modal/mixin"

export default {
	mixins: [mixin],
}
</script>

<style scoped>
/*.dark-lay {*/
/*	position: fixed;*/
/*	top: 0;*/
/*	right: 0;*/
/*	bottom: 0;*/
/*	left: 0;*/
/*	width: 100vw;*/
/*	height: 100vh;*/
/*	background: #00000044;*/
/*}*/

/*.___s3r_m_box-modal {*/
/*	display: flex;*/
/*	overflow-y: auto;*/
/*	position: fixed;*/
/*	top: 0;*/
/*	right: 0;*/
/*	bottom: 0;*/
/*	left: 0;*/
/*	margin: auto;*/
/*	background-color: #ffffff;*/
/*	flex-direction: column;*/
/*	width: max-content;*/
/*	border-radius: 0.75rem;*/
/*}*/

/*.___s3r_m_header {*/
/*	display: flex;*/
/*	padding: 0.5rem;*/
/*	justify-content: space-between;*/
/*	align-items: center;*/
/*	border-bottom-width: 1px;*/
/*	border-color: #d1d5db;*/
/*	column-gap: 1.25rem;*/
/*}*/

/*.___s3r_m_header .___s3r_m_title {*/
/*	font-size: 1.25rem;*/
/*	line-height: 1.75rem;*/
/*}*/

/*.___s3r_m_header .ic-close {*/
/*	width: 1.25rem;*/
/*	height: 1.25rem;*/
/*	cursor: pointer;*/
/*}*/

/*.___s3r_m_content {*/
/*	padding: 0.5rem;*/
/*}*/

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.2s;
}

.modal-fade-enter,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
	transition: all 0.2s ease-in-out;
}

.modal-slide-enter,
.modal-slide-leave-to {
	transform: translateY(30px) scale(0.93);
	opacity: 0;
}
</style>
