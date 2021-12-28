<template>
  <listViewTop :playlist="state.playlist" />

  <listViewPlay :playlist="state.playlist" />
</template>

<script>
import { getListDetails } from "../api/index";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import listViewTop from "../components/listViewTop.vue";
import listViewPlay from "../components/listViewPlay.vue";
import store from "../store/index";

export default {
  components: { listViewTop, listViewPlay },
  setup() {
    const route = useRoute();
    let state = reactive({ list: [], playlist: { creator: {}, tracks: [] } });
    onMounted(async () => {
      let id = route.query.id;
      console.log(route);
      let result = await getListDetails(id);
      state.playlist = result.data.playlist;

      // 将音乐列表提交到store
      // store.commit('setPlaylist', state.playlist.tracks)
      // console.log(state.playlist);
      // console.log(result.data.playlist.tracks);
      store.commit("setPlaylist", result.data.playlist.tracks);
      
    });

    return { state };
  },
};
</script>

<style>
</style>