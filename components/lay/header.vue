<template>
	<div
		class="flex flex-col container xl:relative z-[10] mx-auto top-0 h-full xl:h-auto xl:w-auto bg-gradient-to-t xl:bg-none from-blue-3 to-blue-4 pt-16"
	>
		<section class="header-home">
			<section class="order-1 xl:order-none right-menu flex items-center">
				<ul class="flex flex-col xl:flex-row items-center justify-around mb-0 w-full">
					<li>
						<NuxtLink :to="navigateToLogin" class="">أصدار معاملة جديدة</NuxtLink>
					</li>
					<li>
						<a class="" href="">بوابة مكاتب الخدمات</a>
					</li>
					<li>
						<a class="" href="">أخبار الوزارة</a>
					</li>
				</ul>
			</section>
			<section class="order-none xl:order-1 center-menu shrink-0">
				<img alt="" class="center-menu-crew" loading="lazy" src="/img/home-curve-1.png" />
				<div class="center-menu-logo">
					<img alt="logo" loading="lazy" src="/img/logo.svg" />
				</div>
			</section>
			<section class="order-2 xl:order-2 left-menu flex items-center">
				<ul class="flex flex-col xl:flex-row items-center justify-around mb-0 w-full">
					<li>
						<a class="" href="">التعليمات المهمة </a>
					</li>
					<li>
						<a class="" href="" @click.prevent="showLogin">تسجيل دخول المواطنين</a>
					</li>
					<li>
						<a class="" href="">اتصل بنا</a>
					</li>
				</ul>
			</section>
		</section>
		<section class="last-news-home h-[54px] py-4 px-4 items-center hidden xl:flex">
			<span class="text-[14px] text-white truncate w-[70px]">أخر الأخبار</span>
			<i class="icon-font-information last-news-home-img text-white"></i>
			<marquee
				class="last__news--home--text text-white font-18"
				direction="right"
				loop="infinite"
				scrollamount="10"
				width="100%"
			>
				العراق في ميدان التكنولوجيا والتحول الرقمي ░ ☼ ░ وزارة العدل العراقية تطلق مشروع الوكالة الألكترونية
				المتطور ░ ☼ ░ عالم الأتميشن بين يدي المواطن العراقي ░ ☼ ░ أنجاز الخدمات بالسرعة القصوى والسرية التامة ░
				☼ ░ بوابة كاتب العدل الألكتروني في العراق الحبيب ░ ☼ ░ بوابة الوكالة الألكترونية في مشروع الأتميشن
				المتطور في وزارة العدل العراقية ░ ☼ ░
			</marquee>
		</section>
		<div v-if="activeBlackPage" @click="togglePage" class="black-page"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			intervalIdCurrentTime: null,
			currentTime: this.$moment().format("HH:mm:ss"),
		}
	},
	props: ["activeBlackPage"],
	methods: {
		showLogoutDetailsModal(e) {
			this.$modal.visible("logout")
			e.preventDefault()
		},
		togglePage() {
			this.$emit("close")
		},
		showLogin() {
			this.$modal.visible("login")
		},
	},
	computed: {
		navigateToLogin() {
			if (this.$auth.loggedIn) {
				return "/type"
			}
			return process.env.ROUTE_LOGIN
		},
	},

	mounted() {
		this.intervalIdCurrentTime = setInterval(() => (this.currentTime = this.$moment().format("HH:mm:ss")), 1000)
	},

	beforeDestroy() {
		clearInterval(this.intervalIdCurrentTime)
	},
}
</script>
<style lang="scss">
.black-page {
	background: #00000052;
	width: 100%;
	height: 100%;
	position: fixed;
	inset: 0;
	z-index: -1;
}
.header-home {
	@apply flex items-center w-full 2xl:w-[80%] 3xl:w-[66%] mt-[10px] mx-auto mb-[7px] flex-col xl:flex-row;

	.right-menu,
	.left-menu {
		@apply xl:bg-gradient-to-t from-blue-3 to-blue-4 xl:h-[72px] w-full xl:shadow-[0_7px] xl:shadow-blue-43;
		> ul {
			li {
				> a {
					color: white;
				}
			}

			li {
				@apply py-4 xl:py-0;
				a {
					@apply text-[22px] xl:text-[18px];
				}
			}
		}
	}

	.right-menu {
		border-radius: 0 50px 50px 0;

		> ul {
			@apply xl:ps-5;
		}
	}

	.center-menu {
		@apply relative xl:shadow-[0_7px] xl:shadow-blue-43;

		.center-menu-crew {
			@apply h-[72px] hidden xl:block;
		}

		.center-menu-logo {
			@apply relative xl:absolute inset-0 m-auto flex items-center justify-center xl:top-[-60px] ps-2;

			img {
				@apply h-[115px];
			}
		}
	}

	.left-menu {
		border-radius: 50px 0 0 50px;

		> ul {
			@apply xl:pe-5;
		}
	}
}

.last-news-home {
	@apply bg-gradient-to-t from-yellow-5 to-yellow-11 rounded-[50px] mx-auto mb-5 mt-auto w-[90%] xl:w-[57.8%];
	.last-news-home-img {
		border-radius: 10px;
		background: linear-gradient(45deg, rgba(233, 233, 233, 0.36) 0, rgba(0, 0, 0, 0.36) 100%);
		padding: 5px;
	}

	//::before {
	//	content: "\e81b";
	//}
	.last-news-home-text {
		margin: 0 15px;
		color: white;
		font-size: 14px;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
