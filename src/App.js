
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");
  //useRef Hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowNumber) str += "0123456789"
    if (allowChar) str += "*&()^$#@%)~`"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, allowNumber, allowChar, setPassword])
  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)

    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,allowNumber,allowChar,passwordGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly 
            ref={passwordRef}/>
          <button className='outline-none bg-teal-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' type='range' min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={allowNumber}
              id="numberInput"
              onChange={() => {
                setAllowNumber((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={allowChar}
              id="charInput"
              onChange={() => {
                setAllowChar((prev) => !prev);
              }}
            />
            <label htmlFor='charInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
