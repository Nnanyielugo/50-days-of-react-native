export type BrickObj = {
  id: string;
  width: number;
};

export type RowObj = {
  id: string;
  row: BrickObj[];
};
