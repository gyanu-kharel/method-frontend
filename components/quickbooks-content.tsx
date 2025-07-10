"use client"

import { useState } from "react"
import { RefreshCw, CheckCircle, AlertCircle, FolderSyncIcon as Sync, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export function QuickBooksContent() {
  const [isConnected, setIsConnected] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState("2 minutes ago")
  const { toast } = useToast()

  const handleSync = async () => {
    setIsSyncing(true)

    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)
      setLastSync("Just now")
      toast({
        title: "Sync Complete",
        description: "Successfully synced with QuickBooks Online",
      })
    }, 3000)
  }

  const handleConnect = () => {
    // Simulate OAuth connection
    toast({
      title: "Connecting to QuickBooks",
      description: "Redirecting to QuickBooks authorization...",
    })

    setTimeout(() => {
      setIsConnected(true)
      toast({
        title: "Connected Successfully",
        description: "Your QuickBooks account is now connected",
      })
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    toast({
      title: "Disconnected",
      description: "QuickBooks integration has been disabled",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QuickBooks Integration</h1>
          <p className="text-muted-foreground">Sync your invoices and clients with QuickBooks Online.</p>
        </div>
        {isConnected ? (
          <Button onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Sync className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        ) : (
          <Button onClick={handleConnect}>Connect to QuickBooks</Button>
        )}
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Connection Status
            {isConnected ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertCircle className="mr-1 h-3 w-3" />
                Disconnected
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {isConnected
              ? `Last synchronized ${lastSync}`
              : "Connect your QuickBooks account to enable automatic syncing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Company: Acme Business Solutions</span>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
              {isSyncing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Syncing data...</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Not Connected</h3>
              <p className="text-muted-foreground mb-4">
                Connect your QuickBooks Online account to automatically sync invoices, clients, and payments.
              </p>
              <Button onClick={handleConnect}>Connect QuickBooks Account</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sync Statistics */}
      {isConnected && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Synced Invoices</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,429</div>
              <p className="text-xs text-muted-foreground">All invoices synced</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Synced Clients</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">All clients synced</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">Excellent sync rate</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sync Settings */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Sync Settings
            </CardTitle>
            <CardDescription>Configure how data is synchronized with QuickBooks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto Sync</h4>
                <p className="text-sm text-muted-foreground">Automatically sync data every hour</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sync Invoices</h4>
                <p className="text-sm text-muted-foreground">Sync invoice data with QuickBooks</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sync Clients</h4>
                <p className="text-sm text-muted-foreground">Sync client information with QuickBooks</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sync Payments</h4>
                <p className="text-sm text-muted-foreground">Sync payment records with QuickBooks</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
