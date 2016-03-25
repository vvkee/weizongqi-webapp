import React, { Component, PropTypes } from 'react'
import render from 'react-dom'
class SliderTitle extends Component {
    constructor(){
        super()
    }

    render(){
        let title = this.props.title

        return(
            <h2
                className="slider-title"
            >
                <a className="slider_title" href="">{ title }</a>
            </h2>
        )
    }
}

export default SliderTitle
