import React, {
  useEffect,
  useReducer,
  Reducer,
  useRef,
  useImperativeHandle,
} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-crop-picker';
import images from '../../core/images';
import InsertLinkModal from './components/LinkModal';
import {RichDefaultActions, createContentStyle} from './constants';
import {reducer, initialState, Action, Actions} from './reducer';
import {styles} from './styles';

interface Props {
  titleComponent?: JSX.Element;
  initData: any;
}

export default React.forwardRef((props: Props, ref) => {
  const {titleComponent, initData = {html: ''}} = props;
  const richTextRef = useRef(null);
  const linkModalRef = useRef(null);
  const [state, dispatch] = useReducer<Reducer<any, Action<Actions>>>(
    reducer,
    initialState,
  );
  const {disabled, contentStyle} = state;
  const content = useRef<string>(initData.html);

  const onKeyHide = () => {};

  const onKeyShow = () => {
    TextInput.State.currentlyFocusedInput() &&
      // TextInput.State.currentlyFocusedField() &&
      dispatch({type: Actions.UpdateEmojiVisible, payload: false});
  };

  const editorInitializedCallback = () => {
    richTextRef.current?.registerToolbar(items => {
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  };

  const getHtml = async () => {
    return content.current;
  };

  const handleChange = (value: string) => {
    content.current = value;
  };

  const handleHeightChange = height => {
    console.log('editor height change:', height);
  };

  const onPressAddImage = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      cropping: true,
      includeBase64: true,
    };
    ImagePicker?.openPicker(options).then((imageRes: any) => {
      const source = 'data:image/jpeg;base64,' + imageRes.data;
      // const imageWithBlob = imageBase64ToBlob(imageRes.data);
      // richTextRef.current?.innerimage();
      // TODO post时，替换base64。
      richTextRef.current?.insertHTML(`<img src=${source} />`);
      richTextRef.current?.blurContentEditor();
    });
  };

  const onInsertLink = () => {
    linkModalRef.current?.setModalVisible(true);
  };

  const handleSubmitLink = ({title, url}) => {
    richTextRef.current?.insertLink(title, url);
  };

  const handlePaste = data => {
    console.log('Paste:', data);
  };

  const handleKeyUp = data => {
    console.log('KeyUp:', data);
  };

  const handleKeyDown = data => {
    console.log('KeyDown:', data);
  };

  // 监听html标签的点击事件,可封装不同的actions
  const handleMessage = ({type, id, data}) => {
    console.log('onMessage', type, id, data);
  };

  const handleFocus = () => {
    dispatch({type: Actions.UpdateEditorFocus, payload: true});
  };

  const handleBlur = () => {
    dispatch({type: Actions.UpdateEditorFocus, payload: false});
  };

  const handleVoiceAction = () => {
    Keyboard.dismiss();
    richTextRef.current?.blurContentEditor();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyShow);
    Keyboard.addListener('keyboardDidHide', onKeyHide);
    dispatch({
      type: Actions.UpdateContentStyle,
      payload: createContentStyle,
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        getHtml,
        richTextRef,
      };
    },
    [],
  );

  return (
    <>
      <InsertLinkModal
        placeholderColor="000000"
        color={'black'}
        handleSubmit={handleSubmitLink}
        ref={linkModalRef}
      />
      <ScrollView
        style={styles.scroll}
        keyboardDismissMode={'none'}
        nestedScrollEnabled={true}>
        {titleComponent}
        <RichEditor
          disabled={disabled}
          editorStyle={contentStyle}
          ref={richTextRef}
          style={styles.rich}
          placeholder={'说说你此刻想说的内容'}
          initialContentHTML={initData.html}
          editorInitializedCallback={editorInitializedCallback}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          onPaste={handlePaste}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onMessage={handleMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
          pasteAsPlainText={true}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          style={[styles.richBar, styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richTextRef}
          disabled={disabled}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
          actions={RichDefaultActions}
          iconMap={{
            [actions.heading1]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
            ),
            [actions.heading4]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
            ),
            voice: () => (
              <Image source={images.addNote.translation} style={styles.voice} />
            ),
          }}
          voice={handleVoiceAction}
        />
      </KeyboardAvoidingView>
    </>
  );
});
