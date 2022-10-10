import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import TouchableOpacity from '../../../../components/TouchableOpacity';
import images from '../../../../core/images';

export const LeftComponent = () => {
  return (
    <View>
      <Image style={styles.vip} source={images.home.vip} />
    </View>
  );
};

export const RightComponent = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', {})}>
        <Image style={styles.site} source={images.home.setup} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  vip: {
    width: 24,
  },
  site: {
    width: 24,
  },
});
