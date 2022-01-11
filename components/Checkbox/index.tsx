import React, { SyntheticEvent } from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  value: string;
  isChecked: boolean;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ label, id, name, value, isChecked, onChange }: Props) => (
  <label htmlFor={id} style={{ margin: "0.5rem 0" }}>
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      checked={isChecked}
      onChange={onChange}
    />
    {label}
  </label>
);

export default Checkbox;
