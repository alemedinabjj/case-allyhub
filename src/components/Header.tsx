import { IconBase } from "../utils/Icons";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b ">
      <button className="flex items-center">
        <IconBase name="House" size={24} />
        <h1 className="text-xl font-bold ml-2">Home</h1>
      </button>
      <div className="flex items-center gap-2">
        <IconBase name="Airplane" size={24} />
        <h1>
          Destinos <span className="text-gray-400">|</span> Interesses{" "}
        </h1>
      </div>
      <div className="flex items-center">
        <IconBase name="Bell" size={24} />
        <IconBase name="CaretDown" size={24} />
      </div>
    </header>
  );
};
