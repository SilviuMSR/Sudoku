import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import BaseScreen from '../../components/BaseScreen/BaseScreen';
import Back from '../../assets/Buttons/back.png'

class Profile extends Component {
    static navigationOptions = {
        header: null,
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    render() {
        return (
            <BaseScreen>
                <View style={styles.gameContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{ color: 'white', fontSize: 28, letterSpacing: 2, textAlign: 'center' }}>THIS SCREEN WILL CONTAIN</Text>
                        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>INFORMATIONS ABOUT CURRENT USER</Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <View style={styles.aboutGame}>
                            <TouchableOpacity style={{ height: 60, width: 60, marginLeft: '8%' }} onPress={this.navigateHomeScreen}>
                                <Image source={Back} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

    aboutGame: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Profile;