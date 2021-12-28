<template>
  <div id="swiper">
    <div class="swiper-container" id="swiperIndex">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(img, i) in imgs" :key="i">
          <img :src="img.pic" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
// import style (>= Swiper 6.x)
// import "swiper/swiper-bundle.css";
// import style (<= Swiper 5.x)
import "swiper/css/swiper.css";
import Swiper from "swiper";
// import axios from "axios";
import { getBanner } from "../api/index";

export default {
  async mounted() {
    var mySwiper = new Swiper("#swiperIndex", {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //   // 如果需要滚动条
      //   scrollbar: {
      //     el: ".swiper-scrollbar",
      //   },
    });

    // let res = await axios.get("http://localhost:3000/banner?type=1")
    let res = await getBanner(1);
    // .then((res) => {
    //   console.log(res);
    // });
    this.imgs = res.data.banners;
  },
  data() {
    return {
      imgs: [
        { pic: require("../assets/img/swiper1.jpg") },
        { pic: require("../assets/img/swiper2.jpg") },
        { pic: require("../assets/img/swiper3.jpg") },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#swiper {
  width: 7.5rem;
  .swiper-container {
    width: 7.1rem;
    height: 3.5rem;
    border-radius: 0.3rem;
  }
  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
  ::v-deep .swiper-pagination-bullet-active {
    background-color: red;
  }
}
</style>