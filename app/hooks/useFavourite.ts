'use client'

import axios from "axios"
import {useRouter} from 'next/navigation'
import { useCallback, useMemo } from "react"
import {toast} from 'react-hot-toast'
import { SafeUser } from "../types"
import useLoginModal from "./useLoginModal"

interface IuseFavourite {
    listingId: string
    currentUser?: SafeUser | null

}

const useFavourite = ({listingId, currentUser}: IuseFavourite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavourited = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if(!currentUser) {
            loginModal.onOpen()
            return
        }
        try{
            let request
            if(hasFavourited){
                request = () => axios.delete(`/api/favourites/${listingId}`)
            }else {
                request = () => axios.post(`/api/favourites/${listingId}`)
                
            }
            await request()
            router.refresh()
            toast.success('Favourite updated')
        }   catch (error) {
            toast.error('Error updating favourite')
        }
    }, [currentUser, hasFavourited, listingId, loginModal, router])

    
    return {
        hasFavourited,
        toggleFavourite
    }
}

export default useFavourite