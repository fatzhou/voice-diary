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
import {Note} from '../../core/hooks/useNote';
import {colors} from '../../core/theme';

export default (props: {
  image: ImageSourcePropType;
  description: string;
  saveNote: (note: Note) => void;
}) => {
  const {image, description, saveNote} = props;
  const navigation = useNavigation();
  return (
    <View style={stylesInfo.container}>
      <Image source={image} />
      <Text style={stylesInfo.description}>{description}</Text>
      <Button
        onPress={() => {
          navigation.navigate('NewNote', {
            note: null,
            saveNote,
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
