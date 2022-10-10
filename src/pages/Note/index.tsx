import * as React from 'react';
import PageContainer from '../../components/Page';
import Note from './Content';
import {LeftComponent, RightComponent} from './components/Header';
import {ComponentProps} from '../../types/page.d';
import {useNavigation} from '@react-navigation/native';

export default (props: ComponentProps<'Note'>) => {
  const navigation = useNavigation();
  return (
    <PageContainer
      header={{
        title: '余音日记',
        leftComponent: () => <></>,
        rightComponent: RightComponent,
        goBack: navigation.goBack,
      }}>
      <Note {...props} />
    </PageContainer>
  );
};
