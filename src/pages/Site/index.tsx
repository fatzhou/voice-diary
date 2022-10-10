import * as React from 'react';
import {PageContainer} from '~/components';
import {ComponentProps} from '~/core/types';
import Site from './Content';

export default (props: ComponentProps<'Note'>) => {
  const {navigation} = props;
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <PageContainer
      header={{
        title: '设置',
        goBack: goBack,
      }}>
      <Site />
    </PageContainer>
  );
};
