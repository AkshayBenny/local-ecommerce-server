"use client"

import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function AdminViewAllProductsPage() {
    const [products, setProducts] = useState<any>([])

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/product/all")
                
                if (response.status === 200) {
                    setProducts(response.data)
                }
            } catch (error:any) {
                console.log(error.message)
            }
        }

        fetchProducts()
    },[])
    return <div>
        <h1>All products</h1>
        <div className="flex flex-col gap-3">
            {products.length > 0 ? products.map((product:any)=>{
                return <div className="border border-black flex gap-3 justify-start">
                    <Image src={product?.image} alt={`${product.name}`} width={60} height={60}/>
                    <div className="flex flex-col gap-2">
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                </div>
            }): <div>No products</div>}
        </div>
    </div>
}