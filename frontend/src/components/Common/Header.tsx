import type { HeaderMode } from "../../types/note";

interface IHeaderProps {
  mode: HeaderMode;
  onSettingsClick: () => void;
}

const Header = ({ mode, onSettingsClick }: IHeaderProps) => {
  let title = "";

  switch (mode.type) {
    case "ALL":
      title = "All Notes";
      break;
    case "ARCHIVED":
      title = "Archived Notes";
      break;
    case "SETTINGS":
      title = "Settings";
      break;
    case "TAG":
      title = `Notes Tagged: ${mode.tag}`;
      break;
  }

  return (
    <div className="h-20.25 border-b border-[hsla(216,19%,90%,1)] flex justify-between w-full p-6">
      <h1 className="text-[hsla(222,32%,8%,1)] font-bold text-[24px] leading-1.2 tracking-[-0.5px]">
        {title}
      </h1>
      <div className="flex gap-4">
        <div className="flex items-center w-75 border rounded-lg border-[hsla(219,15%,82%,1)] px-4 py-4 gap-2">
          <img src="/Search.svg" alt="" className="w-[20px] h-[20px]" />
          <input
            type="text"
            placeholder="Search by title, content, or tags…"
            className="w-full text-sm placeholder:text-xs outline-none bg-transparent"
          />
        </div>
        <button onClick={onSettingsClick}>
          <img src="/Setting.svg" alt="settings logo" />
        </button>
      </div>
    </div>
  );
};

export default Header;
