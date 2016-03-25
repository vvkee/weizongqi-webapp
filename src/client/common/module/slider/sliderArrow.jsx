import React, { Component, PropTypes } from 'react'
import render from 'react-dom'
class SliderArrow extends Component {
    constructor(){
        super()
    }

    render(){
        let _me = this.props._me
        return(
            <div>
                <a
                    className="prevBtn"
                    href="javaScript:;"
                    onClick={ev => {_me.prevSlide(); _me.resetTimer()}}
                >
                    <i className="iconfont icon-left01"></i>
                </a>
                <a
                    className="nextBtn"
                    href="javaScript:;"
                    onClick={ev => {_me.nextSlide(); _me.resetTimer()}}
                >
                    <i className="iconfont icon-right01"></i>    
                </a>
            </div>
        )
    }
}
export default SliderArrow
