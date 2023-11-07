import React, { useContext } from "react";
import FetchContext from "../Contexts/FetchContext";
const DeleteModal = ({ onModalOn, id, onNotifyModalOn }) => {
  console.log("this is delete component");

  const { setTodoItems } = useContext(FetchContext);

  const OKClickHandler = async () => {
    try {
      const csrf_res = await fetch("http://127.0.0.1:8000/csrf_token/");
      const csrf_data = await csrf_res.json();
      const newResData = await fetch(
        `http://127.0.0.1:8000/task_delete/${id}/`,
        {
          method: "POST",
          headers: {
            "X-CSRFToken": csrf_data.csrfToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    onNotifyModalOn((preNotifyModalOn) => !preNotifyModalOn);
    onModalOn((preModalOn) => !preModalOn);
  };

  const CancelClickHandler = () => {
    onModalOn(false);
  };

  return (
    <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-600 rounded-xl">
          <div className="flex  text-lg text-zinc-600 mb-10">
            Are you sure you want to delete item {id} ?
          </div>
          <div className="flex justify-center">
            <button
              onClick={OKClickHandler}
              className="rounded px-4 py-2 text-red-500 hover:bg-gray-300"
            >
              Yes
            </button>
            <button
              onClick={CancelClickHandler}
              className="rounded px-4 py-2 ml-4 text-white bg-blue-500 hover:bg-blue-700"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
