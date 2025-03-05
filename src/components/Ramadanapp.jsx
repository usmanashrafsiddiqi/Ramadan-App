import { useState, useEffect } from "react";

export default function RamadanApp() {
  const [city, setCity] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [hijriDate, setHijriDate] = useState(null);
  const [gregorianDate, setGregorianDate] = useState(null);
  const [method, setMethod] = useState(2); // Default calculation method (ISNA)

  useEffect(() => {
    if (city) {
      fetchPrayerTimes(city, method);
    }
  }, [city, method]);

  const fetchPrayerTimes = async (selectedCity, calcMethod) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=&method=${calcMethod}`);
      const data = await response.json();
      setPrayerTimes(data.data.timings);
      setHijriDate(data.data.date.hijri);
      setGregorianDate(data.data.date.gregorian);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-teal-900 text-white p-6">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md text-center border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-6">🌙 Ramadan App</h1>
        {gregorianDate && (
          <p className="text-lg mb-3">Date: {gregorianDate.day} {gregorianDate.month.en} {gregorianDate.year}</p>
        )}
        {hijriDate && (
          <p className="text-lg mb-3">Hijri Date: {hijriDate.day} {hijriDate.month.en} {hijriDate.year}</p>
        )}
        <label className="text-lg font-semibold">Enter City:</label>
        <input 
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          className="mt-3 p-3 bg-gray-700 text-white rounded-md w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <label className="text-lg font-semibold mt-4 block">Calculation Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(Number(e.target.value))}
          className="mt-2 p-2 bg-gray-700 text-white rounded-md w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value={2}>ISNA (North America)</option>
          <option value={3}>Muslim World League</option>
          <option value={4}>Umm al-Qura (Makkah)</option>
          <option value={5}>Egyptian General Authority</option>
          <option value={1}>University of Islamic Sciences, Karachi</option>
        </select>
        {prayerTimes && (
          <div className="mt-6 text-lg bg-gray-900 p-4 rounded-md shadow-lg border border-gray-600">
            <p className="font-semibold">Sehri Ends (Fajr): {prayerTimes.Fajr}</p>
            <p className="font-semibold">Dhuhr: {prayerTimes.Dhuhr}</p>
            <p className="font-semibold">Asr: {prayerTimes.Asr}</p>
            <p className="font-semibold">Maghrib (Iftar): {prayerTimes.Maghrib}</p>
            <p className="font-semibold">Isha: {prayerTimes.Isha}</p>
          </div>
        )}
      </div>
    </div>
  );
}
