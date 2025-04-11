'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   setError('')

  //   // Simulate API call
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 2000))
  //     // If the API call is successful, set success to true
  //     setSuccess(true)
  //   } catch (err) {
  //     setError('An error occurred. Please try again.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)
  
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
  
      if (response.ok) {
        setSuccess(true)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'An error occurred. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <CardHeader  className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we will send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full  bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <p className="text-lg font-semibold">Check your email</p>
              <p className="text-gray-600">
                We have sent a password reset link to {email}. Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
            <Link  href="/login">
            <Button variant="link" className="text-sm">
            Back to Login <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage;