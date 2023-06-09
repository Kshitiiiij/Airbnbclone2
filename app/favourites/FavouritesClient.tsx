"use client";

import  Container  from "../components/Container";
import { SafeUser, safeListings } from "../types";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";

interface FavouritesClientProps {
  listings: safeListings[];
  currentUser?: SafeUser | null;
}
const FavouritesClient:React.FC<FavouritesClientProps> = ({listings, currentUser}) => {
  return (
    <Container >
        <Heading
            title="Favourites"
            subtitle="Your favourite destinations"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
                <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                />
            ))}
        </div>
    </Container>
  )
};

export default FavouritesClient;
