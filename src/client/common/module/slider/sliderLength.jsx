import React, { Component, PropTypes } from 'react'
import render from 'react-dom'
class SliderLength extends Component {
    constructor(){
        super()
    }

    render(){
        let len = this.props.len,
            active = this.props.active

        return(
            <span className="slider_length">{ (active + 1) + '/' + len}</span>
        )
    }
}

export default SliderLength
