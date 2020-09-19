import { createStore, combineReducers } from 'redux';
import { authenticationReducer, profileReducer, reposReducer,
         followingsReducer, followersReducer, notifsReducer,
         searchingReducer } from './reducers'; 

export const store = createStore(
    combineReducers(
        {
            profile: profileReducer,
            repos: reposReducer,
            followers: followersReducer,
            followings: followingsReducer,
            authentication: authenticationReducer,
            notifications: notifsReducer,
            search: searchingReducer
        }
    )
);
