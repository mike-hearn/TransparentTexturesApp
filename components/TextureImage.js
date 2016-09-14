import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';
import { observer } from 'mobx-react/native';

import TextureFull from './TextureFull';
import StyledText from './StyledText';

const styles = StyleSheet.create({
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
  },
  nestedTextAuthor: {
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    marginLeft: 12,
    marginTop: 0,
  },
  textureImage: {
    height: 400,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  innerBottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
});

class TextureImage extends React.Component {

  handleTouch() {
    this.props.navigator.push({
      id: 'fulltexture',
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
          <View style={styles.innerContainer}>
            <StyledText
              style={styles.nestedText}
              textColor={this.props.store.textColor}
            >
              {this.props.textureName}
            </StyledText>
            <StyledText
              style={[styles.nestedTextAuthor, { fontSize: 15 }]}
              textColor={this.props.store.textColor}
            >
              Created by {this.props.textureAuthor}
            </StyledText>
          </View>
          <View style={[styles.innerContainer, styles.innerBottomContainer]}>
            <StyledText
              style={[styles.nestedText, { fontSize: 16 }]}
              textColor={this.props.store.textColor}
            >
              Create Wallpaper
            </StyledText>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }

}

TextureImage.propTypes = {
  textureName: React.PropTypes.string,
  textureAuthor: React.PropTypes.string,
  textureURI: React.PropTypes.string,
  textureSlug: React.PropTypes.string,
  navigator: React.PropTypes.object,
  store: React.PropTypes.object,
};

export default observer(TextureImage);
