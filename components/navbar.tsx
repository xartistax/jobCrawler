"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Tooltip } from "@heroui/tooltip";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/modal";

import AvatarWrapper from "./avatar-wrapper";
import ThemeModal from "./modal";

import { siteConfig, siteLinks } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, LinkedinIcon, Logo, OffIcon } from "@/components/icons";
import { useUser } from "@/app/context/user";
import { auth } from "@/lib/firebase";

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const searchInput = (
  //   <Input
  //     aria-label="Suchen"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Suchen..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => setMounted(true), []);

  const showUserUI = mounted && !isLoading && !!user;

  const navItems = showUserUI
    ? siteConfig.navItemsUser
    : siteConfig.navItemsUser;
  const navMenuItems = showUserUI
    ? siteConfig.navMenuItemsUser
    : siteConfig.navMenuItemsUser;

  return (
    <>
      <HeroUINavbar
        isBlurred
        className="bg-background/60 backdrop-blur-md"
        maxWidth="xl"
        position="sticky"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link
              className="flex justify-start items-center gap-1 text-inherit"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">{siteConfig.name}</p>
            </Link>
          </NavbarBrand>

          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-light text-xs",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}

            <NavbarItem>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-light text-xs cursor-pointer",
                )}
                onPress={onOpen}
              >
                Crawler
              </Link>
            </NavbarItem>
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            {/* deine icons/theme switch bleiben immer gleich */}
            <Tooltip content="Github - Demian Füglistaler">
              <Link isExternal aria-label="Github" href={siteLinks.github}>
                <GithubIcon className="text-default-500" />
              </Link>
            </Tooltip>

            <Tooltip content="LinkedIn - Demian Füglistaler">
              <Link isExternal aria-label="LinkedIn" href={siteLinks.linkedin}>
                <LinkedinIcon />
              </Link>
            </Tooltip>

            <ThemeSwitch />
          </NavbarItem>

          <NavbarItem className="hidden lg:flex">
            {!mounted || isLoading ? null : user ? (
              <Dropdown>
                <DropdownTrigger>
                  <Link aria-label="User menu" href="#">
                    <AvatarWrapper />
                  </Link>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="User menu"
                  itemClasses={{ base: "gap-4" }}
                >
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Angemeldet als</p>
                    <p className="font-light text-xs">{user.email}</p>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    color="danger"
                    description="Abmelden vom Benutzerkonto"
                    startContent={<OffIcon />}
                    onClick={handleLogout}
                  >
                    Abmelden
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                as={Link}
                className="text-xs font-light"
                href="/login"
                variant="solid"
              >
                Anmelden
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteLinks.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {user && (
              <div className="flex mb-8">
                <AvatarWrapper />
                <div className="ml-8 flex flex-col">
                  <p className="font-semibold">Angemeldet als</p>
                  <p className="font-light text-xs">{user.email}</p>
                </div>
              </div>
            )}

            {navMenuItems.map((item, index) => (
              <NavbarMenuItem key={item.href + index}>
                <Link color={"foreground"} href={item.href} size="sm">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            <NavbarMenuItem>
              {!mounted || isLoading ? null : user ? (
                <Link
                  className="w-full text-sm font-light cursor-pointer"
                  color="danger"
                  onPress={handleLogout}
                >
                  Abmelden
                </Link>
              ) : (
                <Button
                  as={Link}
                  className="w-full text-sm font-light"
                  href="/login"
                  variant="solid"
                >
                  Anmelden
                </Button>
              )}
            </NavbarMenuItem>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
      <ThemeModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
