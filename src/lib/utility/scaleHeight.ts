export const scaleBarHeight = (num: number): string => {
  //out of 500px, making a equation to scale the height of the bar
  return `${(num * 500) / 100}`;
};
