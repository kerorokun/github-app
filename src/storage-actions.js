import AsyncStorage from '@react-native-community/async-storage';
import { setProfile, setIsProfileFollowed, setLoggedInUser,
         setStarredRepos, setFollowers, setFollowings, setRepos } from './actions'; 


/*
  Save the data of the app.

  @param profileInfo: information about the profile
  @param repoInfo: information about the repositories
  @param followersInfo: information about the followers page.
  @param followingInfo: information about the followings page.
*/
export const saveData = async (profileInfo, repoInfo, followersInfo, followingInfo) => {
    try {
        await AsyncStorage.setItem('@profileInfo', JSON.stringify(profileInfo));
        await AsyncStorage.setItem('@repoInfo', JSON.stringify(repoInfo));
        await AsyncStorage.setItem('@followersInfo', JSON.stringify(followersInfo));
        await AsyncStorage.setItem('@followingInfo', JSON.stringify(followingInfo));
    } catch (e) {
        // saving error
        console.log(e);
    }
};

/*
  Load the data from the phone.

  @param dispatch: function to use after information is loaded to update app state.
*/
export const loadData = async(dispatch) => {
    try {
        const profileInfo = await AsyncStorage.getItem('@profileInfo');
        if (profileInfo != null) {
            var profile = JSON.parse(profileInfo);
            dispatch(setProfile(profile));
            dispatch(setIsProfileFollowed(profile.isFollowed));
            dispatch(setLoggedInUser(profile.loggedInUser));
        }

        const reposInfo = await AsyncStorage.getItem('@repoInfo');
        if (reposInfo != null) {
            var repos = JSON.parse(reposInfo);
            dispatch(setRepos(repos.currProfileRepos));
            dispatch(setStarredRepos(repos.loggedInUserStarredRepos));
        }

        const followersInfo = await AsyncStorage.getItem('@followersInfo');
        if (followersInfo != null) {
            var followers = JSON.parse(followersInfo);
            dispatch(setFollowers(followers));
        }

        const followingsInfo = await AsyncStorage.getItem('@followingInfo');
        if (followingsInfo != null) {
            var followings = JSON.parse(followingsInfo);
            dispatch(setFollowings(followings));
        }
    } catch(e) {
        // error reading value
        console.log(e);
    }
};
