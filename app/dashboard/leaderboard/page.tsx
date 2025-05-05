import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Zap } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other players</p>
        </div>

        <Tabs defaultValue="weekly">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-4">
            <LeaderboardTable data={dailyLeaderboard} />
          </TabsContent>
          <TabsContent value="weekly" className="mt-4">
            <LeaderboardTable data={weeklyLeaderboard} />
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <LeaderboardTable data={monthlyLeaderboard} />
          </TabsContent>
          <TabsContent value="alltime" className="mt-4">
            <LeaderboardTable data={alltimeLeaderboard} />
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Your Rank</CardTitle>
              <CardDescription>Weekly Leaderboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted font-mono text-2xl font-bold">
                  42
                </div>
                <div>
                  <p className="font-medium">You're in the top 15%</p>
                  <p className="text-sm text-muted-foreground">Win 2,500 more LUCK to reach top 10</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rewards</CardTitle>
              <CardDescription>Weekly prizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>1st Place</span>
                  </div>
                  <span className="font-mono font-medium">10,000 LUCK</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-gray-400" />
                    <span>2nd Place</span>
                  </div>
                  <span className="font-mono font-medium">5,000 LUCK</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-700" />
                    <span>3rd Place</span>
                  </div>
                  <span className="font-mono font-medium">2,500 LUCK</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Luck Multiplier</CardTitle>
              <CardDescription>Boost your luck score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-center text-sm">
                  Play more games to increase your luck multiplier and climb the leaderboard faster!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  winnings: number
  luckScore: number
  isCurrentUser?: boolean
}

function LeaderboardTable({ data }: { data: LeaderboardEntry[] }) {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
        <div className="col-span-1">Rank</div>
        <div className="col-span-5">Player</div>
        <div className="col-span-3 text-right">Winnings</div>
        <div className="col-span-3 text-right">Luck Score</div>
      </div>
      <div className="divide-y">
        {data.map((entry) => (
          <div
            key={entry.rank}
            className={`grid grid-cols-12 gap-4 p-4 ${entry.isCurrentUser ? "bg-green-50 dark:bg-green-900/20" : ""}`}
          >
            <div className="col-span-1 flex items-center">
              {entry.rank <= 3 ? (
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    entry.rank === 1
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300"
                      : entry.rank === 2
                        ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                  }`}
                >
                  {entry.rank === 1 ? (
                    <Trophy className="h-4 w-4" />
                  ) : entry.rank === 2 ? (
                    <Medal className="h-4 w-4" />
                  ) : (
                    <Award className="h-4 w-4" />
                  )}
                </div>
              ) : (
                <span className="font-mono font-medium">{entry.rank}</span>
              )}
            </div>
            <div className="col-span-5 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.username} />
                <AvatarFallback>{entry.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {entry.username}
                {entry.isCurrentUser && <Badge className="ml-2 bg-green-500 text-white">You</Badge>}
              </span>
            </div>
            <div className="col-span-3 flex items-center justify-end font-mono font-medium">
              {entry.winnings.toLocaleString()} LUCK
            </div>
            <div className="col-span-3 flex items-center justify-end">
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/50 dark:text-green-300">
                <Zap className="h-3 w-3" />
                {entry.luckScore}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const dailyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", avatar: "/placeholder.svg?height=32&width=32", winnings: 25000, luckScore: 98 },
  {
    rank: 2,
    username: "BlockchainQueen",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 18500,
    luckScore: 95,
  },
  { rank: 3, username: "LuckyMiner", avatar: "/placeholder.svg?height=32&width=32", winnings: 12750, luckScore: 92 },
  { rank: 4, username: "TokenMaster", avatar: "/placeholder.svg?height=32&width=32", winnings: 9800, luckScore: 89 },
  { rank: 5, username: "CoinCollector", avatar: "/placeholder.svg?height=32&width=32", winnings: 8500, luckScore: 87 },
  { rank: 6, username: "HashRoller", avatar: "/placeholder.svg?height=32&width=32", winnings: 7200, luckScore: 85 },
  { rank: 7, username: "BlockExplorer", avatar: "/placeholder.svg?height=32&width=32", winnings: 6500, luckScore: 82 },
  { rank: 8, username: "ChainGambler", avatar: "/placeholder.svg?height=32&width=32", winnings: 5800, luckScore: 80 },
  { rank: 9, username: "CryptoWinner", avatar: "/placeholder.svg?height=32&width=32", winnings: 4900, luckScore: 78 },
  {
    rank: 10,
    username: "JohnDoe",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 4200,
    luckScore: 76,
    isCurrentUser: true,
  },
]

const weeklyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", avatar: "/placeholder.svg?height=32&width=32", winnings: 125000, luckScore: 98 },
  {
    rank: 2,
    username: "BlockchainQueen",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 98500,
    luckScore: 95,
  },
  { rank: 3, username: "LuckyMiner", avatar: "/placeholder.svg?height=32&width=32", winnings: 87750, luckScore: 92 },
  { rank: 4, username: "TokenMaster", avatar: "/placeholder.svg?height=32&width=32", winnings: 76800, luckScore: 89 },
  { rank: 5, username: "CoinCollector", avatar: "/placeholder.svg?height=32&width=32", winnings: 65500, luckScore: 87 },
  { rank: 6, username: "HashRoller", avatar: "/placeholder.svg?height=32&width=32", winnings: 54200, luckScore: 85 },
  { rank: 7, username: "BlockExplorer", avatar: "/placeholder.svg?height=32&width=32", winnings: 43500, luckScore: 82 },
  { rank: 8, username: "ChainGambler", avatar: "/placeholder.svg?height=32&width=32", winnings: 32800, luckScore: 80 },
  { rank: 9, username: "CryptoWinner", avatar: "/placeholder.svg?height=32&width=32", winnings: 21900, luckScore: 78 },
  {
    rank: 42,
    username: "JohnDoe",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 12500,
    luckScore: 76,
    isCurrentUser: true,
  },
]

const monthlyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", avatar: "/placeholder.svg?height=32&width=32", winnings: 525000, luckScore: 98 },
  {
    rank: 2,
    username: "BlockchainQueen",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 398500,
    luckScore: 95,
  },
  { rank: 3, username: "LuckyMiner", avatar: "/placeholder.svg?height=32&width=32", winnings: 287750, luckScore: 92 },
  { rank: 4, username: "TokenMaster", avatar: "/placeholder.svg?height=32&width=32", winnings: 176800, luckScore: 89 },
  {
    rank: 5,
    username: "CoinCollector",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 165500,
    luckScore: 87,
  },
  { rank: 6, username: "HashRoller", avatar: "/placeholder.svg?height=32&width=32", winnings: 154200, luckScore: 85 },
  {
    rank: 7,
    username: "BlockExplorer",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 143500,
    luckScore: 82,
  },
  { rank: 8, username: "ChainGambler", avatar: "/placeholder.svg?height=32&width=32", winnings: 132800, luckScore: 80 },
  { rank: 9, username: "CryptoWinner", avatar: "/placeholder.svg?height=32&width=32", winnings: 121900, luckScore: 78 },
  {
    rank: 35,
    username: "JohnDoe",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 45600,
    luckScore: 76,
    isCurrentUser: true,
  },
]

const alltimeLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", avatar: "/placeholder.svg?height=32&width=32", winnings: 2525000, luckScore: 98 },
  {
    rank: 2,
    username: "BlockchainQueen",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 1998500,
    luckScore: 95,
  },
  { rank: 3, username: "LuckyMiner", avatar: "/placeholder.svg?height=32&width=32", winnings: 1287750, luckScore: 92 },
  { rank: 4, username: "TokenMaster", avatar: "/placeholder.svg?height=32&width=32", winnings: 976800, luckScore: 89 },
  {
    rank: 5,
    username: "CoinCollector",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 865500,
    luckScore: 87,
  },
  { rank: 6, username: "HashRoller", avatar: "/placeholder.svg?height=32&width=32", winnings: 754200, luckScore: 85 },
  {
    rank: 7,
    username: "BlockExplorer",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 643500,
    luckScore: 82,
  },
  { rank: 8, username: "ChainGambler", avatar: "/placeholder.svg?height=32&width=32", winnings: 532800, luckScore: 80 },
  { rank: 9, username: "CryptoWinner", avatar: "/placeholder.svg?height=32&width=32", winnings: 421900, luckScore: 78 },
  {
    rank: 28,
    username: "JohnDoe",
    avatar: "/placeholder.svg?height=32&width=32",
    winnings: 156700,
    luckScore: 76,
    isCurrentUser: true,
  },
]
