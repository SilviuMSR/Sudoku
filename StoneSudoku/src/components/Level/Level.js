import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

import DoneLevel from '../../assets/Others/doneLevel.png'
import NotDoneLevel from '../../assets/Others/notDone.png'
import PlayButton from '../../assets/Buttons/playButton.png'


export default props => (
    <View style={{ marginTop: 12 }}>
        <ImageBackground source={props.done ? DoneLevel : NotDoneLevel} style={styles.imageStyle} resizeMode="contain">
            <Text style={styles.roundTimeText}>{props.time}</Text>
            <TouchableOpacity onPress={() => props.playGame(props.level.id)} style={styles.touchableOpacityContainer}>
                <ImageBackground source={PlayButton} style={styles.playButton} resizeMode="center">
                    <Text style={styles.playText}>JOACA</Text>
                </ImageBackground>
            </TouchableOpacity>
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    optionButton: {
        flex: 1,
        marginTop: '17%'
    },
    imageStyle: {
        width: 180,
        height: 180
    },
    playButton: {
        height: 35,
        position: 'relative',
        top: '50%'
    },
    roundTimeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        position: 'relative',
        top: '53%'
    },
    playText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        position: 'relative',
        top: '5%'
    },
    touchableOpacityContainer: {
        position: 'relative',
        top: '53%'
    }
});