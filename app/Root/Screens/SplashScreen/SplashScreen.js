import {ActivityIndicator, AppRegistry, View, Text} from "react-native";
import React, {Component} from "react";
import styles from './SplashScreenStyle'
import {NavigationActions,StackActions} from "react-navigation";


export default class SplshScreen extends Component {

    componentWillMount() {

        setTimeout(() => {

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'AddPostScreen'})],
            });
            this.props.navigation.dispatch(resetAction);



        }, 2000);


    }

    render() {
        return (
            <View style={styles.container1}>
                <View style={styles.container}>
                    <Text style={styles.text}>{'WELCOME'}</Text>
                    <ActivityIndicator size="large" style={styles.progressView}/>
                    <Text style={styles.text}>{'Created by Nikhil Prajapati'}</Text>

                </View>
            </View>

        );
    }
}

AppRegistry.registerComponent('SplshScreen', function () {
    return SplshScreen;
});


