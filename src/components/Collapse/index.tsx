import React from 'react';
import {StyleSheet, Image} from 'react-native';
import images from '../../core/images';

export default () => {
  return <Image style={styles.more} source={images.public.more} />;
};
const styles = StyleSheet.create({
  more: {
    width: 24,
    height: 24,
  },
});
