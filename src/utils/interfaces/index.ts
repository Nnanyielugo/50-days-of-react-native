export type RootStackParamList = {
  Home: any;
  StopWatch: any;
};

export interface Page {
  name: string;
  componentName: keyof RootStackParamList;
}
