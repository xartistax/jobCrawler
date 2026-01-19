import { FirebaseLogo, GithubLogo, HeroUILogo, NextJsLogo, PythonLogo, ReactLogo, TypeScriptLogo } from "@/components/icons";
import { FrontIconNavItem, NavItem } from "@/types/index";

export type SiteConfig = typeof siteConfig;

export const siteLinks = {
  typeScript: "https://www.typescriptlang.org/",
  react: "https://reactjs.org/",
  nextJS: "https://nextjs.org/",
  python: "https://www.python.org/",
  firebase: "https://firebase.google.com/",
  heroUI: "https://heroui.com/",
  github: "https://github.com/xartistax/jobCrawler",
  linkedin: "https://www.linkedin.com/in/demianfüglistaler/",
} as const;

export const siteConfig: {
  name: string;
  description: string;
  subdescription: string;
  navItemsUser: NavItem[];
  navMenuItemsUser: NavItem[];
  fullNavItems: NavItem[];
  frontIconNav: FrontIconNavItem[];
} = {
  name: "Job Crawler",
  description:
    "Diese Anwendung kombiniert ein modernes Next.js-Frontend mit Firebase Auth und Firestore. Sie ermöglicht es, reale Jobangebote zu crawlen, durchsuchen, und user-spezifisch zu speichern.",

  subdescription: "Erstellt mit HeroUI, Next.js und Python",

  navItemsUser: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Favorites",
      href: "/dashboard/saved",
    },
  ],
  navMenuItemsUser: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Favorites",
      href: "/dashboard/saved",
    },
    {
      label: "Crawler",
      href: "/crawler",
    },
  ],
  fullNavItems: [
    {
      label: "Anmelden",
      href: "/login",
    },
    {
      label: "Registrieren",
      href: "/register",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Favorites",
      href: "/dashboard/saved",
    },
  ],

  frontIconNav: [
    {
      label: "TypeScript",
      href: siteLinks.typeScript,
      icon: TypeScriptLogo,
    },
    {
      label: "React",
      href: siteLinks.react,
      icon: ReactLogo,
    },
    {
      label: "Next.js",
      href: siteLinks.nextJS,
      icon: NextJsLogo,
    },
    {
      label: "Python",
      href: siteLinks.python,
      icon: PythonLogo,
    },
    {
      label: "Firebase",
      href: siteLinks.firebase,
      icon: FirebaseLogo,
    },
    {
      label: "GitHub",
      href: siteLinks.github,
      icon: GithubLogo,
    },
    {
      label: "HeroUI",
      href: siteLinks.heroUI,
      icon: HeroUILogo,
    },
  ],
};
