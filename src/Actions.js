/*
  Populates an action object to be dispatched to the redux store that handles
  setting information about the user's profile information.

  @param profile: a dictionary object with the parameters for profileImg, name,
  website, username, bio, email, creationDate, numFollowers, numFollowing, numPublicRepos
*/
export const setProfile = profile => ({
    type: 'SET_PROFILE',
    profileImg: profile.profileImg,
	name: profile.name,
	website: profile.website,
	username: profile.username,
	bio: profile.bio,
	email: profile.email,
	creationDate: profile.creationDate,
	numFollowers: profile.numFollowers,
    numFollowing: profile.numFollowing,
    numPublicRepos: profile.numPublicRepos,
});

export const setSelectedRepo = repo => ({
    type: 'SET_SELECTED_REPO',
    repoName: repo
});

export const sortFoundReposByStars = () => ({
    type: 'SORT_FOUND_REPOS_BY_STARS'
});

export const sortFoundReposByFollowers = () => ({
    type: 'SORT_FOUND_REPOS_BY_FOLLOWERS'
});

export const setFoundUser = user => ({
    type: 'SET_FOUND_USER',
    user: user
});

export const setFoundRepos = repos => ({
    type: 'SET_FOUND_REPOS',
    repos: repos
});

export const setSelectedRepoInfo = info => ({
    type: 'SET_SELECTED_REPO_INFO',
    info: info
});

export const setSearchState = isSearching => ({
    type: 'SET_SEARCHING',
    isSearching: isSearching
});

export const setNotifications = notifs => ({
    type: 'SET_NOTIFICATIONS',
    notifications: notifs
});

export const setIsProfileFollowed = followed => ({
    type: 'SET_IS_FOLLOWED',
    isFollowed: followed
});

export const setLoggedInUser = user => ({
    type: 'SET_LOGGED_IN_USER',
    user: user
});

export const setStarredRepos = repos => ({
    type: 'SET_STARRED_REPOS',
    repos: repos
});

export const setFollowers = (followers) => ({
    type: 'SET_FOLLOWERS',
    followers: followers
});

export const setFollowings = followings => ({
    type: 'SET_FOLLOWINGS',
    followings: followings
});

/*
  Populates an action object to be dispatched to the redux store that handles
  setting information about the user's public repositories.

  @param repos: an array of dictionary objects that properly describe a repo as the RepoPage
  expects.
*/
export const setRepos = repos => {
    if (repos) {
        return {
            type: 'SET_REPOS',
            repos: repos
        };
    }
    return [];
};
