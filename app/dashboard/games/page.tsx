import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import Link from "next/link"

export default function GamesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Casino Games</h1>
          <p className="text-muted-foreground">Browse and play our selection of blockchain-powered games</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search games..." className="w-full pl-8" />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Games</TabsTrigger>
              <TabsTrigger value="slots">Slots</TabsTrigger>
              <TabsTrigger value="table">Table Games</TabsTrigger>
              <TabsTrigger value="cards">Card Games</TabsTrigger>
              <TabsTrigger value="specialty">Specialty</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allGames.map((game, i) => (
                  <GameCard key={i} game={game} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="slots" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allGames
                  .filter((game) => game.category === "Slots")
                  .map((game, i) => (
                    <GameCard key={i} game={game} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="table" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allGames
                  .filter((game) => game.category === "Table")
                  .map((game, i) => (
                    <GameCard key={i} game={game} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="cards" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allGames
                  .filter((game) => game.category === "Cards")
                  .map((game, i) => (
                    <GameCard key={i} game={game} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="specialty" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allGames
                  .filter((game) => game.category === "Specialty")
                  .map((game, i) => (
                    <GameCard key={i} game={game} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}

interface Game {
  id: string
  name: string
  category: string
  description: string
  image: string
  popularityScore: number
  isNew?: boolean
  isHot?: boolean
}

function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/dashboard/games/${game.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-md">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={game.image || "/placeholder.svg"}
              alt={game.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          {game.isNew && <Badge className="absolute left-2 top-2 bg-blue-500 hover:bg-blue-600">New</Badge>}
          {game.isHot && <Badge className="absolute left-2 top-2 bg-orange-500 hover:bg-orange-600">Hot</Badge>}
        </div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{game.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {game.category}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{game.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

const allGames: Game[] = [
  {
    id: "lucky-slots",
    name: "Lucky Slots",
    category: "Slots",
    description: "Spin to win with enhanced odds and blockchain-verified randomness",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 95,
    isHot: true,
  },
  {
    id: "blockchain-roulette",
    name: "Blockchain Roulette",
    category: "Table",
    description: "Smart contract powered roulette with provably fair outcomes",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 88,
  },
  {
    id: "crypto-blackjack",
    name: "Crypto Blackjack",
    category: "Cards",
    description: "Beat the dealer with blockchain odds and transparent card shuffling",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 92,
  },
  {
    id: "fortune-wheel",
    name: "Fortune Wheel",
    category: "Specialty",
    description: "Spin the wheel of fortune for massive multipliers",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 85,
    isNew: true,
  },
  {
    id: "mega-jackpot",
    name: "Mega Jackpot",
    category: "Slots",
    description: "Progressive jackpot slots with life-changing payouts",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 90,
  },
  {
    id: "crypto-poker",
    name: "Crypto Poker",
    category: "Cards",
    description: "Play Texas Hold'em with players from around the world",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 87,
  },
  {
    id: "blockchain-baccarat",
    name: "Blockchain Baccarat",
    category: "Cards",
    description: "Classic baccarat with blockchain-verified card dealing",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 82,
  },
  {
    id: "dice-roller",
    name: "Dice Roller",
    category: "Specialty",
    description: "Simple yet addictive dice game with adjustable odds",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 80,
  },
  {
    id: "crypto-crash",
    name: "Crypto Crash",
    category: "Specialty",
    description: "Cash out before the multiplier crashes for big wins",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 94,
    isHot: true,
  },
  {
    id: "video-poker",
    name: "Video Poker",
    category: "Cards",
    description: "Classic video poker with multiple variants",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 83,
  },
  {
    id: "blockchain-craps",
    name: "Blockchain Craps",
    category: "Table",
    description: "Dice-based table game with multiple betting options",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 78,
  },
  {
    id: "lucky-keno",
    name: "Lucky Keno",
    category: "Specialty",
    description: "Pick numbers and win based on how many you match",
    image: "/placeholder.svg?height=120&width=240",
    popularityScore: 75,
    isNew: true,
  },
]
