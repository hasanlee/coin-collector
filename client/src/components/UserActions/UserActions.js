import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "flowbite-react";
import { FaHeart, FaStar, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function UserActions({
  view_count,
  favorite_count,
  like_count,
  favoriteCoin,
  likeCoin,
  liked,
  favorited,
}) {
  const { t, i18n } = useTranslation();
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
              <p>
                {t("views")} : {view_count || 0}
              </p>
            </span>
          </ListGroup.Item>
          <ListGroup.Item disabled={coinFavorited} onClick={favoriteCoin}>
            <span className='flex gap-2 items-center break-words max-sm:flex-col'>
              <Badge color='warning'>
                <FaStar />
              </Badge>
              <p>
                {coinFavorited ? t("favorited") : t("add_favorite")} :{" "}
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
                {coinLiked ? t("liked") : t("like")} : {like_count || 0}
              </p>
            </span>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
}
