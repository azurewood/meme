import Image from 'next/image';
// Import the FontAwesomeIcon component
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MemeType, MemesDataContext } from '@/app/memesDataContext';

// import the icons you need
import {
    faHeartCircleMinus, faHeartCirclePlus, faHeartCircleCheck
} from "@fortawesome/free-solid-svg-icons";

export default function Card({ id, name, url, favorite, onImageClick, update }: { id: string, name: string, url: string, favorite: boolean, onImageClick?: () => void, update: (memes: MemeType[]) => void }) {
    // console.log(onImageClick)
    const [icon, setIcon] = useState(favorite ? faHeartCircleCheck : faHeartCirclePlus);
    const [fav, setFav] = useState(favorite ? true : false);
    const { memes, setMemes } = useContext(MemesDataContext);
    // const container=useRef(null);

    const handleMouseOver = () => {
        if (fav)
            setIcon(faHeartCircleMinus);
    }

    const handleMouseOut = () => {
        if (fav)
            setIcon(faHeartCircleCheck);
        else
            setIcon(faHeartCirclePlus);
    }

    const handleIconClick = () => {
        if (onImageClick === undefined) {
            setFav(!fav);
        }
    }

    useEffect(() => {
        // console.log("set memes...");
        if (onImageClick === undefined){
            setMemes(memes.map((meme) => {
                if (meme.id === id) {
                    // console.log("matched", fav);
                    meme.favorite = fav;
                }
                return meme;
            }));
            setIcon(fav?faHeartCircleCheck:faHeartCirclePlus);
            
            // console.log(container.current);
        }
    }, [fav]);

    return (
        <>
            <div onClick={onImageClick} className="rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
                <h4>{name}</h4>
                <Image
                    src={url}
                    width="200"
                    height="0"
                    alt={name}
                    style={{ width: '200px', height: 'auto' }}
                    className={onImageClick === undefined ? '' : 'hover:cursor-pointer '}
                />
                {onImageClick === undefined ? // Card for Home, otherwise for Favorites
                    <div className="absolute bottom-0 right-0" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleIconClick}>
                        <FontAwesomeIcon
                            icon={icon}
                            className={fav ? 'text-3xl text-pink-400 hover:text-pink-600 hover:cursor-pointer hover:-translate-y-px' : 'text-3xl text-zinc-400 hover:text-zinc-600 hover:cursor-pointer hover:-translate-y-px'}
                        />
                    </div>
                    : ""}
            </div>
        </>
    )
}