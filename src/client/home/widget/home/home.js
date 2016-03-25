import React from 'react'
import { render } from 'react-dom'
import Slider from 'common/module/slider'

import './home.scss'

let imgs = document.querySelectorAll('img')


let srcList = []
Array.from(imgs, (_img, i) => {
    let sliderData = {
        src: _img.getAttribute('data-src'),
        title: '这是头条的标题' + i,
        href: 'http://baidu.com' + i
    }
    srcList.push(sliderData)
})

render(
    <Slider slider={srcList} />,

    document.querySelector('.carousel-wrap')
)
