import React, { useState, useEffect } from 'react'

import E from 'wangeditor'
import hljs from 'highlight.js'

const ArticleCreate = () => {
  useEffect(() => {
    const editor = new E('#content')
    editor.config.uploadImgShowBase64 = true
    editor.create()
  }, [])
  return <div id="content"></div>
}
export default ArticleCreate
