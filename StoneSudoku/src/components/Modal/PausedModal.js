import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

import ModalTemplate from './ModalTemplate';

import CONSTANTS from '../../utils/constants'

import AboutBackground from '../../assets/Modal/pausedgame.png';
import Back from '../../assets/Buttons/xButton.png'
import Resume from '../../assets/Buttons/resume.png'
import Reset from '../../assets/Buttons/reset.png'

const elementSize = Math.floor(CONSTANTS.screenWidth / 6.5)
const textSize = Math.floor(elementSize * 2 / 4.1)

const about = props => (
    <ModalTemplate background={AboutBackground} isVisible={props.isVisible} onClose={props.onClose}>
        <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={props.onReset} style={styles.optionButtonContainerFirst}>
                <Image source={Reset} style={{ height: elementSize, width: elementSize }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onResume} style={styles.optionButtonContainer}>
                <Image source={Resume} style={{ height: elementSize, width: elementSize }} />
            </TouchableOpacity>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    imageSize: {
        width: '100%',
        height: '100%'
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60%'
    },
    optionButtonContainerFirst: {
        flex: 1,
        paddingRight: 8,
        alignItems: 'flex-end'
    },
    optionButtonContainer: {
        flex: 1
    }
});

export default about;