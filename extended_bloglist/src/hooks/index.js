import {useState} from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue('');
  };

  const fieldObject = {
    type,
    value,
    onChange,
  };
  return [fieldObject, reset];
};

export {useField};
