import React, { createContext, useState } from "react";
import { useSignal, useSignalEffect } from '@preact/signals-react'

const FetchContext = createContext()


export const FetchContextProvider = ({children}) =>{
  const todos = useSignal([]);

  const FetchDataHandler = async () =>{
    try{
      const res = await fetch('/task_list',)
      const todoList = await res.json()

      todos.value = todoList;

      }catch (error){
        console.log(`Error catched ${error}`);
      }
    }

    return (
        <FetchContext.Provider value={{ todoItems: todos.value, FetchDataHandler }}>{children}</FetchContext.Provider>
    );
}

export default FetchContext;