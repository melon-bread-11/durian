"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { FarmMark } from "@/components/farm-mark";
import { useFarm } from "@/components/farm-provider";
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our farm" },
  { href: "/durians", label: "Our durians" },
];
export function SiteHeader() {
  const pathname = usePathname();
  const { items } = useFarm();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Family Durian Farm home">
          <FarmMark />
          <span>
            Family<span>Durian Farm</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                (
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)
                )
                  ? "active"
                  : ""
              }
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href="/contact#enquiry"
            className="selection-link"
            aria-label={"Enquiry list, " + items.length + " varieties"}
          >
            <ShoppingBag size={20} />
            {items.length > 0 && <span>{items.length}</span>}
          </Link>
          <Link href="/contact" className="button button-small header-contact">
            Get in touch <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className={"mobile-nav " + (open ? "is-open" : "")}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}>
          Get in touch
          <ArrowUpRight size={18} />
        </Link>
      </nav>
    </header>
  );
}
