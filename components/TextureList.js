import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import { observer } from 'mobx-react/native';

import StyledText from './StyledText';

import TextureImage from './TextureImage';

const TextureList = ({ store, navigator }) =>
  <ScrollView
    removeClippedSubviews
  >
    <View style={styles.bufferContainer}></View>
    {store.textureData ? store.textureData.map((element, index) => (
      <TextureImage
        textureName={element.title}
        textureAuthor={element.author}
        textureURI={`https://www.transparenttextures.com/patterns/${element.slug}.png`}
        textureSlug={element.slug}
        navigator={navigator}
        store={store}
        key={index}
      />)
    ) : <View style={styles.loadingView}><ActivityIndicator animating={true} /></View>
    }
  </ScrollView>;

TextureList.propTypes = {
  store: React.PropTypes.object,
  navigator: React.PropTypes.object,
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  bufferContainer: {
    height: 60
  }
});

export default observer(TextureList);
