import type { Note } from "../../types/note";
import Logo from "../Common/Logo";

import { useLocation, useNavigate } from "react-router-dom";

const ArrowIcon = () => (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3149_10250)">
      <path
        d="M1 1L5 5L1 9"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3149_10250">
        <rect width="6" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

type NotesListSidebarProps = {
  notes: Note[];
};

const NotesListSidebar = ({ notes }: NotesListSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tags = Array.from(new Set(notes.flatMap((note) => note.tags)));
  const pathname = location.pathname;

  return (
    <div className="w-68 max-xl:w-55 max-lg:w-60 shrink-0 flex flex-col gap-4 items-start py-3 px-4 border-r border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)]">
      <Logo />
      <div className="flex flex-col items-start gap-1 w-full">
        <div
          className={`px-3 py-2.5 rounded-lg w-full flex justify-between items-center cursor-pointer ${
            pathname === "/notes"
              ? "bg-[hsla(216,26%,96%,1)]  dark:bg-[hsla(231,16%,16%,1)] dark:text-white"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.74756 6.68781C4.09273 6.68781 4.37256 6.96763 4.37256 7.31281V14.542C4.37256 15.6068 5.23598 16.4702 6.3008 16.4702H13.7002C14.7651 16.4702 15.6285 15.6068 15.6285 14.542V7.31281C15.6285 6.96763 15.9083 6.68781 16.2535 6.68781C16.5987 6.68781 16.8785 6.96763 16.8785 7.31281V14.542C16.8785 16.2971 15.4554 17.7202 13.7002 17.7202H6.3008C4.54562 17.7202 3.12256 16.2971 3.12256 14.542V7.31281C3.12256 6.96763 3.40238 6.68781 3.74756 6.68781Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.38408 2.84187C9.33125 2.09308 10.6688 2.09308 11.616 2.84187L17.8879 7.80672C18.1586 8.02096 18.2043 8.414 17.9901 8.68467C17.7758 8.95533 17.3827 9.00108 17.1121 8.78683L10.8408 3.82247C10.8407 3.82238 10.8409 3.82255 10.8408 3.82247C10.3481 3.43316 9.65208 3.43296 9.15933 3.82238C9.15933 3.8224 9.15942 3.82234 9.15933 3.82238L2.88794 8.78683C2.6173 9.00108 2.22422 8.95533 2.00998 8.68467C1.79574 8.414 1.84146 8.02096 2.11211 7.80672L8.38408 2.84187Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.7234 3.49445C15.0686 3.49445 15.3484 3.77427 15.3484 4.11945V6.08071C15.3484 6.42589 15.0686 6.70571 14.7234 6.70571C14.3782 6.70571 14.0984 6.42589 14.0984 6.08071V4.11945C14.0984 3.77427 14.3782 3.49445 14.7234 3.49445Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.97858 11.4063H10.0244C10.3384 11.4063 10.6093 11.4062 10.8327 11.4237C11.0684 11.442 11.3032 11.4825 11.531 11.5923C11.913 11.7766 12.2212 12.0848 12.4055 12.4668C12.5153 12.6946 12.5558 12.9294 12.5742 13.1651C12.5916 13.3885 12.5916 13.6594 12.5916 13.9734V17.0952C12.5916 17.4403 12.3117 17.7202 11.9666 17.7202C11.6214 17.7202 11.3416 17.4403 11.3416 17.0952V13.9963C11.3416 13.6529 11.3412 13.4313 11.328 13.2622C11.3153 13.1 11.2938 13.0393 11.2796 13.0098C11.2182 12.8824 11.1154 12.7797 10.9881 12.7182C10.9585 12.704 10.8978 12.6825 10.7357 12.6698C10.5666 12.6567 10.3449 12.6562 10.0015 12.6562C9.65808 12.6562 9.43633 12.6567 9.26733 12.6698C9.10508 12.6825 9.04449 12.704 9.01491 12.7182C8.88758 12.7797 8.78483 12.8824 8.72341 13.0098C8.70916 13.0393 8.68766 13.1 8.67499 13.2622C8.66183 13.4313 8.66141 13.6529 8.66141 13.9963V17.0952C8.66141 17.4403 8.38158 17.7202 8.03638 17.7202C7.69119 17.7202 7.41138 17.4403 7.41138 17.0952V13.9734C7.41136 13.6594 7.41135 13.3885 7.42877 13.1651C7.44714 12.9294 7.48766 12.6946 7.59748 12.4668C7.78169 12.0848 8.08996 11.7766 8.47199 11.5923C8.69974 11.4825 8.93449 11.442 9.17016 11.4237C9.39366 11.4062 9.66458 11.4063 9.97858 11.4063Z"
                fill="currentColor"
              />
            </svg>

            <button onClick={() => navigate("/notes")}>All notes</button>
          </div>
          {pathname === "/notes" ? <ArrowIcon /> : ""}
        </div>
        <div
          className={`px-3 py-2.5 rounded-lg w-full flex justify-between items-center cursor-pointer ${
            pathname === "/archived"
              ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)] dark:text-white"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 6.48513V13.5141C17.5 15.9708 15.7657 17.5 13.3113 17.5H6.68865C4.23432 17.5 2.5 15.9708 2.5 13.5133V6.48513C2.5 4.02837 4.23432 2.5 6.68865 2.5H13.3113C15.7657 2.5 17.5 4.03567 17.5 6.48513Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 11.6667L9.9985 14.1667L7.5 11.6667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.99829 14.1666V8.33331"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.4447 5.83331H2.54883"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <button
              className="flex items-center"
              onClick={() => navigate("/archived")}
            >
              Archived notes
            </button>
          </div>
          {pathname === "/archived" ? <ArrowIcon /> : ""}
        </div>
      </div>
      <p className="px-2">Tags</p>
      {tags.length > 0 && (
        <div className="flex flex-col items-start w-full">
          {tags.map((tag) => (
            <button
              className={`flex items-center justify-between gap-2 py-2.5 px-3 w-full rounded-lg cursor-pointer ${
                pathname === `/tags/${tag}`
                  ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)] dark:text-white"
                  : ""
              }`}
              key={tag}
              onClick={() => navigate(`/tags/${tag}`)}
            >
              <div className="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.01055 3.9783C2.01249 3.03712 2.72405 2.19324 3.64772 2.03432C3.83712 2.00124 6.05872 2.00578 6.97787 2.00643C7.88727 2.00708 8.6624 2.33399 9.30454 2.97485C10.668 4.3357 12.0301 5.69785 13.3903 7.06132C14.1953 7.86759 14.2063 9.10519 13.4046 9.91405C12.2481 11.0816 11.0857 12.2433 9.9188 13.3999C9.1106 14.2009 7.873 14.1905 7.06607 13.3856C5.69029 12.0137 4.31452 10.6418 2.94459 9.26405C2.41465 8.73092 2.10201 8.08679 2.0326 7.33372C1.97681 6.73179 2.00925 4.49397 2.01055 3.9783Z"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.60475 5.54289C6.60215 6.12277 6.11761 6.59953 5.53189 6.59823C4.95006 6.59693 4.46552 6.11175 4.46877 5.53381C4.47266 4.93057 4.95006 4.46031 5.55719 4.4629C6.13318 4.46485 6.60734 4.95327 6.60475 5.54289Z"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                {tag}
              </div>
              {pathname === `/tags/${tag}` ? <ArrowIcon /> : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesListSidebar;
