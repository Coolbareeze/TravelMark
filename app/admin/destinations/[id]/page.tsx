import { notFound } from "next/navigation";
import { DestinationForm } from "@/components/admin/DestinationForm";
import { getDestinations } from "@/lib/data";

export default async function EditDestinationPage({ params }: { params: { id: string } }) {
  const destinations = await getDestinations();
  const destination = destinations.find((d) => d.id === params.id);
  if (!destination) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Edit Destination</h1>
      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-8">
        <DestinationForm initial={destination} />
      </div>
    </div>
  );
}
