<template>
  <div class="md:w-[705px] overflow-hidden rounded-3xl">
    <div class="flex items-center mb-2 relative">
      <div>
        <h3>الاسم</h3>
        <p>نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي </p>
      </div>
      <img src="~static/img/QR.png" alt="" class="w-1/2">
    </div>

    <div class="p-6 flex gap-10 justify-center">
      <app-btn
          color="red"
          class="!px-12 !justify-between !border-0 !flex !items-center"
      >
<!--        <i-->
<!--            class="icon-font-arrow-right !m-0 w-[25px] h-[25px] flex items-center justify-center bg-white !text-gray-12 rounded-[10px] !ml-4"-->
<!--        ></i>-->
        <span class="!text-[18px] mx-auto">رجوع</span>
      </app-btn>
      <app-btn
          color="green"
          class="!px-12 !justify-between !border-0 !flex !items-center"
      >
<!--        <i-->
<!--            class="icon-font-tick-square !m-0 w-[25px] h-[25px] flex items-center justify-center bg-white !text-gray-12 rounded-[10px] !ml-4"-->
<!--        ></i>-->
        <span class="!text-[18px] mx-auto">موافق</span>
      </app-btn>
    </div>

  </div>
</template>

<script>
export default {
  props: ["name", "data"],
  data() {
    return {
      active: "selectedFile",
      stream: "",
      binaryImage: null,
    }
  },
  methods: {
    changeImage({target}) {
      if (target.files && target.files[0]) {
        this.$modal.close(this.name, target.files[0])
      }
    },
    close() {
      this.$modal.close(this.name)
    },
    toggleWay(way) {
      this.active = way
    },
  },
}
</script>
<style lang="scss" scoped>
.bg-custom-gradient {
  background-image: linear-gradient(to left top, #bceefb, #d2f1ff, #e6f4ff, #f6f9ff, #ffffff);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(0.95);
  }
}

input[type=file], /* FF, IE7+, chrome (except button) */
input[type=file]::-webkit-file-upload-button {
  /* chromes and blink button */
  cursor: pointer;
}
</style>
