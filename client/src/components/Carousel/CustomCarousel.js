import React from "react";
import { Carousel } from "flowbite-react";
export default function CustomCarousel({ images }) {
  return (
    <div className='w-full h-full p-5'>
      <Carousel>
        {images.map((image, index) => {
          return (
            <img
              className='relative'
              key={index}
              src={image ? process.env.REACT_APP_API_URL + image : "/coin.png"}
              alt={"Image" + index}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
