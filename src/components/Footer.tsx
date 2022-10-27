import React from "react";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-16 bg-slate-200 text-white">
      <h2 className="text-center text-slate-800">
        Desenvolvido por{" "}
        <a href="https://github.com/alemedinabjj" target="_blank" className="text-blue-500 hover:text-blue-700">
          Alexandre Medina
        </a>
      </h2>
    </footer>
  );
};
