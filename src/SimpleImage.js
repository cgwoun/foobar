import React, { Component } from 'react';

export class SimpleImage extends Component {
    render() {
        return (
            <div>
                <h1>I am an image with param {this.props.name}</h1>
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
            </div>
        )
    }
}