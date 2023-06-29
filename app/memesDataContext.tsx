'use client'

import { createContext, useState, Dispatch, SetStateAction } from "react";

export interface MemeType {
  id: string;
  name: string;
  url: string;
  favorite?: boolean;
}

interface MemesDataContextType {
  memes: MemeType[];
  setMemes: Dispatch<SetStateAction<MemeType[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  itemOffset: number;
  setItemOffset: Dispatch<SetStateAction<number>>;
  close: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  // favPage: number;
  // setFavPage: Dispatch<SetStateAction<number>>;
  // favItemOffset: number;
  // setFavItemOffset: Dispatch<SetStateAction<number>>;
}

const MemesDataContext = createContext<MemesDataContextType>({
  memes: [], setMemes: () => [],
  page: -1, setPage: () => -1, itemOffset: 0, setItemOffset: () => 0,
  close: true, setClose: () => true,
  // favPage: -1, setFavPage: () => -1, favItemOffset: 0, setFavItemOffset: () => 0
});

const MemesDataContextProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [page, setPage] = useState<number>(-1);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [close, setClose] = useState<boolean>(true);


  return (
    <MemesDataContext.Provider value={{ memes, setMemes, page, setPage, itemOffset, setItemOffset, close, setClose }}>
      {children}
    </MemesDataContext.Provider>
  );
}

export { MemesDataContext, MemesDataContextProvider };