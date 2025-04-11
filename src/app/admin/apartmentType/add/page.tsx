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
import { useApartmentTypeForm } from "@/hooks/useApartmentTypeForm"

const AddApartmentTypePage: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()

  const { name, isLoading, error, isSuccess, handleChange, handleSubmit } = useApartmentTypeForm({
    onSuccess: () => {},
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Apartment type has been added successfully.",
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
                router.push("/admin/apartmentType/add")
                window.location.reload()
              }}
            >
              Add New
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push("/admin/apartmentType")}
            >
              Go to Apartment Types
            </Button>
          </div>
        ),
      })

      // Auto-redirect after 10 seconds
      const timeout = setTimeout(() => {
        router.push("/admin/apartmentType")
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
            href="/admin/apartmentType"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apartment Types
          </Link>
        </div>
        <Card className="backdrop-blur-sm bg-white/80 rounded-xl shadow-lg overflow-hidden border border-sky-100">
          <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <CardTitle className="text-2xl font-bold">Add New Apartment Type</CardTitle>
            <CardDescription className="text-sky-100">
              Create a new apartment type for your property listings
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Type Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Studio, One Bedroom, Penthouse"
                  required
                  value={name}
                  onChange={handleChange}
                  aria-describedby="name-description"
                />
                <p id="name-description" className="text-sm text-muted-foreground">
                  Enter a descriptive name for this apartment type
                </p>
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
                  "Add Apartment Type"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddApartmentTypePage

