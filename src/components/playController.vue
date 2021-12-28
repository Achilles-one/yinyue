<template>
  <div class="playController">
    <div class="left" @click="showDetail = !showDetail">
      <img
        :src="$store.state.playlist[$store.state.playCurrentIndex].al.picUrl"
        alt=""
      />
      <div class="content">
        <div class="title">
          {{ $store.state.playlist[$store.state.playCurrentIndex].name }}
        </div>
        <div class="tips">横滑可以切换上下首</div>
      </div>
    </div>

    <div class="right">
      <svg v-if="show" class="icon" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <playMusicDetail
      :show="show"
      :playMusic="playMusic"
      @back="showDetail = !showDetail"
      v-show="showDetail"
      :playDetail="$store.state.playlist[$store.state.playCurrentIndex]"
    />

    <!-- <audio controls="controls" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio> -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${
        $store.state.playlist[$store.state.playCurrentIndex].id
      }.mp3`"
    ></audio>
  </div>
</template>

<script>
import playMusicDetail from "../components/playMusicDetail.vue"
import { mapState, mapMutations } from "vuex";
export default {
  components: { playMusicDetail },
  data() {
    return {
      show: true,
      showDetail: false,
    };
  },
  computed: {
    ...mapState([" playlist", "playCurrentIndex"]),
  },
  updated() {
    // console.log(this.playlist[this.playCurrentIndex].al);
    this.$store.dispatch('requestLyric', {id: this.$store.state.playlist[this.$store.state.playCurrentIndex].id} )

  },
  mounted() {
    console.log([this.$refs.audio]);
    this.$store.dispatch('requestLyric', {id: this.$store.state.playlist[this.$store.state.playCurrentIndex].id} )
    // console.log(this.$store.state.playlist[this.$store.state.playCurrentIndex].id);
  },
  methods: {
    playMusic() {
      // console.log(this.$refs.audio.currentTime);
      if (this.$refs.audio.paused) {
        console.log(this.show);
        this.show = false;
        this.$refs.audio.play();
        this.UpdateTime()
      } else {
        console.log(this.show);
        this.show = true;
        this.$refs.audio.pause();
        clearInterval(this.$store.state.id)
      }
      console.log([this.$refs.audio]);
    },
    UpdateTime() {
      this.$store.state.id = setInterval(() => {
      this.$store.commit('setCurrentTime', this.$refs.audio.currentTime)

      },1000)
    }
  },
};
</script>


<style lang="less" scoped>
.playController {
  z-index: 1000;
  background-color: #fff;
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  .left {
    display: flex;
    padding: 0 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .content {
      padding: 0 0.2rem;
      .tips {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }

  .right {
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 0.2rem;
    }
  }
}
</style>