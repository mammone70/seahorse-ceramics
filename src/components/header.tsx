import Link from "next/link";
import NavMenu from "./nav-menu";
// import { MenuIcon } from "lucide-react";

export default async function Header() {
    return (
        <header className="py-2 border-b border-muted-foreground/15">
            <div className="container px-4">
                <div className="flex justify-between items-center align-bottom">
                    <div className="inline-flex items-center justify-between align-bottom">
                        <div>
                            <Link href="/" className="font-bold text-xl">
                                Seahorse Ceramics Logo
                            </Link>
                        </div>
                    </div>
                    <div>
                        <NavMenu/>
                    </div>
                </div>
            </div>
        </header>
    )
}
