"use client";

import { Link, Tooltip } from "@heroui/react";

import { siteConfig } from "@/config/site";
export default function Home() {
  return (
    <section className="min-h-[calc(100vh-64px-56px)] flex items-center justify-center">
      <div className="mx-auto max-w-3xl px-6 text-center leading-relaxed">
        <h1 className="font-bold text-4xl mb-6">
          {siteConfig.name}{" "}
          <small className="text-sm font-light">FullStack Project</small>
        </h1>
        <p className="text-default-500 mb-6">{siteConfig.description}</p>

        <div className="mb-12 flex items-center justify-center gap-3 text-xs font-extralight text-default-500">
          <span>[</span>

          <div className="flex gap-2">
            {siteConfig.fullNavItems.map((item) => (
              <Link
                key={item.href}
                className="text-primary after:content-['|'] after:ml-2 last:after:content-none text-xs"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <span>]</span>
        </div>

        <div className="flex justify-center w-full">
          <div className="w-full grid grid-cols-4 place-items-center gap-5 text-black dark:text-default-200 sm:grid-cols-5 lg:grid-cols-4 lg:w-6/12">
            {siteConfig.frontIconNav.map((item) => (
              <Tooltip key={item.label} content={item.label}>
                <Link
                  isExternal
                  aria-label={item.label}
                  className="text-inherit"
                  href={item.href}
                >
                  <div className="scale-80 sm:scale-100" title={item.label}>
                    <item.icon size={36} />
                  </div>
                </Link>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
