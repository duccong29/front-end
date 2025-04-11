'use client'

import { useState, useEffect,FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'

const ResetPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({  password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const token = searchParams.get('token')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('')

    if (!token) {
      setError('Token không hợp lệ. Vui lòng thử lại.')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và mật khẩu xác nhận không khớp.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: formData.password }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.')
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Đặt Lại Mật Khẩu</CardTitle>
          <CardDescription className="text-center">
            Nhập mật khẩu mới của bạn bên dưới.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu mới</Label>
                <div className="relative">
                  <Input id="password" name="password" placeholder="Nhập mật khẩu mới"
                    type={showPassword ? "text" : "password"}  onChange={handleChange} required/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                      {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Input id="confirmPassword" name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} placeholder="Xác nhận lại mật khẩu"
                    onChange={handleChange} required/>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                      {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-indigo-600 hover:to-cyan-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}>
                {isLoading ? 'Đang gửi...' : 'Đặt lại mật khẩu'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <p className="text-lg font-semibold">Mật khẩu đã được đặt lại thành công!</p>
              <p className="text-gray-600">
                Bạn sẽ được chuyển về trang đăng nhập sau vài giây...
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login">
            <Button variant="link" className="text-sm">
              Quay lại Đăng nhập
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
export default ResetPasswordPage;
