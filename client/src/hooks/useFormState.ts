import { useState } from 'react';

export default (intialVal: any) => {
  const [state, setState] = useState(intialVal);

  const handleState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setState(e.target.value);

  const reset = () => setState('');

  return [state, handleState, reset, setState];
};
