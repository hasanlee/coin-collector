import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { NavLink } from "react-router-dom";

export default function ProfileButton() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const { decodedToken } = useJwt(cookies.access_token);
  const user = { ...decodedToken };
  const handleSignOut = () => {
    removeCookie("access_token", { path: "/", domain: "localhost" });
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
