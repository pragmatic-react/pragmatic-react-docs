import React from 'react';

export type SelectOption<Value extends HTMLSelectElement['value']> = { label: string; value: Value };

type Props<Value extends HTMLSelectElement['value']> = React.ComponentPropsWithRef<'select'> & {
  options: SelectOption<Value>[];
};

export const Select = <Value extends HTMLSelectElement['value']>({ options, ...props }: Props<Value>) => {
  return (
    <select {...props}>
      {options.map(({ label, value }) => (
        <option key={String(value)} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
