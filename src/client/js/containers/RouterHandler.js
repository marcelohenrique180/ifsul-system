import React from 'react'

export default class RouterHandler extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const { children } = this.props;

        if (!children) {
            return null;
        }
        return children
    }
}