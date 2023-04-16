import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentuser";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.redirect("/login");
    }

    const {reservationId} = params;

    if(!reservationId) {
        throw new Error("Invalid ID")
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},{listing: {userId: currentUser.id}}
            ]
        }
    })

    return NextResponse.json(reservation)
}
