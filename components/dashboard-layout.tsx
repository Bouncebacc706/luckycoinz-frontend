import type React from "react"
import { Button } from "@/components/ui/button"
import { Zap, Home, Gamepad2, Trophy, CreditCard, Bell, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-green-500" />
              <span className="font-bold">ChainLuck Casino</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex gap-1 px-3 py-1 text-green-500 border-green-200">
              <span className="font-mono">1,250</span>
              <span>LUCK</span>
            </Badge>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                3
              </span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-5 w-5" />
                Home
              </Button>
            </Link>
            <Link href="/dashboard/games">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Gamepad2 className="h-5 w-5" />
                Games
              </Button>
            </Link>
            <Link href="/dashboard/leaderboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Trophy className="h-5 w-5" />
                Leaderboard
              </Button>
            </Link>
            <Link href="/dashboard/wallet">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="h-5 w-5" />
                Wallet
              </Button>
            </Link>
            <div className="mt-auto">
              <Link href="/dashboard/settings">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              </Link>
              <Link href="/logout">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </Link>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
