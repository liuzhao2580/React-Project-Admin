import React, { FC } from 'react'

interface ICustom {
  iconPath: String
}

/** 自定义的菜单 icon  */
const CustomIconCom: FC<ICustom> = ({ iconPath }) => {
  return (
    <svg className="icon custom-svg" aria-hidden="true">
      <use xlinkHref={`#${iconPath}`}></use>
    </svg>
  )
}

export default CustomIconCom
