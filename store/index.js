import { observable, action, computed } from 'mobx';

export default class TTStore {
  @observable dataLoadingStatus = 'NOT_LOADED';
  @observable selectedTextureSlug = null;
  @observable textureHue = 192;
  @observable textureSaturation = 100;
  @observable textureLuminance = 23;
  @observable textureData = null;
  @observable navHidden = false;

  @computed get textureColor() {
    return `hsl(${this.textureHue}, ${this.textureSaturation}%, ${this.textureLuminance}%)`;
  }

  @computed get textColor() {
    let color;
    if (this.textureLuminance > 70) {
      color = 'black';
    } else {
      color = 'white';
    }
    return color;
  }

  @action fetchTextureData() {
    this.dataLoadingStatus = 'LOADING';
    fetch('https://www.transparenttextures.com/data.json')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.textureData = responseJson.data;
        dataLoadingStatus = 'LOADED';
      });
  }

  @action setSelectedTextureSlug(slug) {
    this.selectedTextureSlug = slug;
  }

  @action setTextureHue(hue) {
    this.textureHue = hue;
  }

  @action setTextureSaturation(saturation) {
    this.textureSaturation = saturation;
  }

  @action setTextureLuminance(luminance) {
    this.textureLuminance = luminance;
  }

  @action toggleNavHidden() {
    this.navHidden = !this.navHidden;
  }
}

