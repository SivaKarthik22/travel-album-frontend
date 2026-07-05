import assetsApiServiceInstance from "@/services/AssetsApiService";
import { useEffect, useState } from "react";

export default function ImageComponent() {
    const [imagesList, setImagesList] = useState<string[]>([]);

    const getImagesList = async () => {
        const height = window.innerHeight;
        setImagesList(await assetsApiServiceInstance.getLoginPageImagesList(height));
    }
    useEffect(() => {
        getImagesList();
    }, []);

    return <div className="w-1/2 h-screen flex items-center justify-center bg-yellow-200 relative overflow-hidden">
        {imagesList.length ? <img className="object-cover w-full h-full" src={imagesList[getRandomNumber(imagesList.length)]} /> : <></> }
        <div id="img-title-overlay">
            <p>my</p>
            <p>Travel</p>
            <p>Album</p>
        </div>
    </div>
}

const getRandomNumber = (length: number) => Math.floor(Math.random() * length);
