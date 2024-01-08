"use client";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";
  import { NavbarLink } from "@/lib/types";
  import { crafterNavbarLinks } from "@/lib/utils";
  import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
  import Link from "next/link";
  import { useAuth } from "@clerk/nextjs";
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { useState } from "react";
  import { Menu } from "lucide-react";
  import { Button } from "@/components/ui/button";
  
  export function NavBar() {
    const [open, setOpen] = useState(false);
    const { userId } = useAuth();
  
    return (
      <div className="py-[2rem]">
      <div className="hidden lg:block">
        <div className="flex items-center justify-center space-x-20">
          <Link href="/" className="">
            Skilled Hands
          </Link>
          <div className="flex space-x-4">
            {crafterNavbarLinks.map((link: NavbarLink, index: number) => (
              <NavigationMenu key={index} orientation="horizontal">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href={link.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {link.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ))}
          </div>
          <div>
            {!userId ? (
              <SignInButton mode="modal" />
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
        </div>
  
        <div className="lg:hidden text-right p-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-[230px]">
              <SheetHeader className="gap-y-1">
                {crafterNavbarLinks
                  .slice(0, 6)
                  .map((category: NavbarLink, index: number) => (
                    <SheetTitle
                      className=" text-lg"
                      key={index}
                      onClick={() => setOpen(false)}
                    >
                      <Link href={`/shop/${category.name}`}>{category.name}</Link>
                    </SheetTitle>
                  ))}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }