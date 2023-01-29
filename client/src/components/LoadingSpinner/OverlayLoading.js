import React from "react";
import { Spinner } from "flowbite-react";
export default function OverlayLoading() {
  return (
    <div
      role='status'
      className='absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex justify-center items-center'
    >
      <Spinner size='xl' color='success' />
    </div>
  );
}
