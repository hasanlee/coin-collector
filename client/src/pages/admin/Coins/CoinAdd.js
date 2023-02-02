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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputValidationError from "../../../components/Input/InputValidationError";
import { coinSchema } from "../../../utils/ValidationSchemas";

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

  //#region FormValidation
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(coinSchema) });
  //#endregion

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(submitAddCoin(data));
  };
  const navigate = useNavigate();

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
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='flex flex-col gap-5'>
          <div className='grid lg:grid-cols-8 gap-5 md:grid-cols-8 grid-cols-1'>
            <div className='lg:col-span-4 md:col-span-4 col-span-1 flex flex-col'>
              <div className='mb-6'>
                <Input
                  name='name'
                  type='text'
                  id='name'
                  label='Coin Name'
                  placeholder='Write coin name...'
                  autoComplete='off'
                  register={{
                    ...register("name"),
                  }}
                />
                <InputValidationError error={errors.name} />
              </div>

              <div className='mb-6'>
                <Input
                  name='denomination'
                  type='text'
                  id='denomination'
                  label='Face value'
                  placeholder='Denomination value'
                  autoComplete='off'
                  register={{
                    ...register("denomination"),
                  }}
                />
                <InputValidationError error={errors.denomination} />
              </div>

              <div className='mb-6'>
                <Input
                  name='price'
                  type='number'
                  id='price'
                  label='Price'
                  placeholder='Price'
                  autoComplete='off'
                  icon={<FaDollarSign />}
                  register={{
                    ...register("price"),
                  }}
                  value={0}
                />
                <InputValidationError error={errors.price} />
              </div>

              <div className='mb-6'>
                <CountrySelector
                  name='issued_countryCode'
                  id='issued_countryCode'
                  label='Country'
                  countries={countries}
                />
              </div>

              <div className='mb-6'>
                <TextArea
                  name='short_description'
                  type='text'
                  id='short_description'
                  label='Short description'
                  placeholder='Short description'
                  autoComplete='off'
                  register={{
                    ...register("short_description"),
                  }}
                />
                <InputValidationError error={errors.short_description} />
              </div>
            </div>
            <div className='lg:col-span-4 md:col-span-4 col-span-1 flex flex-col'>
              <div className='mb-6'>
                <SelectBox
                  name='typeId'
                  id='typeId'
                  label='Category'
                  options={types}
                  register={{
                    ...register("typeId"),
                  }}
                />
                <InputValidationError error={errors.typeId} />
              </div>

              <div className='flex flex-col gap-2 md:flex-row lg:flex-row md:justify-between lg:justify-between'>
                <div className='mb-6'>
                  <Input
                    name='year'
                    type='number'
                    id='year'
                    label='Year of issue'
                    placeholder='Year of issue'
                    autoComplete='off'
                    register={{
                      ...register("year"),
                    }}
                    value={2023}
                  />
                  <InputValidationError error={errors.year} />
                </div>
                <div className='mb-6'>
                  <Input
                    name='weight'
                    type='number'
                    id='weight'
                    label='Weight'
                    placeholder='Weight with gram...'
                    autoComplete='off'
                    register={{
                      ...register("weight"),
                    }}
                    value={0}
                  />
                  <InputValidationError error={errors.weight} />
                </div>
              </div>
              <div className='mb-6'>
                <SelectBox
                  name='qualityId'
                  id='qualityId'
                  label='Quality of the coin'
                  options={qualities}
                  register={{
                    ...register("qualityId"),
                  }}
                />
                <InputValidationError error={errors.qualityId} />
              </div>

              <div className='mb-6'>
                <SelectBox
                  name='compositionId'
                  id='compositionId'
                  label='Metal'
                  options={compositions}
                  register={{
                    ...register("compositionId"),
                  }}
                />
                <InputValidationError error={errors.compositionId} />
              </div>
              <div className='mb-6'>
                <TextArea
                  name='description'
                  type='text'
                  id='description'
                  label='Description'
                  placeholder='Write about coin...'
                  autoComplete='off'
                  register={{
                    ...register("description"),
                  }}
                />
                <InputValidationError error={errors.description} />
              </div>
            </div>
          </div>
          <div className='grid lg:grid-cols-8 gap-5 md:grid-cols-8 grid-cols-1'>
            <div className='col-span-1 md:col-span-4 lg-col-span-4 flex flex-col'>
              <InputFile
                name='file1'
                id='file1'
                placeholder='Front Image'
                label={"Click to upload or drag and drop"}
                register={{
                  ...register("imageUrl_front"),
                }}
              />
              <InputValidationError error={errors.imageUrl_front} />
            </div>
            <div className='col-span-1 md:col-span-4 lg-col-span-4 flex flex-col'>
              <InputFile
                id='file2'
                name='file2'
                placeholder='Back Image'
                label={"Click to upload or drag and drop"}
                register={{
                  ...register("imageUrl_back"),
                }}
              />
              <InputValidationError error={errors.imageUrl_back} />
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
              Add coin
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
