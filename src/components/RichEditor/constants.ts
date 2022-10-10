import {actions} from 'react-native-pell-rich-editor';

export const RichDefaultActions = [
  actions.keyboard,
  actions.setBold,
  actions.setItalic,
  actions.setUnderline,
  // actions.removeFormat,
  // actions.indent,
  // actions.outdent,
  'voice',
  actions.insertLink,
  // actions.undo,
  // actions.redo,
  actions.insertImage,
  // actions.setStrikethrough,
  // actions.checkboxList,
  // actions.insertBulletsList,
  // actions.insertOrderedList,
  // actions.blockquote,
  // actions.alignLeft,
  // actions.alignCenter,
  // actions.alignRight,
  // actions.code,
  // actions.line,
  actions.heading1,
  actions.heading4,
];

export const createContentStyle = {
  backgroundColor: '#fff',
  color: '#000033',
  placeholderColor: '#a9a9a9',
  contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;',
};
