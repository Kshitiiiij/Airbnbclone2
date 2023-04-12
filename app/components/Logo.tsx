'use client'

import Image from "next/image"
import {useRouter} from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        
        <Image
        onClick={() => (router.push('/'))}
        alt="Air BnB Logo"
        className="hidden md:block cursor-pointer"
        height={70}
        width={70}
        src='/images/Logo.png'
        />
    )
}

export default Logo