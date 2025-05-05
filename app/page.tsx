import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Zap, Gamepad2, Trophy, CreditCard } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Zap className="h-6 w-6 text-green-500" />
              <span className="font-bold">ChainLuck Casino</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Boost Your Luck on the Blockchain Casino
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  ChainLuck Casino is a decentralized platform that helps you increase your chances of winning in
                  blockchain games and lotteries.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                  <Link href="/dashboard">
                    Play Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard/games">Browse Games</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Casino Games</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore our wide selection of blockchain-powered casino games with enhanced winning odds.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                {casinoGames.map((game, index) => (
                  <Link key={index} href={`/dashboard/games/${game.id}`} className="group">
                    <div className="relative overflow-hidden rounded-lg border transition-all hover:shadow-md">
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={game.image || "/placeholder.svg"}
                          alt={game.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold">{game.name}</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">{game.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-green-500">
                            <Zap className="h-4 w-4" />
                            <span>Luck Boost: +{game.luckBoost}%</span>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            Play Now <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Casino Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover what makes ChainLuck Casino the best blockchain gaming platform.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                      <feature.icon className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Thousands of Lucky Players
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our players have reported significant increases in their winning rates. Don't miss out on your chance
                  to be lucky.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                  <Link href="/signup">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            © 2025 ChainLuck Casino. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline text-gray-500 dark:text-gray-400">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline text-gray-500 dark:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline text-gray-500 dark:text-gray-400">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Luck Boosting",
    description:
      "Our AI analyzes blockchain patterns to identify the most favorable opportunities and boost your luck.",
    icon: Zap,
  },
  {
    title: "Provably Fair Games",
    description: "All games are secured with advanced encryption and smart contracts for transparent outcomes.",
    icon: Gamepad2,
  },
  {
    title: "Leaderboards & Rewards",
    description: "Compete with other players and earn rewards based on your performance and luck score.",
    icon: Trophy,
  },
  {
    title: "Secure Transactions",
    description: "Deposit and withdraw funds securely with multiple blockchain options and instant processing.",
    icon: CreditCard,
  },
  {
    title: "Luck Score System",
    description: "Track your luck score and see how it improves over time as you play more games.",
    icon: Check,
  },
  {
    title: "Real-time Updates",
    description: "Get instant notifications about new opportunities and winning chances.",
    icon: ArrowRight,
  },
]

const casinoGames = [
  {
    id: "lucky-slots",
    name: "Lucky Slots",
    description: "Spin to win with enhanced odds and blockchain-verified randomness",
    image: "/placeholder.svg?height=200&width=400",
    luckBoost: 15,
  },
  {
    id: "blockchain-roulette",
    name: "Blockchain Roulette",
    description: "Smart contract powered roulette with provably fair outcomes",
    image: "/placeholder.svg?height=200&width=400",
    luckBoost: 12,
  },
  {
    id: "crypto-blackjack",
    name: "Crypto Blackjack",
    description: "Beat the dealer with blockchain odds and transparent card shuffling",
    image: "/placeholder.svg?height=200&width=400",
    luckBoost: 10,
  },
]
