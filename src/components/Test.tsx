
import { useState } from "react";

import Success from "./Success";


export default function Test() {
  
  const [errorVisible, setErrorVisible] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setErrorVisible(true)}
        className="px-4 py-2 rounded bg-red-600 text-white"
      >
        Show Error Popup
      </button>

      <Success
        message="Something went wrong!"
        show={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </div>
  );
}
