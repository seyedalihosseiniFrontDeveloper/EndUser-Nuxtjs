<template>
	<div class="flex flex-col h-full pb-3 2xl:pb-10 2xl:pt-[190px]">
    <div class="h-full p-2 w-full bg-gradient-to-r from-blue-48 to-blue-49 flex flex-col relative rounded-b-[30px] shadow-admin">
      <div
          class="flex p-3 items-end rounded-b-xl 2xl:absolute w-[160px] md:w-[160px] h-[160px] left-0 right-0 2xl:top-[-190px] mx-auto"
          @click="$i18n.setLocale($i18n.locale === 'fa' ? 'en' : 'fa')"
      >
        <img alt="LOGO" loading="lazy" class="" src="/img/logo.svg" />
      </div>
      <div class="">
        <div class="flex flex-col mx-5 justify-center 2xl:absolute left-0 right-0 top-[-16px] z-[1] text-center">
          <h1 class="text-[30px] text-white">وزارة العدل</h1>
        </div>
        <img alt="curve" loading="lazy" class="absolute top-[-90px] w-full right-0 hidden 2xl:block" src="/img/curve.png" />
      </div>
      <ul class="p-4 menu w-full mb-11 mt-5 2xl:mt-[60px]">
        <li class="active">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>الرئيسية</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
        <li class="">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>دوائر كاتب العدل</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
        <li class="active">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>الرسوم المالية</span>
            <i class="icon-font-arrow-down"></i>
          </a>
        </li>
        <li class="">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>الحوالات المالیة</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
        <li class="">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>الحسابات المصرفی</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
        <li class="">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>الحرکات المالیة</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
        <li class="">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>موظفین القسم المالی</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
        <li class="">
          <a href="">
            <i class="icon-font-book-square"></i>
            <span>تعریفة المعاملات</span>
            <i class="icon-font-arrow-left"></i>
          </a>
        </li>
      </ul>
      <div class="bg-white rounded-[20px] mt-auto px-3 py-2 flex items-center cursor-pointer w-[90%] mx-auto mb-3 mt-auto">
        <i class="icon-font-setting-2 text-[18px] text-gray-1-63 font-bold p-2 bg-gray-2 rounded-[14px]"></i>
        <span class="ms-16 text-black-2 font-bold text-[20px]">ضبط</span>
      </div>
    </div>
	</div>
</template>

<script>
export default {}
</script>
