import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Welcome back, John</h1>
          <p className="text-muted-foreground">Your luck score is increasing! Keep playing to boost it further.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Luck Score</CardTitle>
              <Zap className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
                +5.2% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Winnings</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-green-500"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
                +12.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#42</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-green-500" />
                Up 5 positions this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full md:col-span-2">
            <CardHeader>
              <CardTitle>Featured Games</CardTitle>
              <CardDescription>Try these popular games to boost your luck score</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {featuredGames.map((game, i) => (
                <Link key={i} href={`/dashboard/games/${game.id}`}>
                  <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{game.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {game.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{game.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest game results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className={`h-2 w-2 rounded-full ${activity.win ? "bg-green-500" : "bg-red-500"}`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.game}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className={`font-mono font-medium ${activity.win ? "text-green-500" : "text-red-500"}`}>
                      {activity.win ? "+" : "-"}${activity.amount}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View all activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const Trophy = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const featuredGames = [
  {
    id: "slot-machine",
    name: "Lucky Slots",
    category: "Slots",
    description: "Spin to win with enhanced odds",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "roulette",
    name: "Blockchain Roulette",
    category: "Table",
    description: "Smart contract powered roulette",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "blackjack",
    name: "Crypto Blackjack",
    category: "Cards",
    description: "Beat the dealer with blockchain odds",
    image: "/placeholder.svg?height=120&width=240",
  },
]

const recentActivity = [
  {
    game: "Lucky Slots",
    time: "2 minutes ago",
    amount: "12.50",
    win: true,
  },
  {
    game: "Blockchain Roulette",
    time: "15 minutes ago",
    amount: "5.00",
    win: false,
  },
  {
    game: "Crypto Blackjack",
    time: "1 hour ago",
    amount: "25.00",
    win: true,
  },
  {
    game: "Lucky Slots",
    time: "3 hours ago",
    amount: "7.50",
    win: false,
  },
]
