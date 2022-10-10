import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import Preferences from './tabs/Preferences';
import SecuritySettings from './tabs/SecuritySettings';
import Storages from './tabs/Storages';
import Aisle from './tabs/Aisle';
import Format from './tabs/Format';
import SamplingRate from './tabs/SamplingRate';
import Speaker from './tabs/Speaker';
import AddMoreSpeaker from './tabs/AddMoreSpeaker';
import {ComponentProps} from '../../types/page.d';
import {navigateWithAction} from '../../utils/rootNavigation';
import {PageContainer} from '../../components';

interface Tab {
  key: string;
  tab: string;
  pane: () => JSX.Element;
  belong: undefined | string;
}

enum Actions {
  LeaveSite = 'LeaveSite',
  BackParentPage = 'BackParentPage',
  Error = 'Error',
}

const tabs: Tab[] = [
  {
    key: 'preference',
    tab: '偏好设置',
    pane: Preferences,
    belong: undefined,
  },
  {
    key: 'safety',
    tab: '安全设置',
    pane: SecuritySettings,
    belong: undefined,
  },
  {
    key: 'storage',
    tab: '存储设置',
    pane: Storages,
    belong: undefined,
  },
  {
    key: 'speaker',
    tab: '发音人',
    pane: Speaker,
    belong: 'preference',
  },
  {
    key: 'add-more-speaker',
    tab: '添加更多发音人',
    pane: AddMoreSpeaker,
    belong: 'speaker',
  },
  {
    key: 'format',
    tab: '格式',
    pane: Format,
    belong: 'preference',
  },
  {
    key: 'sampling-rate',
    tab: '采样速率',
    pane: SamplingRate,
    belong: 'preference',
  },
  {
    key: 'aisle',
    tab: '通道',
    pane: Aisle,
    belong: 'preference',
  },
];

const tabPanes = tabs.reduce((cur, next: any) => {
  return {
    ...cur,
    [next.key]: next.pane,
  };
}, {});

const tabTitle = tabs.reduce((cur, next: any) => {
  return {
    ...cur,
    [next.key]: next.tab,
  };
}, {});

export default (props: ComponentProps<'Note'>) => {
  const {navigation, route} = props;
  const {params} = route;
  const {key = 'preference'} = params || navigation.getParam('key');
  const [activeTab, setActiveTab] = useState(key);

  const figurePath = useCallback((data: Tab[], activeKey: string) => {
    const currentTab = data.find(item => item.key === activeKey);
    if (!currentTab) {
      return {
        type: Actions.Error,
      };
    }
    if (!currentTab.belong) {
      return {
        type: Actions.LeaveSite,
      };
    }
    return {
      type: Actions.BackParentPage,
      parentKey: currentTab.belong,
    };
  }, []);

  // 计算返回路径
  const goBack = () => {
    const data = figurePath(tabs, activeTab);
    const {type} = data;
    switch (type) {
      case Actions.Error:
        return false;
      case Actions.LeaveSite:
        return navigation.goBack();
      case Actions.BackParentPage: {
        return navigateWithAction({key: data.parentKey});
      }
      default:
        break;
    }
  };

  useEffect(() => {
    setActiveTab(key);
  }, [key]);

  return (
    <PageContainer
      header={{
        title: tabTitle[activeTab],
        goBack: goBack,
      }}>
      {tabPanes[activeTab] && React.createElement(tabPanes[activeTab], props)}
    </PageContainer>
  );
};
