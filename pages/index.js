import { useState } from "react";

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
    const response = await fetch("https://telotraigo-backend.onrender.com/api/dolar-oficial");
    const data = await response.json();
    const dolar = parseFloat(data.venta);

    const valorUSD = parseFloat(valor);
    let coeficiente = 1;

    if (pais === "EE.UU.") {
      coeficiente = 1.85;
    } else if (pais === "Dubái") {
      coeficiente = 1.5;
    } else if (pais === "Paraguay") {
      coeficiente = 1.65;
    }

    const precioExteriorUSD = valorUSD * coeficiente;
    const precioArgentinaUSD = valorUSD * 3.2;
    const feeFijoUSD = 800;
    const feeVariableUSD = precioExteriorUSD * 0.03;
    const totalConComisionUSD = precioExteriorUSD + feeFijoUSD + feeVariableUSD;

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
    window.open(`https://wa.me/5492964414587?text=${texto}`, '_blank');
  };

  return (
    <>
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

      <div className="min-h-screen bg-gray-50 pt-24">
        <div id="simulador" className="container mx-auto p-4">
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
                onChange={(e) => setValor(Number(e.target.value))}
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
                <p><strong>Precio exterior:</strong> {resultado.precioExterior}</p>
                <p><strong>Total con comisión:</strong> {resultado.totalConComision}</p>
                <p><strong>Precio en Argentina:</strong> {resultado.precioArgentina}</p>
                <p className="text-green-600 font-semibold">
                  Ahorro estimado: {resultado.ahorro}
                </p>
              </div>
            )}
          </div>
        </div>

        <section id="preguntas" className="mt-16 bg-white py-12 px-6 rounded-xl shadow-md max-w-4xl mx-auto">
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

        <section id="contacto" className="bg-white rounded-xl shadow-md p-6 mt-16 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Contacto</h2>
          <form className="space-y-4" onSubmit={handleEnviarWhatsapp}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribí tu consulta acá..." className="w-full p-2 border border-gray-300 rounded-md" rows={4} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Enviar por WhatsApp
            </button>
          </form>
        </section>
      </div>

      <a
        href="https://wa.me/5492964414587"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 z-50"
        title="Contactanos por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 448 512" className="w-6 h-6">
          <path d="M380.9 97.1C339 55.3 283.2 32 224.5 32c-116.4 0-211 94.6-211 211 0 37.2 9.7 73.5 28.3 105.5L1.2 470.3c-2.3 6.6 4.1 13 10.7 10.7l121.7-40.6c31.1 16.8 66.2 25.7 101 25.7h.1c116.3 0 211-94.6 211-211 0-58.6-23.4-113.9-65.8-157z" />
        </svg>
      </a>
    </>
  );
}







