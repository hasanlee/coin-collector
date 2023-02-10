import { Avatar } from "flowbite-react";
import AvatarGroup from "flowbite-react/lib/esm/components/Avatar/AvatarGroup";
import React from "react";
import { NavLink } from "react-router-dom";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";

export default function SimilarCoinsItem({
  id,
  name,
  issued_countryCode,
  year,
  imageUrl_front,
  imageUrl_back,
}) {
  const { t, i18n } = useTranslation();
  return (
    <div className='flex items-center space-x-4 justify-between pr-5'>
      <div className='flex items-center space-x-4'>
        <AvatarGroup>
          <Avatar
            rounded={true}
            img={process.env.REACT_APP_API_URL + imageUrl_front}
          />
          <Avatar
            rounded={true}
            img={process.env.REACT_APP_API_URL + imageUrl_back}
          />
        </AvatarGroup>
        <div className='font-medium dark:text-white'>
          <div>{name}</div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex gap-3'>
              <Flag code={issued_countryCode} width='32' className='rounded' />{" "}
              in {year}
            </div>
          </div>
        </div>
      </div>
      <NavLink to={"/coin/" + id} className=''>
        {t("view")}
      </NavLink>
    </div>
  );
}
