import React, { useState, useEffect, FC } from "react"
import Image from 'next/image'
import { Result } from "postcss";
interface INFView {
  name?: strTing;
  creator?: string;
  src?: string;
  tokenAddress?: string;
  status?: boolean;
  onFavorite?: () => void;
}

const getStyledAddress: string = (address: string) => {
  let result = "";
  result += address.slice(0, 4);
  result += "...";
  result += address.slice(address.length - 4, address.length);
  return result;
}

const NFTView: FC<INFTView> = ({ name = "", creator = "", src = "key.jpg", tokenAddress = "", status = false, onFavorite = () => { } }) => {

  const goToken = () => {
    const url = 'https://solscan.io/token/' + tokenAddress + '?cluster=devnet';
    window.open(url);
  }

  useEffect(() => {
  }, []);

  return (
    <div className="rounded-xl bg-gray-200">
      <div className="relative">
        <img className="rounded-xl h-52 w-52 hover: cursor-pointer" src={src} alt="NFT Image" onClick={goToken}></img>
        <svg onClick={onFavorite} className="absolute right-2 top-2 hover:cursor-pointer" width="30" height="30" viewBox="0 0 32 32" >
          <path d="M15.397 4.687l2.579 5.225a1 1 0 0 0 .753.547l5.766.838a1 1 0 0 1 .554 1.706l-4.173 4.067c-.236.23-.343.561-.288.885l.985 5.743a1 1 0 0 1-1.451 1.054l-5.158-2.712a1.002 1.002 0 0 0-.931 0l-5.158 2.712a1 1 0 0 1-1.451-1.054l.985-5.743a.999.999 0 0 0-.288-.885l-4.173-4.067a1 1 0 0 1 .554-1.706l5.766-.838a1 1 0 0 0 .753-.547L13.6 4.687c.37-.743 1.43-.743 1.797 0z" fill={`${status ? "#f8b84e" : "#ffffff"}`} />
        </svg>
      </div>
      <div className="px-4 py-2 overflow-hidden">
        <p className="font-bold"> {name} </p>
        <p> Creator: {getStyledAddress(creator)} </p>
      </div>
    </div>
  )
}

export default NFTView;