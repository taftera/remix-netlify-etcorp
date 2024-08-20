import { useState } from 'react';

function AssessmentModule({ primary, secondary, id, onValueChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  // const { primary, secondary, id, onValueChange } = props;

  const handleChange = (event) => {
    const value = event.target.value;
    // console.log(`Module value for ${id}:`, value);
    setSelectedValue(value);
    onValueChange(id, value);
  };

  function arrowValues(value) {
    switch (parseInt(value)) {
      case 1:
        return '<<1';
      case 2:
        return '<2';
      case 3:
        return '3>';
      case 4:
        return '4>>';
    }
  }

  return (
    <div className="grid grid-cols-12 gap-2 pb-2 last:pb-0">
      <div className="content-center col-span-4 px-4 border border-solid border-black text-center capitalize">
        {primary}
      </div>
      {[1, 2, 3, 4].map((value) => (
        <div
          key={value}
          className="border border-solid border-black flex items-center justify-center w-full h-12 cursor-pointer"
        >
          <input
            className="sr-only peer"
            type="radio"
            name={id}
            id={`${id}-${value}`}
            value={value}
            checked={selectedValue == value}
            onChange={handleChange}
          />
          <label
            className="text-center w-full h-full flex items-center justify-center peer-checked:bg-primary peer-checked:text-secondary"
            htmlFor={`${id}-${value}`}
          >
            {arrowValues(value)}
          </label>
        </div>
      ))}
      <div className="content-center col-span-4 px-4 border border-solid border-black text-center capitalize">
        {secondary}
      </div>
    </div>
  );
}

export default AssessmentModule;
