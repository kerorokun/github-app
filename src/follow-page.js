import React from 'react';
import { StyleSheet, Image, View, ScrollView, Text, TouchableOpacity } from 'react-native';

/*
  Styling of the different components for the Followers and Followings pages.
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
    }
});

/*
  A common blueprint page that can be recycled for both the followers and followings pages 
  of the current GitHub user.

  Displays: 
  Table of follow(er/ing) users's names and profile pictures.
*/
export default class FollowPage extends React.Component
{
    renderRow = (data, authToken) => {
        var avatarImg = data.profileImg ? { uri: data.profileImg } : null;
        
        return (
            <View key={data.name}>
              <TouchableOpacity
                onPress={() => {
                    this.props.submitUsername(data.name, authToken);
                    this.props.navigation.navigate('Profile');
                }}>
                <View style={styles.viewRow}>
                  <Image source={avatarImg} style={styles.profileImg}/>
                  <Text style={styles.name}>{data.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
        );
    }
    
    render() {
        if (this.props.data) {
            return (
                <View style={{marginTop: 20}}>
                  <ScrollView>
                    {
                        this.props.data.map((row) => {
                            return this.renderRow(row, this.props.authToken);
                        })
                    }
                  </ScrollView>
                </View>
            );
        }
        return (
            <View></View>
        );
    }
}
