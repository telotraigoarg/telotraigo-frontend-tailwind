import { useState } from "react";

export default function Home() {
  const [pais, setPais] = useState("Dubái");
  const [valor, setValor] = useState(0);
  const [resultado, setResultado] = useState(null);

  const handleSimulacion = async () => {
    const response = await fetch("https://telotraigo-backend.onrender.com/api/dolar-oficial");
    const data = await response.json();
    const dolar = data.venta;

    let precioFinal = 0;

    if (pais === "EE.UU.") {
      precioFinal = valor * 1.85 * dolar;
    } else if (pais === "Dubái") {
      precioFinal = valor * 1.5 * dolar;
    } else if (pais === "Paraguay") {
      precioFinal = valor * 1.65 * dolar;
    }

    const precioArgentina = valor * 3.2 * dolar;
    const feeFijo = 800;
    const feeVariable = precioFinal * 0.03;
    const totalConComision = precioFinal + feeFijo + feeVariable;

    const ahorro = precioArgentina - totalConComision;

    setResultado({
      origen: pais,
      precioExterior: precioFinal.toFixed(0),
      totalConComision: totalConComision.toFixed(0),
      precioArgentina: precioArgentina.toFixed(0),
      ahorro: ahorro.toFixed(0),
    });
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div className="text-lg font-bold text-blue-600">Te Lo Traigo Autos</div>
    <div className="space-x-4">
      <a href="#inicio" className="text-gray-700 hover:text-blue-600 font-medium">Inicio</a>
      <a href="#simulador" className="text-gray-700 hover:text-blue-600 font-medium">Simulador</a>
      <a href="#preguntas" className="text-gray-700 hover:text-blue-600 font-medium">Preguntas</a>
      <a href="#contacto" className="text-gray-700 hover:text-blue-600 font-medium">Contacto</a>
    </div>
  </div>
</nav>
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-4">
        {/* Simulador */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Simulá el ahorro en la importación de tu 0km
          </h1>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Origen</label>
            <select
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>Dubái</option>
              <option>EE.UU.</option>
              <option>Paraguay</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Valor del auto en USD
            </label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleSimulacion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-6 text-sm bg-blue-50 p-4 rounded-lg">
              <p><strong>Origen:</strong> {resultado.origen}</p>
              <p><strong>Precio exterior:</strong> USD {resultado.precioExterior}</p>
              <p><strong>Total con comisión:</strong> USD {resultado.totalConComision}</p>
              <p><strong>Precio en Argentina:</strong> USD {resultado.precioArgentina}</p>
              <p className="text-green-600 font-semibold">
                Ahorro estimado: USD {resultado.ahorro}
              </p>
            </div>
          )}
        </div>

        {/* Contacto */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-10 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Contacto</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                placeholder="Escribí tu consulta acá..."
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Preguntas Frecuentes */}
        <section className="mt-16 bg-white py-12 px-6 rounded-xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">¿Quién puede importar un auto?</h3>
              <p className="text-gray-700">
                Cualquier persona física con domicilio en Argentina puede importar un auto 0 km por año según la normativa vigente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">¿Qué autos se pueden importar?</h3>
              <p className="text-gray-700">
                Autos nuevos sin uso, que cumplan con la normativa de emisiones y seguridad del país de origen y de Argentina.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">¿Qué incluye el precio final?</h3>
              <p className="text-gray-700">
                El precio incluye el costo del vehículo, flete, seguros, impuestos y nuestra comisión (fee fijo + 3% sobre CIF).
              </p>
            </div>
            <div>
              <h3 className="font-semibold">¿Cuánto tarda el proceso?</h3>
              <p className="text-gray-700">
                El proceso completo puede demorar entre 45 y 90 días, dependiendo del país de origen y la logística.
              </p>
            </div>
          </div>
        </section>
  {/* ¿Cómo funciona? */}
<section className="mt-16 bg-white py-12 px-6 rounded-xl shadow-md max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold text-center mb-8">¿Cómo funciona?</h2>
  <div className="grid md:grid-cols-2 gap-8 text-gray-800">
    <div>
      <h3 className="font-semibold text-blue-600 mb-1">1. Simulá tu ahorro</h3>
      <p>Usá nuestro simulador para saber cuánto podrías pagar y comparar con el precio en Argentina.</p>
    </div>
    <div>
      <h3 className="font-semibold text-blue-600 mb-1">2. Nos encargamos de todo</h3>
      <p>Flete, aduana, seguros, homologación: lo resolvemos todo por vos.</p>
    </div>
    <div>
      <h3 className="font-semibold text-blue-600 mb-1">3. Seguimiento personalizado</h3>
      <p>Vas a tener contacto directo con nuestro equipo durante todo el proceso.</p>
    </div>
    <div>
      <h3 className="font-semibold text-blue-600 mb-1">4. Recibís tu auto legal en Argentina</h3>
      <p>Cuando todo esté listo, te entregamos el vehículo registrado y listo para circular.</p>
    </div>
  </div>
</section>
{/* Botón de WhatsApp flotante */}
<a
  href="https://wa.me/5492964414587"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 z-50"
  title="Contactanos por WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 448 512"
    className="w-6 h-6"
  >
    <path d="M380.9 97.1C339 55.3 283.2 32 224.5 32c-116.4 0-211 94.6-211 211 0 37.2 9.7 73.5 28.3 105.5L1.2 470.3c-2.3 6.6 4.1 13 10.7 10.7l121.7-40.6c31.1 16.8 66.2 25.7 101 25.7h.1c116.3 0 211-94.6 211-211 0-58.6-23.4-113.9-65.8-157zM224.5 438.6h-.1c-30.4 0-60.2-8.1-86.2-23.4l-6.2-3.7-72.2 24.1 24.5-70.3-4.1-6.5c-17.8-28.4-27.2-61.3-27.2-94.7 0-99.6 81-180.6 180.6-180.6 48.3 0 93.7 18.8 127.9 52.9 34.2 34.2 53 79.6 53 127.9 0 99.7-81 180.6-180.6 180.6zm101.7-138.4c-5.5-2.8-32.4-16-37.4-17.8-5-1.9-8.7-2.8-12.4 2.8s-14.2 17.8-17.4 21.5c-3.2 3.7-6.4 4.1-11.9 1.4-32.4-16.2-53.6-28.9-75.1-65.3-5.7-9.8 5.7-9.1 16.2-30.2 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-30.2-17-41.4-4.5-10.8-9.1-9.3-12.4-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5 5.5-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.7 13.2 5.7 23.4 9.1 31.4 11.7 13.2 4.2 25.2 3.6 34.7 2.2 10.6-1.6 32.4-13.2 37-25.9 4.6-12.7 4.6-23.5 3.2-25.9-1.3-2.4-5-3.7-10.5-6.5z" />
  </svg>
</a>


      </div>
    </div>
  );
}




