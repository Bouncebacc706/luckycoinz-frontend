"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Volume2, VolumeX, RefreshCw, ChevronUp, ChevronDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "🍉", "💎", "7️⃣", "🎰"]
const PAYOUTS = {
  "🍒🍒🍒": 5,
  "🍋🍋🍋": 10,
  "🍊🍊🍊": 15,
  "🍇🍇🍇": 20,
  "🍉🍉🍉": 25,
  "💎💎💎": 50,
  "7️⃣7️⃣7️⃣": 100,
  "🎰🎰🎰": 200,
}

export default function SlotMachinePage() {
  const [reels, setReels] = useState<string[][]>([
    [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]],
    [SYMBOLS[1], SYMBOLS[2], SYMBOLS[3]],
    [SYMBOLS[2], SYMBOLS[3], SYMBOLS[4]],
  ])
  const [spinning, setSpinning] = useState(false)
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [win, setWin] = useState(0)
  const [autoSpin, setAutoSpin] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showPaytable, setShowPaytable] = useState(false)

  const handleSpin = () => {
    if (balance < bet) {
      toast({
        title: "Insufficient balance",
        description: "Please deposit more funds or lower your bet.",
        variant: "destructive",
      })
      return
    }

    setSpinning(true)
    setBalance((prev) => prev - bet)
    setWin(0)

    // Simulate spinning animation
    const spinDuration = 2000
    const spinInterval = 100
    const iterations = spinDuration / spinInterval
    let currentIteration = 0

    const spinInterval1 = setInterval(() => {
      setReels((prev) => {
        const newReels = [...prev]
        newReels[0] = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ]
        return newReels
      })

      currentIteration++
      if (currentIteration >= iterations / 3) {
        clearInterval(spinInterval1)
      }
    }, spinInterval)

    const spinInterval2 = setInterval(() => {
      setReels((prev) => {
        const newReels = [...prev]
        newReels[1] = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ]
        return newReels
      })

      currentIteration++
      if (currentIteration >= (iterations * 2) / 3) {
        clearInterval(spinInterval2)
      }
    }, spinInterval)

    const spinInterval3 = setInterval(() => {
      setReels((prev) => {
        const newReels = [...prev]
        newReels[2] = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ]
        return newReels
      })

      currentIteration++
      if (currentIteration >= iterations) {
        clearInterval(spinInterval3)
        checkWin()
      }
    }, spinInterval)
  }

  const checkWin = () => {
    // Check middle row for win
    const middleRow = [reels[0][1], reels[1][1], reels[2][1]]
    const middleRowString = middleRow.join("")

    // Check if we have a winning combination
    let winAmount = 0
    Object.entries(PAYOUTS).forEach(([combination, multiplier]) => {
      if (middleRowString === combination) {
        winAmount = bet * multiplier
      }
    })

    // Check for partial matches (2 of a kind)
    if (winAmount === 0) {
      if (middleRow[0] === middleRow[1] || middleRow[1] === middleRow[2]) {
        winAmount = bet * 2
      }
    }

    if (winAmount > 0) {
      setWin(winAmount)
      setBalance((prev) => prev + winAmount)

      if (!muted) {
        // Play win sound
        const audio = new Audio("/win-sound.mp3")
        audio.play().catch((e) => console.log("Audio play failed:", e))
      }

      toast({
        title: "You won!",
        description: `Congratulations! You won ${winAmount} LUCK tokens!`,
        variant: "default",
      })
    }

    setSpinning(false)

    // Continue auto-spin if enabled
    if (autoSpin && balance >= bet) {
      setTimeout(() => {
        handleSpin()
      }, 1000)
    } else {
      setAutoSpin(false)
    }
  }

  const handleBetChange = (value: number[]) => {
    setBet(value[0])
  }

  const incrementBet = () => {
    setBet((prev) => Math.min(prev + 5, 100))
  }

  const decrementBet = () => {
    setBet((prev) => Math.max(prev - 5, 5))
  }

  const toggleAutoSpin = () => {
    if (!autoSpin && !spinning) {
      setAutoSpin(true)
      handleSpin()
    } else {
      setAutoSpin(false)
    }
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Lucky Slots</h1>
          <p className="text-muted-foreground">Spin to win with enhanced blockchain odds</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Slot Machine</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={toggleMute}>
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowPaytable(!showPaytable)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-lg border-4 border-green-500 bg-gradient-to-b from-gray-800 to-gray-900 p-4">
                {/* Slot machine display */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {reels.map((reel, reelIndex) => (
                    <div key={reelIndex} className="overflow-hidden rounded bg-black p-2">
                      <div className="flex flex-col items-center justify-center gap-2">
                        {reel.map((symbol, symbolIndex) => (
                          <div
                            key={symbolIndex}
                            className={`flex h-16 w-16 items-center justify-center rounded-md text-4xl ${
                              symbolIndex === 1 ? "bg-yellow-500/20" : "bg-gray-800"
                            }`}
                          >
                            {symbol}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Win line */}
                <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-yellow-500/50"></div>

                {/* Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementBet}
                      disabled={spinning || bet <= 5}
                      className="bg-gray-700 text-white hover:bg-gray-600"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1 text-white">
                      <span className="text-xs font-medium">BET</span>
                      <span className="font-mono font-bold">{bet}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementBet}
                      disabled={spinning || bet >= 100}
                      className="bg-gray-700 text-white hover:bg-gray-600"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={autoSpin ? "default" : "outline"}
                      size="sm"
                      onClick={toggleAutoSpin}
                      disabled={spinning && !autoSpin}
                      className={`${
                        autoSpin
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Auto
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleSpin}
                      disabled={spinning || balance < bet}
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      {spinning ? "Spinning..." : "SPIN"}
                      <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {showPaytable && (
                <div className="mt-4 rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Paytable</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {Object.entries(PAYOUTS).map(([combination, multiplier]) => (
                      <div key={combination} className="flex items-center justify-between rounded bg-muted p-2">
                        <div className="text-xl">{combination}</div>
                        <div className="font-mono font-bold text-green-500">x{multiplier}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Balance:</span>
                <Badge variant="outline" className="font-mono text-green-500">
                  {balance} LUCK
                </Badge>
              </div>
              {win > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Win:</span>
                  <Badge className="font-mono bg-green-500 text-white">+{win} LUCK</Badge>
                </div>
              )}
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Stats</CardTitle>
                <CardDescription>Your performance in Lucky Slots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Spins</span>
                    <span className="font-mono font-medium">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Win Rate</span>
                    <span className="font-mono font-medium text-green-500">32.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Biggest Win</span>
                    <span className="font-mono font-medium text-green-500">1,500 LUCK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Wagered</span>
                    <span className="font-mono font-medium">12,350 LUCK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Won</span>
                    <span className="font-mono font-medium text-green-500">13,275 LUCK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Net Profit</span>
                    <span className="font-mono font-medium text-green-500">+925 LUCK</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Luck Booster</CardTitle>
                <CardDescription>Increase your winning chances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Boost</span>
                    <Badge className="bg-green-500 text-white">+15%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Luck Points</span>
                      <span className="font-mono font-medium">750/1000</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-3/4 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Activate Luck Booster
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
