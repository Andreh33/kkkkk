import { PrismaClient, ServiceCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? "info@formaylinea.info";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin1234!";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", passwordHash },
    create: {
      email: adminEmail,
      name: "María José Requena",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created");

  // Services — Masajes
  const masajes = [
    {
      slug: "aroma-masaje",
      name: "Aroma Masaje",
      description:
        "Un viaje sensorial de profunda relajación. Aceites esenciales seleccionados envuelven tu cuerpo mientras técnicas de effleurage y petrissage liberan la tensión acumulada. Ideal para el estrés y la fatiga.",
      shortDesc: "Masaje aromático de cuerpo completo para liberar tensión y relajar profundamente.",
      category: ServiceCategory.MASAJE,
      priceMin: 6000,
      durationMin: 60,
    },
    {
      slug: "foot-massage-30",
      name: "Foot Massage (30 min)",
      description:
        "La reflexología podal activa los puntos de energía del pie para equilibrar órganos y sistemas de todo el cuerpo.",
      shortDesc: "Reflexología podal de 30 minutos.",
      category: ServiceCategory.MASAJE,
      priceMin: 4500,
      durationMin: 30,
    },
    {
      slug: "foot-massage-45",
      name: "Foot Massage (45 min)",
      description:
        "La reflexología podal activa los puntos de energía del pie para equilibrar órganos y sistemas de todo el cuerpo. Versión extendida para un trabajo más profundo.",
      shortDesc: "Reflexología podal de 45 minutos.",
      category: ServiceCategory.MASAJE,
      priceMin: 6000,
      durationMin: 45,
    },
    {
      slug: "masaje-4-manos",
      name: "Masaje a 4 Manos",
      description:
        "Dos terapeutas, cuatro manos, un solo ritmo. Esta experiencia de sincronía perfecta multiplica la sensación de bienestar y desconexión total.",
      shortDesc: "Experiencia única con dos terapeutas sincronizados.",
      category: ServiceCategory.MASAJE,
      priceMin: 15000,
      durationMin: 60,
    },
    {
      slug: "masaje-balinees-60",
      name: "Masaje Balinés (60 min)",
      description:
        "Originario de la isla de los dioses, combina acupresión, técnicas de masaje suave y aromaterapia con aceites tropicales.",
      shortDesc: "Masaje balinés de 60 minutos con aceites tropicales.",
      category: ServiceCategory.MASAJE,
      priceMin: 6000,
      durationMin: 60,
    },
    {
      slug: "masaje-balinees-90",
      name: "Masaje Balinés (90 min)",
      description:
        "Versión extendida del masaje balinés. Combina acupresión, técnicas de masaje suave y aromaterapia con aceites tropicales para un tratamiento más completo.",
      shortDesc: "Masaje balinés de 90 minutos, versión extendida.",
      category: ServiceCategory.MASAJE,
      priceMin: 9000,
      durationMin: 90,
    },
    {
      slug: "breves-delicias",
      name: "Breves Delicias",
      description:
        "El placer en formato exprés. Treinta minutos de masaje enfocado en las zonas de mayor tensión: cuello, hombros y espalda alta.",
      shortDesc: "Masaje exprés de 30 minutos en zonas de mayor tensión.",
      category: ServiceCategory.MASAJE,
      priceMin: 4500,
      durationMin: 30,
    },
    {
      slug: "masaje-pareja-60",
      name: "Him & Her — Masaje en Pareja (60 min)",
      description:
        "Compartid el bienestar. Dos cabinas contiguas, dos terapeutas, una experiencia íntima y renovadora.",
      shortDesc: "Masaje simultáneo para dos personas en cabinas contiguas.",
      category: ServiceCategory.MASAJE,
      priceMin: 15000,
      durationMin: 60,
    },
    {
      slug: "masaje-pareja-75",
      name: "Him & Her — Masaje en Pareja (75 min)",
      description:
        "Versión extendida del masaje en pareja. Dos cabinas contiguas, dos terapeutas, una experiencia íntima y renovadora.",
      shortDesc: "Masaje en pareja de 75 minutos.",
      category: ServiceCategory.MASAJE,
      priceMin: 17000,
      durationMin: 75,
    },
    {
      slug: "lomi-lomi-60",
      name: "Masaje Lomi-Lomi (60 min)",
      description:
        "La sagrada danza hawaiana del masaje. Movimientos largos y fluidos con los antebrazos imitan las olas del océano, disolviendo bloqueos físicos y emocionales.",
      shortDesc: "Masaje hawaiano con movimientos fluidos como las olas.",
      category: ServiceCategory.MASAJE,
      priceMin: 6000,
      durationMin: 60,
    },
    {
      slug: "lomi-lomi-90",
      name: "Masaje Lomi-Lomi (90 min)",
      description:
        "Versión extendida del lomi-lomi hawaiano. Movimientos largos y fluidos con los antebrazos para una experiencia de desconexión total.",
      shortDesc: "Lomi-lomi hawaiano de 90 minutos.",
      category: ServiceCategory.MASAJE,
      priceMin: 9000,
      durationMin: 90,
    },
    {
      slug: "thai-herbal",
      name: "Thai Herbal Masaje",
      description:
        "Bolsas de hierbas tailandesas calientes prensadas sobre el cuerpo. Lemongrass, cúrcuma y jengibre penetran en músculos y articulaciones, aliviando dolores y mejorando la circulación.",
      shortDesc: "Masaje con bolsas de hierbas tailandesas calientes.",
      category: ServiceCategory.MASAJE,
      priceMin: 12000,
      durationMin: 90,
    },
  ];

  for (const service of masajes) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: { ...service, bookable: true, active: true, images: [] },
    });
  }
  console.log(`✅ ${masajes.length} masajes created`);

  // Blog posts
  const posts = [
    {
      slug: "cuidados-de-la-piel-rutina-esencial",
      title: "Cuidados de la piel: la rutina esencial para una piel sana",
      excerpt:
        "Descubre los 5 pasos fundamentales de una rutina de skincare que realmente funciona, adaptada a tu tipo de piel.",
      author: "Forma y Línea",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2024-03-15"),
      coverImage: null,
      contentMdx: `<h2>¿Por qué necesitas una rutina de cuidado de la piel?</h2>
<p>Tu piel es el órgano más grande del cuerpo y, como todos los demás, necesita atención y cuidado constante. Una rutina bien establecida no solo mejora el aspecto de tu piel, sino que también la protege de agentes externos, retrasa el envejecimiento y previene problemas futuros.</p>
<p>En Forma y Línea llevamos más de 35 años trabajando con todo tipo de pieles. Hemos visto cómo pequeños gestos diarios marcan una diferencia enorme a largo plazo. Aquí te contamos los cinco pasos básicos que toda rutina eficaz debería incluir.</p>

<h2>Los 5 pasos fundamentales</h2>

<h3>1. Limpieza: el paso más importante</h3>
<p>La limpieza elimina el exceso de sebo, la suciedad, el maquillaje y los contaminantes que se acumulan durante el día. Sin este paso, el resto de productos no pueden penetrar correctamente.</p>
<ul>
<li><strong>Piel seca:</strong> usa un limpiador en leche o aceite que no elimine el manto lipídico.</li>
<li><strong>Piel grasa:</strong> un gel limpiador con ácido salicílico o zinc.</li>
<li><strong>Piel mixta:</strong> una espuma suave que equilibre sin resecar.</li>
</ul>
<p>Limpia siempre por la mañana (elimina lo que la piel ha segregado durante la noche) y por la noche (elimina el día).</p>

<h3>2. Tónico: reequilibra el pH</h3>
<p>El tónico prepara la piel para recibir el sérum y la hidratante, reequilibra el pH tras la limpieza y puede aportar hidratación extra. Aplícalo con un algodón o directamente con las manos, dando suaves palmaditas.</p>

<h3>3. Sérum: el tratamiento específico</h3>
<p>El sérum es el paso más activo de tu rutina. Su fórmula concentrada permite que los ingredientes activos penetren en capas más profundas de la piel:</p>
<ul>
<li><strong>Vitamina C:</strong> para manchas e iluminación.</li>
<li><strong>Retinol:</strong> para antienvejecimiento (solo por la noche).</li>
<li><strong>Ácido hialurónico:</strong> hidratación profunda.</li>
<li><strong>Niacinamida:</strong> poros, rojeces y sebo.</li>
</ul>

<h3>4. Hidratante: el escudo protector</h3>
<p>Incluso las pieles grasas necesitan hidratación. La falta de agua estimula la producción de más sebo. Elige una textura adecuada: crema rica para piel seca, gel o fluido ligero para piel grasa.</p>

<h3>5. Protección solar: el paso que más envejece si lo saltas</h3>
<p>El 80% del envejecimiento cutáneo prematuro es fotoenvejepiento. El SPF 30 mínimo (SPF 50 si te expones al sol) debe ser el último paso de tu rutina matutina, incluso en invierno y en días nublados.</p>

<h2>Errores comunes que sabotean tu piel</h2>
<ul>
<li><strong>Cambiar de productos constantemente:</strong> los ingredientes activos necesitan al menos 4-8 semanas para mostrar resultados.</li>
<li><strong>Mezclar activos incompatibles:</strong> nunca uses retinol con vitamina C en la misma rutina.</li>
<li><strong>Exfoliar en exceso:</strong> 1-2 veces por semana es suficiente. Más rompe la barrera cutánea.</li>
<li><strong>No limpiar por la noche:</strong> dormir con maquillaje oxida las células y tapa los poros.</li>
</ul>

<h2>¿Cuándo acudir a un profesional?</h2>
<p>Si tienes acné quístico, hiperpigmentación persistente, rojeces crónicas o quieres trabajar el antienvejecimiento de forma más intensiva, una consulta con un especialista en estética o medicina estética puede marcar la diferencia.</p>
<p>En Forma y Línea realizamos diagnósticos faciales gratuitos donde analizamos tu piel y diseñamos un plan personalizado. <a href="/contacto">Reserva tu diagnóstico facial</a> y da el primer paso hacia la piel que mereces.</p>`,
    },
    {
      slug: "por-que-los-masajes-ayudan-a-tus-musculos",
      title: "Por qué los masajes ayudan a tus músculos (y a tu mente)",
      excerpt:
        "Más allá de la relajación, los masajes tienen efectos fisiológicos profundos sobre tus músculos, tu sistema nervioso y tu calidad de vida.",
      author: "Forma y Línea",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2024-04-02"),
      coverImage: null,
      contentMdx: `<h2>El masaje va mucho más allá del bienestar momentáneo</h2>
<p>Cuando la mayoría de personas piensa en un masaje, imagina un rato agradable de relajación. Y aunque eso es cierto, la ciencia lleva décadas documentando los efectos fisiológicos reales que el masaje tiene sobre el cuerpo. En Forma y Línea, con más de 35 años de experiencia, hemos visto cómo tratamientos regulares transforman la calidad de vida de nuestras clientas.</p>

<h2>¿Qué ocurre en tus músculos durante un masaje?</h2>

<h3>Liberación de la tensión miofascial</h3>
<p>Los músculos crónicamente contraídos forman nudos (puntos gatillo o trigger points) donde el tejido se endurece y la circulación local disminuye. La presión manual del masaje rompe esas adherencias, permite que el tejido se hidrate de nuevo y restaura el rango de movimiento.</p>

<h3>Mejora de la circulación sanguínea y linfática</h3>
<p>Las maniobras de effleurage (deslizamiento) y petrissage (amasamiento) estimulan el flujo sanguíneo hacia los músculos, aportando más oxígeno y nutrientes. Al mismo tiempo, mejoran el drenaje linfático, eliminando metabolitos de desecho como el ácido láctico que causan el dolor post-ejercicio.</p>

<h3>Reducción de la inflamación</h3>
<p>Un estudio publicado en <em>Science Translational Medicine</em> demostró que el masaje reduce la producción de citocinas inflamatorias y activa mitocondrias musculares. El resultado práctico: menos dolor, más rápida recuperación.</p>

<h2>Los efectos sobre tu sistema nervioso</h2>

<h3>Reducción del cortisol</h3>
<p>El cortisol, la hormona del estrés, eleva la presión arterial, deteriora el sueño y afecta al sistema inmunitario cuando se mantiene crónicamente elevado. Varios estudios han medido descensos de cortisol del 30% tras una sesión de 45-60 minutos.</p>

<h3>Aumento de serotonina y dopamina</h3>
<p>Al mismo tiempo que cae el cortisol, suben los neurotransmisores del bienestar. Por eso al salir de un masaje no solo te sientes relajada físicamente, sino también de mejor humor.</p>

<h3>Mejora del sueño</h3>
<p>La serotonina es precursora de la melatonina (la hormona del sueño). Clientas que reciben masajes regulares reportan menos insomnio y sueño más reparador, especialmente las que sufren dolor crónico.</p>

<h2>¿Qué masaje necesitas?</h2>
<p>En Forma y Línea contamos con una amplia selección de masajes adaptados a cada necesidad:</p>
<ul>
<li><strong>Aroma Masaje (60 min):</strong> el equilibrio perfecto entre relajación profunda y liberación muscular.</li>
<li><strong>Lomi-Lomi hawaiano (60-90 min):</strong> movimientos fluidos y envolventes para desconectar completamente.</li>
<li><strong>Thai Herbal Masaje (90 min):</strong> calor de hierbas medicinales para aliviar dolores musculares profundos.</li>
<li><strong>Masaje a 4 Manos (60 min):</strong> la experiencia definitiva de desconexión total.</li>
<li><strong>Masaje Balinés (60-90 min):</strong> acupresión y aromaterapia para equilibrar cuerpo y mente.</li>
</ul>

<h2>¿Con qué frecuencia deberías recibir masajes?</h2>
<p>Para mantenimiento general y control del estrés, una sesión mensual es suficiente. Para dolor crónico, recuperación deportiva o problemas de sueño, cada 2-3 semanas ofrece resultados más sostenidos.</p>
<p>¿Quieres descubrir qué masaje es el más adecuado para ti? <a href="/servicios/masajes">Consulta nuestra oferta completa</a> y reserva tu cita. El bienestar no es un lujo, es una inversión en tu salud.</p>`,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log("✅ Blog posts created");

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
