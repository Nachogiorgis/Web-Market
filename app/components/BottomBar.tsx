import { Loader, User } from "lucide-react";

export function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] inline-flex w-screen items-center justify-center gap-2.5 border-t-[0.50px] border-black/15 bg-black/0 px-3 py-3 backdrop-blur-[50px]">
      {/* <div className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/20 backdrop-blur-xl hover:bg-black/[1%]">
        <Store className="h-4 stroke-black/40" />
      </div> */}

      <div className="flex items-center justify-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/20 backdrop-blur-xl hover:bg-black/[1%]">
          {/* <Inbox className="h-4 stroke-black/40" /> */}
          <Loader className="h-4 stroke-black/40" />
        </div>
        <div className="group relative flex h-[30px] w-64 flex-col items-center justify-end rounded-[10px] px-3 shadow-[inset_0px_-4px_14px_0px_rgba(0,0,0,0.0)] outline outline-[0.50px] outline-offset-[-0.50px] outline-black/20 hover:bg-black/[1%]">
          <div className="absolute bottom-[1px] h-4 w-[90%] cursor-pointer rounded-t-md bg-white shadow-[0px_0px_14px_0px_rgba(0,0,0,0.05),inset_0_-2px_4px_-4px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out group-hover:h-16" />
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/20 backdrop-blur-xl hover:bg-black/[1%]">
          {/* <BriefcaseBusiness className="h-4 stroke-black/40" /> */}
          <User className="h-4 stroke-black/40" />
        </div>
      </div>

      {/* <div className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1 outline outline-[0.50px] outline-offset-[-0.50px] outline-black/20 backdrop-blur-xl hover:bg-black/[1%]">
        <User className="h-4 stroke-black/40" />
      </div> */}
    </div>
  );
}
