import type { NextPage } from 'next'
import React, { useState } from "react"
import SearchInput from '../components/SearchInput'
import NFTView from '../components/NFTView'
import Link from 'next/link'

const View: NextPage = () => {
  const [ownerKey, setOwnerKey] = useState("");

  return (
    <div className='container p-12'>
      <div className='flex flex-row'>
        <span className='text-4xl mr-10 font-bold'> NFT Viewer </span>
        <SearchInput className='flex flex-row w-1/2 items-center justify-center' text={ownerKey} onChangeHandler={setOwnerKey}></SearchInput>
      </div>
      <div className='p-8'>
        <div className='flex'>
          <button className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Last Transaction Time
          </button>
          <button className="ml-8 bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Last Creation Time
          </button>
        </div>
        <div className='flex mt-16'>
          <NFTView></NFTView>
        </div>
        
      </div>
    </div>
  )
}

export default View
