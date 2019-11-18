import { Dimensions } from 'react-native';

export default {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    MODAL_BACKGROUND_COLOR: '#696969',
    SIMPLE_GAME_MODE: 'SIMPLE_MODE',
    COUNTDOWN_GAME_MODE: 'COUNTDOWN_MODE',
    LEVELS: ['easy', 'medium', 'hard'],
    KEYBOARD: [
        {
            number: 1,
            pressed: false
        },
        {
            number: 2,
            pressed: false
        },
        {
            number: 3,
            pressed: false
        },
        {
            number: 4,
            pressed: false
        },
        {
            number: 5,
            pressed: false
        },
        {
            number: 6,
            pressed: false
        },
        {
            number: 7,
            pressed: false
        },
        {
            number: 8,
            pressed: false
        },
        {
            number: 9,
            pressed: false
        }
    ],
    EASY_LEVELS: [
        {
            name: 'Runda 1', difficulty: 'easy', size: 4, doneSimple: 0, timeSimple: '', doneCountdown: 0, timeCountdown: 120,
            level: '{ "number": "1", "i": "0", "j": "0" } { "number": "", "i": "0", "j": "1" } { "number": "2", "i": "0", "j": "2"} { "number": "3", "i": "0", "j": "3" } { "number": "2", "i": "1", "j": "0" } { "number": "", "i": "1", "j": "1" } { "number": "", "i": "1", "j": "2" } { "number": "", "i": "1", "j": "3" } { "number": "4", "i": "2", "j": "0" } { "number": "", "i": "2", "j": "1" } { "number": "", "i": "2", "j": "2" }  { "number": "", "i": "2", "j": "3" } { "number": "", "i": "3", "j": "0" } { "number": "", "i": "3", "j": "1" } { "number": "", "i": "3", "j": "2" } { "number": "2", "i": "3", "j": "3"}'
        }
    ],
    MEDIUM_LEVELS: [
        {
            name: 'Runda 1', difficulty: 'medium', size: 5, doneSimple: 0, timeSimple: '', doneCountdown: 0, timeCountdown: 70,
            level: '{ "number": "1", "i": "0", "j": "0" } { "number": "", "i": "0", "j": "1" } { "number": "2", "i": "0", "j": "2"} { "number": "", "i": "0", "j": "4" } { "number": "3", "i": "0", "j": "3" } { "number": "2", "i": "1", "j": "0" } { "number": "", "i": "1", "j": "1" } { "number": "2", "i": "1", "j": "2" } { "number": "2", "i": "1", "j": "3" } { "number": "", "i": "1", "j": "4" } { "number": "4", "i": "2", "j": "0" } { "number": "", "i": "2", "j": "1" } { "number": "", "i": "2", "j": "2" } { "number": "4", "i": "2", "j": "3" } { "number": "", "i": "2", "j": "4" } { "number": "7", "i": "3", "j": "0" } { "number": "", "i": "3", "j": "1" } { "number": "3", "i": "3", "j": "2" } { "number": "2", "i": "3", "j": "3"} { "number": "2", "i": "3", "j": "4"} { "number": "", "i": "4", "j": "0" } { "number": "", "i": "4", "j": "1" } { "number": "1", "i": "4", "j": "2" } { "number": "", "i": "4", "j": "3"} { "number": "", "i": "4", "j": "4" }'
        }
    ],
    HARD_LEVELS: [
        {
            name: 'Runda 1', difficulty: 'hard', size: 6, doneSimple: 0, timeSimple: '', doneCountdown: 0, timeCountdown: 40,
            level: '{ "number": "1", "i": "0", "j": "0" } { "number": "", "i": "0", "j": "1" } { "number": "2", "i": "0", "j": "2"} { "number": "3", "i": "0", "j": "3" } { "number": "2", "i": "1", "j": "0" } { "number": "", "i": "1", "j": "1" } { "number": "2", "i": "1", "j": "2" } { "number": "2", "i": "1", "j": "3" } { "number": "4", "i": "2", "j": "0" } { "number": "", "i": "2", "j": "1" } { "number": "", "i": "2", "j": "2" } { "number": "4", "i": "2", "j": "3" } { "number": "7", "i": "3", "j": "0" } { "number": "", "i": "3", "j": "1" } { "number": "3", "i": "3", "j": "2" } { "number": "2", "i": "3", "j": "3"}'
        }
    ]
}