import { ChangeEventHandler, useState, useEffect, KeyboardEvent } from 'react';

// CSS
import './input.style.css';

interface AuthInputProps {
  type?: 'text' | 'password';
  label?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>,
  onEnter?: Function,
  rules?: Function[],
}

export default function AuthInput(
  { 
    type = 'text', 
    label, 
    name, 
    id, 
    value, 
    onChange,
    onEnter,
    rules,
  }: AuthInputProps
) 
{
  const [valid, setValid] = useState('');
  useEffect(() => {
    rules?.forEach((rule) => {
      if (rule(value)) {
        setValid(rule(value));
        return;
      }
      setValid('');
    });
  }, [ value, rules ]);

  function onKeyUpEnter(e: KeyboardEvent) {
    if (e.code === 'enter') {
      if (typeof onEnter === 'function') {
        onEnter();
      }
    } 
  }

  return (
    <div className='input_wrap'>
      <label htmlFor={id}>
        <p>{ label }</p>
      </label>
      <input
        className='input' 
        type={type} 
        id={id} 
        name={name}
        value={value || ''}
        onChange={onChange}
        onKeyUp={onKeyUpEnter}
      />
      <p className='input_valid_message'>{ valid }</p>
    </div>
  );
}