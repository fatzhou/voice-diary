export interface Option {
  id: string;
  value: string;
  label: string;
  selected: boolean;
}

export interface OptionItem {
  value: string;
  label: string;
}

export const handleOptions = (
  options: OptionItem[] = [],
  defaultValue: string[] = [],
) => {
  const result: Option[] = [];
  options.forEach((item) => {
    if (defaultValue.includes(item?.value)) {
      result.push({...item, id: item.value, selected: true});
    } else {
      result.push({...item, id: item.value, selected: false});
    }
  });
  return result;
};
