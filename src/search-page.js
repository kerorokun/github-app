import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import RepoComponent from './repo-component';

/*
  Styles for the components inside the RepoPage
*/
const styles = StyleSheet.create({
    profileImg: {
        flex: 1,
        minWidth: 90,
        minHeight: 90,
        alignSelf: 'center'
    },
    name: {
        flex: 3,
        textAlignVertical: 'center',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
    },
    viewRow: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10
    },
    cancel: {
        marginLeft: 30,
        marginRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#24292E',
        marginBottom: 10
    },
    sortButton: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#24292E',
        marginBottom: 10
    },
    sortButtonView: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});


const UNSORTED = 0;
const SORT_BY_STARS = 1;
const SORT_BY_FOLLOWERS = 2;

class SearchPage extends React.Component
{    
    renderRepo = (repo, isStarred) => {
        return <RepoComponent
                 key={repo.fullName}
                 isStarred={isStarred}
                 name={repo.name}
                 ownerName={repo.ownerName}
                 issuesCount={repo.issuesCount}
                 starredCount={repo.starredCount}
                 description={repo.description}
                 fullName={repo.fullName}
                 url={repo.url}
                 selectedRepoInfo={this.props.selectedRepoInfo}
                 selectedRepoName={this.props.selectedRepoName}
                 selectRepo={name => this.props.selectRepo(repo.fullName,
                                                           this.props.selectedRepoName,
                                                           this.props.authToken)}
                 starRepo={name => this.props.starRepo(this.props.username,
                                                       this.props.loggedInUsername,
                                                       repo.fullName,
                                                       this.props.authToken)}
               />;
    }

    renderFoundUser = () => {
        const user = this.props.foundUser;
        if (!user || user == {} || Object.keys(user).length === 0) {
            return <View/>;
        }
        var img = user.profileImg ? { uri: user.profileImg } : null;

        return (
            <View key={user.name}>
              <TouchableOpacity
                onPress={() => {
                    this.props.submitUsername(user.name, this.props.authToken);
                }}>
                <View style={styles.viewRow}>
                  <Image source={img} style={styles.profileImg}/>
                  <Text style={styles.name}>{user.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
        );
    }

    renderSortButtons = () => (
        <View style={styles.sortButtonView}>
          <TouchableOpacity
            onPress={()=>this.props.sortReposByNumFollowers()}>
            <Text style={styles.sortButton}>Sort by num issues:</Text>
          </TouchableOpacity>
          <View style={{flex: 0.1}}/>
          <TouchableOpacity
            onPress={()=>this.props.sortReposByNumStars()}>
            <Text style={styles.sortButton}>Sort by num starred:</Text>
          </TouchableOpacity>
        </View>
    );
    
    render() {        
        return (
            <View style={{flex:1, justifyContent: 'center', marginTop: 20}}>
              <ScrollView>
                <TouchableOpacity
                  onPress={()=>this.props.stopSearch()}>
                  <Text style={styles.cancel}>Return</Text>
                </TouchableOpacity>

                {this.renderFoundUser()}
                {this.renderSortButtons()}
                
                {
                    this.props.repos.map((repo, idx) => {
                        const isStarred = this.props.starredRepos.some(
                            e => e.url === repo.fullName
                        );
                        return this.renderRepo(repo, isStarred);
                    })
                }
			  </ScrollView>
            </View>

        );
    }
    
}

import { connect } from 'react-redux';
import { setSearchState, setFoundRepos,
         sortFoundReposByFollowers, sortFoundReposByStars } from './actions';
import { starRepo, updateSelectedRepo } from './repositories-actions';
import { updateInformation } from './fetch-info';

const mapDispatchToProps = dispatch => ({
    starRepo: (username, loggedInUsername, url, token) => {
        starRepo(dispatch, username, loggedInUsername, url, token);
    },
    selectRepo: (url, currSelectedURL, token) => {
        updateSelectedRepo(dispatch, url, currSelectedURL, token);
    },
    submitUsername: (username, token) => {
        dispatch(setSearchState(false));
        updateInformation(dispatch, username, token);
    },
    stopSearch: () => {
        dispatch(setSearchState(false));
    },    
    sortReposByNumFollowers: () => {
        dispatch(sortFoundReposByFollowers());
    },
    sortReposByNumStars: () => {
        dispatch(sortFoundReposByStars());
    }

});


const mapStateToProps = state => ({
    starredRepos: state.repos.loggedInUserStarredRepos,
    authToken: state.authentication,
    loggedInUsername: state.profile.loggedInUser,
    username: state.profile.username,
    selectedRepoName: state.repos.selectedRepo.name,
    selectedRepoInfo: state.repos.selectedRepo.info,
    foundUser: state.search.foundUser,
    repos: state.search.foundRepos
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
