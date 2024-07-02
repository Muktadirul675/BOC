import { auth } from "@/auth";
import Actions from "@/components/profile/Actions";
import Info from "@/components/profile/Info";
import Newsletter from "@/components/profile/Newsletter";
import Panel from "@/components/profile/Panel";
import Bookmarks from "@/components/profile/sections/Bookmarks";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if(session){
        return (
            <div className="w-full flex flex-col md:lg:xl:flex-row">
                <div className="md:lg:xl:w-2/6 px-3 lg:xl:p-3">
                    <Info />
                    <Panel/>
                    <div className="hidden lg:xl:block">
                        <Newsletter />
                    </div>
                    <div className="hidden lg:xl:block">
                        <Actions />
                    </div>
                </div>
                <div className="md:lg:xl:w-4/6 px-3 lg:xl:p-3">
                    <Bookmarks />
                    <div className="block lg:xl:hidden">
                        <Newsletter />
                        <Actions />
                    </div>
                </div>
            </div>
        )
    }else{
        redirect("/")
    }
}