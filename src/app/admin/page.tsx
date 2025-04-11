import { Activity, ArrowUpRight, Building, CreditCard, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


// Sample data for the dashboard
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
    description: "Monthly revenue",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+10.3%",
    icon: Users,
    description: "Active this month",
  },
  {
    title: "Apartments",
    value: "432",
    change: "+5.2%",
    icon: Building,
    description: "Total listings",
  },
  {
    title: "Transactions",
    value: "1,293",
    change: "+12.5%",
    icon: CreditCard,
    description: "This month",
  },
]

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", date: "2 hours ago" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", date: "5 hours ago" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", status: "Inactive", date: "1 day ago" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", status: "Active", date: "2 days ago" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", status: "Pending", date: "3 days ago" },
]

const recentApartments = [
  { id: 1, name: "Luxury Penthouse", type: "Penthouse", status: "Available", price: "$3,500/mo" },
  { id: 2, name: "Downtown Studio", type: "Studio", status: "Rented", price: "$1,200/mo" },
  { id: 3, name: "Garden Apartment", type: "2 Bedroom", status: "Available", price: "$1,800/mo" },
  { id: 4, name: "Modern Loft", type: "Loft", status: "Maintenance", price: "$2,100/mo" },
  { id: 5, name: "Riverside Condo", type: "3 Bedroom", status: "Available", price: "$2,800/mo" },
]

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      {/* <AdminSidebar /> */}
      <SidebarInset className="bg-background">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Download Report
              </Button>
              <Button size="sm">
                <Activity className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <div className="h-8 w-8 rounded-none bg-background p-1.5 shadow-sm border border-border/50">
                        <stat.icon className="h-full w-full text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                      <div className="mt-2 flex items-center text-xs font-medium">
                        <span
                          className={`flex items-center ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                        >
                          {stat.change}
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </span>
                        <span className="text-muted-foreground ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>{recentUsers.length} users registered recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Status</div>
                        <div>Joined</div>
                      </div>
                      <div className="space-y-2">
                        {recentUsers.map((user) => (
                          <div
                            key={user.id}
                            className="grid grid-cols-4 items-center gap-1 rounded-none border border-border/50 p-2 text-sm"
                          >
                            <div className="font-medium">{user.name}</div>
                            <div className="text-muted-foreground">{user.email}</div>
                            <div>
                              <span
                                className={`inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-semibold ${
                                  user.status === "Active"
                                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                                    : user.status === "Inactive"
                                      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
                                      : "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400"
                                }`}
                              >
                                {user.status}
                              </span>
                            </div>
                            <div className="text-muted-foreground">{user.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Users
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Apartments</CardTitle>
                    <CardDescription>{recentApartments.length} apartments listed recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Status</div>
                        <div>Price</div>
                      </div>
                      <div className="space-y-2">
                        {recentApartments.map((apt) => (
                          <div
                            key={apt.id}
                            className="grid grid-cols-4 items-center gap-1 rounded-none border border-border/50 p-2 text-sm"
                          >
                            <div className="font-medium">{apt.name}</div>
                            <div className="text-muted-foreground">{apt.type}</div>
                            <div>
                              <span
                                className={`inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-semibold ${
                                  apt.status === "Available"
                                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                                    : apt.status === "Rented"
                                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
                                      : "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400"
                                }`}
                              >
                                {apt.status}
                              </span>
                            </div>
                            <div className="text-muted-foreground">{apt.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Apartments
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="mr-2 h-4 w-4" />
                      Add New Apartment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Server Uptime</div>
                          <div className="text-right text-muted-foreground">99.9%</div>
                        </div>
                        <div className="h-2 w-full bg-muted">
                          <div className="h-full w-[99.9%] bg-gradient-to-r from-rose-500 to-pink-600" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Database Performance</div>
                          <div className="text-right text-muted-foreground">92%</div>
                        </div>
                        <div className="h-2 w-full bg-muted">
                          <div className="h-full w-[92%] bg-gradient-to-r from-rose-500 to-pink-600" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">Storage Usage</div>
                          <div className="text-right text-muted-foreground">68%</div>
                        </div>
                        <div className="h-2 w-full bg-muted">
                          <div className="h-full w-[68%] bg-gradient-to-r from-rose-500 to-pink-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="h-[400px] flex items-center justify-center border border-dashed">
              <div className="text-center">
                <h3 className="text-lg font-medium">Analytics Content</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This tab would contain detailed analytics and charts
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="h-[400px] flex items-center justify-center border border-dashed">
              <div className="text-center">
                <h3 className="text-lg font-medium">Reports Content</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This tab would contain generated reports and exports
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="notifications"
              className="h-[400px] flex items-center justify-center border border-dashed"
            >
              <div className="text-center">
                <h3 className="text-lg font-medium">Notifications Content</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This tab would contain system notifications and alerts
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

