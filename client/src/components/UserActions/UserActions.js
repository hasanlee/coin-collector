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
      <div className='w-48'>
        <ListGroup>
          <ListGroup.Item>
            <span className='flex gap-2 items-center'>
              <Badge>
                <FaEye />
              </Badge>
              <p>Views : {view_count || 0}</p>
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className='flex gap-2 items-center'>
              <Badge color='warning'>
                <FaStar />
              </Badge>
              <p>Favorited : {favorite_count || 0}</p>
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className='flex gap-2 items-center'>
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
