import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

const styles = StyleSheet.create({
    date: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10
    },
    message: {
        paddingLeft: 10,
        paddingRight: 10
    },
    viewRow: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10
    }
});

class NotificationsPage extends React.Component
{
    renderRow = (data) => {
        return (
            <View key={data.name}>
              <View style={styles.viewRow}>
                <Text style={styles.date}>{data.date}</Text>
                <Text style={styles.message}>{data.msg}</Text>
              </View>
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
                            return this.renderRow(row);
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


import { connect } from 'react-redux';

const mapStateToProps = state => ({
    data: state.notifications
});

export default connect(mapStateToProps)(NotificationsPage);
