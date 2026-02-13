"use client";
import Image from "next/image";
import logo from "@/svgs/logo.svg";
import { FlipLink } from "./flip-link";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { pageAnimation } from "@/helpers/animation";
import { useState } from "react";

const Navigation = ({ isHomePage = false }) => {
  const router = useTransitionRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/studio" },
    { label: "About", href: "/about" },
  ];

  const handleNavClick = (href: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMobileOpen(false);
    router.push(href, { onTransitionReady: pageAnimation });
  };

  const NavItem = ({ item }: { item: { label: string; href: string } }) => (
    <li className="flex items-center gap-3 py-2.5">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
      <span className="text-white font-medium text-[15px] tracking-tight [&_a]:text-white [&_a:hover]:text-white/90 [&_a]:transition-colors">
        <FlipLink href={item.href} onClick={handleNavClick(item.href)}>
          {item.label}
        </FlipLink>
      </span>
    </li>
  );

  const mobileDrawer = (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={() => setMobileOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
        className={`fixed inset-0 z-[9997] bg-black/50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-20 right-4 z-[9998] w-[240px] max-w-[85vw] md:hidden flex flex-col rounded-xl overflow-hidden transition-all duration-300 ease-out origin-top-right bg-inverse-1 border border-white/10 shadow-xl ${
          mobileOpen ? "translate-x-0 opacity-100 scale-100" : "translate-x-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav className="py-4 px-5 list-none">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>
          <div className="my-2 border-t border-white/10" />
          <ul className="flex flex-col gap-0.5">
            <li className="flex items-center gap-3 py-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
              <span className="text-white font-medium text-[15px] tracking-tight [&_a]:text-white [&_a:hover]:text-white/90 [&_a]:transition-colors">
                <FlipLink href="/contact" onClick={handleNavClick("/contact")}>
                  Contact
                </FlipLink>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );

  const hamburger = (
    <button
      type="button"
      aria-label="Toggle menu"
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen((o) => !o)}
      className="md:hidden flex flex-col gap-1.5 w-10 h-10 justify-center items-center shrink-0 ml-auto rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors"
    >
      <span
        className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${
          mobileOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-5 h-0.5 bg-white rounded-full transition-opacity duration-300 ${
          mobileOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${
          mobileOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );

  if (isHomePage) {
    return (
      <>
        <nav className="pt-8 md:pt-12 px-4 md:px-[4.5rem] flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>
          <span className="flex-1 md:hidden" aria-hidden />
          {hamburger}
          <li className="hidden md:block leading-[100%] font-semibold font-base list-none">
            <FlipLink
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                router.push("/contact", {
                  onTransitionReady: pageAnimation,
                });
              }}
            >
              Contact
            </FlipLink>
          </li>
        </nav>
        {mobileDrawer}
      </>
    );
  }

  return (
    <>
      <nav className="py-8 md:py-12">
        <div className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-0">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push("/", {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            <Image src={logo} alt="ARK SPACE logo" />
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>

          {hamburger}

          <li className="hidden md:block leading-[100%] font-semibold font-base list-none">
            <FlipLink
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                router.push("/contact", {
                  onTransitionReady: pageAnimation,
                });
              }}
            >
              Contact
            </FlipLink>
          </li>
        </div>
      </nav>
      {mobileDrawer}
    </>
  );
};

export default Navigation;
