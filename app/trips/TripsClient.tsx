"use client";

import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, safeReservations } from "../types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
  reservations: safeReservations[];
  currentUser?: SafeUser | null;
}
const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteingId, setDeleteingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeleteingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => { 
        toast.success("Reservation cancelled");
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
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gird-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
            <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
            />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
