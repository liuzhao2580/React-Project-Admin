import React from 'react'

export default prop => {
  console.log(prop, 'prop')
  // useEffect(() => {
  //   prop.init()
  //   // window.addEventListener("resize", onResize)
  //   // return () => {
  //   //   window.removeEventListener("resize", onResize)
  //   // }
  // }, [prop])
  return (
    <div
      id={prop.echartId}
      className="echart-box"
      style={{ height: prop.height || '300px' }}
    ></div>
  )
}
