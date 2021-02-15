import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

//connect react component to redux store
import { connect } from 'react-redux';

// import the actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

// check the type of the props
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // destructor in order not to have to type like formData.name
    const { name, email, password, password2 } = formData;

    // '...' spread function is to copy all the data except for the name
    // call the setFormData to update the state
    // set the value of the input to the name
    // [e.target.name] acts as a key
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        // prevent the page from reloading after submitting the form
        e.preventDefault();
        if (password !== password2) {
            setAlert('Password not matched', 'danger');
        }
        else {
            register({ name, email, password});
        }

    }

     // Redirict if logged in
     if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e => onChange(e))}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={(e => onChange(e))}
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated 
})

export default connect(mapStatetoProps, { setAlert, register })(Register);
