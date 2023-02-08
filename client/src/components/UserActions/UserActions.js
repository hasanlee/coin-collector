import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "flowbite-react";
import { FaHeart, FaStar, FaEye } from "react-icons/fa";

export default function UserActions({
  view_count,
  favorite_count,
  like_count,
  favoriteCoin,
  likeCoin,
  liked,
  favorited,
}) {
  const [coinLiked, setCoinLiked] = useState(liked);
  const [coinFavorited, setCoinFavorited] = useState(favorited);
  useEffect(() => {
    setCoinFavorited(favorited);
    setCoinLiked(liked);
  }, [liked, favorited]);
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
          <ListGroup.Item disabled={coinFavorited} onClick={favoriteCoin}>
            <span className='flex gap-2 items-center break-words max-sm:flex-col'>
              <Badge color='warning'>
                <FaStar />
              </Badge>
              <p>
                {coinFavorited ? "Favorited" : "Add Favorite"} :{" "}
                {favorite_count || 0}
              </p>
            </span>
          </ListGroup.Item>
          <ListGroup.Item disabled={coinLiked} onClick={likeCoin}>
            <span className='flex gap-2 items-center break-words max-sm:flex-col'>
              <Badge color='failure'>
                <FaHeart />
              </Badge>
              <p>
                {coinLiked ? "Liked" : "Like Coin"} : {like_count || 0}
              </p>
            </span>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
}
