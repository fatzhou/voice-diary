export const activeOpacity = 0.8;

export const TouchableOpacityHitSlop = {
  top: 15,
  left: 15,
  right: 15,
  bottom: 15,
};
export const TouchableOpacityActiveOpacity = 0.8;

export enum Languages {
  CN = 'cn',
  EN = 'en',
  TC = 'tc',
  EMPTY = '',
}

// 语言和文案的对应关系
export const LanguagesMap = {
  [Languages.EN]: 'English',
  [Languages.CN]: '简体中文',
  [Languages.TC]: '繁體中文',
};

export const CommentsStore = 'CommentsStore';
export const NotesStore = 'NotesStore';
