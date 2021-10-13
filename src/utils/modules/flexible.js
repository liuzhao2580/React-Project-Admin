let tid
function refreshRem() {
  let designSize = 1440 // 设计图尺寸
  let html = document.documentElement
  let wW = html.clientWidth // 窗口宽度
  let rem = (wW * 100) / designSize
  if (rem >= 100) rem = 100
  document.documentElement.style.fontSize = rem + "px"
}

refreshRem()
window.addEventListener(
  "resize",
  function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  },
  false,
)
window.addEventListener(
  "pageshow",
  function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  },
  false,
)
