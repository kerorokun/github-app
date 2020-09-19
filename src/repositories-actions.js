import { setStarredRepos, setSelectedRepo, setSelectedRepoInfo,
         setFoundRepos } from './actions';
import { updateInformation } from './fetch-info';

/*
  Update the list of starred repositories for the logged in user.

  @param dispatch: dispatch function to use to update the store with the new information
  @param token: authentication token to use to elevate the permissions to allow for the 
                gathering of the repo information
*/
export const updateListOfStarredReposForLoggedInUser = (dispatch, token) => {
    fetch('https://api.github.com/user/starred', {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            var repos = [];
            for (var jsonIdx in responseJSON) {
                var repoJSON = responseJSON[jsonIdx];
                try {
                    repos.push({
                        key: repoJSON.full_name,
                        url: repoJSON.full_name
                    });
                }
                catch(error) {
                    repos = [];
                }
            }
            dispatch(setStarredRepos(repos));
        });
};

/*
  Update the information of the currently selected repo.

  @param dispatch: dispatch function to use to update the store with the new information
  @param repoURL: url to the current repo
  @param currSelectedURL: url to the repo that is currently selected in the app
  @param token: authentication token to use to elevate the permissions to allow for the 
                gathering of the repo information
*/
export const updateSelectedRepo = (dispatch, repoURL, currSelectedURL, token) => {
    dispatch(setSelectedRepo(''));
    if (currSelectedURL == repoURL) {
        return;
    }
    fetch('https://api.github.com/repos/' + repoURL + '/contributors',
          {
              method: 'GET',
              headers: { 'Authorization': 'token ' + token} 
          })
        .then(response => response.json())
        .then(responseJSON => {
            var contributors = responseJSON.map((val, idx, array) => {
                return {
                    name: val.login,
                    contributions: val.contributions
                };
            });
            dispatch(setSelectedRepo(repoURL));
            dispatch(setSelectedRepoInfo(contributors.slice(0, 6)));
        });
};


/*
  Finds the repos that contain a query.

  @param dispatch: dispatch function to use to update the store with the new information
  @param name: query to use to find repos with a name containing that provided one
  @param token: authentication token to use to elevate the permissions to allow for the 
                gathering of the repo information
*/
export const findRepositoriesWithName = (dispatch, name, token) => {
    dispatch(setFoundRepos([]));
    fetch('https://api.github.com/search/repositories?q=' + name,
          {
              method: 'GET',
              headers: { 'Authorization': 'token ' + token }
          })
        .then(response => response.json())
        .then(responseJSON => {
            try {
                const repos = responseJSON.items.map((val, idx, array) => {
                    console.log(Object.keys(val));
                    return ({
                        key: val.full_name,
                        name: val.name,
                        ownerName: val.owner.login,
                        description: val.description,
                        fullName: val.full_name,
                        url: val.html_url,
                        issuesCount: val.open_issues_count,
                        starredCount: val.stargazers_count
                    });
                });
                dispatch(setFoundRepos(repos));
            } catch(error) {
                
            }
        });
};


/*
  Star a repo.

  @param dispatch: dispatch function to use to update the store with the new information
  @param username: username of the current profile being viewed. Later used to update information 
  after request is successfully made.
  @param loggedInUser: username of the current logged in user. Used to update app information
  after request is made.
  @param token: authentication token used to elevate permissions to allow starring of repo.
*/
export const starRepo = (dispatch, username, loggedInUser, repoURL, token) => {
    const thenFunc = (response) => {
        if (response.status == '204') {
            makeRepoRequest('DELETE', repoURL, token, (response) => {
                updateInformation(dispatch, username, loggedInUser, token);
            });
        } else {
            makeRepoRequest('PUT', repoURL, token, (response) => {
                updateInformation(dispatch, username, loggedInUser, token);
            });
        }
    };

    makeRepoRequest('GET', repoURL, token, thenFunc);
};

/*
  Make a repo request to the GitHub API.

  @param method: REST method to use.
  @param repoURL: url to the repo to make the request about.
  @param token: authentication token to use to elevate permissions if needed.
  @param thenFunc: function to run after response is received from GitHub API.
*/
const makeRepoRequest = (method, repoURL, token, thenFunc=null) => {
    fetch('https://api.github.com/user/starred/' + repoURL,
          {
              method: method,
              'Content-Length': 0,
              headers: {
                  'Authorization': 'token ' + token
              }
          })
        .then((response) => {
            if (thenFunc) {
                thenFunc(response);
            }
        });
};
