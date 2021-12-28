import { createStore } from 'vuex'
import { getLyric, phoneLogin, userDetail } from '../api'
import api from '../api'

export default createStore({
  state: {
    playlist: [{
      name: "耿",
      id: 1374626245,
      al: {
        id: 79975609,
        name: "Cover 3",
        pic: 109951164179026400,
        picUrl: "http://p4.music.126.net/d4NVCM2HoJzbkcvGJLY-sg==/109951164179026393.jpg",
        pic_str: "109951164179026393",
      }
    }],
    lyric: '',
    currentTime: 0,
    intervalId: 0,
    playCurrentIndex: 0,
    user: {
      isLogin: false,
      // username: "未登录",
      account:{},
      detail: {}
    }
    
  },
  getters: {
    lyricList(state) {
      // console.log(state.lyric);
      let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {
        let min = parseInt(item.slice(1, 3));
        let sec = parseInt(item.slice(4, 6));
        let mill = parseInt(item.slice(7, 10));

        // console.log(min,sec,mill);
        return {
          min, sec, mill,
          lyric: item.slice(11,item.length),
          content: item,
          time: mill + sec * 1000 + min * 60 * 1000,
          pre: 0
        }
      })

      arr.forEach((item, i) => {
        if (i-1 < 0) {
          item.pre = 0;
        } else {
          item.pre = arr[i - 1].time
        }
      })

      // console.log(arr);
      return arr
    }
  },
  mutations: {
    setPlaylist(state, value) {
      state.playlist = value
    },
    pushPlaylist(state, value) {
      state.playlist.push(value)
    },
    setPlayIndex(state, i) {
      state.playCurrentIndex = i
    },
    setLyric(state, value) {
      state.lyric = value
    },
    setCurrentTime(state, value) {
      state.currentTime = value
    },
    setUser(state, value) {
      state.user = value
    }
  },
  actions: {
    async requestLyric(content, payload) {
      // console.log(payload);
      let result = await getLyric(payload.id)
      // console.log(result);
      content.commit('setLyric', result.data.lrc.lyric)
      console.log(result.data.lrc.lyric);
    },

    async login(content, payload) {
      // console.log(payload);
      let result = await phoneLogin(payload.phone, payload.password)
      console.log(result);
      // 验证登录状态
      if(result.data.code===200){
        content.state.user.isLogin = true
        content.state.user.account = result.data.account

        // 获取用户id和详情
        let res = await userDetail(result.data.account.id)
        console.log(res);
        content.state.user.detail = res.data

        // 本地保存登录状态
        localStorage.userData = JSON.stringify(content.state.user)


        content.commit('setUser', content.state.user)
      }else {
        alert('密码错误')
      }
      return result
    }
  },
  modules: {
  }
})
