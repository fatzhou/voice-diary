import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
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

  // 需要扩展为可多选
  const onClick = (item) => {
    console.log('item', item);
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: !isLikedItem.selected}
        : {...isLikedItem},
    );
    console.log('updatedState', updatedState);
    setIsLiked(updatedState);
  };

  const Button = ({onPress, selected, children}) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Switch
            trackColor={{false: '#F5F5F5', true: '#343434'}}
            thumbColor={selected ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#F5F5F5"
            value={selected}
            onValueChange={onPress}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {isLiked.map((item) => (
        <Button
          onPress={() => onClick(item)}
          selected={item.selected}
          key={item.id}>
          <Text> {item.label}</Text>
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 'auto',
    maxWidth: 500,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 58,
  },
  button: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    height: 30,
    padding: 0,
  },
  buttonText: {
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
  selectButton: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 14,
    color: '#999999',
  },
  unselectButton: {
    backgroundColor: '#FB584C',
    alignItems: 'center',
  },
  unselectText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
