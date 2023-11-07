import React from "react";
import TaskList from "./component/TaskList";
import FormList from "./component/FormList";
import { FetchContextProvider } from "./Contexts/FetchContext";
import { Navbar } from "./component/navbar";
function App() {
  return (
    <FetchContextProvider>
      <>
        <Navbar />  
        <div className="mb-5 bg-gray-200 p-4">
          <FormList />
          <TaskList />
        </div>
      </>
    </FetchContextProvider>
  );
}

export default App;
