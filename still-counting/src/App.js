import { useState, useEffect, useRef } from "react";

export default function LifeInDaysApp() {
  const [birthDate, setBirthDate] = useState(() => {
    return localStorage.getItem("birthDate") || "1990-01-01";
  });

  const [lifespan, setLifespan] = useState(() => {
    return parseInt(localStorage.getItem("lifespan")) || 90;
  });

  const [daysLived, setDaysLived] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [preciseAge, setPreciseAge] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("birthDate", birthDate);
    localStorage.setItem("lifespan", lifespan);

    const now = new Date();
    const birth = new Date(birthDate);
    const daysPassed = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const totalDays = lifespan * 365.25;
    setDaysLived(daysPassed);
    setDaysRemaining(Math.max(0, Math.floor(totalDays - daysPassed)));
  }, [birthDate, lifespan]);

  useEffect(() => {
    function updatePreciseAge() {
      const now = Date.now();
      const birth = new Date(birthDate).getTime();
      const ageInMilliseconds = now - birth;
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      setPreciseAge(ageInYears);
      animationRef.current = requestAnimationFrame(updatePreciseAge);
    }
    animationRef.current = requestAnimationFrame(updatePreciseAge);
    return () => cancelAnimationFrame(animationRef.current);
  }, [birthDate]);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <img
        src={`${process.env.PUBLIC_URL}/banner-life-in-days-still-counting.png`}
        alt="Life in Days: Still Counting Banner"
        className="w-full rounded-lg"
      />

      <h1 className="text-2xl font-bold text-center text-purple-700">Life in Days: Still Counting</h1>

      <div className="text-center text-xl text-purple-600 font-mono">
        Age: <span className="font-bold">{preciseAge.toFixed(9)}</span> years
      </div>

      <div className="space-y-2">
        <label className="block text-gray-600">Birth Date:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full border rounded p-2"
        />

        <label className="block text-gray-600">Expected Lifespan (years):</label>
        <input
          type="number"
          value={lifespan}
          onChange={(e) => setLifespan(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="bg-purple-100 p-4 rounded-md text-center">
        <p className="text-lg font-semibold text-purple-900">
          Days Lived: <span className="font-bold">{daysLived}</span>
        </p>
        <p className="text-lg font-semibold text-purple-900">
          Days Remaining: <span className="font-bold">{daysRemaining}</span>
        </p>
      </div>

      <p className="text-sm text-gray-500 text-center italic">
        "Still counting... because you're still here."
      </p>

      <footer className="text-center text-xs text-gray-400 pt-4">
        &copy; 2025 <a href="https://skyrien.com" className="underline hover:text-purple-600">skyrien.com</a>
      </footer>
    </div>
  );
}
