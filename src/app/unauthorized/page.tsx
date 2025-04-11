import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-gray-700 mb-4">
            You do not have permission to access this page. This area requires specific privileges that your account does not have.
          </p>
          <p className="text-gray-600 text-sm">
            If you believe this is an error, please contact the administrator.
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}