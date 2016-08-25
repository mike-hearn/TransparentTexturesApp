import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Navigator,
  TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react/native';

import NavigationBar from './components/NavigationBar';

import TextureImage from './components/TextureImage';
import TextureList from './components/TextureList';
import TextureFull from './components/TextureFull';
import ChangeColors from './components/ChangeColors';

import TextureStore from './store';

import StyledText from './components/StyledText';

const store = new TextureStore();

const SCREEN_WIDTH = require('Dimensions').get('window').width;

/**
 *  * Overwrite the default navigator scene config.
 *   * to use a wider area for back swiping.
 *    */
const FloatFromRight = {
  ...Navigator.SceneConfigs.FloatFromRight,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
      edgeHitWidth: SCREEN_WIDTH / 2,
    },
  },
};


class TransparentTexturesApp extends Component {

  componentDidMount() {
    if (!store.textureData) {
      store.fetchTextureData();
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Home', displayTitle: 'Transparent Textures', index: 0 }}
        style={{ flex: 1, paddingTop: 60, backgroundColor: store.textureColor }}
        configureScene={() => FloatFromRight}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'whoa':
              return (
                <TextureFull store={store} navigator={navigator} />
              );
            case 'changeColors':
              return <ChangeColors store={store} />;
            default:
              return (
                <View style={styles.container}>
                  <TextureList store={store} navigator={navigator} />
                </View>
              );
          }
        }}
        navigationBar={
          <NavigationBar
            store={store}
            style={[styles.navBar, { backgroundColor: store.textureColor }]}
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (index === 0) {
                  return null;
                }

                var previousRoute = navState.routeStack[index - 1];
                return (
                  <TouchableOpacity
                    onPress={() => navigator.pop()}>
                    <StyledText
                      store={store}
                      style={[
                        styles.navBarText,
                        styles.navBarButtonText,
                        {
                          marginLeft: 10,
                          textAlign: 'left',
                        }
                      ]}
                      >
                      {previousRoute.title}
                    </StyledText>
                  </TouchableOpacity>
                  );
              },
              RightButton: (route, navigator, index, navState) => {
                if (route.id !== 'changeColors') {
                  return (
                    <TouchableOpacity
                      onPress={() => navigator.push({id: 'changeColors', title: 'Colors'})}>
                      <StyledText
                        store={store}
                        style={[
                          styles.navBarText,
                          styles.navBarButtonText,
                          {
                            marginRight: 10,
                            textAlign: 'right'
                          }
                        ]}
                      >
                        Colors
                      </StyledText>
                    </TouchableOpacity>
                    );
                } else {
                  return null;
                }
              },
              Title: (route, navigator, index, navState) => {
                return (
                  <View>
                    <StatusBar barStyle={store.textColor === 'white' ? 'light-content' : 'default'} />
                    <StyledText
                      store={store}
                      style={[{ fontSize: 16 }, styles.navBarText]}
                    >
                      {route.displayTitle ? route.displayTitle : route.title}
                    </StyledText>
                  </View>
                  );
              },
            }}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    flex: 1,
    marginTop: 10,
  },
  navBarText: {
    height: 50,
  },
  navBarButtonText: {
    width: 100,
    paddingTop: 2,
  }
});

AppRegistry.registerComponent('TransparentTexturesApp', () => observer(TransparentTexturesApp));
