import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentuser";
import prisma from '@/app/libs/prismadb';

interface Iparams{
    listingId?: string
}

export async function DELETE(request: Request, {params}: {params: Iparams}) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.error();
    }
    const {listingId} = params;

    if(!listingId){
        throw new Error('Listing id is required');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: user.id
        }
    })

    return NextResponse.json(listing);

}