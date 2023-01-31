import React from "react";
import { ListGroup, Badge } from "flowbite-react";
import { FaHeart, FaStar, FaEye } from "react-icons/fa";
export default function UserActions({
  view_count,
  favorite_count,
  like_count,
}) {
  return (
    <>
      <div className=''>
        <ListGroup className='flex lg:flex-col md:flex-row sm:flex-row justify-around'>
          <ListGroup.Item disabled={true}>
            <span className='flex gap-2 items-center break-words max-sm:flex-col'>
              <Badge>
                <FaEye />
              </Badge>
              <p>Views : {view_count || 0}</p>
            </span>
          </ListGroup.Item>
          <ListGroup.Item disabled={true}>
            <span className='flex gap-2 items-center break-words max-sm:flex-col'>
              <Badge color='warning'>
                <FaStar />
              </Badge>
              <p>Favorited : {favorite_count || 0}</p>
            </span>
          </ListGroup.Item>
          <ListGroup.Item disabled={true}>
            <span className='flex gap-2 items-center break-words max-sm:flex-col'>
              <Badge color='failure'>
                <FaHeart />
              </Badge>
              <p>Liked : {like_count || 0}</p>
            </span>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
}
