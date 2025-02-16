"use client"

import {
    Dialog,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog"

import { useRouter } from "next/navigation"

export function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog 
            defaultOpen={true} 
            open={true} 
            onOpenChange={handleOpenChange}
        >
            <DialogOverlay className="bg-transparent">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <DialogContent className="overflow-scroll max-w-3xl">
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}