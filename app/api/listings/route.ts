import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentuser";
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    price,
    category,
    imageSrc,
    roomCount,
    bathroomCount,
    guestCount,
    location,
  } = body;

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      category,
      imageSrc,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      userId: currentUser.id,
    },
  });

    return NextResponse.json(listing);
}
