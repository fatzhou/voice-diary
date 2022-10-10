import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import images from '../../core/images';
import {handleOptions, Option, OptionItem} from './utils';

interface Props {
  options: OptionItem[];
  defaultValue?: string[];
}

export default (props: Props) => {
  const {options = [], defaultValue = []} = props;
  const [isLiked, setIsLiked] = useState<Option[]>(
    handleOptions(options, defaultValue),
  );

  const onRadioBtnClick = item => {
    let updatedState = isLiked.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    setIsLiked(updatedState);
  };

  const RadioButton = ({onPress, selected, children}) => {
    return (
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.radioButtonText}>{children}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.radioButton}>
          {selected ? (
            <Image source={images.site.radioWithCheck} style={styles.icon} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {isLiked.map(item => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          <Text> {item.label}</Text>
        </RadioButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 'auto',
    maxWidth: 500,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 58,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    padding: 0,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5,
  },
  icon: {
    height: 20,
    width: 20,
  },
});
