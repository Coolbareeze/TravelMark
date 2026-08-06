import { PackageForm } from "@/components/admin/PackageForm";

export default function NewPackagePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Add Package</h1>
      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-8">
        <PackageForm />
      </div>
    </div>
  );
}
