import React from "react";
import Lang from "./Lang";

const App = () => {
  return (
    <div className="flex-col flex justify-center">
      <div className="my-10 px-auto">
        <h1 className="text-4xl text-purple-600 font-bold text-center">
          Language translator App
        </h1>
      </div>
      <Lang />
    </div>
  );
};

export default App;
