import { Alert } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../redux/stores/ToggleSlice";

export default function CustomAlert() {
  const { alertList } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const onDismis = (id) => {
    dispatch(toggleAlert(id));
  };
  return (
    <div>
      <div className='absolute right-0 m-3 z-50 flex flex-col gap-3 animate-pulse'>
        {alertList.map((alert) => {
          return (
            <Alert
              color={alert.type || "info"}
              onDismiss={() => {
                onDismis(alert.id);
              }}
              key={alert.id}
            >
              <span>
                <span className='font-medium'>{alert.head + ": " || ""} </span>
                {alert.body || "Information"}
              </span>
            </Alert>
          );
        })}
      </div>
    </div>
  );
}
