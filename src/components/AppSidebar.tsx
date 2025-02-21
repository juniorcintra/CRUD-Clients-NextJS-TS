"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoIMG from "@/assets/logo.png";
import { Plus, User, UsersRound } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function AppSidebar() {
  const { data } = useSession();
  const { state: stateSidebar } = useSidebar();
  const path = usePathname();

  const handleSign = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const items = [
    {
      title: "Clientes",
      url: "/",
      icon: UsersRound,
    },
    {
      title: "Cadastrar Cliente",
      url: "/clients/new",
      icon: Plus,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="relative pt-8">
        <SidebarTrigger className="border-width-2 absolute -right-3 top-2 rounded-full bg-white" />
        <Link href="/">
          <Image
            src={LogoIMG}
            alt="Logo"
            width={stateSidebar === "collapsed" ? 25 : 50}
            height={stateSidebar === "collapsed" ? 25 : 50}
            className="m-auto"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={
                        item.url === path
                          ? "bg-[#0a6d01]/15 hover:bg-[#0a6d01]/15"
                          : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <Button
          onClick={data ? handleSignOut : handleSign}
          className="flex items-center justify-center rounded-md bg-transparent text-black hover:bg-slate-400/15"
        >
          {data?.user ? (
            <div className="flex items-center justify-between gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={data?.user?.image ?? ""} />
                <AvatarFallback>
                  {data?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {stateSidebar !== "collapsed" && <span>{data?.user?.name}</span>}
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <User size={40} />
              {stateSidebar !== "collapsed" && <span>Logar</span>}
            </div>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
