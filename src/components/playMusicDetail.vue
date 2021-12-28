<template>
  <div class="playMusic">
    <!-- 背景 -->
    <div
      class="bg"
      :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"
    ></div>

    <!-- 头部 -->
    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
      </div>
      <div class="gundong">
        <!-- 跑马灯 -->
        <marquee behavior="scroll" direction="left">
          <div class="title">{{ playDetail.name }}</div>
          <div class="singer">({{ playDetail.al.name }})</div>
        </marquee>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>

    <!-- 中间图标 -->
    <div class="playContent" v-show="!showLyric">
      <img class="zhen" :class="{active:!show}" src="../assets/img/zhen.png" alt="" />
      <img class="playing" src="../assets/img/playing.png" alt="" />
      <img class="pic" :src="playDetail.al.picUrl" alt="" />
    </div>

    <!-- 歌词 -->
    <div class="playLyric" v-show="showLyric" ref="playLyric">
      <!-- {{ $store.state.lyric }} -->
      <!-- <p class="active" v-for="(item,i) in $store.state.lyric.split(/\n/igs)" :key="i">{{ item }}</p> -->
      <!-- <p :class="{active: (currentTime*1000===item.pre1&& currentTime*1000===item.pre2)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{ item.lyric }}</p> -->
      <!-- <p :class="{active: (currentTime>=item.pre && currentTime<=item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{ item.lyric }}</p> -->
      <p :class="{active: (currentTime*1000>=item.pre && currentTime*1000<item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{ item.lyric }}</p>
      </div>

    <!-- 播放进度条 -->
    <div class="playProgress"></div>

    <!-- 底部 -->
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuanbofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>

      <svg v-if="show" class="icon play" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon play" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg>

      <!-- <svg class="icon play" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg> -->
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeLyric">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['playDetail', 'show', 'playMusic'],
  data() {
    return {
      showLyric:false
    }
  },
  computed: {
    ...mapState(['lyric', 'currentTime', 'playlist', 'playCurrentIndex']),
    
  },
  methods: {
    goPlay(num) {
      console.log(num);
      console.log(this.playlist);
      console.log(this.playCurrentIndex);
      let index = this.playCurrentIndex+num
      if(index<0){
        index = this.playlist.length - 1
      }else if(index === this.playlist.length){
        index = 0
      }
      this.$store.commit('setPlayIndex', index)
    },
    changeLyric() {
      this.showLyric = !this.showLyric
    }
  },
  watch: {
    currentTime(newValue) {
      console.log(newValue);
      console.log([this.$refs.playLyric]);
      let p = document.querySelector('p.active')
      console.log([p]);
      let offsetTop = p.offsetTop;
      console.log(offsetTop);
      this.$refs.playLyric.scrollTop = p.offsetTop
    }
  }
}
</script>

<style lang="less" scoped>
.playMusic {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
  }
  .playTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
    }
    marquee {
      width: 5rem;
      //   flex: 1;
    }
  }

  .playContent {
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;
    .zhen {
      width: 2.5rem;
      height: auto;
      position: absolute;
      left: 3.5rem;
      transform-origin: 0.3rem 0.3rem;
      transform: rotate(-10deg);
      transition: all 1s;
      z-index: 1;
    }
    .zhen.active {
      width: 2.5rem;
      left: 3.5rem;
      height: auto;
      position: absolute;
      transform-origin: 0.3rem 0.3rem;
      transform: rotate(4deg);
      transition: all 1s;
      z-index: 1;
    }
    .playing {
      width: 5.5rem;
      height: auto;
      position: absolute;
      left: calc(50% - 2.75rem);
      top: 2.5rem;
    }
    .pic {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 1.7rem;
      position: absolute;
      left: calc(50% - 1.7rem);
      top: 3.55rem;
    }
  }


  .playLyric {
    position: absolute;
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: calc(50% - 4rem);
    overflow: scroll;
    text-align: center;
    color: #fff;
    padding: 0.2rem 0;
    .active {
      color: red;
    }
  }

  .playFooter {
    width: 7.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
    }
    .play {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>