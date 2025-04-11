"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, CheckCircle, Loader2, XCircle } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useUsersForm } from "@/hooks/useUsersForm"

const AddUsersPage = () => {
  const router = useRouter()
  const { toast } = useToast()

  const { formData, isLoading, error, isSuccess, handleChange, handleSubmit } = useUsersForm({
    onSuccess: () => {},
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "User has been added successfully.",
        variant: "default",
        className: "bg-background border-green-500 dark:border-green-600",
        icon: <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />,
        duration: 5000,
        action: (
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100 text-gray-800 border-gray-300 hover:border-gray-400"
              onClick={() => {
                router.push("/admin/users/add")
                window.location.reload()
              }}
            >
              Add New
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push("/admin/users")}
            >
              Go to Users
            </Button>
          </div>
        ),
      })

      // Auto-redirect after 10 seconds
      const timeout = setTimeout(() => {
        router.push("/admin/users")
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [isSuccess, router, toast])

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        className: "bg-background border-red-500 dark:border-red-600",
        icon: <XCircle className="h-10 w-10 text-red-500 dark:text-red-400" />,
        duration: 5000,
      })
    }
  }, [error, toast])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white rounded-xl">
      <div className="container px-4 md:px-8 py-8">
        <div className="mb-4">
          <Link
            href="/admin/users"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </div>
        <Card className="backdrop-blur-sm bg-white/80 rounded-xl shadow-lg overflow-hidden border border-sky-100">
          <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <CardTitle className="text-2xl font-bold">Add New User</CardTitle>
            <CardDescription className="text-sky-100">Create a new user account</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  required
                  value={"email" in formData ? formData.email : ""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passWord">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="passWord"
                    name="passWord"
                    type="passWord"
                    placeholder="••••••••"
                    required
                    value={formData.passWord}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  name="userName"
                  placeholder="johndoe"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white transition-all duration-300 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add User"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddUsersPage

