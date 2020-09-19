import { updateInformation } from './fetch-info';

/*
  Follow or unfollow the given user depending on whether the user is already
  followed or not.
*/
export const followUser = (dispatch, username, loggedInUser, token) => {
    const followUserBody = (response) => {
        
        if (response.status == "204") {
            makeFollowRequest('DELETE', username, (response) => {
                updateInformation(dispatch, username, loggedInUser, token);
            });
        } else {
            makeFollowRequest('PUT', username, token, (response) => {
                updateInformation(dispatch, username, loggedInUser, token);
            });
        }
    };
    
    makeFollowRequest('GET', username, token, followUserBody);
    
};

/*
  Make a follow request to the GitHub API and optionally execute a function
  after a response is given.
*/
export const makeFollowRequest = (method, username, token, thenFunc=null) => {
    fetch('https://api.github.com/user/following/' + username,
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

