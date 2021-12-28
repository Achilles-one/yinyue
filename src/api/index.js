import axios from "axios";

// let baseURL = 'http://music.cpengx.cn'
let baseURL = 'http://localhost:3000'

// 获取轮播图的api
// type:资源类型,对应以下类型,默认为 0 即PC
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
export function getBanner(type) {
    return axios.get(`${baseURL}/banner?type=${type}`)
}

// 获取推荐歌单
// 可选参数 : limit: 取出数量
export function getMusicList(limit) {
    return axios.get(`${baseURL}/personalized?limit=${limit}`)
}

// 获取歌单详情
export function getListDetails(id) {
    return axios.get(`${baseURL}/playlist/detail?id=${id}`)
}

// 获取歌词
export function getLyric(id) {
    return axios.get(`${baseURL}/lyric?id=${id}`)
}

// 搜索歌曲
export function searchMusic(keywords) {
    return axios.get(`${baseURL}/search?keywords=${keywords}`)
}

// 手机登录
export function phoneLogin(phone, password) {
    return axios.get(`${baseURL}/login/cellphone?phone=${phone}&password=${password}`)
}


// 获取用户详情
export function userDetail(userid) {
    return axios.get(`${baseURL}/user/detail?uid=${userid}`)
}

export default {
    getBanner,
    getMusicList,
    getListDetails,
    getLyric,
    searchMusic,
    phoneLogin,
    userDetail
}