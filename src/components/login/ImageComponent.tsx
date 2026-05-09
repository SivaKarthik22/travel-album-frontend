'use client';

import { use } from "react";

export default function ImageComponent(props:any) {
    const imagesList: string[] = use(props.imagesListPromise);

    return <img src={imagesList[getRandomNumber(imagesList.length)]} />
}

const getRandomNumber = (length: number) => Math.floor(Math.random() * length);
