'use client';

import { useEffect, useState, useRef  } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';

const ConfirmPage: React.FC = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true); 
  const [dialogMessage, setDialogMessage] = useState('Đang xác thực tài khoản của bạn...');
  const [loading, setLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return; 
    isFetched.current = true; 

    const { searchParams } = new URL(window.location.href);
    const token = searchParams.get('token');

    if (token && !isConfirmed) {
      fetch(`/api/auth/confirm?token=${token}`)
        .then(response => response.json())
        .then(data => {

          if (data.code === 1000) {
            setDialogMessage('Tài khoản của bạn đã được xác thực!');
            setIsConfirmed(true);
          } else {
            setDialogMessage(data.message || 'Token xác nhận không hợp lệ.');
          }
        })
        .catch(error => {
          console.error('Lỗi khi gọi API xác thực:', error);
          setDialogMessage('Có lỗi xảy ra, vui lòng thử lại.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDialogMessage('Không tìm thấy token xác nhận.');
      setLoading(false);
    }
  }, [isConfirmed]);

  const handleClose = () => {
    setIsDialogOpen(false);
    router.push('/login');
  };

  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-bold text-2xl">Xác nhận tài khoản</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className='text-center my-3'>

              {loading ? ( 
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xác thực, vui lòng chờ...
                </>
              ): (
                dialogMessage
              )}
              
            </AlertDialogDescription>
          {!loading && (
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleClose}>OK</AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
export default ConfirmPage;

