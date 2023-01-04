export type BrickObj = {
  id: string;
  width: number;
  transparent: boolean;
};

export type RowObj = {
  id: string;
  row: BrickObj[];
};
