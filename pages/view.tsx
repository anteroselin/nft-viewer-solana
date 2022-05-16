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
  const [book, setBook] = useState<boolean>(true);
  const dispatch = useDispatch();
  const nfts = useSelector(state => state.nfts);

  const setNFTData = async (key: string) => {
    const res = await getAllNftData(key);
    let arr = [];
    for (let i = 0; i < res.length; i++) {
      let val = await axios.get(res[i].data.uri);
      val.data.tokenAddress = res[i].mint;
      val.data.status = false;
      val.data.updateAuthority = res[i].updateAuthority;
      arr.push(val.data);
    }
    const url = "https://api-devnet.solscan.io/account/transaction?address=" + key;
    let transaction_data = (await axios.get(url)).data.data;
    arr.map((val, key) => {
      for (let i = 0; i < transaction_data.length; i++) {
        if (transaction_data[i].signer[0] === val.updateAuthority) {
          val.blockTime = transaction_data[i].blockTime;
        }
      }
    })
    let result_arr = arr.sort((a: any, b: any) => (a.blockTime > b.blockTime ? 1 : -1));
    setTotalNFTs(result_arr);
  }

  const onOrderByCreationTime = async (data: any[]) => {
    let arr = totalNFTs;
    let result_arr = arr.sort((a: any, b: any) => (a.blockTime > b.blockTime ? 1 : -1));
    result_arr.map((val, key) => {
      val.status = false;
    })
    setTotalNFTs(result_arr.slice(0));

  }

  const onSearch = async () => {
    if (ownerKey === "") {
      alert("Please input owner public key");
      return;
    }
    setLoading(true);
    setNFTData(ownerKey);
    setLoading(false);
  }

  useEffect(() => {
    if (nfts.owner_key) {
      (async () => {
        setLoading(true);
        setNFTData(nfts.owner_key)
        setLoading(false);
      })();
    }
  }, [nfts.owner_key]);

  const onClearBookmarks = () => {
    let arr = totalNFTs;
    for (let i = 0; i < arr.length; i++) {
      arr[i].status = false;
    }
    setTotalNFTs(arr.slice(0));
  }

  const onBookmark = (x: number) => {
    let temp = totalNFTs;
    temp[x].status = !temp[x].status;
    let result = [];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].status === true) {
        result.push(temp[i]);
      }
    }
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].status === false) {
        result.push(temp[i]);
      }
    }
    setTotalNFTs(result);
  }

  return (
    <div className='container p-12'>
      <div className='flex flex-row'>
        <span className='text-4xl mr-10 font-bold'> NFT Viewer </span>
        <SearchInput className='flex flex-row w-1/2 items-center justify-center' text={ownerKey} onClickHandler={onSearch} onChangeHandler={setOwnerKey}></SearchInput>
      </div>
      <div className='p-8'>
        <div className='flex flex-wrap'>
          <button className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border-0 rounded shadow mt-2">
            Last Transaction Time
          </button>
          <button onClick={onOrderByCreationTime} className="ml-2 bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border-0 rounded shadow mt-2">
            Last Creation Time
          </button>
          <button onClick={onClearBookmarks} className="float-right ml-auto bg-red-500 hover:bg-red-300 text-white font-semibold py-2 px-4 border-0 rounded shadow mt-2">
            Clear bookmark
          </button>
        </div>
        <div className='flex'>
          <div className='flex flex-wrap mt-16 gap-4'>
            {
              !loading ? (
                totalNFTs.length !== 0 ? (
                  <>
                    {
                      totalNFTs.map((val, key) => {
                        return (
                          <NFTView key={key} name={val.name} creator={val.properties.creators[0].address} src={val.image} status={val.status} onFavorite={() => onBookmark(key)} tokenAddress={val.tokenAddress}></NFTView>
                        )
                      })
                    }
                  </>
                ) : (
                  <>
                    <p className="text-center font-bold text-red-300 text-3xl">Not found NFTs</p>
                  </>
                )
              ) : (
                <>
                  <p className="text-center font-bold text-green-300 text-3xl">loading...</p>
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