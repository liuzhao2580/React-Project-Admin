/** 一些常用的 工具类 */

/** 将枚举转换为 指定的格式 */
export const tranSpecifyType = (value, typeEnum): any => {
  return typeEnum[value]
}
