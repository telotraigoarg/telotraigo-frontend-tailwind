import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [pais, setPais] = useState("Dubái");
  const [valor, setValor] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const formatearPesos = (numero) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(numero);

  const handleSimulacion = async () => {
    const res = await fetch(
      "https://telotraigo-backend.onrender.com/api/dolar-oficial"
    );
    const data = await res.json();
    const dolar = parseFloat(data.venta);
    const valorUSD = parseFloat(valor);
    const coeficientes = { "EE.UU.": 1.85, Dubái: 1.5, Paraguay: 1.65 };
    const coef = coeficientes[pais] || 1;

    const precioExteriorUSD = valorUSD * coef;
    const precioArgentinaUSD = valorUSD * 3.2;
    const feeFijoUSD = 800;
    const feeVariableUSD = precioExteriorUSD * 0.03;
    const totalConComisionUSD =
      precioExteriorUSD + feeFijoUSD + feeVariableUSD;

    setResultado({
      precioExterior: formatearPesos(precioExteriorUSD * dolar),
      totalConComision: formatearPesos(totalConComisionUSD * dolar),
      precioArgentina: formatearPesos(precioArgentinaUSD * dolar),
      ahorro: formatearPesos(
        (precioArgentinaUSD - totalConComisionUSD) * dolar
      ),
    });
  };

  const handleEnviarWhatsapp = (e) => {
    e.preventDefault();
    const texto = `Hola! Soy ${nombre}%0AEmail: ${email}%0AMensaje: ${mensaje}`;
    window.open(
      `https://wa.me/5492964414587?text=${encodeURIComponent(texto)}`,
      '_blank'
    );
  };

  return (
    <>
      <Head>
        <title>Te Lo Traigo Autos</title>
        <meta
          name="description"
          content="Importá tu 0km desde Dubái, EE.UU. o Paraguay y ahorrá miles de dólares. Te lo traemos a Argentina, legal y fácil."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-te-lo-traigo-autos.png"
              alt="Te Lo Traigo Autos"
              width={40}
              height={40}
            />
            <span className="font-bold text-blue-600">
              Te Lo Traigo Autos
            </span>
          </div>
          <div className="hidden md:flex space-x-4">
            {[
              'simulador','preguntas','quienes','testimonios',
              'galeria','proceso','metodos','contacto'
            ].map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-blue-600 capitalize">
                {id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-20 space-y-16">
        {/* Simulador */}
        <section id="simulador" className="mx-auto max-w-lg bg-gray-50 p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Simulá tu ahorro</h2>
          <div className="space-y-4">
            <select
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>Dubái</option>
              <option>EE.UU.</option>
              <option>Paraguay</option>
            </select>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Valor USD"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSimulacion}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Calcular
            </button>
            {resultado && (
              <div className="bg-white p-4 rounded shadow space-y-2">
                <p><strong>Exterior:</strong> {resultado.precioExterior}</p>
                <p><strong>Con comisión:</strong> {resultado.totalConComision}</p>
                <p><strong>Argentina:</strong> {resultado.precioArgentina}</p>
                <p className="text-green-600 font-semibold">Ahorro: {resultado.ahorro}</p>
              </div>
            )}
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section id="preguntas" className="mx-auto max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold">¿Quién?</h3><p>Personas físicas argentinas.</p></div>
            <div><h3 className="font-semibold">¿Qué?</h3><p>Autos 0km homologables.</p></div>
            <div><h3 className="font-semibold">¿Incluye?</h3><p>Costo, impuestos y comisión.</p></div>
            <div><h3 className="font-semibold">¿Tiempo?</h3><p>45-90 días.</p></div>
          </div>
        </section>

        {/* Quiénes Somos */}
        <section id="quienes" className="mx-auto max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Quiénes Somos</h2>
          <p className="text-gray-700 text-center">
            Equipo argentino especializado en importación de autos 0km. Asesoría integral y seguimiento personalizado.
          </p>
        </section>

        {/* Testimonios */}
        <section id="testimonios" className="mx-auto max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Testimonios</h2>
          <blockquote className="space-y-2 text-gray-800">
            <p>“Importé mi Corolla desde EE.UU. y ahorré miles.” – Juan R.</p>
            <p>“Desde Dubái en 60 días, todo legal.” – Flor G.</p>
            <p>“Excelente seguimiento.” – Martín L.</p>
          </blockquote>
        </section>

        {/* Galería */}
        <section id="galeria" className="mx-auto max-w-4xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Galería</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Image src="/C63.jpg" alt="C63" width={400} height={250} className="rounded object-cover" />
            <Image src="/MACAN.jpg" alt="Macan" width={400} height={250} className="rounded object-cover" />
            <Image src="/MINICOOPER.jpg" alt="Mini Cooper" width={400} height={250} className="rounded object-cover" />
          </div>
        </section>

        {/* Proceso Paso a Paso */}
        <section id="proceso" className="mx-auto max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Proceso Paso a Paso</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Elegís modelo y presupuesto.</li>
            <li>Confirmás cotización CIF + comisión.</li>
            <li>Firmamos y recibimos anticipo.</li>
            <li>Coordinamos compra y envío.</li>
            <li>Gestionamos aduana y entrega.</li>
            <li>Recibís tu auto listo para usar.</li>
          </ol>
        </section>

        {/* Métodos de Pago */}
        <section id="metodos" className="mx-auto max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Métodos de Pago</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Transferencia USD EE.UU./Dubái/Paraguay</li>
            <li>Transferencia ARS vía CCL</li>
            <li>Cuotas con financiación local</li>
            <li>Cripto: USDT/USDC</li>
          </ul>
        </section>

        {/* Contacto */}
        <section id="contacto" className="mx-auto max-w-md bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Contacto</h2>
          <form onSubmit={handleEnviarWhatsapp} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Enviar por WhatsApp
            </button>
          </form>
        </section>
      </main>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/5492964414587"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        title="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 448 512"
        >
          <path d="M380.9 97.1..." />
        </svg>
      </a>
    </>
  );
}








