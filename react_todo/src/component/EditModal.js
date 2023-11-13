import React, { useEffect, useState, useContext } from "react";
import FetchContext from "../Contexts/FetchContext";
import { useSignal, useSignalEffect } from "@preact/signals-react";


const EditModal = ({ onEditModalOn, id }) =>{

    const { FetchDataHandler } = useContext(FetchContext)
    const [individualItem, setIndividualData] =  useState({});

    const singleItem = useSignal();

    useEffect( ()=>{
        fetch(`http://127.0.0.1:8000/task_details/${id}/`).then((res)=>{
            return res.json()
        }).then((data)=>{
            setIndividualData(data);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    const InputHandler = (event)=>{
      const {name, value} = event.target;
      setIndividualData((preIndividualItem) =>({
        ...preIndividualItem,
        [name]: value,
        }))
    }

    // const formDatas = new FormData(event.target);
    // const titleData = formDatas.get('title');
    // const descriptionData = formDatas.get('description');
    

    const OnSubmitEditItemhandler = async (event) =>{
      event.preventDefault();

      try{
          const csrf_res = await fetch('http://127.0.0.1:8000/csrf_token/');
          const csrf_data = await csrf_res.json();
      
          await fetch(`http://127.0.0.1:8000/task_update/${id}/`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'X-CSRFToken': csrf_data.csrfToken,
            },
            body: JSON.stringify({
              // title: titleData.toString(),
              // description: descriptionData.toString()
              individualItem
            }),
          });

          FetchDataHandler()

      }catch (err){
        console.log(err)
      }
      onEditModalOn((preEditModalOn) => !preEditModalOn)
    }


    return (
        <div className="bg-zinc-300 bg-opacity-90 fixed inset-0 z-10">
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit Task</h3>
                  <button>
                    <span className="bg-gray-300 rounded-full px-3 py-1 h-9 w-2 text-1xl" onClick={() => onEditModalOn(false)}>x</span>
                  </button>
                </div>
                <div className="relative opacity-80 flex-auto">
                  <form onSubmit={OnSubmitEditItemhandler}>
                    <div className="bg-gray-200 z-10 bg-opacity-1000 shadow-md rounded px-8 pt-6 pb-8 w-5/6 my-8 mx-auto">
                      <label className="block text-black text-sm font-bold mb-1">
                        Title
                      </label>
                      <input onChange={InputHandler} className="shadow border rounded w-full py-2 px-1 text-black" name="title" value={individualItem.title} />
                      <label className="block text-black text-sm font-bold mb-1">
                        Description
                      </label>
                      <textarea onChange={InputHandler} className="shadow border rounded w-full py-2 px-1 text-black" name='description' value={individualItem.description}></textarea>
                      <label className="block text-black text-sm font-bold mb-1">
                        Completed
                      </label>
                      <input onChange={InputHandler} type="checkbox" className="shadow border w-4 h-5" name="completed" /> 
                    </div>

                    <div className="flex items-center justify-end border-t border-solid border-gray-300 py-8 rounded-b">
                      <button
                        className="text-white bg-blue-500 active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 mx-16 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
                        type="button"
                        onClick={OnSubmitEditItemhandler}
                      >Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default EditModal;