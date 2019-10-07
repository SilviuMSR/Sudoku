import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    backgroundColor: {
        backgroundColor: CONSTANTS.MODAL_BACKGROUND_COLOR
    }
});

export default props => (
    <SafeAreaView style={styles.max}>
        <View style={[styles.max, styles.backgroundColor]}>
            <ImageBackground source={props.background} style={[props.size, styles.max]} resizeMode='stretch'>
                {props.children}
            </ImageBackground>
        </View>
    </SafeAreaView>
);