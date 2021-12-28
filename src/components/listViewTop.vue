<template>
  <div class="listViewTop">
    <img class="bg" :src="playlist.coverImgUrl" alt="" />

    <!-- 头部 -->
    <div class="listViewTopNav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
        <div class="title">歌单</div>
      </div>

      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-diandian"></use>
        </svg>
      </div>
    </div>

    <!-- 图片和作者 -->
    <div>
      <div class="content">
        <div class="contentLeft">
          <img :src="playlist.coverImgUrl" alt="" />
          <div class="count">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <span>{{ changeValue(playlist.playCount) }}</span>
          </div>
        </div>

        <div class="contentRight">
          <h3>{{ playlist.name }}</h3>
          <div class="author">
            <img :src="playlist.creator.avatarUrl" alt="" class="header" />
            <span>{{ playlist.creator.nickname }}</span>
          </div>
          <div class="description">{{ playlist.description }}</div>
        </div>
      </div>

      <!-- 四个图标 -->
      <div class="iconList">
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liaotian"></use>
          </svg>
          <span>{{ changeValue(playlist.commentCount) }}</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <span>{{ changeValue(playlist.shareCount) }}</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
          <span>下载</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-show_duoxuan"></use>
          </svg>
          <span>多选</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="less" scoped>
.listViewTop {
  width: 7.5rem;
  padding: 0.1rem 0.4rem;
  // height: 6rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    z-index: -1;
    filter: blur(40px);
  }

  .listViewTopNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.1rem;
    font-size: 0.4rem;

    .back {
      display: flex;
      color: #fff;

      .title {
        margin-left: 0.4rem;
      }
    }
    .right {
      display: flex;
      color: #fff;

      .search {
        margin-right: 0.5rem;
      }
    }

    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0;

    .contentLeft {
      position: relative;
      img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.1rem;
      }
      .count {
        position: absolute;
        display: flex;
        align-items: center;
        right: 0.1rem;
        top: 0.1rem;
        font-size: 0.24rem;
        color: #ccc;
        font-weight: 900;
      }
    }

    .contentRight {
      width: 3.5rem;
      h3 {
        color: #fff;
      }

      .author {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.2rem;
        }
        span {
          color: #eee;
          font-size: 0.26rem;
        }
      }

      .description {
        font-size: 0.24rem;
        color: #aaa;
        // 设置多行文字隐藏为两行文字加省略号
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .iconList {
    display: flex;
    justify-content: space-around;
    .iconItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: #fff;
      }
      span {
        font-size: 0.3rem;
        color: #fff;
        padding-top: 0.2rem;
      }
    }
  }
}
</style>