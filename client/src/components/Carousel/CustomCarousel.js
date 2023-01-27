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
              src={image}
              alt={"Image" + index}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
