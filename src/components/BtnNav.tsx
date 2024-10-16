import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import {HomeIcon, ClockIcon, DocumentIcon} from '@heroicons/react/24/outline';

const BtnNav = () => {
  const router = useRouter();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const handleNavigation = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

    return(
      <div className="btm-nav">
        <button
          onClick={() => handleNavigation("/")}
          className={activePath === "/" ? "active" : ""}>
          <HomeIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleNavigation("/timer")}
          className={activePath === "/timer" ? "active" : ""}>
          <ClockIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleNavigation("/records")}
          className={activePath === "/records" ? "active" : ""}>
          <DocumentIcon className="h-5 w-5" />
        </button>
      </div>
    );
};

export default BtnNav;