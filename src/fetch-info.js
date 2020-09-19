
import { setProfile, setRepos, setFollowers, setFollowings,
         setIsProfileFollowed, setNotifications, setFoundUser } from './actions';
import { makeFollowRequest } from './followers-actions';
import { updateListOfStarredReposForLoggedInUser } from './repositories-actions';

/*
  Update the information of the entire app
*/
export const updateInformation = (dispatch, username, defaultUsername, token) => {
    updateProfile(dispatch, username, defaultUsername);
    updateRepos(dispatch, username, token);
    updateFollowing(dispatch, username);
    updateNotifications(dispatch, token);
};

/*
  Update the profile information for the GitHub user
 */
export const updateProfile = (dispatch, username, loggedInUsername) => {
    fetch('https://api.github.com/users/' + username)
		.then((response) => response.json())
		.then((responseJSON) => {
			const profile = {
				profileImg: responseJSON.avatar_url,
				name: responseJSON.name,
				website: responseJSON.html_url,
				username: responseJSON.login,
				bio: responseJSON.bio,
				email: responseJSON.email,
				creationDate: responseJSON.created_at,
				numFollowers: responseJSON.followers,
                numFollowing: responseJSON.following,
                numPublicRepos: responseJSON.public_repos,
			};

            updateFollowers(dispatch, responseJSON.followers_url);
            dispatch(setProfile(profile));
		})
        .catch((error) => {
        });

    if (loggedInUsername != username) {
        makeFollowRequest('GET', username, (response) => {
            const isFollowed = response.status == "204";
            dispatch(setIsProfileFollowed(isFollowed));
        });
    }
};

export const findProfileWithName = (dispatch, username) => {
    dispatch(setFoundUser({}));
    fetch('https://api.github.com/users/' + username)
		.then((response) => response.json())
		.then((responseJSON) => {
            try {
                if (!("message" in responseJSON)) {
                    const profile = {
				        profileImg: responseJSON.avatar_url,
				        name: responseJSON.name,
				        website: responseJSON.html_url,
				        username: responseJSON.login,
				        bio: responseJSON.bio,
				        email: responseJSON.email,
				        creationDate: responseJSON.created_at,
				        numFollowers: responseJSON.followers,
                        numFollowing: responseJSON.following,
                        numPublicRepos: responseJSON.public_repos,
			        };
                    dispatch(setFoundUser(profile));
                }
            } catch (error) {
            }
		})
        .catch((error) => {
        });

};

/*
  Update the repository information of the current GitHub user.
 */
export const updateRepos = (dispatch, username, token) => {
    fetch('https://api.github.com/users/' + username + '/repos')
		.then((response) => response.json())
		.then((responseJSON) => {
			var repos = [];
			for (var jsonIdx in responseJSON) {
				var repoJSON = responseJSON[jsonIdx];
                try {
					repos.push({
                        key: repoJSON.name,
                        name: repoJSON.name,
                        ownerName: repoJSON.owner.login,
                        description: repoJSON.description,
                        fullName: repoJSON.full_name,
                        url: repoJSON.html_url,
                        issuesCount: repoJSON.open_issues_count,
                        starredCount: repoJSON.stargazers_count
                    });
                } catch(error) {
                    repos = [];
                }
			}
            dispatch(setRepos(repos));
		});
    updateListOfStarredReposForLoggedInUser(dispatch, token);
};

/*
  Update the followers information of the current GitHub user.
 */
const updateFollowers = (dispatch, followersURL) => {
    fetch(followersURL)
        .then((response) => response.json())
        .then((responseJSON) => {
			var followers = [];
			for (var jsonIdx in responseJSON) {
				var followerJSON = responseJSON[jsonIdx];
                try {
					followers.push({
                        key: followerJSON.login,
                        profileImg: followerJSON.avatar_url,
                        name: followerJSON.login,
                    });
                } catch(error) {
                    followers = [];
                }
			}
            dispatch(setFollowers(followers));
        })
        .catch((error) => {
            dispatch(setFollowers([]));
            console.log("Error with followers");
        });
};

/*
  Update the notifications for the currently selected user
*/
const updateNotifications = (dispatch, token) => {
    fetch('https://api.github.com/notifications',
          {
              method: 'GET',
              headers: { 'Authorization': 'token ' + token }
          })
        .then(response => response.json())
        .then(responseJSON => {
            var notifications = [];
            console.log(responseJSON);
            try {
                for (var jsonIdx in responseJSON) {
                    var notifJSON = responseJSON[jsonIdx];
                    const condensedJSON = {
                        key: notifJSON.id,
                        msg: notifJSON.subject.title,
                        date: notifJSON.updated_at
                    };
                    notifications.push(condensedJSON);
                }
            } catch(error) {
                notifications = [];
            }
            dispatch(setNotifications(notifications));
        });
};

/*
  Update the following information of the current GitHub user.
*/
export const updateFollowing = (dispatch, username) => {
    fetch('https://api.github.com/users/' + username + '/following')
        .then((response) => response.json())
        .then((responseJSON) => {
            var followings = [];
			for (var jsonIdx in responseJSON) {
				var followingJSON = responseJSON[jsonIdx];
                try {
                    if ("login" in followingJSON) {
					    followings.push({
                            key: followingJSON.login,
                            profileImg: followingJSON.avatar_url,
                            name: followingJSON.login,
                        });
                    }
                } catch(error) {
                    followings = [];
                }
			}

            dispatch(setFollowings(followings));
        })
        .catch((error) => {
            dispatch(setFollowers([]));
            console.log("Error with following");
        });
};
        
