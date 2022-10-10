import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import images from '../../core/images';
import styles from './index.styles';
export default () => {
  return <ImageBackground style={styles.container}>
    <Image style={styles.close} source={images.close}/>
    </ImageBackground>
  );
};
