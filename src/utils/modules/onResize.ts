const { body } = document
// 设置一个区域的大小 超过该宽度之后就是 小屏，需要隐藏侧边栏
const width = 992
/** 用来设置屏幕变化，侧边栏的显示隐藏 */
class OnResize {
  changeSideStatus: (flag: boolean)=> void
  constructor(changeSideStatus: (flag: boolean)=> void) {
    this.changeSideStatus = changeSideStatus
  }
  /** 屏幕变化的方法 */
  onResize(){
    const getClient = body.getBoundingClientRect()
    const mobile = getClient.width > width ? false : true
    this.changeSideStatus(mobile)
  }
  /** 监听屏幕变化开始 */
  listenResize(){
    window.addEventListener('resize', this.onResize.bind(this))
  }
}

export default OnResize
