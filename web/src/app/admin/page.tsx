'use client'

import Link from "next/link"

export default function AdminHomePage() {
    return <div>
    <h1>Admin home page</h1>
    <Link href="admin/create">Create</Link>
    <Link href="admin/products">View products</Link>
    </div>
}