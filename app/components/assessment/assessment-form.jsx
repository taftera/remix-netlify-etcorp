import AssessmentModule from './assessment-module';
import { useState } from 'react';

function AssessmentForm({ data, onValueChange }) {
  // const { data, onValueChange } = props;
  const [selectedValues, setSelectedValues] = useState({});

  const handleValueChange = (id, value) => {
    setSelectedValues((prevValues) => {
      const newValues = { ...prevValues, [id]: value };
      onValueChange(newValues); // Update the parent component with the new values
      return newValues;
    });
  };

  return (
    <>
      <div className="flex flex-col text-primary">
        {data.map((item, index) => (
          <AssessmentModule
            key={index}
            id={index}
            primary={item[0]}
            secondary={item[1]}
            onValueChange={onValueChange}
          />
        ))}
      </div>
      <div className="mt-4 p-4 bg-stone-600 rounded-lg hidden">
        <h3 className="text-xl font-bold mb-2">Selected Values:</h3>
        <ul>
          {Object.entries(selectedValues).map(([id, value]) => (
            <li key={id}>
              Module {parseInt(id) + 1}: {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AssessmentForm;
