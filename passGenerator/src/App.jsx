import { useState, useCallback , useEffect, useRef} from "react";

function App() {
  const [length, setlength] = useState(5);
  const [numAllow, setnum] = useState(true);
  const [charAllow, setchar] = useState(true);
  const [password, setpassword] = useState("");

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) {
      str += "0123456789";
    }

    if (charAllow) {
      str += "!£$%^&*()_@¬?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numAllow, charAllow, setpassword]);


  const copyclipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(0 ,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect( () => {
    passwordGen()
  } , [length, numAllow, charAllow, setpassword] )


  // user ref hoook 

  const passwordRef = useRef(null)


  return (
    <>
      <div className="contain">
        <div
          className="pass  w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 overflow-hidden
    mb-4 "
        >
          <h1 className="text-white word">
            <span>Password Generator</span>
          </h1>

          <div
            className="flex shadow rounded-lg  
      overflow-hidden mb-4 my-3"
          >
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly

              ref={passwordRef}
            />

            <button  onClick={copyclipboard} className="copy">Copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex item-centre gap-x-1">

              <input
               type="range"
               
               min={6}
               max={100}
               value={length}
               className="cursor-pointer"
               onChange={(e)=>{setlength(e.target.value)}}
               
               />
               <label> length :{length} </label>

            </div>

<div className="flex item-centre gap-x-1">

  <input
   type="checkbox" 
    id="numberInput" 
    defaultChecked={setnum}
    onChange={()=>{
      numAllow((prev)=> !prev)
    }}
   />

   <label htmlFor="numberInput">Numbers</label>
</div>


<div className="flex item-centre gap-x-1 ">

  <input 
   type="checkbox"
   defaultChecked={setchar}
   id="characterInput" 

   onChange={ ()=>{
    setchar( (prev) => !prev )
   } }

    />
    <label htmlFor="characterInput">Charcters </label>

</div>

          </div>
        </div>
      </div>
    </>
  );
}


export default App
