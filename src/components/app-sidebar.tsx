"use client";

import LogoIMG from "@/assets/logo.png";
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
} from "@/components/ui/sidebar";
import { Plus, User, UsersRound } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function AppSidebar() {
  const handleSign = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const { data } = useSession();

  const items = [
    {
      title: "Clientes",
      url: "/clients",
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
      <SidebarHeader className="relativ pt-8">
        <SidebarTrigger className="border-width-2 absolute -right-4 top-2 rounded-full bg-white" />
        <Image
          src={LogoIMG}
          alt="Logo"
          width={50}
          height={50}
          className="m-auto"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
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
      <SidebarFooter className="pb-8">
        <Button
          onClick={data ? handleSignOut : handleSign}
          className="flex items-center justify-center rounded-md bg-transparent text-black hover:bg-slate-400/15"
        >
          {data?.user ? (
            <div className="flex items-center justify-between gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>
              <span>{data?.user?.name}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <User size={40} />
              <span>Logar</span>
            </div>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
