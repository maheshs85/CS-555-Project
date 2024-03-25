import {
  InformationCircleIcon,
  HomeIcon,
  ClipboardDocumentIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "About",
    href: "/about",
    icon: InformationCircleIcon,
  },
  { name: "Result", href: "/result", icon: ClipboardDocumentIcon },
  { name: "History", href: "/history", icon: ClockIcon },
];
export default function NavLinks() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={
              pathname === link.href
                ? "bg-sky-100 text-blue-600 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                : "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            }
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
