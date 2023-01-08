const dev = process.env.NODE_ENV === "development"
const proxy = dev && {
	"/api/": { target: process.env.BASE_URL },
	"/test-server-api/": { target: "http://test-server/", pathRewrite: { "^/test-server-api": "/api" } },
	"/base-api/": { target: "http://base-api/", pathRewrite: { "^/base-api": "/api" } },
}
export default {
	ssr: true,
	server: {
		port: 5000,
	},
	target: "static",

	head: {
		title: process.env.APP_NAME,

		htmlAttrs: {
			lang: process.env.LANGUAGE,
			dir: ["fa", "ar"].includes(process.env.LANGUAGE) ? "rtl" : "ltr",
		},

		bodyAttrs: {
			class: "rtl",
		},

		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
			},
			{ hid: "description", name: "description", content: "" },
			{
				name: "format-detection",
				content: "telephone=no",
			},
			{ name: "theme-color", content: "#FA4252" },
			{
				name: "format-detection",
				content: "telephone=no",
			},
		],

		link: [{ rel: "icon", type: "image/x-icon", href: "/img/favicon.ico" }],
	},

	components: {
		dirs: ["~/components", "~/share/components"],
	},

	loadingIndicator: "~/loading-indicator.html",
	router: {
		middleware: ["auth"],
	},
	css: ["~assets/css/tailwind.css", "~/share/assets/css/app.css", "~assets/scss/main.scss", "~assets/css/app.css"],

	plugins: [
		"~/plugins/signalR",
		"~/plugins/versionCheck",
		"~/plugins/swRegister",
		"~/share/plugins/api",
		"~/share/plugins/toast",
		"~/share/plugins/moment",
		"~/share/plugins/axios",
		"~/share/plugins/cfg",
		"~/share/plugins/hasKey",
		"~/share/plugins/callHandler",
		"~/share/plugins/filters",
		"~/share/plugins/veeValidate",
	],

	modules: [
		"v-wave/nuxt",
		"@nuxtjs/i18n",
		"@nuxtjs/axios",
		"@nuxtjs/auth-next",
		"@s3rver/nuxt-modal",
		"vue-toastification/nuxt",
	],

	buildModules: ["@nuxtjs/dotenv", "cookie-universal-nuxt", "@nuxt/postcss8"],

	vWave: {
		color: "white",
		easing: "ease-out",
		duration: 0.5,
		dissolveDuration: 0.15,
		cancellationPeriod: 75,
	},

	axios: {
		baseURL: process.env.BASE_URL, //main
		proxy: dev,
	},
	proxy,
	i18n: {
		locales: [
			{
				code: "fa",
				file: "fa.js",
			},
			{
				code: "en",
				file: "en.js",
			},
			{
				code: "ar",
				file: "ar.js",
			},
		],

		lazy: true,
		defaultLocale: "fa",
		langDir: "locales/",
		strategy: "no_prefix",

		detectBrowserLanguage: {
			cookieKey: "locale",
		},
	},

	auth: {
		strategies: {
			local: {
				user: {
					property: "data",
				},

				token: {
					maxAge: 60 * 60 * 24 * 30, // 30 days
				},

				endpoints: {
					user: {
						url: "/api/Init",
						method: "get",
					},

					logout: false,
				},
			},
		},

		redirect: {
			login: process.env.ROUTE_LOGIN,
			logout: "/",
			home: "/",
			callback: process.env.ROUTE_LOGIN,
		},

		watchLoggedIn: false,
	},

	build: {
		transpile: ["vee-validate/dist/rules"],

		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
	},
	optimization: {
		splitChunks: {
			maxSize: 30000,
		},
	},
}
