import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import { observer } from 'mobx-react/native';

import TextureFull from './TextureFull';
import StyledText from './StyledText';

const styles = StyleSheet.create({
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    // textShadowColor: 'black',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 10,
  },
  textureImage: {
    height: 400,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});

class TextureImage extends React.Component {

  handleTouch() {
    this.props.navigator.push({
      id: 'whoa',
      title: this.props.textureName
    });
    this.props.store.setSelectedTextureSlug(this.props.textureSlug);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.handleTouch.bind(this)}>
        <Image
          style={styles.textureImage}
          source={{ uri: `${this.props.textureURI}` }}
          resizeMode={Image.resizeMode.repeat}
        >
          <StyledText
            style={styles.nestedText}
            textColor={this.props.store.textColor}
          >
            {this.props.textureName}
          </StyledText>
        </Image>
      </TouchableHighlight>
    );
  }

}

TextureImage.propTypes = {
  textureName: React.PropTypes.string,
  textureURI: React.PropTypes.string,
  textureSlug: React.PropTypes.string,
  navigator: React.PropTypes.object,
  store: React.PropTypes.object,
};

export default observer(TextureImage);
