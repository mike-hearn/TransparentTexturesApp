import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

class TextureFull extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: this.props.store.textureColor }}>
        <View style={{ flex: 1, backgroundColor: this.props.store.textureColor, height: 900 }}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: `https://www.transparenttextures.com/patterns/${this.props.store.selectedTextureSlug}.png` }}
            resizeMode={Image.resizeMode.repeat}
          />
        </View>
      </ScrollView>
    );
  }
}

TextureFull.propTypes = {
  textureName: React.PropTypes.string,
  textureSlug: React.PropTypes.string,
  store: React.PropTypes.object,
};

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
});

export default TextureFull;
