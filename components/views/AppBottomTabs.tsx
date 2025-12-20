"use client";

import { cn } from "@/lib/utils";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";

type Tab = {
  id: string;
  icon: (tab: string) => ReactNode;
  label: string;
  onClick: () => void | undefined;
};

type Props = {
  tabs: Tab[];
  className?: string | undefined;
};

const AppBottomTabs = ({ tabs, className }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  return (
    <div className={cn("flex items-center w-full", className)}>
      {tabs.map((tab, index) => {
        return (
          <div
            key={tab.id}
            className="flex-1 flex flex-col items-center justify-center"
            onClick={()=>{
              setSelectedTab(tab.id)
              tab.onClick()
            }}
          >
            <div>{tab.icon(selectedTab)}</div>
            <div>{tab.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AppBottomTabs;
