import assetsApiServiceInstance from "@/services/AssetsApiService";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";

export default function ImageComponent() {
    const [imagesList, setImagesList] = useState([]);

    const getImagesList = async () => {
        const height = window.innerHeight;
        setImagesList(await assetsApiServiceInstance.getLoginPageImagesList(height));
    }
    useEffect(() => {
        getImagesList();
    }, []);

    return <div className="w-8/12 h-screen flex items-center justify-center">
        {imagesList.length ?
            <img className="object-cover w-full h-full" src={imagesList[getRandomNumber(imagesList.length)]} /> :
            <Spinner className="size-6" />
        }
    </div>
}

const getRandomNumber = (length: number) => Math.floor(Math.random() * length);
