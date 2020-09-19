import React from 'react';
import { TouchableOpacity, StyleSheet, View,
         Text, ScrollView, Linking } from 'react-native';
import { VictoryLabel, VictoryAxis, VictoryChart,
         VictoryBar, VictoryTheme } from 'victory-native';

/*
  Styles for the Repository component
*/
const styles = StyleSheet.create({
    
    tableRow: {
        flex: 1,
        justifyContent: 'flex-start',
        borderColor: 'gray',
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 0.5,
        marginBottom: 10,
        borderRadius: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    infoView: {
        flex: 5,
        borderRightWidth: 0.5,
        padding: 10,
    },
    starView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#F8BD08',
    },
    browserLink: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'center',
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#24292E',
    },
    extraInfo: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
    }
});


/*
  Detail the information of the given repository..
  Displays: 
  name, number of stars, number open issues, description
*/
export default class RepoComponent extends React.Component {

    /*
      Render extra information if the repository is currently selected.

      Displays visualization and link
     */
    renderExtraInfo = () => {
        if (this.props.selectedRepoName != this.props.fullName) {
            return <View></View>;
        } else {
            return (
                <View style={styles.extraInfo}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(this.props.url)}>
                    <Text style={styles.browserLink}>Open in browser</Text>
                  </TouchableOpacity>
                  <VictoryChart width={250}
                                domainPadding={15}
                                theme={VictoryTheme.material}>
                    <VictoryAxis label="Name"
                                 tickLabelComponent={<VictoryLabel angle={45} />}
                                 style={{
                                     axisLabel: {padding: 50},
                                     tickLabels: {padding: 3, marginTop: 20, textAnchor:'start'}
                                 }}
                    />
                    <VictoryAxis
                      label="Number of contributions"
                      style={{axisLabel: {padding: 35 } }}
                      dependentAxis={true}/>
                    <VictoryBar angle={45}
                                barRatio={0.8}
                                data={this.props.selectedRepoInfo}
                                x="name" y="contributions"/>
                  </VictoryChart>
                </View>
                
            );
        }
    }

    /*
      Render the view containing basic information about the repo.
     */
    renderInfoView = () => (
        <View style={styles.infoView}>
          <TouchableOpacity
            onPress={() => this.props.selectRepo(this.props.fullName)}
          >
            <View style={{ flex: 1}}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.owner}>{this.props.ownerName}</Text>
              <Text style={styles.descr}>{this.props.description}</Text>
              <Text style={styles.descr}>Num issues: {this.props.issuesCount}</Text>
              <Text style={styles.descr}>Num starred: {this.props.starredCount}</Text>
              {this.renderExtraInfo()}
            </View>
          </TouchableOpacity>

        </View>
    )

    /*
      Render the option to star or unstar the repository
     */
    renderStarView = () => {
        const starredStr = this.props.isStarred ? 'Unstar' : 'Star';
        return (
            <View style={styles.starView}>
              <TouchableOpacity
                onPress={() => this.props.starRepo(this.props.fullName)}>
                <Text>{starredStr}</Text>
              </TouchableOpacity>
            </View>
        );
    }
    
    render() {
        // Handle displaying the visualization if the repo is currently selected

        return (
            <View key={this.props.name} style={styles.tableRow}>
              <View style={{flexDirection: 'row', flex: 1}}>
                
                {this.renderInfoView()}
                {this.renderStarView()}
                
              </View>
		    </View>
        );
        
    }
}
