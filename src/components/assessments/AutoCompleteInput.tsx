import { Input } from '@nextui-org/react';
import React from 'react';

const AutocompleteInput = ({
  formik,
  fieldName,
  label,
  handleInputChange,
  showSuggestions,
  filteredSuggestions,
  handleSelect,
}: {
  formik: any;
  fieldName: string;
  label: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSuggestions: boolean;
  filteredSuggestions: string[];
  handleSelect: (value: string) => void;
}) => {
  return (
    <div className="relative w-full">
      <Input
      variant='underlined'
        label={`Enter ${label}`}
        id={fieldName}
        name={fieldName}
        type="text"
        isInvalid={!!(formik.errors[fieldName] && formik.touched[fieldName])}
        errorMessage={formik.errors[fieldName]}
        value={formik.values[fieldName]}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-20 w-full bg-white shadow-lg border max-h-40 overflow-auto">
          {filteredSuggestions.map((item: string) => (
            <div
              key={item}
              className="p-2 cursor-pointer bg-white hover:bg-gray-200"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
