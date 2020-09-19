import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image, ScrollView } from 'react-native';

/*
  Styling of the different components for the ProfilePage.
*/
const styles = StyleSheet.create({
    infoBorder: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        borderRadius: 10,
        marginTop: 10,
        width: 380,
        alignSelf: 'center',
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 10,
        marginBottom: 10
    },
    followButton: {
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    header: {
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    info: {
        flex: 1,
        fontSize: 18,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'gray',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    email: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    website: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    creation_date: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    bio: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    viewRow: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 60,
        marginBottom: 12
    },
    lastRow: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 60,
    },
    page: {
        fontFamily: 'serif',
        flex: 1,
        justifyContent: 'center',
    },
    profileImg: {
        width: 180,
        height: 180,
        alignSelf: 'center'
    }
});

/*
  Detail the basic profile information of the current GitHub user.
  Displays: 
  profile image, username, name, email, bio, number of followers, number people following,
  number of public repositories, website, creation date
*/
class ProfilePage extends React.Component
{
	render() {
		var img = this.props.profileImg ? { uri: this.props.profileImg } : null;
        if (!this.props.name) {
            return (
                <View>
                </View>
            );
        }

        const followedStr = this.props.isFollowed ? "Unfollow" : "Follow";
        var followView = <View/>;
        if (this.props.username != this.props.loggedInUsername) {
            followView = <TouchableOpacity
                           onPress={()=>{this.props.followUser(this.props.username, this.props.loggedInUsername, this.props.authToken);}}>
                           <Text style={styles.followButton}>{followedStr}</Text>
                         </TouchableOpacity>;
        }
        
		return (
			<View style={styles.page}>
              <ScrollView>

                <View elevation={10} style={styles.infoBorder}>
				  <Image  source={img} style={styles.profileImg}/>
                  <Text style={styles.name}>{this.props.name}</Text>
				  <Text style={styles.username}>{this.props.username}</Text>

                  {followView}
                  
				  <Text style={styles.bio}>{this.props.bio}</Text>
				  <Text style={styles.email}>{this.props.email}</Text>
                  <Text style={styles.website}>{this.props.website}</Text>
				  <Text style={styles.creation_date}>Created on {this.props.creationDate}</Text>
                </View>

                <TouchableOpacity
                  onPress={()=> this.props.navigation.navigate('Followers')}>
                  <View style={styles.viewRow}>
			        <Text style={styles.info}>Number of followers: {this.props.numFollowers}</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={()=> this.props.navigation.navigate('Following')}>
                  <View style={styles.viewRow}>
			        <Text style={styles.info}>Number of people following: {this.props.numFollowing}</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={()=> this.props.navigation.navigate('Repositories')}>
                  <View style={styles.viewRow}>
				    <Text style={styles.info}>Number of public repos: {this.props.numPublicRepos}</Text>
                  </View>
                </TouchableOpacity>
                
                
              </ScrollView>
			</View>
		);
	}
}

/*
  React-redux specific functionality to connect the component to the redux store.
*/
import { connect } from 'react-redux';
import { followUser } from './followers-actions';

const mapDispatchToProps = dispatch => ({
    followUser: (username, loggedInUser, token) => {
        followUser(dispatch, username, loggedInUser, token);
    }
});

const mapStateToProps = state => ({
    username: state.profile.username,
    profileImg: state.profile.profileImg,
    name: state.profile.name,
    website: state.profile.website,
    bio: state.profile.bio,
    email: state.profile.email,
    creationDate: state.profile.creationDate,
    numFollowers: state.profile.numFollowers,
    numFollowing: state.profile.numFollowing,
    numPublicRepos: state.profile.numPublicRepos,
    isFollowed: state.profile.isFollowed,
    loggedInUsername: state.profile.loggedInUser,
    authToken: state.authentication
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
