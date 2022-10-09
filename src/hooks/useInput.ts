import { useState, ChangeEvent } from 'react';

export default function useInput(initValue?: string) {
  const [input, setInput] = useState(initValue || '');
  function updateInput({ target: { value }}: ChangeEvent<HTMLInputElement>) {
    setInput(value);
  }
  return { input, updateInput };
}