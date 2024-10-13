import React from "react";
import {HomeIcon, ClockIcon, DocumentIcon} from '@heroicons/react/24/outline';

const HeaderNav = () => {
    return(
        <div className="btm-nav">
        <button>
          <HomeIcon className="h-5 w-5" />
        </button>
        <button className="active">
          <ClockIcon className="h-5 w-5" />
        </button>
        <button>
          <DocumentIcon className="h-5 w-5" />
        </button>
      </div>
    );
}

export default HeaderNav;