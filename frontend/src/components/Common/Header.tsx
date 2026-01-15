import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface IHeaderProps {
  onSettingsClick: () => void;
}

const Header = ({ onSettingsClick }: IHeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useLocation();
  let title: React.ReactNode;
  const queryTitle = new URLSearchParams(search).get("q");

  const searchQuery = searchParams.get("q") ?? "";
  const onSearchChange = (value: string) => {
    if (!value.trim()) {
      searchParams.delete("q");
      setSearchParams(searchParams);
      navigate("/notes");
    } else {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const pathname = location.pathname;
  if (pathname === "/search") {
    title = (
      <>
        <span className="text-[grey]">Showing results for:</span> {queryTitle}
      </>
    );
  } else if (pathname.startsWith("/notes") || pathname === "/") {
    title = "All Notes";
  } else if (pathname.startsWith("/archived")) {
    title = "Archived Notes";
  } else if (pathname.startsWith("/settings")) {
    title = "Settings";
  } else if (pathname.startsWith("/tags/")) {
    const tagName = pathname.split("/tags/")[1];
    title = `Notes Tagged: ${decodeURIComponent(tagName)}`;
  } else {
    title = "Notes";
  }

  return (
    <div className="border-b border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)] flex items-center justify-between w-full p-6">
      <h1 className="text-[hsla(222,32%,8%,1)] dark:text-white font-bold text-[24px] leading-1.2 tracking-[-0.5px]">
        {title}
      </h1>
      <div className="flex gap-4">
        <div className="flex items-center w-75 border rounded-lg border-[hsla(219,15%,82%,1)] px-4 py-3 gap-2">
          <img src="/Search.svg" alt="" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, content, or tags…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
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
