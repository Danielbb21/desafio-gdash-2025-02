import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { useDashboard } from "../hooks/weather/useDashboard"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";
import { downloadCSV, downloadXLSX } from "../hooks/weather/useDownloadData";
import { useGetIAInfo } from "../hooks/weather/useGetIAInfo";

export const Home = () => {
  const { weatherData, isLoading, isPending } = useDashboard();
  const { iaData, isIALoading } = useGetIAInfo();
  console.log('weatherData', weatherData);

  if (isLoading || isPending) {
    return (
      <main className="h-[90vh] flex items-center justify-center text-xl">
        <div className="bg-quaternary h-[95%] w-[95%] md:w-[90%] rounded-md flex flex-col overflow-auto items-center p-4">
          <h1>Clima de Hoje</h1>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-20 w-full rounded-md bg-primary/50"
              />
            ))}
          </div>

          <div className="w-full grid md:grid-cols-2 gap-4 mt-6">
            <Skeleton className="w-full h-64 bg-primary/50" />
            <Skeleton className="w-full h-64 bg-primary/50" />
          </div>
        </div>
      </main>
    );
  }
  const cards = [
    { label: "Temperatura", value: `${weatherData?.latest?.temp}°C` },
    { label: "Umidade", value: `${weatherData?.latest?.umid}%` },
    { label: "Prob. Chuva", value: `${weatherData?.latest?.prob}%` },
    { label: "Vento", value: `${weatherData?.latest?.vento} Km/h` },
    { label: "Condição", value: weatherData?.latest?.condicao },
    { label: "Hora", value: weatherData?.latest?.hora },
  ];

  return (
    <main className="h-[90vh] flex items-center justify-center text-xl">
      <div className="bg-quaternary h-[95%] w-[95%] md:w-[90%] rounded-md flex flex-col overflow-auto items-center p-4">
        <div className="w-[100%] flex justify-around">
          <Button className="cursor-pointer" onClick={downloadCSV}>Baixar CSV</Button>
          <Button className="cursor-pointer" onClick={downloadXLSX}>Baixar XLSX</Button>
        </div>
        <h1>Clima de Hoje</h1>


        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-white rounded-md p-4 shadow flex flex-col items-center"
            >
              <span className="text-sm text-gray-600">{c.label}</span>
              <span className="text-xl font-semibold">{c.value}</span>
            </div>
          ))}
        </div>
        <div className="w-full my-4">
          <section className="bg-white rounded-md p-4 shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold text-primary mb-3">
              🤖 Atividades Recomendadas Por Inteligência Artificial
            </h2>

            {isIALoading ? (
              <Skeleton className="h-40 w-full bg-primary/50" />
            ) : (
              <>
                <p className="text-base text-gray-700 italic mb-4">
                  {iaData?.summary || "Nenhuma análise de clima disponível."}
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Atividade Sugerida
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Motivo (Baseado no Clima)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {iaData?.recommendations?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.activity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-4">

          <section className="bg-white rounded-md p-2 shadow">
            <legend className="text-lg font-semibold px-2">
              Temperatura por hora
            </legend>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData?.temperatures}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    name="Temperatura (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-white rounded-md p-2 shadow">
            <legend className="text-lg font-semibold px-2">
              Probabilidade de Chuva por hora
            </legend>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherData?.rainProbability}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="prob" name="Probabilidade (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
