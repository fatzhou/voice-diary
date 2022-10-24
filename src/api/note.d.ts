export enum TitleType {
  Voice = 1,
  Text = 2,
}

export enum ResourceType {
  Image = 1,
  Video = 2,
}

export interface Note {
  id: number;
  createTime: number;
  updateTime: number;
  title: {
    type: TitleType;
    content: string;
  };
  resources: {
    type: ResourceType;
    uri: string;
  };
  address: {
    value: string;
  };
  weather: {
    value: string;
  };
  mood: {
    value: string;
  };
}
