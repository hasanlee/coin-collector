import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

export default function ProfileButton({ user }) {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const handleSignOut = () => {
    removeCookie("access_token", { path: "/", domain: "localhost" });
  };
  console.log(user);
  return (
    <>
      <div className='flex md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt='User settings'
              img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className='block text-sm'>{user.userId}</span>
            <span className='block truncate text-sm font-medium'>
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <NavLink to='/admin/dashboard'>Dashboard</NavLink>
          </Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
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
