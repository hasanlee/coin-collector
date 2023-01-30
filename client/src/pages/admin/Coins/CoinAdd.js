import React, { useEffect, useState } from "react";
import Input from "../../../components/Input/Input";
import InputFile from "../../../components/Input/InputFile";
import SelectBox from "../../../components/Input/SelectBox";
import TextArea from "../../../components/Input/TextArea";
import OverlayLoading from "../../../components/LoadingSpinner/OverlayLoading";
import { FaDollarSign } from "react-icons/fa";
import CountrySelector from "../../../components/Input/CountrySelector";
import {
  getAllCountries,
  getAllCoinTypes,
  getAllCompositions,
  getAllQualities,
  submitAddCoin,
} from "../../../redux/stores/CoinSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomToast from "../../../components/Toast/CustomToast";

export default function CoinAdd() {
  const {
    types,
    compositions,
    qualities,
    countries,
    loading,
    error,
    serverResponse,
  } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(submitAddCoin(data));
  };
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/coins");
  }, [serverResponse]);
  useEffect(() => {
    function fetchData() {
      dispatch(getAllCountries(""));
      dispatch(getAllCompositions(""));
      dispatch(getAllQualities(""));
      dispatch(getAllCoinTypes(""));
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? <OverlayLoading /> : null}
      {error ? (
        <CustomToast type='failure' message={error?.message} show={false} />
      ) : null}
      <form onSubmit={submitHandler}>
        <div className='flex flex-col gap-5'>
          <div className='grid lg:grid-cols-8 gap-5 md:grid-cols-8 grid-cols-1'>
            <div className='lg:col-span-4 md:col-span-4 col-span-1 flex flex-col'>
              <Input
                name='name'
                type='text'
                id='name'
                label='Coin Name'
                placeholder='Write coin name...'
                autoComplete='off'
              />
              <Input
                name='denomination'
                type='text'
                id='denomination'
                label='Face value'
                placeholder='Denomination value'
                autoComplete='off'
              />
              <Input
                name='price'
                type='number'
                id='price'
                label='Price'
                placeholder='Price'
                autoComplete='off'
                icon={<FaDollarSign />}
              />
              <CountrySelector
                name='issued_countryCode'
                id='issued_countryCode'
                label='Country'
                countries={countries}
              />
              <TextArea
                name='short_description'
                type='text'
                id='short_description'
                label='Short description'
                placeholder='Short description'
                autoComplete='off'
              />
            </div>
            <div className='lg:col-span-4 md:col-span-4 col-span-1 flex flex-col'>
              <SelectBox
                name='typeId'
                id='typeId'
                label='Category'
                options={types}
              />
              <div className='flex flex-col gap-2 md:flex-row lg:flex-row md:justify-between lg:justify-between'>
                <Input
                  name='year'
                  type='number'
                  id='year'
                  label='Year of issue'
                  placeholder='Year of issue'
                  autoComplete='off'
                />
                <Input
                  name='weight'
                  type='number'
                  id='weight'
                  label='Weight'
                  placeholder='Weight with gram...'
                  autoComplete='off'
                />
              </div>
              <SelectBox
                name='qualityId'
                id='qualityId'
                label='Quality of the coin'
                options={qualities}
              />
              <SelectBox
                name='compositionId'
                id='compositionId'
                label='Metal'
                options={compositions}
              />
              <TextArea
                name='description'
                type='text'
                id='description'
                label='Description'
                placeholder='Write about coin...'
                autoComplete='off'
              />
            </div>
          </div>
          <div className='grid lg:grid-cols-8 gap-5 md:grid-cols-8 grid-cols-1'>
            <div className='col-span-1 md:col-span-4 lg-col-span-4 flex flex-col'>
              <InputFile
                name='file1'
                id='file1'
                placeholder='Front Image'
                label={"Click to upload or drag and drop"}
              />
            </div>
            <div className='col-span-1 md:col-span-4 lg-col-span-4 flex flex-col'>
              <InputFile
                id='file2'
                name='file2'
                placeholder='Back Image'
                label={"Click to upload or drag and drop"}
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <NavLink
              to='/admin/coins'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Back list
            </NavLink>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Add coin
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
