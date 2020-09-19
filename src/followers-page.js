import React from 'react';
import { View, Text } from 'react-native';
import FollowPage from './follow-page';

import { connect } from 'react-redux';
import { updateInformation } from './fetch-info';

const mapStateToProps = state => ({
    data: state.followers,
    authToken: state.authentication,
});

const mapDispatchToProps = dispatch => ({
    submitUsername: (username, token) => {
        updateInformation(dispatch, username, token);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowPage);
