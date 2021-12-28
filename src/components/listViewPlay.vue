<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ playlist.tracks.length }}首)</div>
        </div>
      </div>
      <div class="right">
        <div class="btn">+收藏{{ changeValue(playlist.subscribedCount) }}</div>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="list">
      <!-- 点击歌曲的任意位置切换歌曲 -->
      <div class="playItem" v-for="(item, i) in playlist.tracks" :key="i" @click="setPlayIndex(i)">
        <div class="left">
          <div class="index">{{ i + 1 }}</div>
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="singer">
              <span class="tag" v-for="(tag, id) in playlist.tags" :key="id">{{
                tag
              }}</span>
              <span>{{ item.al.name }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gl-playSquare"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diandian"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ["playlist"],
  methods: {
    changeValue(num) {
      let res = 0;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + "亿";
      } else if (num >= 10000) {
        res = num / 10000;
        res = res.toFixed(2) + "万";
      } else {
        res = num;
      }
      return res;
    },

    ...mapMutations(['setPlayIndex'])
  },
};
</script>

<style lang="less" scoped>
.playlist {
  width: 7.5rem;
  margin-bottom: 1.5rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-radius: 0.3rem 0.3rem 0 0;
  margin-top: 0.3rem;

  .playlist-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.1rem;
      }

      .text {
        display: flex;
        align-items: center;
        .title {
          font-size: 0.4rem;
          font-weight: 900;
        }
        .num {
          font-size: 0.3rem;
          color: #333;
        }
      }
    }

    .right {
      .btn {
        font-size: 0.3rem;
        color: #fff;
        background-color: orangered;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.4rem;
        padding: 0.4rem 0.15rem;
        display: flex;
        align-items: center;
      }
    }
  }

  .list {
    margin: 0.2rem 0;
    .playItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;

      .left {
        display: flex;
        align-items: center;
        .index {
          color: #666;
          width: 0.3rem;
        }
        .content {
          margin-left: 0.4rem;
          .name {
            font-size: 0.3rem;
            font-weight: 900;
            color: #000;
            margin-bottom: 0.1rem;
          }
          .singer {
            color: #666;
            font-size: 0.2rem;
            .tag {
              font-size: 0.2rem;
              color: orangered;
              border: 1px solid orangered;
              border-radius: 0.1rem;
              margin: 0.05rem;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        .icon {
          margin: 0 0.05rem;
        }
      }
    }
  }
}
</style>