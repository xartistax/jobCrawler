import { siteConfig, siteLinks } from "@/config/site";
import { Link } from "@heroui/link";

export const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs font-extralightbackground-foreground/5 text-foreground/50">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.subdescription} · Quellcode auf &nbsp;
        <Link className="text-xs font-extralight cursor-pointer hover:underline" isExternal showAnchorIcon aria-label="Github" href={siteLinks.github}>
          Github - XartistaX
        </Link>
      </div>
    </footer>
  );
};
