export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "Tienda — Productos Cosméticos",
  description:
    "Compra online los productos cosméticos recomendados por Forma y Línea Ciudad Real con envío a domicilio.",
};

export const revalidate = 60;

async function getProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <div className="pt-20">
      <section className="bg-[var(--bg-deep)] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Nuestra selección
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">Tienda</h1>
          <p className="text-body text-[var(--text-soft)] mt-4">
            Productos cosméticos seleccionados por nuestros especialistas. Envío a domicilio en
            48-72 horas.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-mute)] text-lg">
                Próximamente nuestra selección de productos.
              </p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </div>
  );
}
