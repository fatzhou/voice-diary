import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/pages/Home';
import DetailScreen from './src/pages/Detail';
import SettingScreen from './src/pages/Setting';
import NoteScreen from './src/pages/Note';
import NewNoteScreen from './src/pages/NewNote';
// import {ExampleClass} from './src/pages/NewNote/index2';
import SiteScreen from './src/pages/Site';
import SubSiteScreen from './src/pages/SubSite';
import VoiceScreen from './src/pages/Voice';
import {Preview} from './src/pages/NewNote/preview';
import {StatusBar} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();

function App() {
  StatusBar.setBarStyle('dark-content');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewNote"
          component={NewNoteScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Site"
          component={SiteScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubSite"
          component={SubSiteScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Voice"
          component={VoiceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="preview"
          component={Preview}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: '设置',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <RootSiblingParent>
    <App />
  </RootSiblingParent>
);
