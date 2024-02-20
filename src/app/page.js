// import page from "./User/page";
import Link from "next/link";

export default function Splash() {
  return (
    <div
      className="splash min-h-screen justify-center items-center flex custom-background "
    >
      <div className="container lg:h-[600px]  lg:w-[1290px] bg-[rgba(255,255,255,0.8)] flex flex-col rounded-xl
    lg:flex-row lg:justify-around items-center p-6 md:p-20 m-4">
      <div className="pb-10">
        <h1 className="text-8xl font-extrabold text-red-600 mb-4">Swift <br/> EMS.</h1>
        <p className="text-xl">An ambulance for fast and reliable Emergency Medical Services.</p>
        {/* <a href={<Login />} className="bg-red-500 py-2 px-4 rounded-md">Driver's portal</a> */}
      </div>

      <div className="flex flex-col font-semibold">
        <Link href="/Driver" className="py-2 px-4 border-2 border-black rounded-full m-1 text-center hover:bg-neutral-600 hover:text-white">
          Driver&apos;s portal
        </Link>
        <Link href="/User" className="py-2 px-4 border-2 border-black rounded-full m-1 text-center hover:bg-neutral-600 hover:text-white">
          Customer&apos;s portal
        </Link>
      </div>

      </div>
        <p className="text-white text-xs absolute bottom-0 tracking-widest">Copyright &copy; 2023  |  Preetham Ananthu  |  All Rights Reserved</p>
    </div>
  );
}
