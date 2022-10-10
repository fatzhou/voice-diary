type ProtocolType = 'user' | 'privacy' | 'member' | 'renew' | 'terms';

type MemberType = '' | 'monthly' | 'yearly' | 'permanent';

type RootStackParamList = {
  Home: undefined;
  Demo: undefined;
  Icons: undefined;
  Languages: undefined;
  AppleLogin: undefined;
  Purchase: undefined;
  Advice: undefined;
  Protocol: {
    type: ProtocolType;
  };
  Voice: undefined;
  Note: undefined;
  Detail: undefined;
  NewNote: undefined;
  Site: undefined;
  SubSite: undefined;
};

type PageName = keyof RootStackParamList;

// page public navigation
type ScreenNavigationProp<T extends PageName> = StackNavigationProp<
  RootStackParamList,
  T
>;

type ScreenRouteProp<T extends PageName> = RouteProp<RootStackParamList, T>;

export type ComponentProps<T extends PageName> = {
  navigation: NoteScreenNavigationProp<T>;
  route: NoteScreenRouteProp<T>;
};

export enum AddNotePageStatus {
  Edit = 1,
  Read = 0,
}
