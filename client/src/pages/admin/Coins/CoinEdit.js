import React, { useEffect, useState } from "react";
import Input from "../../../components/Input/Input";
import InputFile from "../../../components/Input/InputFile";
import SelectBox from "../../../components/Input/SelectBox";
import TextArea from "../../../components/Input/TextArea";
import { FaDollarSign } from "react-icons/fa";
import CountrySelector from "../../../components/Input/CountrySelector";
import OverlayLoading from "../../../components/LoadingSpinner/OverlayLoading";
import {
  getAllCountries,
  getAllCoinTypes,
  getAllCompositions,
  getAllQualities,
  getCoinById,
  submitEditCoin,
} from "../../../redux/stores/CoinSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CustomToast from "../../../components/Toast/CustomToast";

export default function CoinEdit() {
  const {
    types,
    compositions,
    qualities,
    countries,
    coin,
    loading,
    error,
    serverResponse,
  } = useSelector((state) => state.coinReducer);
  const {
    coinId,
    coinName,
    shortDescription,
    description,
    issuedByCountry,
    issuedCountryId,
    compositionId,
    qualityId,
    denomination,
    year,
    weight,
    price,
    typeId,
    faceImage,
    backImage,
  } = coin;
  console.log(coin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const postData = {
      id,
      data: data,
    };
    dispatch(submitEditCoin(postData));
  };

  const navigate = useNavigate();

  useEffect(() => {
    function fetchData() {
      dispatch(getAllCountries(""));
      dispatch(getAllCompositions(""));
      dispatch(getAllQualities(""));
      dispatch(getAllCoinTypes(""));
      dispatch(getCoinById(id));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (serverResponse && serverResponse.affectedRows === 1) {
      navigate("/admin/coins/");
    }
  }, [serverResponse]);

  return (
    <>
      {loading ? <OverlayLoading /> : null}
      {error ? (
        <CustomToast type='failure' message={error?.message} show={false} />
      ) : null}
      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div className='flex flex-col gap-5'>
          <div className='grid lg:grid-cols-8 gap-5 md:grid-cols-8 grid-cols-1'>
            <div className='lg:col-span-4 md:col-span-4 col-span-1 flex flex-col gap-5'>
              <Input
                name='name'
                type='text'
                id='name'
                label='Coin Name'
                placeholder='Write coin name...'
                autoComplete='off'
                value={coinName}
              />
              <Input
                name='denomination'
                type='text'
                id='denomination'
                label='Face value'
                placeholder='Denomination value'
                autoComplete='off'
                value={denomination}
              />
              <Input
                name='price'
                type='number'
                id='price'
                label='Price'
                placeholder='Price'
                autoComplete='off'
                value={price}
                icon={<FaDollarSign />}
              />
              <CountrySelector
                name='issued_countryCode'
                id='issued_countryCode'
                label='Country'
                countries={countries}
                value={{ name: issuedByCountry, code: issuedCountryId }}
              />
              <TextArea
                name='short_description'
                type='text'
                id='short_description'
                label='Short description'
                placeholder='Short description'
                autoComplete='off'
                value={shortDescription}
              />
            </div>
            <div className='lg:col-span-4 md:col-span-4 col-span-1 flex flex-col gap-5'>
              <SelectBox
                name='typeId'
                id='typeId'
                label='Category'
                options={types}
                value={typeId}
              />
              <div className='flex flex-col gap-2 md:flex-row lg:flex-row md:justify-between lg:justify-between'>
                <Input
                  name='year'
                  type='number'
                  id='year'
                  label='Year of issue'
                  placeholder='Year of issue'
                  autoComplete='off'
                  value={year}
                />
                <Input
                  name='weight'
                  type='number'
                  id='weight'
                  label='Weight'
                  placeholder='Weight with gram...'
                  autoComplete='off'
                  value={weight}
                />
              </div>
              <SelectBox
                name='qualityId'
                id='qualityId'
                label='Quality of the coin'
                options={qualities}
                value={qualityId}
              />
              <SelectBox
                name='compositionId'
                id='compositionId'
                label='Metal'
                options={compositions}
                value={compositionId}
              />
              <TextArea
                name='description'
                type='text'
                id='description'
                label='Description'
                placeholder='Write about coin...'
                autoComplete='off'
                value={description}
              />
            </div>
          </div>
          <div className='grid lg:grid-cols-8 gap-5 md:grid-cols-8 grid-cols-1'>
            <div className='col-span-1 md:col-span-4 lg-col-span-4 flex flex-col'>
              <InputFile
                id='file1'
                placeholder='Front Image'
                label={"Click to upload or drag and drop"}
                imgHolder={faceImage}
                name='file1'
              />
            </div>
            <div className='col-span-1 md:col-span-4 lg-col-span-4 flex flex-col'>
              <InputFile
                id='file2'
                placeholder='Back Image'
                label={"Click to upload or drag and drop"}
                imgHolder={backImage}
                name='file2'
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <NavLink
              to='/admin/coins'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Back
            </NavLink>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
