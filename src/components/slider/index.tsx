import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';

import s from './slider.module.scss'

type PropsType = {
  onChange: (key: number) => void
}

export default ({ onChange }: PropsType) => {

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    setValue(value);
    onChange(value);
  };

  return (
    <div className={s.container}>
      <input
        className={s.rangeInput}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <div className={s.numberContainer}>
        <div className={s.label}>Level</div>
        <input
          type="number"
          className={s.numberInput}
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );

}