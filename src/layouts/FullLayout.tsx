import React, {FC, ReactNode} from 'react';
import Sidebar from "components/Sidebar";

interface FullLayoutProps {
  children: ReactNode
}

const FullLayout: FC<FullLayoutProps> = ({
  children
}) => {
  return (
    <div className="bg-gray-50 dark:bg-indigo-1300 w-screen h-screen flex">
      <Sidebar />

      <div className="grow w-0 max-h-screen overflow-y-auto">
        <div className="mx-auto w-[1200px] pt-20">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FullLayout;