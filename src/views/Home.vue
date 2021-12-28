<template>
  <div class="home">
    <topNav />
    <swiper />
    <iconList />
    <musicList />
  </div>
</template>

<script>
import topNav from "../components/topNav.vue";
import swiper from "../components/swiper.vue";
import iconList from "../components/iconList.vue";
import musicList from "../components/musicList.vue";


export default {
  name: "Home",
  components: { topNav, swiper, iconList, musicList },

  data: function () {
    return {};
  },
  computed: {},
};
</script>

<style lang="less" scoped>

</style>
