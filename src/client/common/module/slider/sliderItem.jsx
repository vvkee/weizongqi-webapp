import React, { Component, PropTypes } from 'react'
import render from 'react-dom'

class SliderItem extends Component {
    constructor(){
        super()
    }

    touchStart(e){

        this.setState({
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
        })
    }
    touchEnd(e){

        this.setState({
            endX: e.changedTouches[0].pageX,
            endY: e.changedTouches[0].pageY
        })

        let direction = this.touchDirection()

        console.log('direction', direction)

        this.props._me.onTouch(direction, e)
        this.props._me.resetTimer()
    }

    touchDirection(){
        let startX = this.state.startX,
            startY = this.state.startY,
              endX = this.state.endX,
              endY = this.state.endY

        let driftX = endX - startX,
            driftY = startY - endY

        // 距离太短
        if(Math.abs(driftX) < 2 && Math.abs(driftY) < 2) return

        // 获取移动角度
        let angle = Math.atan2(driftY, driftX) * 180 / Math.PI

        if(angle >= -45 && angle <= 45){
            return 'right'
        } else if(angle > 45 && angle < 135){
            return 'up'
        } else if(angle > -135 && angle < -45){
            return 'down'
        } else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)){
            return 'left'
        }

        return

    }

    render(){
        let active = this.props.active,
              flag = this.props.flag,
        sliderData = this.props.sliderData

        let activeClass = active === flag ? 'active' : 'unactive'

        return(
            <li
                className={activeClass}
                onTouchStart={ev => { this.touchStart(ev)} }
                onTouchEnd={ ev => { this.touchEnd(ev)} }
            >
                <img src={ sliderData.src } />
            </li>
        )
    }
}
export default SliderItem
