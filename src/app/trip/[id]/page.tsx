import { notFound } from "next/navigation";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { ItineraryOutput } from "@/lib/ai";
import { TripDetailView } from "./TripDetailView";

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [trip] = await db.select().from(trips).where(eq(trips.id, id)).limit(1);
  if (!trip) notFound();
  return (
    <TripDetailView
      trip={{
        id: trip.id,
        origin: trip.origin,
        destination: trip.destination,
        startDate: trip.startDate ?? undefined,
        days: trip.days,
        travelers: trip.travelers,
        budget: trip.budget,
        travelMode: trip.travelMode,
        travelStyle: trip.travelStyle,
        itinerary: (trip.itineraryJson as ItineraryOutput) ?? null,
        createdAt: trip.createdAt.toISOString(),
      }}
    />
  );
}
