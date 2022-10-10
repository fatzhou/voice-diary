import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: !isLikedItem.selected}
        : isLikedItem,
    );
    setIsLiked(updatedState);
  };

  const Button = ({
    onPress,
    selected,
    selectedText,
    unselectedText,
    children,
  }) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.button,
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: selected ? '#E3E3E3' : '#FB584C'},
          ]}>
          {selected ? (
            <View style={styles.selectButton}>
              <Text style={styles.selectText}> {selectedText}</Text>
            </View>
          ) : (
            <View style={styles.unselectButton}>
              <Text style={styles.unselectText}>{unselectedText}</Text>
            </View>
          )}
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
          selectedText={item.selectedText}
          unselectedText={item.unselectedText}
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
    backgroundColor: '#F8F8F8',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E6E6E6',
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
