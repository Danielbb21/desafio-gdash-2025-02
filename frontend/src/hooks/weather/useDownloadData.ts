export const downloadCSV = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/weather/export/csv`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "weather.csv";
  a.click();
  a.remove();
};

export const downloadXLSX = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/weather/export/xlsx`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "weather.csv";
  a.click();
  a.remove();
};
