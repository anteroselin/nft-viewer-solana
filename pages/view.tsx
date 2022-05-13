import type { NextPage } from 'next'
import React, { useState } from "react"
import SearchInput from '../components/SearchInput'
import Link from 'next/link'

const View: NextPage = () => {
  const [ownerKey, setOwnerKey] = useState("");

  return (
    <div className='container p-12'>
      <div className='flex flex-row'>
        <span className='text-4xl mr-10 font-bold'> NFT Viewer </span>
        <SearchInput className='flex flex-row w-1/2 items-center justify-center' text={ownerKey} onChangeHandler={setOwnerKey}></SearchInput>
      </div>
    </div>
  )
}

export default View
