import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Slider,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import StyledText from './StyledText.js';

const linearGradient = (
  <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} styles={{ height: 20, width: 100 }} />
);

class ChangeColors extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: this.props.store.textureColor }}>
        <View style={styles.sliderContainer}>
          <StyledText textColor={this.props.store.textColor}>Hue</StyledText>
          <LinearGradient
            colors={['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']}
            style={styles.linearGradient}
            start={[0.0, 0.5]} end={[1, 0.5]}>
            <Slider
              style={{ height: 20 }}
              maximumTrackTintColor={this.props.store.textureColor}
              minimumTrackTintColor={this.props.store.textureColor}
              minimumValue={0}
              maximumValue={360}
              step={1}
              value={this.props.store.textureHue}
              onValueChange={(value) => this.props.store.setTextureHue(value)}
            />
          </LinearGradient>
        </View>

        <View style={styles.sliderContainer}>
          <StyledText textColor={this.props.store.textColor}>Saturation</StyledText>
          <LinearGradient
            colors={[
              `hsl(${this.props.store.textureHue},0%,${this.props.store.textureLuminance}%)`,
              `hsl(${this.props.store.textureHue},100%,${this.props.store.textureLuminance}%)`
            ]}
            style={styles.linearGradient}
            start={[0.0, 0.5]} end={[1, 0.5]}
          >
            <Slider
              style={{ height: 20 }}
              maximumTrackTintColor={this.props.store.textureColor}
              minimumTrackTintColor={this.props.store.textureColor}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={this.props.store.textureSaturation}
              onValueChange={(value) => this.props.store.setTextureSaturation(value)}
            />
          </LinearGradient>
        </View>

        <View style={styles.sliderContainer}>
          <StyledText textColor={this.props.store.textColor}>Lightness</StyledText>
          <LinearGradient
            colors={[
              `hsl(${this.props.store.textureHue},${this.props.store.textureSaturation}%, 0%)`,
              `hsl(${this.props.store.textureHue},${this.props.store.textureSaturation}%, 100%)`
            ]}
            style={styles.linearGradient}
            start={[0.0, 0.5]} end={[1, 0.5]}
          >
            <Slider
              style={{ height: 20 }}
              maximumTrackTintColor={this.props.store.textureColor}
              minimumTrackTintColor={this.props.store.textureColor}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={this.props.store.textureLuminance}
              onValueChange={(value) => this.props.store.setTextureLuminance(value)}
            />
          </LinearGradient>
        </View>
      </View>

    );
  }
}

ChangeColors.propTypes = {
  store: React.PropTypes.object,
};

var styles = StyleSheet.create({
  sliderContainer: {
    marginRight: 10,
    marginLeft: 10,
    height: 60,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});


export default ChangeColors;
