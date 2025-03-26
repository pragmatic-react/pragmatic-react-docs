export const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};
