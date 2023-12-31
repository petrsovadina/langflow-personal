import { useContext, useEffect, useRef } from "react";
import { alertContext } from "../../contexts/alertContext";
import SingleAlert from "./components/singleAlertComponent";
import { AlertDropdownType } from "../../types/alerts";
import { PopUpContext } from "../../contexts/popUpContext";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { X, Trash2 } from "lucide-react";

export default function AlertDropdown({}: AlertDropdownType) {
  const { closePopUp } = useContext(PopUpContext);
  const componentRef = useRef<HTMLDivElement>(null);

  // Use the custom hook
  useOnClickOutside(componentRef, () => {
    closePopUp();
  });

  const {
    notificationList,
    clearNotificationList,
    removeFromNotificationList,
  } = useContext(alertContext);

  return (
    <div
      ref={componentRef}
      className="z-10 py-3 pb-4 px-2 rounded-md bg-background ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none overflow-hidden w-[400px] h-[500px] flex flex-col"
    >
      <div className="flex pl-3 flex-row justify-between text-md font-medium text-foreground">
        Notifications
        <div className="flex gap-3 pr-3 ">
          <button
            className="text-foreground hover:text-status-red"
            onClick={() => {
              closePopUp();
              setTimeout(clearNotificationList, 100);
            }}
          >
            <Trash2 className="w-[1.1rem] h-[1.1rem]" />
          </button>
          <button
            className="text-foreground hover:text-status-red"
            onClick={closePopUp}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-col overflow-y-scroll w-full h-full scrollbar-hide text-high-foreground">
        {notificationList.length !== 0 ? (
          notificationList.map((alertItem, index) => (
            <SingleAlert
              key={alertItem.id}
              dropItem={alertItem}
              removeAlert={removeFromNotificationList}
            />
          ))
        ) : (
          <div className="h-full w-full pb-16 text-ring flex justify-center items-center">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
}
