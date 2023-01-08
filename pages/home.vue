<template>
	<div class="flex w-full flex-col">
		<div
			class="animate-box w-[90%] md:w-[80%] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>

		<div
			class="animate-box w-[90%] md:w-[80%] h-[70vh] top-[-20px] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>
		<div class="relative slider-home">
			<!--			:autoplay="500"-->
			<carousel-3d
				ref="mycarousel"
				:display="9"
				:loop="true"
				:pagination="true"
				:perspective="0"
				class="!h-[100vw] sm:!h-[74vw] md:!h-[488px]"
				@before-slide-change="onChanged"
			>
				<slide
					v-for="(slide, index) in slider"
					:key="index"
					:index="index"
					class="!border-0 !bg-transparent' !rounded-[65px] !overflow-visible"
				>
					<div
						:class="isActive === index ? '!bg-blue-74' : '!bg-blue-68'"
						class="relative w-full h-full z-[2]"
					>
						<img
							alt="slider"
							class="opacity-40 relative z-[2] h-full object-cover"
							src="/img/slider/slider-1.png"
						/>
						<div class="w-full flex items-center justify-center absolute inset-0 z-[3]">
							<lottie
								autoplay="true"
								class="w-[50px] pe-3"
								loop="true"
								speed="1"
								src="/assets/jsons/plus.json"
							/>
							<span class="slider-title text-white truncate">{{ slide }}</span>
						</div>
						<div
							class="absolute flex items-center justify-center px-5 inset-x-0 mx-auto bottom-[-33px] bg-gradient-to-b from-blue-72 to-blue-73 h-[66px] w-[60%] truncate z-[3] border-2 border-blue-69"
						>
							<h4 class="truncate text-[18] sm:text-[24px] text-white">انقر لتقديم طلب جديد</h4>
						</div>
					</div>
				</slide>
			</carousel-3d>
			<ul class="nav-group">
				<li
					v-for="(slide, i) in slides"
					:key="i"
					:class="{ active: isActive === i, item: true }"
					@click="goToSlide(i), (isActive = i)"
				>
					<span class="truncate">{{ slider[isActive] }}</span>
				</li>
			</ul>
			<div
				class="flex items-center chevrons flex justify-between h-[50px] absolute w-[90%] md:w-[70%] mx-auto inset-x-0 bottom-[60px] z-[3]"
			>
				<span
					class="chevron relative px-3 py-2 md:py-3 flex items-center bg-white hover:bg-blue-71-15 cursor-pointer ease-in-out duration-300"
					@click="SlideCarousel()"
				>
					<lottie-player
						autoplay=""
						background="transparent"
						class="z-1 json px-3 w-[40px] md:w-[50px] rotate-[180deg]"
						loop=""
						speed="1"
						src="/assets/jsons/arrow.json"
						style=""
					></lottie-player>
					التالي
				</span>
				<span
					class="chevron relative px-3 py-2 md:py-3 flex items-center bg-white hover:bg-blue-71-15 cursor-pointer ease-in-out duration-300"
					@click="SlideCarousel('prev')"
				>
					سابق
					<lottie-player
						autoplay=""
						background="transparent"
						class="z-1 json px-3 w-[40px] md:w-[50px]"
						loop=""
						speed="1"
						src="/assets/jsons/arrow.json"
						style=""
					></lottie-player>
				</span>
			</div>
		</div>

		<div class="bg-[url('/img/home/bg-gallery.png')] md:bg-[length:100%_100%] relative z-[1] mt-12">
			<div class="container mx-auto relative z-[2]">
				<section class="favorite-services mx-auto w-full xl:w-[70%]">
					<div class="flex items-center justify-between mb-5 pb-5 controls flex-col lg:flex-row">
						<h5
							class="mb-0 text-blue-70 text-[40px] md:text-[60px] 2xl:text-[30px] 3xl:text-[60px] mt-4 md:mt-0"
						>
							خدمات تهمك
						</h5>
						<div class="flex items-center flex-col 2xl:flex-row">
							<div class="items-center flex my-5 my-xxl-0">
								<app-switch-gallery
									class="!px-0 md:!px-6 w-full py-6 !bg-transparent"
									color="blue-bold"
									label="خدمات ذات اولوية"
									name="gallery"
								>
								</app-switch-gallery>
							</div>
							<ul
								class="flex items-center m-0 p-0 category-favorite flex-wrap controls justify-center md:justify-start"
							>
								<li class="active control" data-filter=".afrad">
									<span>للأفراد</span>
								</li>
								<li class="control" data-filter=".amal">
									<span>المؤسسات</span>
								</li>
								<li class="control" data-filter=".hokomat">
									<span>الحكومية</span>
								</li>
								<li class="control" data-filter="all">
									<span>الخدمات العامة</span>
								</li>
							</ul>
						</div>
					</div>
					<!-- afrad,amal,hokomat, -->
					<ul class="transition-all favorite-services-items duration-100 ease-in">
						<li
							v-for="(category, index) in categories.slice(0, end)"
							:key="index"
							:class="category.class"
							class="w-full md:w-1/2 lg:w-[33%] 2xl:w-[25%] px-4 mix"
						>
							<div class="favorite-services-item group">
								<img
									alt=""
									class="w-full h-full object-cover opacity-30"
									loading="lazy"
									src="/img/slider/slider-1.png"
								/>
								<div class="item-after">
									<div class="txt text-center group-hover:!top-[25%] group-hover:translate-y-[-15%]">
										<i class="icon icon-font-add-book text-white"></i>
										<span>{{ category.title }}</span>
									</div>
									<div class="buttons group-hover:!opacity-100">
										<button
											class="blue-btn flex justify-content-center items-center py-2"
											@click="navigateToLogin"
										>
											<span class="!text-[18px] my-2">الشروع بالخدمة</span>
										</button>
										<button
											class="orange-btn flex justify-content-center items-center py-3"
											@click="openDetailModal"
										>
											<span class="!text-[18px]">تفاصيل الخدمة </span>
										</button>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</section>
				<div class="w-full flex justify-center my-10 z-[3]">
					<app-btn classes="" color="gold" @click="showMore">
						<div v-if="categories.length > end">
							<span class="pe-5 text-[20px]">أضغط لأظهار انواع معاملات اكثر</span>
							<i
								class="icon-font-arrow-down w-[30px] !mt-0 h-[30px] flex items-center justify-center !text-yellow-19 bg-white rounded-[8px] animate-bounce"
							></i>
						</div>
						<div v-else>
							<span class="fw-lighter px-4">أضغط لأخفاء انواع معاملات الاخرى</span>

							<i
								class="icon-font-arrow-up w-[30px] !mt-0 h-[30px] flex items-center justify-center !text-yellow-19 bg-white rounded-[8px]"
							></i>
						</div>
					</app-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d"
import mixitup from "mixitup"

export default {
	layout: "default",
	auth: false,
	components: {
		Carousel3d,
		Slide,
	},

	data() {
		return {
			slides: 9,
			paginationEnabled: true,
			isActive: 0,
			currentPage: 0,
			end: 8,
			slider: [
				"طلب معاملة جديدة",
				"أقرب دائرة من موقعك",
				"أخبار الوزارة",
				"قوانين كاتب العدل",
				"معلومات مهمة",
				"كاتب العدل الإلكتروني",
				"قوانين حكومية",
				"مكاتب خدمات المواطنين",
				"الوزارة بين يديك",
				"تواصل مع الوزير",
				"حمل تطبيق كاتب العدل الإلكتروني",
				"بوابة وزارة العدل",
			],
			categories: [
				{
					title: "وكالة عامة مطلقة",
				},
				{
					title: "وكالة عامة للمحامين ",
				},
				{
					title: "وكالة خاصة للمركبات",
				},
				{
					title: "تسجيل ماكنة",
				},
				{
					title: "الكمبيالات",
				},
				{
					title: "وكالة خاصة للمركبات",
				},
				{
					title: "وكالة خاصة للمصارف",
				},
				{
					title: "العقود",
				},
				{
					title: "وكالة خاصة للوزارات الحكومية",
				},
				{
					title: "وكالة خاصة لتولي القاصر",
				},
				{
					title: "وكالة خاصة للعقارات",
				},
				{
					title: "وكالة خاصة للإيجار",
				},
				{
					title: "وكالة خاصة للمناقصات",
				},
				{
					title: "وكالة خاصة للمزايدات",
				},
				{
					title: "وكالة خاصة للبيع",
				},
				{
					title: "معاملة إنذار",
				},
				{
					title: "معاملة إبلاغ",
				},
				{
					title: "معاملة تسجيل مركبة",
				},
				{
					title: "معاملة تسجيل عقار",
				},
				{
					title: "وكالة خاصة لسفارة",
				},
				{
					title: "وكالة خاصة لفتح حساب",
				},
				{
					title: "وكالة خاصة لشراء",
				},
				{
					title: "معاملة تكرار الإبلاغ",
				},
				{
					title: "وكالة خاصة للمداولة",
				},
			],
		}
	},
	mounted() {
		mixitup(".favorite-services-items", {
			selectors: {
				target: ".mix",
			},
		})
	},
	methods: {
		onChanged: function (index) {
			this.currentPage = index
			this.isActive = this.currentPage
		},
		goToSlide(index) {
			this.$refs.mycarousel.goSlide(index)
		},
		SlideCarousel(value) {
			const current = this.currentPage
			const pageCount = this.slides
			if (value === "prev") {
				current !== 0
					? this.$refs.mycarousel.goSlide(current - 1)
					: this.$refs.mycarousel.goSlide(pageCount - 1)
			} else {
				current < pageCount - 1 ? this.$refs.mycarousel.goSlide(current + 1) : this.$refs.mycarousel.goSlide(0)
			}
		},
		openDetailModal() {
			this.$modal.visible("service-details")
		},
		navigateToLogin() {
			if (this.$auth.loggedIn) {
				return this.$router.push("/type")
			}
			this.$router.push(process.env.ROUTE_LOGIN)
		},
		showMore() {
			if (this.categories.length > this.end) {
				this.end += 8
			} else {
				this.end = 8
			}
		},
	},
}
</script>
<style lang="scss">
.favorite-services {
	.category-favorite {
		li {
			@apply ease-in-out duration-300 mx-3 rounded-[50px] border-2 border-transparent text-center py-2 2xl:py-3 px-4 2xl:px-6;
			span {
				@apply text-[16px] 2xl:text-[24px] font-light cursor-pointer text-blue-70;
			}

			&.mixitup-control-active {
				@apply bg-gradient-to-b from-blue-72 to-blue-73 border-2 border-blue-73;
				span {
					@apply text-white;
				}
			}
		}
	}

	.favorite-services-items {
		@apply p-0 flex flex-wrap;

		.favorite-services-item {
			@apply relative cursor-pointer overflow-hidden ease-in-out duration-500 border-[3px] border-blue-69 rounded-[65px] h-[300px] bg-blue-69 top-0 mb-[50px];
			@apply hover:top-[-30px] hover:sm:top-[-40px] hover:h-[380px] hover:mb-[-10px] hover:md:mb-[-50px];

			.item-after {
				@apply absolute inset-0 flex flex-col justify-center items-center m-auto px-[15px];

				.icon {
					@apply rounded-[50px] w-[90px] h-[90px] flex items-center justify-center my-[5px] mx-auto border-[3px] border-blue-69 bg-white text-blue-69 text-[30px];
				}

				span {
					@apply mx-auto text-white text-[26px];
				}

				.buttons {
					@apply w-full py-[15px] px-[30px] opacity-0 absolute top-[175px] ease-in-out duration-500;

					button {
						@apply w-full rounded-[50px] mb-[15px] cursor-pointer;
						&.blue-btn {
							@apply bg-gradient-to-b from-blue-72 to-blue-73 border-2 border-blue-73;
						}

						&.orange-btn {
							@apply bg-gradient-to-b from-yellow-22 to-yellow-23 border-2 border-yellow-23;
						}
					}
				}

				.txt {
					@apply absolute top-[50%] translate-y-[-50%] m-auto ease-in-out duration-500;
				}
			}
		}
	}
}
</style>
