import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';

import ModalTemplate from './ModalTemplate';

import AboutBackground from '../../assets/Modal/modal.png';
import Back from '../../assets/Buttons/back.png'

class Register extends Component {

    state = {
        username: ""
    }

    onChangeText = text => {
        this.setState({ username: text })
    }

    render() {
        return (
            <ModalTemplate background={AboutBackground} isVisible={this.props.isVisible} onClose={this.props.onClose} >
                <View style={[{ width: '55%', height: '55%' }, styles.center]}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.username}
                    />
                    <Button title="Done" onPress={() => this.props.onRegister(this.state.username)}></Button>
                </View>
            </ModalTemplate>
        )
    }
};

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    imageSize: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        height: '20%',
        width: '30%',
        position: 'relative',
        left: '55%',
        top: '25%'
    }
});

export default Register;