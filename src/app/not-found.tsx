import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

