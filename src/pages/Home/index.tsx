import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import images from '../../core/images';
import styles from './index.styles';

export default () => {
  const navigation = useNavigation();
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity>
          <Image source={images.vip} />
        </TouchableOpacity>
      ),
      title: '',
      headerRight: () => (
        <TouchableOpacity>
          <Image source={images.setting} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};
