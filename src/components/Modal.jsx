import React from "react";
import EmailPNG from "../assets/email.png";
export default function Modal({ isOpen, onClose }) {
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50`}
    >
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6-6M7 7l6 6M7 7L1 13"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 flex items-center justify-center flex-col gap-5">
          <img src={EmailPNG} height={32} width={32} />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            kasodariyadhruvil45@gmail.com
          </h3>
        </div>
      </div>
    </div>
  );
}
