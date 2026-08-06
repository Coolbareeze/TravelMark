import { notFound } from "next/navigation";
import { PackageForm } from "@/components/admin/PackageForm";
import { getPackages } from "@/lib/data";

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const packages = await getPackages();
  const pkg = packages.find((p) => p.id === params.id);
  if (!pkg) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Edit Package</h1>
      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-8">
        <PackageForm initial={pkg} />
      </div>
    </div>
  );
}
