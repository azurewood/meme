'use client'

import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import { useState, useEffect, useContext, useCallback } from 'react';
import { MemesDataContext, MemeType } from './memesDataContext';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Card from '@/components/Card';

function Items({ currentItems, onIconClick, update}: { currentItems: MemeType[], onIconClick?: (id: string) => void, update:(memes:MemeType[])=>void }) {

  return (
    <>
      <div id="items-container" className="bg-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {currentItems &&
          currentItems.map((item, index) => (
            <div key={item.id} className='px-2 py-2 relative'><Card id={item.id} update={update} name={item.name} url={item.url} favorite={item.favorite ? true : false}></Card></div>
          ))}
      </div>
    </>

  );
}

export default function Memes({ itemsPerPage }: { itemsPerPage: number }) {
  const { memes, setMemes, page, setPage, itemOffset, setItemOffset } = useContext(MemesDataContext);
  const [isLoading, setIsLoading] = useState(true);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<MemeType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  // const [page, setPage] = useState(-1);

  // console.log(page, itemOffset);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = memes.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % memes?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // console.log(event.selected,newOffset);
    setPage(event.selected);
    setItemOffset(newOffset);
  };

  /**
   * This method never gets executed. It is an alternative to useContext
   * @param memes 
   */
  const updateMemes=(memes:MemeType[])=>{
    setMemes(memes);
    console.log("update memes");
  }


  useEffect(() => {
    if (memes?.length === 0) {
      console.log("loading...");
      setIsLoading(true);
      axios.get("https://api.imgflip.com/get_memes")
        .then(response => response.data)
        .then(data => setMemes(data.data.memes))
        .finally(() => setIsLoading(false));
    }
    else
      setIsLoading(false);
    // console.log(memes);
  }, [])

  useEffect(() => {
    // console.log("set memes...");
    setCurrentItems(memes?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(memes?.length / itemsPerPage));
    //setPage(memes?.length > 0 ? 0 : -1);

  }, [memes]);

  useEffect(() => {
    // console.log("set memes...");
    setCurrentItems(memes?.slice(itemOffset, endOffset));

  }, [itemOffset]);

  return (
    <>
      <div className='mb-5'>
        <h1>Memes Home</h1>
      </div>

      {isLoading ? "Loading..." :
        <div className='space-y-5'>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex text-lg items-center justify-center gap-4 space-x-2 space-y-2 text-slate-600 pb-5"
            pageClassName="flex items-center gap-2 rounded-full justify-center w-0 transition-all duration-300 ease-linear hover:w-7 hover:bg-emerald-100"
            pageLinkClassName="hover:font-bold"
            previousClassName="w-max h-4 w-4 font-base hover:font-bold transition-font duration-300 ease-linear"
            previousLinkClassName="inline-block w-max"
            nextClassName="flex flex-col justify-center my-0 h-4 w-4 font-base hover:font-bold transition-font duration-300 ease-linear"
            nextLinkClassName='inline-block w-max'
            activeClassName="bg-gray-300"
            activeLinkClassName="text-slate-900 font-bold text-xl"
            forcePage={pageCount>0?page:-1}
          />
          <Items currentItems={currentItems} update={updateMemes}/>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex text-lg items-center justify-center gap-4 space-x-2 space-y-2 text-slate-600 pb-5"
            pageClassName="flex items-center gap-2 rounded-full justify-center w-0 transition-all duration-300 ease-linear hover:w-7 hover:bg-emerald-100"
            pageLinkClassName="hover:font-bold"
            previousClassName="w-max h-4 w-4 font-base hover:font-bold transition-font duration-300 ease-linear"
            previousLinkClassName="inline-block w-max"
            nextClassName="flex flex-col justify-center my-0 h-4 w-4 font-base hover:font-bold transition-font duration-300 ease-linear"
            nextLinkClassName='inline-block w-max'
            activeClassName="bg-gray-300"
            activeLinkClassName="text-slate-900 font-bold text-xl"
            forcePage={pageCount>0?page:-1}
          />
        </div>}


    </>
  );
}

