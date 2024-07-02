import Link from "next/link";

export default function AdminPage() {
    return (
        <div>
            <div className="w-full flex flex-wrap">
                <Link href="/admin" className="w-1/2 lg:w-1/6 p-2">
                    <div className="shadow p-3">
                        <h3 className="texl-md font-bold">Articles</h3> 
                        124
                    </div>
                </Link>
                <Link href="/admin/users" className="w-1/2 lg:w-1/6 p-2">
                    <div className="shadow p-3">
                        <h3 className="texl-md font-bold">Users</h3> 
                        546
                    </div>
                </Link>
                <Link href="/admin" className="w-1/2 lg:w-1/6 p-2">
                    <div className="shadow p-3">
                        <h3 className="texl-md font-bold">Writers</h3> 
                        204
                    </div>
                </Link>  
                <Link href="/admin/topics" className="w-1/2 lg:w-1/6 p-2">
                    <div className="shadow p-3">
                        <h3 className="texl-md font-bold">Tags</h3> 
                        204
                    </div>
                </Link>
                <Link href="/admin/subjects" className="w-1/2 lg:w-1/6 p-2">
                    <div className="shadow p-3">
                        <h3 className="texl-md font-bold">Subjects</h3> 
                        5
                    </div>
                </Link>
                <Link href="/admin" className="w-1/2 lg:w-1/6 p-2">
                    <div className="shadow p-3">
                        <h3 className="texl-md font-bold">Issues</h3> 
                        5
                    </div>
                </Link>
            </div>
        </div>
    )
}