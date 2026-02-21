import SumForm from "@/ui/sum-form";
import ResultList from "@/ui/result-list";
import { PageProps } from "@/app/lib/types";

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page ?? "1");

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DB rows */}
        <ResultList page={page} />

        {/* Form */}
        <div className="bg-white p-6 rounded shadow">
          <SumForm />
        </div>
      </div>
    </div>
  );
}
