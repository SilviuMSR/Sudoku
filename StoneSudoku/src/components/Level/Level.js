import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

import DoneLevel from '../../assets/Others/doneLevel.png'
import NotDoneLevel from '../../assets/Others/notDone.png'
import CountDownLevel from '../../assets/Others/countdownyes.png'
import NoCountDownLevel from '../../assets/Others/countdownno.png'
import PlayButton from '../../assets/Buttons/playButton.png'
import CONSTANTS from '../../utils/constants'

const size = CONSTANTS.screenWidth / 2.2

export default props => (
    <View style={{ marginTop: 12, paddingRight: 12 }}>
        {props.gameMode === CONSTANTS.SIMPLE_GAME_MODE ? <ImageBackground source={props.doneSimple === 1 ? DoneLevel : NotDoneLevel} style={styles.imageStyle} resizeMode="contain">
            <Text style={styles.roundTimeText}>{props.timeSimple}</Text>
            <TouchableOpacity onPress={() => props.playGame(props.level.id)} style={styles.touchableOpacityContainer}>
                <ImageBackground source={PlayButton} style={styles.playButton} resizeMode="center">
                    <Text style={styles.playText}>JOACA</Text>
                </ImageBackground>
            </TouchableOpacity>
        </ImageBackground> :
            <ImageBackground source={props.doneCountdown === 1 ? CountDownLevel : NoCountDownLevel} style={styles.imageStyle} resizeMode="contain">
                {props.doneCountdown === 1 ? <Text> </Text> : <Text style={styles.roundTimeTextCount}>{props.timeCountdown} sec</Text>}
                <TouchableOpacity onPress={() => props.playGame(props.level.id)} style={styles.touchableOpacityContainer}>
                    <ImageBackground source={PlayButton} style={props.doneCountdown === 1 ? styles.playButtonCount : styles.playButtonCountNotDone} resizeMode="center">
                        <Text style={styles.playText}>JOACA</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </ImageBackground>}
    </View>
);

const styles = StyleSheet.create({
    optionButton: {
        flex: 1,
        marginTop: '17%'
    },
    imageStyle: {
        width: size,
        height: 180
    },
    playButton: {
        height: 33,
        position: 'relative',
        top: '50%'
    },
    playButtonCount: {
        height: 33,
        position: 'relative',
        top: '70%'
    },
    playButtonCountNotDone: {
        height: 33,
        position: 'relative',
        top: '55%'
    },
    roundTimeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        position: 'relative',
        top: '53%'
    },
    roundTimeTextCount: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        position: 'relative',
        top: '48%'
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