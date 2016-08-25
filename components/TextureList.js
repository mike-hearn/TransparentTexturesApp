import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import { observer } from 'mobx-react/native';

import TextureImage from './TextureImage';

const TextureList = ({ store, navigator }) =>
  <ScrollView
    removeClippedSubviews
  >
    {store.textureData ? store.textureData.map((element, index) => (
      <TextureImage
        textureName={element.title}
        textureURI={`https://www.transparenttextures.com/patterns/${element.slug}.png`}
        textureSlug={element.slug}
        navigator={navigator}
        store={store}
        key={index}
      />)
    ) : <Text>{store.dataLoadingStatus}</Text>
    }
  </ScrollView>;

TextureList.propTypes = {
  store: React.PropTypes.object,
  navigator: React.PropTypes.object,
};

export default observer(TextureList);
