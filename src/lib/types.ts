export type ArrayElement = {
  id: number;
  num: number;
};
export type Algorithm = {
  selected: boolean;
  title: string;
  timeComplexity?: string;
  func: Function;
  comparisonFunc: Function;
  description: string;
  slug: string;
  algoType?: string;
};
