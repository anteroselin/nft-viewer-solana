import React, { useState } from "react"

const NFTView = ({ name="", creator=""}) => {
  const [status, setStatus] = useState(false);

  const onFavorite = () => {
    setStatus(!status);
  }

  return (
    <div className="rounded-xl bg-gray-200 w-full">
      <div className="relative">
        <img className="rounded-xl w-full" src="key.jpg"></img>
        {/* <svg onClick={onFavorite} className="absolute right-2 top-2 hover:cursor-pointer" width="16" height="16" viewBox="0 0 100 100">
          <path d="M92.3 38.6L64 34.9 51.8 9.1c-.7-1.5-2.9-1.5-3.6 0L36 34.9 7.7 38.6c-1.7.2-2.3 2.2-1.1 3.4l20.7 19.6-5.2 28.1c-.3 1.6 1.4 2.9 2.9 2.1l25-13.6 25 13.6c1.5.8 3.2-.5 2.9-2.1l-5.2-28.1L93.4 42c1.2-1.2.5-3.2-1.1-3.4zM69.1 59.5c-.5.5-.7 1.1-.6 1.8l4.7 25L51 74.1c-.3-.2-.6-.2-1-.2-.3 0-.7.1-1 .2L26.8 86.3l4.7-25c.1-.7-.1-1.3-.6-1.8L12.4 42l25.2-3.3c.7-.1 1.3-.5 1.6-1.1l10.8-23 10.9 22.9c.3.6.9 1 1.5 1.1L87.6 42 69.1 59.5z" fill={`${status ? "#f8b84e" : ""}`}/><path fill="#00F" d="M1084-370v1684H-700V-370h1784m8-8H-708v1700h1800V-378z"/>
        </svg> */}
        <svg onClick={onFavorite} className="absolute right-2 top-2 hover:cursor-pointer" width="20" height="20" viewBox="0 0 32 32" >
          <path d="M15.397 4.687l2.579 5.225a1 1 0 0 0 .753.547l5.766.838a1 1 0 0 1 .554 1.706l-4.173 4.067c-.236.23-.343.561-.288.885l.985 5.743a1 1 0 0 1-1.451 1.054l-5.158-2.712a1.002 1.002 0 0 0-.931 0l-5.158 2.712a1 1 0 0 1-1.451-1.054l.985-5.743a.999.999 0 0 0-.288-.885l-4.173-4.067a1 1 0 0 1 .554-1.706l5.766-.838a1 1 0 0 0 .753-.547L13.6 4.687c.37-.743 1.43-.743 1.797 0z"fill={`${status ? "#f8b84e" : "#ffffff"}`}/>
        </svg>
      </div>
      <div className="px-4 py-2">
        <p className="font-bold"> {name} </p>
        <p> Creator: {creator} </p>
      </div>
    </div>
  )
}

export default NFTView;