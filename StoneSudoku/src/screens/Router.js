import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home/Home';
import Game from './Game/Game';
import Profile from './Profile/Profile';
import PreGame from './Game/PreGame';

const ApplicationStack = createStackNavigator({
    Home: {
        screen: Home
    },
    Game: {
        screen: Game
    },
    Profile: {
        screen: Profile
    },
    PreGame: {
        screen: PreGame
    }
}, {
    initialRouteName: 'Home'
});

export default createAppContainer(ApplicationStack);