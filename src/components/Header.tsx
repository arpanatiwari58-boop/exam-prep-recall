import Link from 'next/link';
import { Search, LogIn, ChevronDown, PlusCircle } from 'lucide-react';

export default function Header() {
  const navItems = [
    { label: 'Home', href: '/', hasDropdown: false, isActive: true },
    { label: 'Subjects', href: '/#pastel-subjects', hasDropdown: true },
    { label: 'Calendar', href: '/calendar', hasDropdown: false },
    { label: 'How It Works', href: '/#how-it-works', hasDropdown: false },
    { label: 'Create Test', href: '/create-test', hasDropdown: false },
  ];

  return (
    <header className="w-full bg-white relative z-50">
      <div className="container mx-auto px-4 lg:px-6 xl:px-12 max-w-[1536px]">
        <div className="flex items-center justify-between h-[90px]">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-1 z-10 shrink-0">
            {/* Custom SVG Logo matching the edubo logo layout */}
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M19.5 2C19.5 2 24 16.5 13 25.5C2 34.5 10.5 17.5 10.5 17.5C10.5 17.5 1.5 5.5 19.5 2Z" fill="#ffb433" />
              <path d="M11 25.5C11 25.5 3 32 6 36C9 40 18.5 38.5 18.5 38.5C18.5 38.5 27.5 30.5 18 19.5C8.5 8.5 11 25.5 11 25.5Z" fill="#a072ff" />
              <path d="M33 13.5C33 13.5 20.5 26 21 34.5C21.5 43 32 38.5 32 38.5C32 38.5 37 25 31.5 18C26 11 33 13.5 33 13.5Z" fill="#a072ff" opacity="0.9" />
            </svg>
            <span className="text-[28px] font-bold tracking-tight pb-[2px]">
              <span className="text-[#a072ff]">CSIT</span>
              <span className="text-[#ffb433]">Recall</span>
            </span>
          </Link>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7 lg:gap-8 xl:gap-10">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-1.5 transition-colors text-[16px] font-medium ${
                      item.isActive 
                        ? 'text-[#a072ff]' 
                        : 'text-[#060b26] hover:text-[#a072ff]'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-[18px] h-[18px] stroke-[2.5]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-5 sm:gap-6 pl-4">
            {/* Search */}
            <button className="text-[#060b26] hover:text-[#a072ff] transition-colors" aria-label="Search">
              <Search className="w-[22px] h-[22px] stroke-[2]" />
            </button>

            {/* Create Test / Dashboard quick action */}
            <Link href="/create-test" className="text-[#060b26] hover:text-[#ffb433] transition-colors group hidden sm:block">
              <PlusCircle className="w-[24px] h-[24px] stroke-[2]" />
            </Link>

            {/* Sign In Button */}
            <Link 
              href="/signin" 
              className="hidden sm:flex items-center justify-center gap-2 bg-[#be89ff] hover:bg-[#ad70fc] text-white px-[22px] py-[10px] rounded-[10px] text-[16px] font-medium transition-all duration-300 shadow-[0_4px_14px_0_rgba(190,137,255,0.39)] mx-2"
            >
              <LogIn className="w-[18px] h-[18px] stroke-[2]" />
              Sign In
            </Link>

            {/* Custom Hamburger Options */}
            <button className="text-[#060b26] flex flex-col gap-[5px] justify-center items-end w-7 h-7 hover:text-[#a072ff] transition-colors cursor-pointer ml-1 lg:hidden">
              <span className="w-6 h-[2.5px] bg-current rounded-full transition-all" />
              <span className="w-4 h-[2.5px] bg-current rounded-full transition-all" />
              <span className="w-6 h-[2.5px] bg-current rounded-full transition-all" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
