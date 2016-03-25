import React, { Component, PropTypes } from 'react'
import render from 'react-dom'
class SliderDot extends Component {
    constructor(){
        super()
    }

    render(){
        let slider = this.props.slider,
            active = this.props.active

        let sliderDotItem = slider.map(function(src, i) {
            return <SliderDotItem
                        active={ active }
                        flag={ i }
                        key={'slider_dot_' + i}
                    />
        })
        return(
            <ul className="slider-dot-wrap">
                { sliderDotItem }
            </ul>
        )
    }
}

class SliderDotItem extends Component {
    constructor(){
        super()
    }

    render(){
        let active = this.props.active,
              flag = this.props.flag

        let activeClass, activeFontClass
        if(active === flag){
                activeClass = 'active'
            activeFontClass = 'iconfont icon-radio01'
        } else {
                activeClass = 'unactive'
            activeFontClass = 'iconfont icon-radio02'
        }
        return(
            <li className={activeClass}>
                <i className={activeFontClass}></i>
            </li>
        )
    }
}

export default SliderDot
