import React from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux';

import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import SearchPage from './search-page';
import ProfilePage from './profile-page';
import RepoPage from './repo-page';
import FollowersPage from './followers-page';
import FollowingPage from './following-page';
import UsernameInputPage from './username-input-page';
import NotificationsPage from './notifications-page';

/*
  In charge of creating all the tabs at the top of the screen that switch between the 
  different screens.
*/
const TabNavigator = createMaterialTopTabNavigator(
    {
        Profile: { screen: props => <ProfilePage {...props}/> },
        Repositories: { screen: props => <RepoPage {...props}/> },
        Followers: { screen: props => <FollowersPage {...props}/> },
        Following: { screen: props => <FollowingPage {...props}/> },
        Notifications: { screen: props => <NotificationsPage {...props}/>} 
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#24292E'
            }
        }
    }
);

var Navigation = createAppContainer(TabNavigator);


/*
  Root Component. This is the main overall app component that is in charge of adding
  together the other components in the project. Additionally, it will load and save 
  the state of the app when fit.
*/
class RootComponent extends React.Component {
    state = {
        appState: AppState.currentState
    }

    
    componentDidMount = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.props.loadInfo();
    }

    componentWillUnmount = () => {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    /*
      Detects when app state changes to determine when a good time to save the state 
      of the app is good.
     */
    _handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/background/)) {
            this.props.saveInfo(this.props.profileInfo, this.props.repoInfo,
                                this.props.followersInfo, this.props.followingInfo);
        }
        this.setState({appState: nextAppState});
    }
    
    render() {
        const bottomView = this.props.isSearching ? <SearchPage/> : <Navigation/>;
        return (
            <View style={{flex: 1}}>
              <UsernameInputPage/>
              <View style={{flex: 9}}>
                {bottomView}
              </View>
            </View>
        );
    }
};

import { saveData, loadData } from './storage-actions';

const mapDispatchToProps = dispatch => ({
    loadInfo: () => {
        loadData(dispatch);
    },

    saveInfo: (profile, repo, followers, following) => {
        saveData(profile, repo, followers, following);
    }
});

const mapStateToProps = state => ({
    profileInfo: state.profile,
    repoInfo: state.repos,
    followersInfo: state.followers,
    followingInfo: state.following,
    isSearching: state.search.isSearching
});

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootComponent);
