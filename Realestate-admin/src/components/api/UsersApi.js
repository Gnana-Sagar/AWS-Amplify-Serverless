import { Auth, API } from 'aws-amplify';

export const getAllUsers = async () => {
    try {


        let apiName = 'AdminQueries';
        let path = '/listUsers';
        let myInit = {
            queryStringParameters: {
                //   "groupname": "Editor",
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        console.log('getALlUsers');
        return await API.get(apiName, path, myInit);
    } catch (err) {
        console.log('err', err);
    }
}