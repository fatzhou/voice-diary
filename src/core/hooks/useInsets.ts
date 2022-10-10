import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default () => {
  const pageInsets = useSafeAreaInsets();
  return pageInsets;
};
