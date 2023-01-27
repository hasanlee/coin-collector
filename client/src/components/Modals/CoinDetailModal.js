import React, { useState } from "react";
import { Modal, Avatar, Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/stores/CoinSlice";
import UserActions from "../UserActions/UserActions";

export default function CoinDetailModal() {
  const { modalState, coinDetail } = useSelector((state) => state.coinReducer);
  const {
    coinId,
    coinName,
    shortDescription,
    description,
    issuedCountryId,
    issuedByCountry,
    compositionId,
    composition,
    qualityId,
    quality,
    denomination,
    year,
    weight,
    price,
    typeId,
    type,
    faceImage,
    backImage,
    viewCount,
    likeCount,
    favoriteCount,
  } = coinDetail;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModal(false));
  };
  return (
    <>
      <Modal
        show={modalState}
        size='7xl'
        dismissible={true}
        onClose={closeModal}
      >
        <Modal.Header>{coinName}</Modal.Header>
        <Modal.Body>
          <div className='grid lg:grid-cols-4 gap-5 md:grid-cols-1 sm:grid-cols-1'>
            <div className='lg:col-span-1 flex flex-col gap-12'>
              <Avatar img={faceImage} rounded={true} size='xl' />
              <Avatar img={backImage} rounded={true} size='xl' />
              <UserActions
                view_count={viewCount}
                favorite_count={favoriteCount}
                like_count={likeCount}
              />
            </div>
            <div className='lg:col-span-3 flex flex-col gap-8'>
              <div className='flex flex-col gap-8'>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  {shortDescription}
                </p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  {description}
                </p>
              </div>
              <div>
                <Table className=''>
                  <Table.Body className='divide-y text-black dark:text-white'>
                    <Table.Row className='divide-x'>
                      <Table.Cell>Issuing Country</Table.Cell>
                      <Table.Cell>{issuedByCountry}</Table.Cell>
                    </Table.Row>
                    <Table.Row className='divide-x'>
                      <Table.Cell>Composition</Table.Cell>
                      <Table.Cell>{composition}</Table.Cell>
                    </Table.Row>
                    <Table.Row className='divide-x'>
                      <Table.Cell>Quality</Table.Cell>
                      <Table.Cell>{quality}</Table.Cell>
                    </Table.Row>
                    <Table.Row className='divide-x'>
                      <Table.Cell>Denomination</Table.Cell>
                      <Table.Cell>{denomination}</Table.Cell>
                    </Table.Row>
                    <Table.Row className='divide-x'>
                      <Table.Cell>Year</Table.Cell>
                      <Table.Cell>{year}</Table.Cell>
                    </Table.Row>
                    <Table.Row className='divide-x'>
                      <Table.Cell>Weight</Table.Cell>
                      <Table.Cell>{weight}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
