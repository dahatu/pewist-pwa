"use client";
import { AudioSeekSlider } from "@/components/fields/AudioSeekSlider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
export default function Home() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex flex-col gap-2 p-10">
      <div className="flex gap-2">
        <Input />
        <Button>تکایە کلیک بکە</Button>
      </div>

      <div className="flex items-center space-x-2 my-5">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] rounded-full" />
        <Skeleton className="h-4 w-[200px] rounded-full" />
      </div>
    </div>

      <Dialog modal>
        <ContextMenu>
          <ContextMenuTrigger>Right click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuItem>Download</ContextMenuItem>
            <DialogTrigger asChild>
              <ContextMenuItem>
                <span>Delete</span>
              </ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"outline"}>Cancel</Button>
            <Button type="submit" variant={"destructive"}>
              Delete Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div dir="ltr" className="p-10">
        <AudioSeekSlider
          min={0}
          max={100}
          value={progress}
          buffered={82}
          step={0.1}
          onSeek={(e) => setProgress(e)}
          markers={[
            {
              time: 20,
              label: "Progress 20%",
            },
            {
              time: 40,
              label: "Progress 40%",
            },
            {
              time: 60,
              label: "Progress 60%",
            },
          ]}
        />
      </div>
      <div className="h-[1000px] "></div>
      <Input />
      <div className="h-[1000px] "></div>
      <Input />
    </div>
  );
}
