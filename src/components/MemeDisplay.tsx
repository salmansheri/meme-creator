'use client'; 

import React from "react";
import Image from "next/image";
import { Anton } from "next/font/google";
import { useElementSize }  from 'usehooks-ts'; 



const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

type BackgroundType = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type textAreaType = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
  fontSize: number;
  text: string;
}[];

type valuesType = Record<string, string>; 



const MemeDisplay = ({
  background,
  textareas,
  values
}: {
  background: BackgroundType;
  textareas: textAreaType;
  values: valuesType
}) => {
    const [memeRef, { width }] = useElementSize(); 

    const ratio = width / background.width;

  return (
    <div className="relative" ref={memeRef}>
      <Image
        src={background.src}
        width={background.width}
        height={background.height}
        alt={background.alt}
      />
      {textareas.map((textarea) => (
        <div
          key={textarea.id}
          className="absolute"
          style={{
            top: textarea.top * ratio,
            left: textarea.left * ratio,
            width: textarea.width * ratio,
            height: textarea.height * ratio,
          }}
        >
          <div
            className={`text-center text-${textarea.color} text-stroke-white ${anton.className}`}
            style={{
              fontSize: textarea.fontSize * ratio,
              lineHeight: "1.1",
            }}
          >
           {values?.[textarea.id] ?? textarea.text}{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemeDisplay;
