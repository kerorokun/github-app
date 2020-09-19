import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

/*
  Styles for the components in the username input field part of the application.
*/
const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#24292E',
        color: 'white'
    },
    header: {
        color: 'white',
        marginTop: 8,
        flex: 1,
    },
    input: {
        color: 'white',
        justifyContent: 'center',
        marginTop: 8,
        backgroundColor: '#3F4448',
        flex: 3
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    usernameView: {
        flex: 2,
        marginTop: 8,
        marginLeft: 16,
    },
    username: {
        color: 'white',
        fontSize: 18
    }
});

/*
  Component in charge of getting the user's input for which GitHub user to inspect.
*/
class UsernameInputPage extends React.Component
{
    componentDidMount = () => {
    }

    onClickLoggedInUser = () => {
        this.props.submitUsername(this.props.defaultUsername, this.props.defaultUsername,
                                  this.props.authToken);
    }
    
    render() {
        return (
            <View style={styles.bg}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.usernameView}
                  onPress={() => this.onClickLoggedInUser()}>
                  <Text style={styles.username}>{this.props.defaultUsername}</Text>
                </TouchableOpacity>
                
                <Text style={styles.header}>Search: </Text>
                <TextInput
                  style={styles.input}
                  placeholder={'Enter username'}
                  onSubmitEditing={(event) => this.props.submitQuery(event.nativeEvent.text, this.props.authToken)}
                />
              </View>
            </View>
        );
    }
}

/*
  Connect the component to the redux store.
*/
import { updateInformation, exportLogin, findProfileWithName } from './fetch-info';
import { findRepositoriesWithName } from './repositories-actions';
import { setSearchState } from './actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    submitUsername: (username, loggedInUser, token) => {
        dispatch(setSearchState(false));
        updateInformation(dispatch, username, loggedInUser, token);
    },
    submitQuery: (query, token) => {
        dispatch(setSearchState(true));
        findProfileWithName(dispatch, query);
        findRepositoriesWithName(dispatch, query, token);
    }
});

const mapStateToProps = state => ({
    authToken: state.authentication,
    defaultUsername: state.profile.loggedInUser
});

export default connect(mapStateToProps, mapDispatchToProps)(UsernameInputPage);
