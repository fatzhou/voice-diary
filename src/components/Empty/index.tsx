import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Button,
} from 'react-native';
import {RootStackParamList} from '~/types/page';
import {colors} from '../../core/theme';
import {StackNavigationProp} from '@react-navigation/stack';

export default (props: {image: ImageSourcePropType; description: string}) => {
  const {image, description} = props;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={stylesInfo.container}>
      <Image source={image} />
      <Text style={stylesInfo.description}>{description}</Text>
      <Button
        onPress={() => {
          navigation.navigate('NewNote', {
            note: null,
          });
        }}
        title="点我创建"
      />
    </View>
  );
};

const stylesInfo = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: colors.emptyDescription,
    fontSize: 16,
    marginTop: 16,
  },
});
