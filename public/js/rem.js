// 设计稿一般按iphone的750来
function remSize() {
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if(deviceWidth >= 750) {
        deviceWidth = 750
    }
    if(deviceWidth <= 320) {
        deviceWidth = 320
    }
    // 设置像素，1rem = 100px
    document.documentElement.style.fontSize = (deviceWidth/7.5) + 'px'
    // 设置字体大小为30px
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
    // 宽度为375时，fontSize为50px
    // 表达一半的宽度就是3.75rem
}

remSize()

// 当窗口发生变化的时候
window.onresize = function() {
    remSize()
}