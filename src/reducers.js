/*
  The default configuration for the default profile
*/
const defaultProfile = {
    username: '',
    profileImg: '',
	name: '',
	website: '',
	username: '',
	bio: '',
	email: '',
	creationDate: '',
	numFollowers: '',
    numFollowing: '',
    numPublicRepos: '',
    isFollowed: true,
    loggedInUser: 'kerorokun'
};

/*
  Reducer in charge of handling information about the profile.

  Valid action types:
  1. SET_PROFILE: Expects a dictionary object with the parameters for profileImg, name,
     website, username, bio, email, creationDate, numFollowers, numFollowing, numPublicRepos
  2. SET_LOGGED_IN_USER: set the username of the currently logged in user
  3. SET_IS_FOLLOWED: set boolean detailing if currently viewed profile is followed by 
     the logged in user
*/
export const profileReducer = (state = defaultProfile, action) => {
    switch(action.type) {
    case 'SET_PROFILE':
        
        return {
            ...state,
            profileImg: action.profileImg,
	        name: action.name,
	        website: action.website,
	        username: action.username,
	        bio: action.bio,
	        email: action.email,
	        creationDate: action.creationDate,
	        numFollowers: action.numFollowers,
            numFollowing: action.numFollowing,
            numPublicRepos: action.numPublicRepos,
        };
    case 'SET_LOGGED_IN_USER':
        return {
            ...state,
            loggedInUser: action.user
        };
    case 'SET_IS_FOLLOWED':
        return {
            ...state,
            isFollowed: action.isFollowed
        };
    default:
        return state;
    }
};


const defaultRepos = {
    currProfileRepos: [],
    loggedInUserStarredRepos: [],
    selectedRepo: {
        name: '',
        info: {}
    }
};
/*
  Reducer in charge of handling information about the repositories.

  Valid action types:
  1. SET_REPOS: Expects an array of dictionary objects that properly describe a repo as the RepoPage
     expects.
  2. SET_STARRED_REPOS: Expects a list of the fullname of the starred repositories of the
     currently logged in user.
*/
export const reposReducer = (state=defaultRepos, action) => {
    switch(action.type) {
    case 'SET_REPOS':
        return {
            ...state,
            currProfileRepos: action.repos
        };
    case 'SET_STARRED_REPOS':
        return {
            ...state,
            loggedInUserStarredRepos: action.repos
        };
    case 'SET_SELECTED_REPO':
        return {
            ...state,
            selectedRepo: {
                ...state.selectedRepo,
                name: action.repoName
            }
        };
    case 'SET_SELECTED_REPO_INFO':
        return {
            ...state,
            selectedRepo: {
                ...state.selectedRepo,
                info: action.info
            }
        };
    default:
        return state;
    }
};


const defaultSearch = {
    isSearching: false,
    foundRepos: [],
    foundUser: {}
};

/*
  Reducer in charge of handling information about the search results.

  Stores information in the form:
  1. isSearching: boolean detailing whether a search is in progress
  2. foundRepos: list of repos that the search returned
  3. foundUser: user that the search returned
*/
export const searchingReducer = (state=defaultSearch, action) => {
    switch(action.type) {
    case 'SET_SEARCHING':
        return {
            ...state,
            isSearching: action.isSearching
        };
    case 'SET_FOUND_REPOS':
        return {
            ...state,
            foundRepos: action.repos
        };
    case 'SET_FOUND_USER':
        return {
            ...state,
            foundUser: action.user
        };
    case 'SORT_FOUND_REPOS_BY_STARS':
        return {
            ...state,
            foundRepos: state.foundRepos.slice().sort(
                (first, second) => (first.starredCount - second.starredCount)
            ).reverse()
        };
    case 'SORT_FOUND_REPOS_BY_FOLLOWERS':
        return {
            ...state,
            foundRepos: state.foundRepos.slice().sort(
                (first, second) => (first.issuesCount - second.issuesCount)
            ).reverse()
        };
    default:
        return state;
    }
};

/*
  Reducer in charge of handling information about the notifications of the current user profile.
*/
export const notifsReducer = (state=[], action) => {
    switch(action.type) {
    case 'SET_NOTIFICATIONS':
        return action.notifications;
    default:
        return state;
    }
};

/*
  Reducer in charge of handling information about the followers of the current user profile.

  Valid action types:
  1. SET_FOLLOWERS: Expects a list of dictionary objects that properly describe the followers
     as the FollowersPage expects it.
*/
export const followersReducer = (state=[], action) => {
    switch(action.type) {
    case 'SET_FOLLOWERS':
        return action.followers;
    default:
        return state;
    }
};

/*
  Reducer in charge of handling information about the followings of the current user profile.

  Valid action types:
  1. SET_FOLLOWERS: Expects a list of dictionary objects that properly describe the followings
     as the FollowingsPage expects it.
*/
export const followingsReducer = (state=[], action) => {
    switch(action.type) {
    case 'SET_FOLLOWINGS':
        return action.followings;
    default:
        return state;
    }
};

/*
  Reducer in charge of handling the authentication token to use in cases that require elevated 
  permissions.
*/
export const authenticationReducer = (state='e5fc435107e0264ef940bbe8f2a16b18a77580f0', action) => {
    switch(action.type){
    default:
        return state;
    }
};
