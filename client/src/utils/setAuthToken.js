// check if there's token, if yes add to the header "x-auth-token"
// adding global header
import axios from 'axios';

const setAuthToken = token => {
    // check if there's token in localStorage
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
