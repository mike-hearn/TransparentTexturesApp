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

import NavigationBar from './components/HideableNavigationBar';

import TextureImage from './components/TextureImage';
import TextureList from './components/TextureList';
import TextureFull from './components/TextureFull';
import ChangeColors from './components/ChangeColors';

import TextureStore from './store';

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
    console.log(store.textColor);
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        initialRoute={{ title: 'Home', displayTitle: 'Transparent Textures', index: 0 }}
        style={{ flex: 1, backgroundColor: store.textureColor }}
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
            {...this.props}
            store={store}
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
  navBarButtonText: {
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
    padding: 1,
  }
});

AppRegistry.registerComponent('TransparentTexturesApp', () => observer(TransparentTexturesApp));
