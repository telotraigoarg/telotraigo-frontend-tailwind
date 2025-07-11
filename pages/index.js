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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-4">
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

        {/* 📩 Sección de contacto */}
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
      </div>
    </div>
  );
}



