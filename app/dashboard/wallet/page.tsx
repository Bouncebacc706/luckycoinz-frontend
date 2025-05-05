import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Clock, Copy, ExternalLink, RefreshCw, Zap } from "lucide-react"

export default function WalletPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="text-muted-foreground">Manage your funds and transactions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Your current balance and recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col items-center justify-center rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                <div className="text-sm font-medium text-muted-foreground">Available Balance</div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">1,250</span>
                  <span className="ml-2 text-xl text-muted-foreground">LUCK</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">≈ $125.00 USD</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button className="flex-1 gap-2 bg-green-500 hover:bg-green-600">
                  <ArrowDownLeft className="h-4 w-4" />
                  Deposit
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  Withdraw
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Swap
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet Address</CardTitle>
              <CardDescription>Your blockchain wallet details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-muted-foreground">Wallet Address</div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="mt-1 font-mono text-xs">0x7F5E...8A3D</div>
                </div>

                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-sm font-medium">View on Explorer</div>
                    <div className="text-xs text-muted-foreground">Check your transactions</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent deposits, withdrawals, and game transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                <TabsTrigger value="games">Games</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <TransactionTable transactions={allTransactions} />
              </TabsContent>
              <TabsContent value="deposits" className="mt-4">
                <TransactionTable transactions={allTransactions.filter((t) => t.type === "deposit")} />
              </TabsContent>
              <TabsContent value="withdrawals" className="mt-4">
                <TransactionTable transactions={allTransactions.filter((t) => t.type === "withdrawal")} />
              </TabsContent>
              <TabsContent value="games" className="mt-4">
                <TransactionTable transactions={allTransactions.filter((t) => t.type === "game")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "game"
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  description: string
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
        <div className="col-span-5">Transaction</div>
        <div className="col-span-2 text-right">Amount</div>
        <div className="col-span-3 text-right">Date</div>
        <div className="col-span-2 text-right">Status</div>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    transaction.type === "deposit"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                      : transaction.type === "withdrawal"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                  }`}
                >
                  {transaction.type === "deposit" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : transaction.type === "withdrawal" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {transaction.type === "deposit"
                      ? "Deposit"
                      : transaction.type === "withdrawal"
                        ? "Withdrawal"
                        : "Game Transaction"}
                  </div>
                  <div className="text-xs text-muted-foreground">{transaction.description}</div>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end font-mono font-medium">
              {transaction.type === "deposit" ? "+" : transaction.type === "withdrawal" ? "-" : ""}
              {transaction.amount} LUCK
            </div>
            <div className="col-span-3 flex items-center justify-end text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {transaction.date}
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "default"
                    : transaction.status === "pending"
                      ? "outline"
                      : "destructive"
                }
                className={
                  transaction.status === "completed"
                    ? "bg-green-500"
                    : transaction.status === "pending"
                      ? "border-yellow-500 text-yellow-500"
                      : ""
                }
              >
                {transaction.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const allTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "deposit",
    amount: 500,
    status: "completed",
    date: "Today, 10:24 AM",
    description: "Deposit from Ethereum",
  },
  {
    id: "tx2",
    type: "game",
    amount: 25,
    status: "completed",
    date: "Today, 11:15 AM",
    description: "Lucky Slots win",
  },
  {
    id: "tx3",
    type: "game",
    amount: 10,
    status: "completed",
    date: "Today, 12:30 PM",
    description: "Blockchain Roulette loss",
  },
  {
    id: "tx4",
    type: "withdrawal",
    amount: 200,
    status: "pending",
    date: "Today, 2:45 PM",
    description: "Withdrawal to Ethereum",
  },
  {
    id: "tx5",
    type: "game",
    amount: 50,
    status: "completed",
    date: "Yesterday, 3:20 PM",
    description: "Crypto Blackjack win",
  },
  {
    id: "tx6",
    type: "deposit",
    amount: 300,
    status: "completed",
    date: "Yesterday, 5:15 PM",
    description: "Deposit from Bitcoin",
  },
  {
    id: "tx7",
    type: "withdrawal",
    amount: 100,
    status: "failed",
    date: "Yesterday, 7:30 PM",
    description: "Withdrawal to Bitcoin",
  },
  {
    id: "tx8",
    type: "game",
    amount: 75,
    status: "completed",
    date: "2 days ago, 9:10 AM",
    description: "Fortune Wheel win",
  },
]
