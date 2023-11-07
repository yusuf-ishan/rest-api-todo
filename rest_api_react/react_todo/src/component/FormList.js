import React, { useState, useContext } from "react";
import FetchContext from "../Contexts/FetchContext";

const FormList = () => {
  const { FetchDataHandler, setTodoItems } = useContext(FetchContext);
  const [hideForm, setHideForm] = useState(true);

  function HideFormHandler() {
    setHideForm((preHideForm) => !preHideForm);
  }

  const onSubmitNewTodoHandler = async (event) => {
    event.preventDefault();

    const formDatas = new FormData(event.target);
    const titleData = formDatas.get("title");
    const descriptionData = formDatas.get("description");

    try {
      const csrf_res = await fetch("http://127.0.0.1:8000/csrf_token/");
      const csrf_data = await csrf_res.json();
      FetchDataHandler();
      await fetch("http://127.0.0.1:8000/task_create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf_data.csrfToken,
        },
        body: JSON.stringify({
          title: titleData.toString(),
          description: descriptionData.toString(),
        }),
      });

      let formInputs = event.target;

      let titleInput = formInputs.elements.title;
      titleInput.value = "";
      let descriptionInput = formInputs.elements.description;
      descriptionInput.value = "";

      FetchDataHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-left">Add New TODO</h2>
        <button
          className="bg-blue-500 mb-4 hover:bg-blue-700 text-white px-4 rounded"
          onClick={HideFormHandler}
        >
          {hideForm ? "Hide Form" : "Show Form"}
        </button>
      </div>
      {hideForm && (
        <form className="mb-5" onSubmit={onSubmitNewTodoHandler}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Title"
            />
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Description"
            ></textarea>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ADD
          </button>
        </form>
      )}
    </div>
  );
};

export default FormList;
