// import React, {useState, useEffect} from 'react';
// import I18n from '../../i18n';

const useLanguageUpdate = (funcWhenUpdate, listenParamArr = []) => {
  // const [currentLanguage, setCurrentLanguage] = useState(I18n.locale);
  // useEffect(() => {
  //   return store.subscribe(() => {
  //     const {
  //       settings: {language},
  //     } = store.getState();
  //     if (language && language !== currentLanguage) {
  //       setCurrentLanguage(language);
  //       if (funcWhenUpdate) funcWhenUpdate();
  //     }
  //   });
  // }, [currentLanguage, ...listenParamArr]);
  // return currentLanguage;
};

export default useLanguageUpdate;
