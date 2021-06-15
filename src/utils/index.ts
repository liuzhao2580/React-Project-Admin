import CryptoJS, { AES } from 'crypto-js'
/** 加密的秘钥 */
const cryptoKey = '小火车况且况且'
/** 一些常用的 工具类 */

/** 将枚举转换为 指定的格式 */
export const tranSpecifyType = (value, typeEnum): any => {
  return typeEnum[value]
}

/** 使用 crypto-js 加密*/
export const encryptByAES = (data: any) =>
  AES.encrypt(data, cryptoKey).ciphertext.toString().toUpperCase()

/** 使用 crypto-js 解密*/
export const decryptByAES = (data: any) =>
  AES.decrypt(data, cryptoKey).toString(CryptoJS.enc.Utf8)
