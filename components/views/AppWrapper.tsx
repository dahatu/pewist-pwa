"use client";

import React, { Children, PropsWithChildren, ReactNode } from "react";
import AppBottomTabs from "./AppBottomTabs";
import Icon from "../fields/Icon";

const AppWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center overflow-hidden">
      <div className="flex-1 self-stretch overflow-scroll p-5">
        {Children.toArray(children)[0]}
      </div>
      <div className="p-2 flex w-full">
        <AppBottomTabs
          tabs={[
            {
              id: "home",
              icon: (tab) => (
                <Icon
                  name={tab == "home" ? "home-2-fill" : "home-2-line"}
                  className={tab == "home" ? "text-primary" : "text-inherit"}
                />
              ),
              label: "ماڵپەر",
              onClick: () => {
                console.log("home");
              },
            },
            {
              id: "categories",
              icon: (tab) => (
                <Icon
                  name={tab == "categories" ? "shapes-fill" : "shapes-line"}
                  className={
                    tab == "categories" ? "text-primary" : "text-inherit"
                  }
                />
              ),
              label: "جۆرەکان",
              onClick: () => {
                console.log("categories");
              },
            },
            {
              id: "bookmarks",
              icon: (tab) => (
                <Icon
                  name={
                    tab == "bookmarks" ? "bookmark-3-fill" : "bookmark-3-line"
                  }
                  className={
                    tab == "bookmarks" ? "text-primary" : "text-inherit"
                  }
                />
              ),
              label: "نیشانکراوەکان",
              onClick: () => {
                console.log("bookmarks");
              },
            },
            {
              id: "profile",
              icon: (tab) => (
                <Icon
                  name={tab == "profile" ? "user-3-fill" : "user-3-line"}
                  className={
                    tab == "profile" ? "text-primary" : "text-inherit"
                  }
                />
              ),
              label: "هەژمارەکەم",
              onClick: () => {
                console.log("user");
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AppWrapper;
