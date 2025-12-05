import { useDashboard } from "../hooks/weather/useDashboard"

export const Home = () => {
  const {weatherData} = useDashboard();
  console.log('weatherData', weatherData);

  return (
    <>
      <h1>testex</h1>
    </>
  )
}
