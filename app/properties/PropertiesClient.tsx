"use client";

import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, safeListings } from "../types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
  listings: safeListings[];
  currentUser?: SafeUser | null;
}
const PropertiesClient: React.FC<TripsClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteingId, setDeleteingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeleteingId(id);
    axios
      .delete(`/api/listings/${id}`)
      .then(() => { 
        toast.success("Listing Deleted");
        router.refresh();
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setDeleteingId("");
      });
  }, [router]);
  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your propeties."
      />
      <div className="mt-10 grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gird-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deleteingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
            />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
