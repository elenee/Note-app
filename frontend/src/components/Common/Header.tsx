import { useLocation } from "react-router-dom";

interface IHeaderProps {
  onSettingsClick: () => void;
}

const Header = ({ onSettingsClick }: IHeaderProps) => {
  const location = useLocation();
  let title = "";

  const pathname = location.pathname;
  if (pathname === "/notes" || pathname === "/") {
    title = "All Notes";
  } else if (pathname === "/archived") {
    title = "Archived Notes";
  } else if (pathname === "/settings") {
    title = "Settings";
  } else if (pathname.startsWith("/tags/")) {
    const tagName = pathname.split("/tags/")[1];
    title = `Notes Tagged: ${decodeURIComponent(tagName)}`;
  } else {
    title = "notes";
  }

  return (
    <div className="h-20.25 border-b border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)] flex justify-between w-full p-6">
      <h1 className="text-[hsla(222,32%,8%,1)] dark:text-white font-bold text-[24px] leading-1.2 tracking-[-0.5px]">
        {title}
      </h1>
      <div className="flex gap-4">
        <div className="flex items-center w-75 border rounded-lg border-[hsla(219,15%,82%,1)] px-4 py-4 gap-2">
          <img src="/Search.svg" alt="" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, content, or tags…"
            className="w-full text-sm placeholder:text-xs outline-none bg-transparent"
          />
        </div>
        <button onClick={onSettingsClick} className="cursor-pointer">
          <img src="/Setting.svg" alt="settings logo" />
        </button>
      </div>
    </div>
  );
};

export default Header;
