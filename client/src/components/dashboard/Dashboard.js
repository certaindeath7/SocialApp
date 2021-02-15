import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardAction from './DashboardAction';
import Experience from './Experience'
import Education from './Education';
const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
    deleteAccount
}) => {
    // load the getCurrentProfile as soon as the page is loaded
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user">Welcome {user && user.name}</i>
        </p>
        {profile !== null ?
            (<Fragment>
                <DashboardAction />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus" /> Delete My Account
                </button>
                </div>
            </Fragment>)
            : (<Fragment>
                <p>You have not had profile yet</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create profile
             </Link>
            </Fragment>)}
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStatetoProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(Dashboard);
