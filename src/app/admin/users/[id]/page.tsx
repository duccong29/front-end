"use client"
import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, CheckCircle, Loader2, XCircle } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useUsersForm } from "@/hooks/useUsersForm"

const EditUsersPage = () => {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  const { toast } = useToast()

  const { formData, isLoading, error, isSuccess, handleChange, handleSubmit } = useUsersForm({
    userId,
    onSuccess: () => {},
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "User has been updated successfully.",
        variant: "default",
        className: "bg-background border-green-500 dark:border-green-600",
        icon: <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />,
        duration: 5000,
        action: (
          <Button
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push("/admin/users")}
          >
            Go to Users
          </Button>
        ),
      })

      // Auto-redirect after 5 seconds
      const timeout = setTimeout(() => {
        router.push("/admin/users")
      }, 5000)

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
            <CardTitle className="text-2xl font-bold">Edit User</CardTitle>
            <CardDescription className="text-sky-100">Update user account information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading && !error ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
                <span className="ml-2 text-sky-700">Loading user data...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* No email field in edit mode */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passWord">
                    passWord <span className="text-sm text-gray-500">(Leave blank to keep current)</span>
                    </Label>
                    <Input
                      id="passWord"
                      name="passWord"
                      type="password"
                      placeholder="••••••••"
                      value={formData.passWord}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
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
                      Updating...
                    </>
                  ) : (
                    "Update User"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditUsersPage

