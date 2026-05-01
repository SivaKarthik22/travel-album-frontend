import assetsApiServiceInstance from "@/services/AssetsApiService"
import { Suspense, use, useCallback } from "react";
import SmallLoadingUI from "../utilityComponents/SmallLoadingUI";

export default function ImageComponent(){
    const imageData: string[] = use( assetsApiServiceInstance.getLoginPageImagesList() );

    const generateRandomIndex = useCallback((maxNum:number)=>{
        return Math.floor(Math.random() * maxNum);
    }, []);

    return <>
        <Suspense fallback={<SmallLoadingUI />}>
            <img src={imageData[generateRandomIndex(imageData.length)]}/>
        </Suspense>
    </>
}
