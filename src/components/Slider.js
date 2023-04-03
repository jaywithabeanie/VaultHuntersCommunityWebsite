import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Stylesheet
import './Slider.scss'

function Slider(props) {

  const [value, setValue] = useState(0);

  const handleSliderChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <div className="slider-container">
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleSliderChange}
            id="slider"
        />
        <div className="slider-display">
            <label>Level</label>
            <input
                type="number"
                min="0"
                max="100"
                value={value}
                onChange={handleInputChange}
            />
        </div>
    </div>
  );

}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Slider;