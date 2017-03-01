import React, {PropTypes} from 'react';

class AuthorizedContainer extends React.Component {

    componentWillMount() {
        const { authorize } = this.props.routes[0].childRoutes[0];
        const { router } = this.context;

        const role = localStorage.getItem('role');

        if(role) {
            if (authorize.indexOf(role) === -1) {
                router.push('/nao-autorizado');
            }
        }
    }
}

AuthorizedContainer.propTypes = {
    routes: PropTypes.array.isRequired
};

AuthorizedContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default AuthorizedContainer