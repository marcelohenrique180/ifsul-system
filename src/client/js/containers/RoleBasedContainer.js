import React from 'react'

export default class RoleBasedContainer extends React.Component{
    constructor (props){
        super(props);
        this.authorize = []
    }

    shouldBeVisible() {
        const role = localStorage.getItem('role');

        if (!role){
            return false
        }

        return this.authorize.indexOf(role) !== -1
    }
}