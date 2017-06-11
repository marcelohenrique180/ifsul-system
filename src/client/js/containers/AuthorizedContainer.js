import React from 'react';

class AuthorizedContainer extends React.Component {

    componentWillMount() {
        const { authorize } = this.props.route;
        const { router } = this.props;

        const role = localStorage.getItem('role');

        if(typeof role === "undefined" || authorize.indexOf(role) === -1) {
            router.push('/nao-autorizado');
        }
    }
}

export default AuthorizedContainer