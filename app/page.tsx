"use client";;
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Link from "next/link";

function endpoint(endpoint: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
}

export default function Home() {
  const theme = useTheme();

  const { data } = useQuery({
    queryKey: ["resources"],
    queryFn: () =>
      fetch(endpoint("v1/resources"), { method: "post" }).then((res) =>
        res.json()
      ),
  });

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#222]">
      <meta
        name="theme-color"
        content={theme.resolvedTheme == "dark" ? "#222" : "#fff"}
      ></meta>
      <div className="p-5 flex flex-col gap-5">
        <div>{theme.theme}</div>
        <Button
          onClick={() => {
            theme.setTheme("dark");
          }}
        >
          Dark Mode
        </Button>
        <Button
          onClick={() => {
            theme.setTheme("light");
          }}
        >
          Light Mode
        </Button>
        <Button
          onClick={() => {
            theme.setTheme("system");
          }}
        >
          System
        </Button>
        <Link href={"/install"}>Schedule Browser Notification</Link>
      </div>
    </div>
  );
}
