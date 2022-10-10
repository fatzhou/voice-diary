import React, {useCallback, useRef, useState, useMemo} from 'react';
import {Alert, TextInput} from 'react-native';
import Header from './components/Header';
import {styles} from './styles';
import {ComponentProps} from '../../types/page.d';
import {PageContainer, RichEditor} from '../../components';
import {showToast} from '../../utils/native';
import {Note, NoteType} from '../../core/hooks/useNote';

export default (props: ComponentProps<'NewNote'>) => {
  const {navigation, route} = props;
  const {params = {}} = route;
  const {note, saveNote} = params;
  const editRef = useRef<{richTextRef: any; getHtml: () => void}>(null);
  // const [visible, setVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState(
    note
      ? {
          ...note,
        }
      : {
          type: NoteType.Text,
          content: '',
          contentHtml: '',
          title: '',
        },
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleUpdateTitle = useCallback((title: string) => {
    setNewNote((prev: Note) => ({
      ...prev,
      title,
    }));
  }, []);

  const save = useCallback(async () => {
    const html = (await editRef.current?.getHtml()) || '';
    const content = html.replace(/<[^>]+>/g, '');

    if (!newNote.title) {
      showToast('写个标题吧');
      return;
    }

    if (!content && newNote.type === NoteType.Text) {
      showToast('什么内容都没写啊！');
      return;
    }

    saveNote?.({
      ...newNote,
      id: note ? note.id : Date.now(),
      createTime: Date.now(),
      contentHtml: html,
      content,
    });

    showToast('保存成功');
    setTimeout(() => {
      navigation.navigate('Note');
    }, 1500);
  }, [navigation, newNote, note, saveNote]);

  const titleComponent = useMemo(() => {
    return (
      <TextInput
        style={styles.title}
        placeholder="输入标题"
        placeholderTextColor="#00000040"
        onChangeText={text => handleUpdateTitle(text)}
        value={newNote.title}
      />
    );
  }, [handleUpdateTitle, newNote.title]);

  const rightComponent = useCallback(
    () => <Header editRef={editRef.current?.richTextRef} save={save} />,
    [save],
  );

  return (
    <PageContainer
      header={{
        title: note ? '编辑日记' : '创建日记',
        goBack: goBack,
        rightComponent: rightComponent,
      }}>
      <RichEditor
        titleComponent={titleComponent}
        initData={{html: note ? note.contentHtml : ''}}
        ref={editRef}
      />
      {/* <Modal onSubmit={save} visible={visible} setVisible={setVisible} /> */}
    </PageContainer>
  );
};
