<template>
  <div class="my">
    <img class="bg" :src="$store.state.user.detail.profile.backgroundUrl" alt="">
    <!-- 头部图标 -->
    <div class="topNav">
      <div class="topLeft">
        <svg
          class="icon"
          aria-hidden="true"
          @click="$router.push({ name: 'Home' })"
        >
          <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true" @click="$router.push({ name: 'Search' })">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>

    <!-- 用户头像和名字 -->
    <div class="user">
      <img :src="$store.state.user.detail.profile.avatarUrl" alt="" />
      <div class="content">
        <div class="name">{{ $store.state.user.detail.profile.nickname }}</div>
        <div class="lvl">{{ "Lv." + $store.state.user.detail.level }}</div>
        <div v-show="!$store.state.user.detail.profile.vipType" class="vip">
          你还未开通会员
        </div>
        <div v-show="$store.state.user.detail.profile.vipType" class="vip">
          你是尊贵的会员
        </div>
      </div>
    </div>

    <!-- 就是玩 -->
    <div class="songs">{{ '你听过'+$store.state.user.detail.listenSongs+'首歌' }}</div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="less" scoped>

.my {
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(90px);
    z-index: -10;
  }
.topNav {
  width: 7.5rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  .icon {
    width: 0.5rem;
    height: 0.5rem;
  }
}
.user {
  width: 7.5rem;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  margin: 0 1rem;
  img {
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid #fff;
    border-radius: 0.8rem;
    // margin: 0 0.1rem;
  }
  .content {
    width: 4rem;
    // padding: 0 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .name {
      font-weight: 900;
      font-size: 0.5rem;
    }
    .lvl {
      font-size: 0.4rem;
    }
    .vip {
      font-size: 0.3rem;
    }
  }
}
.songs {
  margin: 0.2rem auto;
  font-size: 1rem;
}
}
</style>