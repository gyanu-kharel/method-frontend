"use client"

import { useState } from "react"
import { Plus, TrendingUp, Users, FileText, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateInvoiceDialog } from "@/components/create-invoice-dialog"

const stats = [
  {
    title: "Total Clients",
    value: "248",
    change: "+12%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Invoices Created",
    value: "1,429",
    change: "+8%",
    icon: FileText,
    trend: "up",
  },
  {
    title: "Pending Invoices",
    value: "23",
    change: "-4%",
    icon: Clock,
    trend: "down",
  },
  {
    title: "Synced with QuickBooks",
    value: "98.5%",
    change: "Last sync: 2 min ago",
    icon: CheckCircle,
    trend: "neutral",
  },
]

const recentInvoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: "$2,450.00",
    status: "Paid",
    date: "2024-01-15",
    dueDate: "2024-02-15",
  },
  {
    id: "INV-002",
    client: "TechStart Inc.",
    amount: "$1,200.00",
    status: "Pending",
    date: "2024-01-14",
    dueDate: "2024-02-14",
  },
  {
    id: "INV-003",
    client: "Global Solutions",
    amount: "$3,750.00",
    status: "Overdue",
    date: "2024-01-10",
    dueDate: "2024-02-10",
  },
  {
    id: "INV-004",
    client: "Creative Agency",
    amount: "$890.00",
    status: "Draft",
    date: "2024-01-12",
    dueDate: "2024-02-12",
  },
  {
    id: "INV-005",
    client: "Retail Plus",
    amount: "$1,650.00",
    status: "Paid",
    date: "2024-01-08",
    dueDate: "2024-02-08",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Overdue":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "Draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export function DashboardContent() {
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
        </div>
        <Button onClick={() => setIsCreateInvoiceOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.trend === "up" && (
                  <span className="text-green-600">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                )}
                {stat.trend === "down" && <span className="text-red-600">{stat.change}</span>}
                {stat.trend === "neutral" && <span className="text-muted-foreground">{stat.change}</span>}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest invoices and their current status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell className="font-medium">{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateInvoiceDialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen} />
    </div>
  )
}
