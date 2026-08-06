import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getDestinations } from "@/lib/data";
import { formatGBP } from "@/lib/utils";

export default async function AdminDestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Destinations</h1>
          <p className="mt-1 text-navy-600 dark:text-white/60">{destinations.length} destinations</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" /> Add Destination
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl2 bg-white shadow-soft dark:bg-navy-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy-900/8 bg-surface text-xs uppercase tracking-wider text-navy-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Region</th>
              <th className="px-5 py-3">From Price</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-900/8 dark:divide-white/10">
            {destinations.map((d) => (
              <tr key={d.id}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-navy-900 dark:text-white">{d.name}</p>
                  <p className="text-xs text-navy-500 dark:text-white/50">{d.country}</p>
                </td>
                <td className="px-5 py-4 text-navy-600 dark:text-white/60">{d.region}</td>
                <td className="px-5 py-4 font-semibold text-navy-900 dark:text-white">
                  {formatGBP(d.fromPrice)}
                </td>
                <td className="px-5 py-4">
                  {d.featured && <Star className="h-4 w-4 fill-gold-500 text-gold-500" />}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/destinations/${d.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-royal-600 hover:bg-royal-50 dark:hover:bg-royal-500/10"
                      aria-label={`Edit ${d.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton endpoint={`/api/admin/destinations/${d.id}`} itemLabel={d.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
