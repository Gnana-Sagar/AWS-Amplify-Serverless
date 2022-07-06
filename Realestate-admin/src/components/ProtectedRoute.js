import { Auth } from 'aws-amplify';
import UserModel from './users/UserModel';

function PrivateRoute({ children, roles, currentRole }) {

    const logout = () => {
        Auth.signOut().then((res) => {
            window.location.reload();
        })
    }

    return roles.includes(UserModel.roles[0]) ? children : logout();
}

export default PrivateRoute;