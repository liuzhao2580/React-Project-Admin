import React, { useEffect } from "react"

export default prop => {
  console.log(prop, "prop")
  useEffect(() => {
    prop.init()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [onResize, prop])
  const onResize = () => {
    prop.echartDom.resize()
  }
  return (
    <div
      id={prop.echartId}
      className='echart-box'
      style={{ height: prop.height || "300px" }}
    ></div>
  )
}
