import React, { Component, PropTypes } from 'react';
import render from 'react-dom'

class Example extends Component {
    constructor (props) {
        super(props)
    }

    render(){
        let names = ['Alice', 'Emily', 'Kate']
        return (
            <div>
                {
                    names.map((name) => {
                        return <div>Hello, {name}!</div>
                    })
                }
            </div>
        )
    }
}

export default Example
