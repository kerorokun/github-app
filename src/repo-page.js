import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import { VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTheme } from 'victory-native';
import RepoComponent from './repo-component';
/*
  Styles for the components inside the RepoPage
*/
const styles = StyleSheet.create({
    
    tableRow: {
        flex: 1,
        justifyContent: 'flex-start',
        borderColor: 'gray',
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 0.5,
        marginBottom: 10,
        borderRadius: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    infoView: {
        flex: 5,
        borderRightWidth: 0.5,
        padding: 10,
    },
    starView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#F8BD08',
    }
});

class RepoPage extends React.Component
{
    /*
      Render a row in the table.

      @param repo: dictionary object detailing information about a Repository
      @param isStarred: boolean detailing whether the current repository is starred by the current logged in user
    */
	renderRow = (repo, isStarred) => {
        return <RepoComponent
                 key={repo.fullName}
                 isStarred={isStarred}
                 name={repo.name}
                 ownerName={repo.ownerName}
                 description={repo.description}
                 fullName={repo.fullName}
                 issuesCount={repo.issuesCount}
                 starredCount={repo.starredCount}
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

    /*
      Render the repository table.
     */
	render() {
		return (
            <View style={{flex:1, justifyContent: 'center', marginTop: 20}}>
              <ScrollView>
                {
                    this.props.repos.map((repo, idx) => {
                        const isStarred = this.props.starredRepos.some(e => e.url === repo.fullName);
                        return this.renderRow(repo, isStarred);
                    })
                }
			  </ScrollView>
            </View>
			
		);
	}
}


/*
  React-redux specific functionality to connect the component to the redux store.
*/
import { connect } from 'react-redux';
import { starRepo, updateSelectedRepo } from './repositories-actions';

const mapDispatchToProps = dispatch => ({
    starRepo: (username, loggedInUsername, url, token) => {
        starRepo(dispatch, username, loggedInUsername, url, token);
    },
    selectRepo: (url, currSelectedURL, token) => {
        updateSelectedRepo(dispatch, url, currSelectedURL, token);
    }
});

const mapStateToProps = state => ({
    repos: state.repos.currProfileRepos,
    starredRepos: state.repos.loggedInUserStarredRepos,
    authToken: state.authentication,
    loggedInUsername: state.profile.loggedInUser,
    username: state.profile.username,
    selectedRepoName: state.repos.selectedRepo.name,
    selectedRepoInfo: state.repos.selectedRepo.info
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
