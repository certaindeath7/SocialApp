import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <Fragment>
            {profile === null ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <Link to="/profiles" className="btn btn-light">
                            Back To Profiles
                    </Link>
                        {auth.isAuthenticated &&
                            auth.loading === false &&
                            auth.user._id === profile.user._id && (
                                <Link to="/edit-profile" className="btn btn-dark">
                                    Edit Profile
                                </Link>
                            )}
                        <div class="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />

                            {/* Experience div tag*/}
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>
                                {profile.experience.length > 0 ?
                                    (<Fragment>
                                        {profile.experience.map(experience => (
                                            <ProfileExperience key={experience._id} experience={experience} />
                                        ))}
                                    </Fragment>) : (<h4> No experience</h4>)}
                            </div>

                            {/* Education div tag*/}
                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {profile.education.length > 0 ? (
                                    <Fragment>
                                        {profile.education.map((education) => (
                                            <ProfileEducation
                                                key={education._id}
                                                education={education}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (
                                        <h4>No education credentials</h4>
                                    )}
                            </div>
                        </div>
                    </Fragment>
                )}

        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStatesToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStatesToProps, { getProfileById })(Profile);