'use client'

import Image from "next/image"
import {useRouter} from "next/router"

const Logo = () => {
    return (
        <Image
        alt="Air BnB Logo"
        className="hidden md:block cursor-pointer"
        height={70}
        width={70}
        src='/images/Logo.png'
        />
    )
}

export default Logo