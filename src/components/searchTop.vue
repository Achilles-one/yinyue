<template>
  <div class="searchTop">
    <!-- 头部 -->
    <div class="searchTopNav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
      </div>
      <div class="right">
        <input
          type=""
          v-model="searchKeyword"
          :placeholder="placeholder"
          @keydown.enter="saveKeyword"
        />
      </div>
    </div>

    <!-- 历史记录 -->
    <div class="history" v-show="searchSongs.length===0">
      <div class="hisLeft">历史</div>
      <div class="hisRight">
        <div @click="searchHistory(item)" class="keywordItem" v-for="(item, i) in keywordList" :key="i">
          {{ item }}
        </div>
      </div>
    </div>
    


      <div class="searchSongs" v-show="searchSongs.length!==0">
    <div class="searchSongs-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ searchSongs.length }}首)</div>
        </div>
      </div>
      <div class="right">
        <!-- <div class="btn">+收藏{{ changeValue(searchSongs.subscribedCount) }}</div> -->
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="list">
      <!-- 点击歌曲的任意位置切换歌曲 -->
      <div class="playItem" v-for="(item, i) in searchSongs" :key="i" @click="setPlay(item,i)">
        <div class="left">
          <div class="index">{{ i + 1 }}</div>
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="singer">
              <span>{{ item.album.name }}</span>
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
  </div>
</template>

<script>
import {searchMusic} from '../api'

export default {
  data() {
    return {
      placeholder: "五月天",
      keywordList: [],
      searchKeyword: "",
      searchSongs: [],
    };
  },
  beforeMount() {
    this.keywordList = localStorage.keywordList
      ? JSON.parse(localStorage.keywordList)
      : [];
  },
  methods: {
    async saveKeyword() {
      this.keywordList.push(this.searchKeyword);
      // 去掉重复的
      this.keywordList = Array.from(new Set(this.keywordList))
      // 历史记录不超过10个
      if(this.keywordList.length > 10) {
        this.keywordList = this.keywordList.slice(this.keywordList.length-10, this.keywordList.length)
      }

      localStorage.keywordList = JSON.stringify(this.keywordList);
      let result = await searchMusic(this.searchKeyword)
      console.log(result.data.result.songs);
      this.searchSongs = result.data.result.songs
      this.searchKeyword = "";
    },
    searchHistory(keyword) {
      this.searchKeyword = keyword
      this.saveKeyword()
    },
    setPlay(item, i) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('pushPlaylist', item)
      this.$store.commit('setPlayIndex', this.$store.state.playlist.length-1)
    }
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 7.5rem;
  height: calc(100vh-1.2rem);
  // overflow: scroll;
  padding: 0 0.4rem;
  .searchTopNav {
    display: flex;
    width: 100%;
    height: 1.2rem;
    padding: 0 0.4rem;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #666;
    }
    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;
      }
    }
  }

  .history {
    display: flex;
    margin-top: 1.2rem;

    .hisLeft {
      width: 1rem;
      height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0;
      line-height: 0.6rem;

    }
    .hisRight {
      color: #666;
      display: flex;
    //   自动换行
      flex-wrap: wrap;
      flex: 1;
      .keywordItem {
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }


  .searchSongs {
  width: 7.5rem;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem 0 0.2rem;
  background-color: #fff;
  border-radius: 0.3rem 0.3rem 0 0;
  position: fixed;
  top: 1.2rem;
  bottom: 0.2rem;
  overflow: scroll;

  .searchSongs-top {
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
}
</style>