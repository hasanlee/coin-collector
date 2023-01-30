import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";
import { NavLink } from "react-router-dom";

export default function ProfileButton() {
  const { decodedToken } = useJwt(Cookies.get("access_token"));
  const user = { ...decodedToken };
  const handleSignOut = () => {
    Cookies.remove("access_token", { path: "" });
  };
  return (
    <>
      <div className='flex md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt={user.username}
              img={user.avatarId || ""}
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className='block text-sm'>
              {user.fullname || user.username}
            </span>
            <span className='block truncate text-sm font-medium'>
              {user.email}
            </span>
          </Dropdown.Header>
          {user.roleId === 1 ? (
            <Dropdown.Item>
              <NavLink to='/admin/dashboard'>Admin Dashboard</NavLink>
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item>
            <NavLink to='/profile'>Profile</NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <button onClick={handleSignOut}>Sign out</button>
          </Dropdown.Item>
        </Dropdown>
        {/* <Navbar.Toggle /> */}
      </div>
    </>
  );
}
