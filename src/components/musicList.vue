<template>
  <div class="musicList">
    <div class="musicList-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicItem">
      <div class="swiper-container" id="mySwiper">
        <div class="swiper-wrapper">
          <router-link :to="{name: 'listView', query:{id:item.id}}" class="swiper-slide" v-for="(item, i) in musicList" :key="i">
            <img :src="item.picUrl" :alt="item.name" />
            <div class="name">{{ item.name }}</div>
            <div class="count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <span>{{ changeValue(item.playCount) }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import Swiper from "swiper";
// import axios from "axios";
import { getMusicList } from "../api/index";



// import { res } from 'vue'
// export default {
//     setup() {
//         let musicList = res([])

//         changeValue(num) {
//           let tmp = 0
//           if(num>=100000000) {
//               tmp = num/100000000
//               tmp = tmp.toFixed(2) + '亿'
//           }else if(num>=10000){
//               tmp = num/10000
//               tmp = tmp.toFixed(2) + '万'
//           }else {
//               tmp = num
//           }
//           }

//         return { musicList, changeValue }
//     }
// }

export default {
  data() {
    return {
      musicList: [],
    };
  },
  async mounted() {
    let res = await getMusicList(10);
    this.musicList = res.data.result;
    console.log(res);
  },
  updated() {
    var swiper = new Swiper("#mySwiper", {
      // 一次显示3个
      slidesPerView: 3,
      // 间距为10
      spaceBetween: 10,
    });
  },
  methods: {
      changeValue(num) {
          let res = 0
          if(num>=100000000) {
              res = num/100000000
              res = res.toFixed(2) + '亿'
          }else if(num>=10000){
              res = num/10000
              res = res.toFixed(2) + '万'
          }else {
              res = num
          }
          return res
      }
  }
};

</script>

<style lang="less" scoped>
.musicList {
  width: 7.5rem;
  padding: 0 0.4rem;

  .musicList-top {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      padding: 0.08rem;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.3rem;
    }
  }

  .musicItem {
    .swiper-container {
      width: 100%;
      height: 3rem;
      .swiper-slide {
        // background-color: blue;
        display: flex;
        flex-direction: column;
        position: relative;

        img {
          width: 100%;
          height: auto;
          border-radius: 0.2rem;
        }
        .name {
          height: 0.6rem;
          width: 100%;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #333; 
        }
        .count {
          position: absolute;
          display: flex;
          align-items: center;
          right: 0.1rem;
          top: 0.1rem;
          font-size: 0.24rem;
          color: #ccc;
        }
        .icon {
          fill: #ccc;
        }
      }
    }
  }
}

// 41.24
</style>