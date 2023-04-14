import prisma from '../libs/prismadb';

export default async function getCurrentListings() {
    try{
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listings;
    }catch(error: any){
        throw new Error(error);
    }
}