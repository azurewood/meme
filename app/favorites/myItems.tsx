import React from 'react';
import { useState, useCallback } from 'react';
import {MemeType} from "@/app/memesDataContext";
import Card from '@/components/Card';
import ImageViewer from "react-simple-image-viewer";

export default function MyItems({ currentItems }: { currentItems: MemeType[] }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
  
    const images=currentItems.map(item=>item.url);
  
    const openImageViewer = useCallback((index:number) => {
      setCurrentImage(index);
      setIsViewerOpen(true);
    }, []);
  
    const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
    };
  
    return (
      <>
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)"
            }}
            closeOnClickOutside={true}
          />
        )}
  
        <div id="items-container" className="bg-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {currentItems &&
            currentItems.map((item, index) => (
              <div key={item.id} className='px-2 py-2'><Card id={item.id} name={item.name} url={item.url} favorite={item.favorite?true:false} onImageClick={()=>openImageViewer(index)}></Card></div>
            ))}
        </div>
      </>
  
    );
  }