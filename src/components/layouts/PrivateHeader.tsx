import Link from "next/link"
import {
        NavigationMenu,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Setting from "./Setting"
import { auth } from '@/auth'

export default async function PrivateHeader() {
    const session = await auth()
    if(!session?.user?.email) throw new Error("不正なリクエストです")

    return (
        <header className="border-b bg-green-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/dashboard" className="font-bold text-xl">
                                管理ページ
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Setting session={session}></Setting>
            </div>
        </header>
    )
}
