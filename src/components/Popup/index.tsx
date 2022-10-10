import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {Popover, PopoverController} from 'react-native-modal-popover';
import images from '../../core/images';
import Button from '../Button';

type TextParams = string | number;

export interface OptionItem {
  label: TextParams;
  value: TextParams;
}

export type TextCSS = StyleProp<TextStyle>;

export interface PopupProps {
  triggerEntity?: React.ReactNode; // 触发实体
  options?: React.ReactNode; // 选项
  onChange?: (text: TextParams) => void;
}

export default (props: PopupProps) => {
  const {options: Options} = props;

  return (
    <PopoverController>
      {({
        openPopover,
        closePopover,
        popoverVisible,
        setPopoverAnchor,
        popoverAnchorRect,
      }) => (
        <React.Fragment>
          <Button
            icon={images.public.more}
            ref={setPopoverAnchor}
            onPress={openPopover}
          />
          <Popover
            contentStyle={styles.content}
            arrowStyle={styles.arrow}
            backgroundStyle={styles.background}
            visible={popoverVisible}
            onClose={closePopover}
            fromRect={popoverAnchorRect}
            placement="bottom"
            supportedOrientations={[
              'portrait',
              'landscape',
              'portrait-upside-down',
            ]}>
            {Options}
          </Popover>
        </React.Fragment>
      )}
    </PopoverController>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#343434',
    borderRadius: 4,
    padding: 0,
  },
  arrow: {
    borderTopColor: '#343434',
  },
  background: {},
  button: {
    width: 20,
    height: 20,
    backgroundColor: '#343434',
  },
  option: {
    color: 'white',
  },
});
