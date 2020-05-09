import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';

import PopularScreen from './src/screens/popular';
import UpcomingScreen from './src/screens/upcoming';
import DetailScreen from './src/screens/details';

import {Colors} from './src/theme/colors';

const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabNav = () => {
  return (
    <TopTab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Connect"
      sceneContainerStyle={{
        backgroundColor: Colors.backgroundColor,
      }}
      tabBarOptions={{
        activeTintColor: Colors.textPrimary,
        pressColor: Colors.textSecondary2,
        style: {
          backgroundColor: Colors.headerBackground,
        },
        indicatorStyle: {
          backgroundColor: Colors.primaryBrand,
        },
        labelStyle: {
          fontFamily: 'SFProDisplay-Bold',
        },
      }}>
      <TopTab.Screen name="Popular" component={PopularScreen} />
      <TopTab.Screen name="Upcoming" component={UpcomingScreen} />
    </TopTab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.textPrimary,
        headerStyle: {
          backgroundColor: Colors.headerBackground,
          elevation: 0,
        },
      }}>
      <Stack.Screen name="Movies" component={TopTabNav} />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalTransition,
        }}
        name="Details"
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

let MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.backgroundColor,
  },
};

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.backgroundColor}
        barStyle="light-content"
      />
      <NavigationContainer theme={MyTheme}>
        <HomeStack />
      </NavigationContainer>
    </>
  );
};

export default App;
