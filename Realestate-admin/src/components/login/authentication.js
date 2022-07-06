import React, { PureComponent } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from '../SignIn';
import ForgotPassword from './forgot_password';
import UserModel from './../users/UserModel';
import Main from './../layout/Main';

class Authentication extends PureComponent {


    state = {
        status: 'login',
    }

    componentDidMount() {
        this.isUserAuthenticated();
    }

    isUserAuthenticated = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                UserModel.roles = user.signInUserSession.accessToken.payload["cognito:groups"];
                UserModel.email = user.attributes.email;
                UserModel.userName = user.attributes.name;
                this.setState({ status: 'welcome' });
            })
            .catch(err => {
                console.log(err);
                this.setState({ status: 'login' });
            });
    }

    AuthComponent = () => {
        switch (this.state.status) {
            case 'login':
                return (<SignIn switchComponent={this.switchComponent}
                />);
            case 'forgot':
                return (<ForgotPassword switchComponent={this.switchComponent}/>);
            case 'welcome':
                return (<Main />);
        }
    }
    switchComponent = status => {
        this.setState({ status });
    };
    render() {
        return (
            <React.Fragment>{this.AuthComponent()}</React.Fragment>
        )
    }
}
export default Authentication;