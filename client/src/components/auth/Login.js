import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // destructor in order not to have to type like formData.name
    const { email, password } = formData;

    // '...' spread function is to copy all the data except for the name
    // call the setFormData to update the state
    // set the value of the input to the name
    // [e.target.name] acts as a key
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        // prevent the page from reloading after submitting the form
        e.preventDefault();
        login(email, password);
    }

    // Redirict if logged in
    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Login</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e => onChange(e))}
                        /* client side validation */
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e => onChange(e))}
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

// check the type of the props
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticataed: PropTypes.bool
}

//return an object which is mapStatetoProps
const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

// submit to the Redux store
export default connect(mapStatetoProps, { login })(Login);
