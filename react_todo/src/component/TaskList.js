import React, { useContext, useEffect } from "react";
import List from "./List";
import FetchContext from "../Contexts/FetchContext";
import { useSignalEffect } from "@preact/signals-react";

const TaskList = () => {
  const { todoItems, FetchDataHandler } = useContext(FetchContext);
  
  useSignalEffect(() => {
    FetchDataHandler();
  }, []);
  
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">List of Content</h2>
      {todoItems.map((item) => {
        if (item.completed === false) {
          return <List key={item.id} item={item} />;
        }
        return [];
      })}
    </div>
  );
};

export default TaskList;
