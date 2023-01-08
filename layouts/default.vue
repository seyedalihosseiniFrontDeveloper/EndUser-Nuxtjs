<template>
	<div class="bg-blue-50 pattern relative">
		<div class="container mx-auto">
			<div
				:class="{
					active: is_open_sidebar,
				}"
				class="w-[320px] xl:w-full fixed xl:static right-[-320px] overflow-auto h-full xl:h-auto wrapper-sidebar ease-in duration-300 z-[15]"
			>
				<div
					:class="{
						'icon-font-menu': !is_open_sidebar,
						'icon-font-close-square': is_open_sidebar,
					}"
					class="!flex xl:!hidden fixed right-[0] z-[1] text-[35px] bg-gradient-to-r xl:bg-none from-blue-3 to-blue-4 text-white rounded-bl-[15px] rounded-tl-[15px] top-[15px] p-2 ease-in duration-300"
					@click="is_open_sidebar = !is_open_sidebar"
				></div>
				<lay-header @close="toggleOpenSidebar" :active-black-page="is_open_sidebar" />
			</div>
		</div>
		<nuxt />
		<lay-footer />
		<register-modals />
	</div>
</template>

<script>
export default {
	name: "default",
	middleware: [],
	data() {
		return {
			is_open_sidebar: false,
			is_open_header: false,
		}
	},
	methods: {
		toggleOpenSidebar() {
			this.is_open_sidebar = !this.is_open_sidebar
		},
	},

	head() {
		return {
			bodyAttrs: {
				dir: this.$i18n.locales.find(({ code }) => code === process.env.LANGUAGE).dir,
			},
		}
	},
}
</script>

<style lang="scss" scoped>
body {
	&:before {
		background-image: url("/img/home/bg-body.png");
	}
}
.pattern {
	@apply before:content-[''] before:absolute before:inset-0 before:bg-cover bg-repeat-x;
	&:before {
		background-image: url("/img/home/bg-body.png");
	}
}
.wrapper-sidebar {
	&.active {
		@apply right-[0];
		> div {
			@apply right-[320px];
		}

		@media screen and (max-width: 768px) {
			> div {
				@apply right-[320px];
			}
		}
		@media screen and (max-width: 380px) {
			> div {
				@apply right-[260px] rounded-[15px] text-[30px];
			}
		}
	}
}
</style>
