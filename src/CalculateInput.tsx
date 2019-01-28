import * as React from "react";

export const CalculateInput = ({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (input: number) => void;
  value: number;
}) => {
  return (
    <div>
      <label>
        {label}: {"  "}
        <input
          type="number"
          onChange={e => onChange(Number(e.target.value))}
          value={value}
        />
      </label>
    </div>
  );
};
