"use client";

import Icon from "@/components/bahman/Icon";
import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";
import { Activity, HTMLAttributes, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useKey } from "@/hooks/useKey";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";
import { useDirection } from "@radix-ui/react-direction";

export default function Home() {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  useKey(
    "x",
    () => {
      if (theme.theme === "light") {
        theme.setTheme("dark");
      } else if (theme.theme === "dark") {
        theme.setTheme("system");
      } else if (theme.theme === "system") {
        theme.setTheme("light");
      }
    },
    { meta: true, preventDefault: true }
  );

  useEffect(() => {
    setFirstTime(false);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 p-5 h-screen overflow-hidden bg-white dark:bg-stone-900">
      <Button variant={"outline"} className="group">
        <Icon
          name="settings-3-line"
          className="transition-transform group-hover:rotate-z-45"
        />
        <span>تنظیمات کارخانه</span>
        <Icon name="arrow-right-s-line" className="opacity-50 rtl:rotate-180" />
      </Button>

      <a href="#" className="
      group 
      hover:bg-blue-500 
       active:bg-blue-600 
       rounded-lg 
       px-4 
       py-2 
       transition-colors
      
      ">
        <div className="flex gap-2 items-center">
          <Icon name="folder-add-line" className="font-bold dark:text-white group-hover:text-white transition-colors"/>
          <h3 className="font-medium dark:text-white text-gray-900 group-hover:text-white transition-colors">پروژه جدید</h3>
        </div>
        <p className="dark:text-stone-500 dark:group-hover:text-gray-200 text-gray-500 text-xs group-hover:text-white transition-colors">
          یک پروژه جدید از میان قالب‌های شروع متنوع ایجاد کنید.
        </p>
      </a>
    </div>
  );
}
