import type { NextPage } from 'next'
import React, { useState, useEffect } from "react"
import SearchInput from '../components/SearchInput'
import NFTView from '../components/NFTView'
import { connect } from "react-redux";
import Link from 'next/link';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllNftData } from '../lib/store/actions/nftsActions';
import { arrayBuffer } from 'stream/consumers';

const View: NextPage = () => {
  const [ownerKey, setOwnerKey] = useState<string>("");
  const [totalNFTs, setTotalNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const nfts = useSelector(state => state.nfts);

  const onSearch = async () => {
    setLoading(true);
    const res = await getAllNftData(ownerKey);
    console.log(res);
    let arr = [];
    for ( let i = 0 ; i < res.length ; i++) {
      let val = axios.get(res[i].data.uri);
      arr.push(val.data);
    }
    console.log(arr);
    setTotalNFTs(arr);
    setLoading(false);
  }

  useEffect(() => {
    if (nfts.owner_key) {
      (async () => {
        setLoading(true);
        setOwnerKey(nfts.owner_key);
        const res = await getAllNftData(nfts.owner_key);
        console.log(res);
        let arr = [];
        for ( let i = 0 ; i < res.length ; i++) {
          let val = await axios.get(res[i].data.uri);
          arr.push(val.data);
        }
        setTotalNFTs(arr);
        setLoading(false);
      })();
    }
  }, [nfts.owner_key]);

  return (
    <div className='container p-12'>
      <div className='flex flex-row'>
        <span className='text-4xl mr-10 font-bold'> NFT Viewer </span>
        <SearchInput className='flex flex-row w-1/2 items-center justify-center' text={ownerKey} onClickHandler={onSearch} onChangeHandler={setOwnerKey}></SearchInput>
      </div>
      <div className='p-8'>
        <div className='flex'>
          <button className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border-0 rounded shadow">
            Last Transaction Time
          </button>
          <button className="ml-8 bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border-0 rounded shadow">
            Last Creation Time
          </button>
          <button className="ml-auto ml-8 bg-red-500 hover:bg-red-300 text-white font-semibold py-2 px-4 border-0 rounded shadow">
            Clear bookmark
          </button>
        </div>
        <div className='flex'>
          <div className='grid grid-cols-3 gap-4 md:grid-cols-5 md:gap-6 mt-16'>
            {
              !loading ? (
                <>
                  {
                    totalNFTs.map((val, key) => {
                      return (
                        <NFTView key={key} name={val.name} creator={val.creators[0].address} src={val.image}></NFTView>
                      )
                    })
                  }
                  <NFTView name="key" creator="kanbei"></NFTView>
                  <NFTView name="key" creator="kanbei"></NFTView>
                  <NFTView name="key" creator="kanbei"></NFTView>
                  <NFTView name="key" creator="kanbei"></NFTView>
                  <NFTView name="key" creator="kanbei"></NFTView>
                  <NFTView name="key" creator="kanbei"></NFTView>
                </>
              ) : (
                <>
                  <p className="text-center">loading...</p>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default View;