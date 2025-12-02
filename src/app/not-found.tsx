import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-4xl font-bold text-orange-600 mb-4">404</h2>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            <p className="text-gray-500 mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
                Return Home
            </Link>
        </div>
    )
}
