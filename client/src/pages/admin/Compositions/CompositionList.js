import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompositions,
  submitAddComposition,
  submitEditComposition,
  submitDeleteComposition,
} from "../../../redux/stores/CoinSlice";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { Modal, Spinner } from "flowbite-react";
import Input from "../../../components/Input/Input";
import Dialog from "../../../components/Dialog/Dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputValidationError from "../../../components/Input/InputValidationError";
import { compostionSchema } from "../../../utils/ValidationSchemas";

export default function CompositionList() {
  const dispatch = useDispatch();
  const { compositions, loading, error, serverResponse } = useSelector(
    (state) => state.coinReducer
  );
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [composition, setComposition] = useState({});
  const [mode, setMode] = useState("");
  const deleteHandle = (id) => {
    setShowDialog(true);
    setComposition([...compositions].find((com) => com.id === id));
  };
  const editHandle = (id) => {
    setMode("EDIT");
    setShowModal(true);
    setComposition([...compositions].find((com) => com.id === id));
  };
  const addHandler = () => {
    setMode("ADD");
    setComposition({});
    setShowModal(true);
  };

  //#region FormValidation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(compostionSchema) });
  //#endregion

  const submitHandler = (data) => {
    const postData = {
      id: composition.id,
      data: { ...data },
    };
    if (mode === "EDIT") {
      dispatch(submitEditComposition(postData));
    } else if (mode === "ADD") {
      dispatch(submitAddComposition(data));
    }
    reloadData();
  };
  const submitDelete = () => {
    dispatch(submitDeleteComposition(composition.id));
    reloadData();
  };

  const searchOnTable = (searchText) => {
    setSearch(searchText);
  };

  const reloadData = () => {
    dispatch(getAllCompositions("?s=" + search));
  };

  useEffect(() => {
    setShowModal(false);
    setShowDialog(false);
  }, [serverResponse]);

  useEffect(() => {
    reloadData();
  }, [search]);
  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex justify-between'>
          <div className='pb-4 bg-white dark:bg-gray-900'>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative mt-1'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-search'
                className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search for coins'
                onChange={(e) => {
                  searchOnTable(e.target.value);
                }}
              />
              {loading ? (
                <Spinner
                  light={true}
                  className='absolute right-2.5 bottom-1.5'
                />
              ) : null}
            </div>
          </div>
          <div className='pb-4 mt-1 bg-white dark:bg-gray-900'>
            <button
              onClick={addHandler}
              className='inline-flex gap-3 items-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
            >
              <FaPlus className='text-green-400' />
              Add new
            </button>
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Icon
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {compositions?.map((composition) => {
              return (
                <tr
                  key={composition.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {composition.name}
                  </td>
                  <td className='px-6 py-4'>{composition.icon}</td>
                  <td className='px-6 py-4'>
                    <div
                      className='inline-flex rounded-md shadow-sm'
                      role='group'
                    >
                      <button
                        onClick={() => {
                          editHandle(composition.id, composition.name);
                        }}
                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-blue-400 dark:hover:text-blue-500 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          deleteHandle(composition.id, composition.name);
                        }}
                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-red-400 dark:hover:text-red-500 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        show={showModal}
        size='xl'
        dismissible={true}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header>
          {mode === "EDIT" ? "Edit : " + composition.name : "Add new"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='mb-6'>
              <Input
                label='Name'
                type='text'
                id='name'
                name='name'
                value={composition.name}
                autoComplete='off'
                register={{
                  ...register("name"),
                }}
              />
              <InputValidationError error={errors.name} />
            </div>
            <div className='mb-6'>
              <Input
                label='Icon'
                type='text'
                id='icon'
                name='icon'
                value={composition.icon}
                autoComplete='off'
                register={{
                  ...register("icon"),
                }}
              />
              <InputValidationError error={errors.icon} />
            </div>

            <div className='flex justify-end mx-3'>
              <button className='inline-flex gap-3 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'>
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Dialog
        show={showDialog}
        message={"Are you sure delete " + composition.name + " ?"}
        okBtnType='failure'
        okText='Yes, delete'
        noText='No, cancel'
        okClick={submitDelete}
        noClick={() => {
          setShowDialog(false);
        }}
      />
    </>
  );
}
