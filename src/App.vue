<template>
  <div>
    <router-view></router-view>
    <playController />
  </div>
</template>

<script>
import playController from "./components/playController.vue";
export default {
  components: { playController },
  // 进入网页首先从本地获取登录数据更新到store的user
  mounted() {
    let userData = JSON.parse(localStorage.userData)
    console.log(userData);
    this.$store.commit('setUser', userData)
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '微软雅黑';
  text-decoration: none;
}

.icon {
  width: 0.3rem;
  height: 0.3rem;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  /* overflow: hidden; */
}
</style>
