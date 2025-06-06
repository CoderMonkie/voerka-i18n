import { Translate } from "@/languages/server";
import { LanguageBar } from "./LanguageBar";
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-600">
            VoerkaI18n Nextjs Example
          </span>
        </div>
        <span className="flex flex-row justify-center space-x-3 grow text-center ">
            <Link href="/"><Translate message="首页"/></Link>
            <Link href="/features"><Translate message="特性"/></Link> 
            <Link href="/repos"><Translate message="开源推荐"/></Link>
            <Link href="/about"><Translate message="关于"/></Link>
        </span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <LanguageBar />
        </div>
      </div>
    </nav>
  );
}
