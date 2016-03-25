import __style from './slider.scss'
import iconfont from 'common/static/libs/iconfont/iconfont.css'

import React, { Component, PropTypes } from 'react'
import render from 'react-dom'

import SliderItem from './sliderItem'
import SliderDot from './sliderDot'
import SliderArrow from './sliderArrow'
import SliderTitle from './sliderTitle'
import SliderLength from './sliderLength'

class Slider extends Component {
    constructor(){
        super()
        this.state = {
            active: 0,
            slider: null,
             timer: null
        }
    }

    // 下一个
    // 如果下一个的索引和传入的相同，那么将从0开始计算
    nextSlide() {
        let slideIndex = this.state.active + 1 < this.props.slider.length ? this.state.active + 1 : 0

        this.setState({
            active: slideIndex
        })
    }

    // 上一个
    // 如果上一个的数值小于0则从最后一个开始
    prevSlide() {
        let slideIndex = this.state.active - 1 < 0 ? this.props.slider.length - 1 : this.state.active - 1

        this.setState({
            active: slideIndex
        })
    }

    onTouch(direction, e) {
        switch (direction) {
            case 'left':
                this.prevSlide()
                break;
            case 'right':
                this.nextSlide()
                break;
            default:
                util.preventDefault(e)
        }
    }

    resetTimer() {
        if(this.state.timer || this.state.timer !== null) clearTimeout(this.state.timer)

        let timer = setInterval(() => {
            this.nextSlide()
        }, 3000)

        this.setState({
            timer: timer
        })
    }

    componentDidMount(){
        let timer = setInterval(() => {
            this.nextSlide()
        }, 3000)

        this.setState({
            timer: timer
        })
    }

    render() {
        let _me = this,
            slider = this.props.slider,
            wrapStyle = {
                height: _me.props.height || 6 + 'rem'
            }

        let sliderItem, sliderDot, sliderArrow, sliderTitle

        sliderItem = slider.map(function(data, i) {
            return <SliderItem
                        active={ _me.state.active }
                        flag={ i }
                        key={ 'slider_item_' + i }
                        sliderData={ data  }
                        _me={ _me }
                    />
        })
        if(this.props.dot){
            sliderDot = <SliderDot
                            active={ _me.state.active }
                            slider={ slider }
                        />
        }
        if(this.props.arrow){
            sliderArrow = <SliderArrow
                                _me={ _me }
                          />
        } else {
            sliderArrow = <SliderLength
                          len={ slider.length }
                          active={ _me.state.active }
                    />
        }
        sliderTitle = <SliderTitle
                        title={ slider[_me.state.active].title }
                      />

        return(
            <div className="slider" style={wrapStyle}>
                <ul
                    className='slider-wrap'
                >
                    {sliderItem}
                </ul>
                { sliderDot }
                { sliderArrow }
                { sliderTitle }
            </div>
        )
    }
}

export default Slider
