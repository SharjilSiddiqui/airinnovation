import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-12">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-light">AIR Innovation</h3>

          <p className="mt-2 text-sm text-neutral-500">
            Interactive Architectural Experiences
          </p>
        </div>

        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} AIR Innovation.
        </p>
      </Container>
    </footer>
  );
}
