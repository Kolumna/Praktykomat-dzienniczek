import Card from "../components/Card";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center h-[calc(100vh-64px)]">
      <Card className="w-auto">
        <h1 className="text-primary font-black text-6xl w-full text-center">404</h1>
        <span>Strona nie została znaleziona 😥</span>
      </Card>
    </section>
  );
}
