import React from 'react';

class AuthorizedContainer extends React.Component {

    componentWillMount() {
        const { authorize } = this.props.route;
        const { router } = this.context;

        const role = localStorage.getItem('role');

        if(role) {
            if (authorize.indexOf(role) === -1) {
                router.push('/nao-autorizado');
            }
        }else {
            router.push('/nao-autorizado');
        }
    }
}

export default AuthorizedContainer