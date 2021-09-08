import React, { FC } from 'react'

/** 自定义的菜单 icon  */
const CustomIconCom: FC<{ iconPath: String }> = ({ iconPath }) => {
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${iconPath}`}></use>
    </svg>
  )
}

export default CustomIconCom
