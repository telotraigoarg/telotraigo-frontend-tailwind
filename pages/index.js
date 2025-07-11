import "../styles/globals.css";
import Header from "../components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [precioFOB, setPrecioFOB] = useState(22000);
  const [pais, setPais] = useState("Dubái");
  const [resultado, setResultado] = useState(null);
  const [cotizacionDolar, setCotizacionDolar] = useState(null);

  useEffect(() => {
    fetch("https://telotraigo-backend.onrender.com/api/dolar-oficial")
      .then((res) => res.json())
      .then((data) => setCotizacionDolar(data.venta));
  }, []);

  const calcular = () => {
    const flete = pais === "Paraguay" ? 1200 : 2000;
    const cif = precioFOB + flete;
    const arancel = cif * 0.2;
    const tasa = cif * 0.03;
    const iva = (cif + arancel) * 0.21;
    const impAdicional = (cif + arancel) * 0.17;
    const gestion = 1500;
    const comision = cif * 0.03 + gestion;
    const totalUSD = cif + arancel + tasa + iva + impAdicional + comision;
    const totalARS = totalUSD * cotizacionDolar;
    const precioArgentina = 82000000;
    const ahorro = precioArgentina - totalARS;
    const porcentaje = ((ahorro / precioArgentina) * 100).toFixed(0);

    setResultado({ totalARS, ahorro, porcentaje });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 p-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
          Simulá el ahorro en la importación de tu 0 km
        </h1>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4">
          {cotizacionDolar && (
            <p className="text-sm text-gray-600 mb-2">
              💵 Dólar oficial hoy (BNA): ARS {cotizacionDolar}
            </p>
          )}

          <select
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          >
            <option>EE.UU.</option>
            <option>Dubái</option>
            <option>Paraguay</option>
            <option>Europa</option>
          </select>

          <input
            type="number"
            value={precioFOB}
            onChange={(e) => setPrecioFOB(Number(e.target.value))}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Precio FOB (USD)"
          />

          <button
            clas

      </div>
    </div>
  );
}

