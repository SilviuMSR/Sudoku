import React, { Component } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, View, Dimensions, Text, TextInput } from 'react-native';

import StoneSquare from '../../assets/Buttons/stoneSquare.png';
import PurpleSquare from '../../assets/Buttons/purpleSquare.png'
import PurpleHolder from '../../assets/Others/purpleHolder.png'
import Square from '../../assets/Buttons/square.png'

export default class RenderMatrix extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cellSize: Math.floor(Number(Dimensions.get('window').width) / props.size) - 2,
            counter: 0
        };
    }

    checkClicked = lineContent => {
        this.props.modifyCell(lineContent.i, lineContent.j)
    }

    generateSquare = (number, lineContent, selectedNumber) => {
        return (
            <View style={[styles.center, styles.squareView, { height: Number(this.state.cellSize), width: Number(this.state.cellSize) }]}>
                {
                    number ?
                        <TouchableOpacity onPress={() => this.checkClicked(lineContent)} style={[styles.center, styles.max]}>
                            <ImageBackground source={parseInt(number) === parseInt(selectedNumber) ? Square : PurpleSquare} style={[styles.center, styles.max]} resizeMode='stretch'>
                                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{number ? number : ''}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.checkClicked(lineContent)} style={[styles.center, styles.max]}>
                            <ImageBackground source={PurpleHolder} style={[styles.center, styles.max]} resizeMode='stretch'>
                            </ImageBackground>
                        </TouchableOpacity>
                }
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.buttonSize, styles.backgroundColor, styles.center]}>
                {this.props.lines.map(line => (
                    <View style={[styles.lineView, styles.center, { height: this.state.cellSize }]}>
                        {line.map(lineContent => this.generateSquare(lineContent.number, lineContent, this.props.selectedNumber))}
                    </View>
                ))}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    squareView: {
        marginLeft: 2,
        marginRight: 2
    },
    lineView: {
        marginBottom: 2,
        marginTop: 2,
        width: '100%',
        flexDirection: 'row'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    buttonSize: {
        width: '90%',
        height: '90%',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});