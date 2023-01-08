<template>
	<div class="px-0">
    <div class="flex justify-between items-center mb-2">
      <a href="" class="icon-font-close-square text-[30px] text-red-11"></a>
      <h4 class="text-[30px] text-black-2 mx-auto">تحرير النص</h4>
    </div>
    <div class="flex flex-col w-full h-full">
      <div class="custom-border-dashed w-full h-[300px] p-5">example</div>
      <div class="w-full pt-4 flex flex-wrap items-center justify-center mt-3">
        <div class="px-5 mb-6 lg:mb-0">
          <app-btn color="blue-bold" class="!px-10" >
            <i class="icon-font-tick-square"></i>
            <span class="!text-[18px]">يسجل</span>
          </app-btn>
        </div>
        <div class="px-5 mb-6 lg:mb-0">
          <app-btn color="red" class="!px-10" >
            <i class="icon-font-tick-square"></i>
            <span class="!text-[18px]">يلغي</span>
          </app-btn>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
export default {}
</script>
<style scoped lang="scss">
.upload-box {
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='%23AEAEAEFF' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='54' stroke-linecap='round'/%3e%3c/svg%3e");
	border-radius: 30px;
	width: max-content;
	padding: 10px;
	position: relative;
	cursor: pointer;

	input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		inset: 0;
		cursor: pointer;
	}
}
</style>
