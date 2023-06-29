'use client'

import React from 'react';
import { useState, useEffect, useContext, useCallback } from 'react';
import { MemesDataContext, MemeType } from '@/app/memesDataContext';
import ReactPaginate from 'react-paginate';
import MyItems from '@/app/favorites/myItems';


export default function MyMemes({ itemsPerPage }: { itemsPerPage: number }) {
  // const { memes } = useContext(MemesDataContext);
  const { memes } = useContext(MemesDataContext);
  const [myMemes, setMyMemes] = useState<MemeType[]>([]);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<MemeType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = memes.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % myMemes?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // console.log(event.selected,newOffset);
    setPage(event.selected);
    setItemOffset(newOffset);
  };

  // console.log(context.memes);

  useEffect(() => {
    // console.log("set memes...");
    setMyMemes(memes?.filter(meme => meme.favorite));
    // setCurrentItems(myMemes?.slice(favItemOffset, endOffset));
    // setPageCount(Math.ceil(myMemes?.length / itemsPerPage));;
    // setPage(memes?.length > 0 ? 0 : -1);

  }, [memes]);

  useEffect(() => {
    setCurrentItems(myMemes?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(myMemes?.length / itemsPerPage));
    // setPage(myMemes?.length > 0 ? 0 : -1);

  }, [myMemes]);

  useEffect(() => {
    // console.log("set memes...");
    setCurrentItems(myMemes?.slice(itemOffset, endOffset));

  }, [itemOffset]);

  return (
    <>
      <div className='mb-5'>
        <h1>My Favorites</h1>
      </div>

      {myMemes?.length === 0 ? "Please check out your favoriate memes from home page." :
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
          <MyItems currentItems={currentItems} />
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

