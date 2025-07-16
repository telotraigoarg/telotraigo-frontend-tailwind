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

  const formatearPesos = (numero) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(numero);
  };

  const handleSimulacion = async () => {
    const response = await fetch(
      "https://telotraigo-backend.onrender.com/api/dolar-oficial"
    );
    const data = await response.json();
    const dolar = parseFloat(data.venta);

    const valorUSD = parseFloat(valor);
    let coeficiente = 1;

    if (pais === "EE.UU.") coeficiente = 1.85;
    if (pais === "Dubái") coeficiente = 1.5;
    if (pais === "Paraguay") coeficiente = 1.65;

    const precioExteriorUSD = valorUSD * coeficiente;
    const precioArgentinaUSD = valorUSD * 3.2;
    const feeFijoUSD = 800;
    const feeVariableUSD = precioExteriorUSD * 0.03;
    const totalConComisionUSD =
      precioExteriorUSD + feeFijoUSD + feeVariableUSD;

    setResultado({
      origen: pais,
      precioExterior: formatearPesos(precioExteriorUSD * dolar),
      totalConComision: formatearPesos(totalConComisionUSD * dolar),
      precioArgentina: formatearPesos(precioArgentinaUSD * dolar),
      ahorro: formatearPesos((precioArgentinaUSD - totalConComisionUSD) * dolar),
    });
  };

  const handleEnviarWhatsapp = (e) => {
    e.preventDefault();
    const texto = `Hola! Soy ${nombre}%0AEmail: ${email}%0AMensaje: ${mensaje}`;
    window.open(
      `https://wa.me/5492964414587?text=${texto}`,
      "_blank"
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

      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-te-lo-traigo-autos.png"
              alt="Te Lo Traigo Autos"
              width={48}
              height={48}
              className="w-10 h-auto"
            />
            <span className="text-lg font-bold text-blue-600">
              Te Lo Traigo Autos
            </span>
          </div>
          <div className="space-x-4 hidden md:flex">
            <a href="#simulador" className="hover:text-blue-600">Simulador</a>
            <a href="#preguntas" className="hover:text-blue-600">Preguntas</a>
            <a href="#quienes" className="hover:text-blue-600">Quiénes Somos</a>
            <a href="#testimonios" className="hover:text-blue-600">Testimonios</a>
            <a href="#galeria" className="hover:text-blue-600">Galería</a>
            <a href="#proceso" className="hover:text-blue-600">Proceso</a>
            <a href="#metodos" className="hover:text-blue-600">Métodos Pago</a>
            <a href="#contacto" className="hover:text-blue-600">Contacto</a>
          </div>
        </div>
      </nav>

      <main className="pt-24 space-y-16">
        {/* Simulador */}
        <section
          id="simulador"
          className="bg-gray-50 py-12 px-6 max-w-xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Simulá tu ahorro
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Origen</label>
              <select
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>Dubái</option>
                <option>EE.UU.</option>
                <option>Paraguay</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Valor (USD)</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleSimulacion}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Calcular
            </button>
            {resultado && (
              <div className="bg-white p-4 rounded shadow space-y-2">
                <p>
                  <strong>Exterior:</strong> {resultado.precioExterior}
                </p>
                <p>
                  <strong>Con comisión:</strong> {resultado.totalConComision}
                </p>
                <p>
                  <strong>Argentina:</strong> {resultado.precioArgentina}
                </p>
                <p className="text-green-600 font-semibold">
                  Ahorro: {resultado.ahorro}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section
          id="preguntas"
          className="bg-white py-12 px-6 max-w-4xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold">¿Quién puede importar?</h3>
              <p>Personas físicas con domicilio en Argentina.</p>
            </div>
            <div>
              <h3 className="font-semibold">¿Qué autos?</h3>
              <p>0km nuevos homologables en Argentina.</p>
            </div>
            <div>
              <h3 className="font-semibold">¿Incluye?</h3>
              <p>Costo del vehículo, flete, impuestos y comisión.</p>
            </div>
            <div>
              <h3 className="font-semibold">¿Tiempo?</h3>
              <p>45-90 días según origen y logística.</p>
            </div>
          </div>
        </section>

        {/* Quiénes Somos */}
        <section
          id="quienes"
          className="bg-white py-12 px-6 max-w-4xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Quiénes Somos
          </h2>
          <p className="text-gray-700 text-center">
            Somos expertos en importación 0km. Te acompañamos en cada paso,
            garantizando un proceso transparente y seguro.
          </p>
        </section>

        {/* Testimonios */}
        <section
          id="testimonios"
          className="bg-white py-12 px-6 max-w-4xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Testimonios</h2>
          <blockquote className="text-gray-800 space-y-2">
            <p>“Importé mi Corolla desde EE.UU. y ahorré miles de USD.” – Juan R.</p>
            <p>“Desde Dubái en 60 días, todo legal y rápido.” – Flor G.</p>
            <p>“Excelente seguimiento personalizado.” – Martín L.</p>
          </blockquote>
        </section>

        {/* Galería */}
        <section
          id="galeria"
          className="bg-white py-12 px-6 max-w-5xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Galería de Autos Importados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Image
              src="/sample1.jpg"
              alt="Auto Importado 1"
              width={400}
              height={250}
              className="rounded"
            />
            <Image
              src="/sample2.jpg"
              alt="Auto Importado 2"
              width={400}
              height={250}
              className="rounded"
            />
            <Image
              src="/sample3.jpg"
              alt="Auto Importado 3"
              width={400}
              height={250}
              className="rounded"
            />
          </div>
        </section>

        {/* Proceso Paso a Paso */}
        <section
          id="proceso"
          className="bg-white py-12 px-6 max-w-4xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Proceso Paso a Paso
          </h2>
          <ol className="list-decimal list-inside text-gray-800 space-y-2">
            <li>Elegís modelo y presupuesto.</li>
            <li>Confirmás cotización CIF + comisión.</li>
            <li>Firmamos y recibimos anticipo.</li>
            <li>Coordinamos compra y envío.</li>
            <li>Gestionamos aduana y entrega.</li>
            <li>Recibís tu auto listo para usar.</li>
          </ol>
        </section>

        {/* Métodos de Pago */}
        <section
          id="metodos"
          className="bg-white py-12 px-6 max-w-4xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Métodos de Pago
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Transferencia en USD a cuentas en EE.UU., Dubái o Paraguay</li>
            <li>Transferencia en ARS vía CCL</li>
            <li>Cuotas con financiación local</li>
            <li>Cripto: USDT/USDC (bajo contrato)</li>
          </ul>
        </section>

        {/* Contacto */}
        <section
          id="contacto"
          className="bg-white py-12 px-6 max-w-xl mx-auto rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Contacto</h2>
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








