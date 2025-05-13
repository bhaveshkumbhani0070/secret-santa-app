import UploadForm from "@/app/components/UploadForm";

export default function HomePage() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎅 Secret Santa Generator</h1>
      <UploadForm />
    </main>
  );
}
