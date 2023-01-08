<template>
	<div
		class="splash flex flex-col xl:flex-row items-center xl:items-end justify-between h-full overflow-auto bg-white relative"
	>
		<div
			class="animate-box w-[90%] md:w-[80%] mx-auto rounded-b-[80px] md:rounded-b-[150px] top-0 absolute inset-x-0 bg-gradient-to-b from-blue-4-77 to-blue-4-12 ease-in-out duration-300"
		></div>
		<div class="box__splash z-[1]">
			<div class="mb-[3.5rem] -mt-14">
				<div>
					<lottie
						:autoplay="true"
						:loop="false"
						speed="0.5"
						class="w-[30rem] mb-4"
						src="/assets/jsons/json/logoLoading.json"
					/>
				</div>
				<div class="title--splash flex flex-col items-center mt-5">
					<h1>وزارة العدل</h1>
					<h2 class="font_number mt-2 !font-calibri">Ministry of Justice</h2>
				</div>
			</div>
			<!--			<div class="progress-bar&#45;&#45;splash"></div>-->
			<div class="btn--splash">
				<app-btn
					color="blue-bold"
					class="!w-[280px] xs:!w-[350px] !px-5 xs:!px-10 btn-special"
					@click="navigateToHome"
				>
					<span class="!text-[18px] xs:!text-[22px] px-2 xs:px-5"> كاتب العدل الإلكتروني </span>
					<i
						class="icon-font-arrow-left ltr-rotate-[180deg] w-[25px] h-[25px] flex items-center justify-center bg-white !text-blue-7 rounded-[8px] !mt-0"
					></i>
				</app-btn>
			</div>
		</div>

		<div
			class="animate-box w-[90%] md:w-[80%] mx-auto rounded-t-[80px] md:rounded-t-[150px] bottom-0 absolute inset-x-0 bg-gradient-to-t from-blue-4-77 to-blue-4-12 ease-in-out duration-300 z-[2]"
		></div>
	</div>
</template>

<script>
import Lottie from "../share/components/Lottie"
export default {
	components: { Lottie },
	layout: "none",
	auth: false,
	methods: {
		navigateToHome() {
			this.$router.push("/home")
		},
	},
}
</script>

<style lang="scss" scoped>
.animate-box {
	&:first-child {
		@apply h-[62vh];
		animation: animate-box-t 1s;
	}
	&:last-child {
		@apply h-[23vh];
		animation: animate-box 1s;
	}

	@keyframes animate-box-t {
		0% {
			@apply h-[5vh];
		}
		100% {
			@apply h-[62vh];
		}
	}
	@keyframes animate-box {
		0% {
			@apply h-[5vh];
		}
		100% {
			@apply h-[23vh];
		}
	}
}

.splash {
	overflow: hidden;

	.box__splash {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		margin: auto;
		animation: splash 1s;
		@keyframes splash {
			0% {
				transform: scale(4);
			}
			100% {
				transform: scale(1);
			}
		}

		.logo--splash {
			display: flex;
			align-items: center;
			justify-content: center;
			transition: none;
			animation: spin 5s infinite;

			img {
				width: 30%;
				margin-bottom: 15px;
			}

			@keyframes spin {
				0%,
				40% {
					transition: none;
					transform: rotateY(0deg);
				}
				60%,
				100% {
					transform: rotateY(360deg);
				}
			}
		}

		.title--splash {
			text-align: center;

			h1 {
				background: -webkit-linear-gradient(145deg, #0064c8, #34daf5, #34daf5);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				font-size: 36px;
				width: 200px;
				line-height: 1.4;
			}

			h2 {
				color: #878787;
				font-weight: normal;
				font-size: 20px;
			}
		}

		.progress-bar--splash {
			background-color: #e5e5e5;
			border-radius: 20px;
			position: relative;
			animation: progress-bar-bg 4s linear 3s;
			@keyframes progress-bar-bg {
				0% {
					width: 20%;
					height: 7px;
					display: block;
				}
				100% {
					width: 20%;
					height: 7px;
					display: none;
				}
			}

			&::after {
				position: absolute;
				content: "";
				left: 0;
				height: 7px;
				background-color: #00a7ff;
				box-shadow: 0 0 15px rgba(0, 100, 200, 0.58);
				border-radius: 20px;
				animation: progress-bar-splash 5s linear 4s;
				@keyframes progress-bar-splash {
					0% {
						width: 0;
					}
					20% {
						width: 10%;
					}
					45% {
						width: 30%;
					}
					70% {
						width: 80%;
					}
					100% {
						width: 100%;
					}
				}
			}
		}

		.btn--splash {
			.btn-special {
				margin: 0;
				width: 350px;
				justify-content: space-between !important;
				padding: 15px 80px 15px 15px;

				&:hover {
					width: 380px;
				}

				.icon {
					img {
						padding: 5px;
						width: 40px;
						background: white;
						border-radius: 12px;
					}
				}

				animation: btn-splash 1.3s;
				@keyframes btn-splash {
					0% {
						opacity: 0;
					}
					99.9% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}
			}
		}
	}
	.footer {
		animation: btn-splash 2.3s;
		@keyframes btn-splash {
			0% {
				opacity: 0;
			}
			99.9% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	}
}
</style>
