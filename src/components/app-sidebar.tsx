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
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppSidebar() {
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
        <Avatar className="flex w-full flex-1 items-center">
          <AvatarImage
            src={data?.user?.image ?? ""}
            className="m-auto h-10 w-10 rounded-full"
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </SidebarFooter>
    </Sidebar>
  );
}
