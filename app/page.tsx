import Navbar from "@/components/navbar";

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Navbar />
      <main>
        <h1 className="text-center text-xl my-3">Hello</h1>
      </main>
    </>
  );
}
