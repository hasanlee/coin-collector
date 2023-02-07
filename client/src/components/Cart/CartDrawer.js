import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/stores/ToggleSlice";
import { removeFromCart } from "../../redux/stores/CartSlice";
import { Avatar } from "flowbite-react";
import { FaTrash } from "react-icons/fa";

export default function CartDrawer() {
  const { cartDrawerOpen } = useSelector((state) => state.toggle);
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const removeCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      {cartDrawerOpen ? (
        <div
          className={
            "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 " +
            (cartDrawerOpen ? "" : "translate-x-full")
          }
          tabIndex='-1'
        >
          <h5 className='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'>
            Cart
          </h5>
          <button
            onClick={() => {
              dispatch(toggleCart(false));
            }}
            type='button'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close cart</span>
          </button>
          {/* cart items */}
          <div className='flow-root my-5'>
            <ul
              role='list'
              className='divide-y divide-gray-200 dark:divide-gray-700'
            >
              {cart.map((item) => {
                return (
                  <li className='py-3 sm:py-4' key={item.coinId}>
                    <div className='flex items-center space-x-4'>
                      <button
                        onClick={() => {
                          removeCart(item.coinId);
                        }}
                      >
                        <FaTrash className='text-red-600' />
                      </button>
                      <div className='flex-shrink-0'>
                        <Avatar rounded={true} img={item.faceImage} />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                          {item.coinName}
                        </p>
                        <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                          Quantity : {item.quantity}
                        </p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        {item.price * item.quantity} $
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className='text-black dark:text-white font-bold'>
              Total :{" "}
              {cart.length > 0
                ? cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      Number(currentValue.price) * currentValue.quantity,
                    0
                  )
                : 0}{" "}
              $
            </div>
          </div>
          {/* end cart items */}
          <div className='grid grid-cols-2 gap-4'>
            {cart.length > 0 ? (
              <NavLink
                to='/'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              >
                Checkout{" "}
                <svg
                  className='w-4 h-4 ml-2'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </NavLink>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
