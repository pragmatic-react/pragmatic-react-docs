import React from 'react';

export type SelectOption = { label: string; value: React.OptionHTMLAttributes<HTMLOptionElement>['value'] };

type Props = React.ComponentPropsWithRef<'select'> & { options: SelectOption[] };

export const Select = ({ options, ...props }: Props) => {
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
