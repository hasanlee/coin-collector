import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { FaExclamationCircle } from "react-icons/fa";

export default function Dialog({
  show,
  okBtnType,
  okClick,
  noClick,
  onClose,
  message,
  okText,
  noText,
}) {
  const [showDialog, setShowDialog] = useState(show);
  useEffect(() => {
    setShowDialog(show);
  }, [show]);
  return (
    <>
      <Modal
        show={showDialog}
        size='md'
        popup={true}
        onClose={onClose || noClick}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <FaExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              {message}
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color={okBtnType} onClick={okClick}>
                {okText || "Yes"}
              </Button>
              <Button color='gray' onClick={noClick}>
                {noText || "No"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
