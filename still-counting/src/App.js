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
  const [showAbout, setShowAbout] = useState(false);
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
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6 relative">
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
        LifeInDays v2.0 &copy; 2025 <a href="https://skyrien.com" className="underline hover:text-purple-600">skyrien.com</a> |
        <button onClick={() => setShowAbout(true)} className="text-purple-600 underline ml-2">About</button>
      </footer>

      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-lg">
            <button onClick={() => setShowAbout(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
            <img
              src={`${process.env.PUBLIC_URL}/banner-life-in-days-still-counting.png`}
              alt="About Banner"
              className="w-full rounded mb-4"
            />
            <h2 className="text-xl font-bold text-purple-700 mb-2">About This App</h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Life in Days: Still Counting</strong> is a gentle time tracker and reflection companion that counts the days you’ve lived—and those you have left. It's designed to bring awareness, intentionality, and mindfulness into your daily presence.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              This project began in 2015 and was reimagined in 2025 with a renewed focus on simplicity and purpose. Data is stored locally, and no personal information is ever shared.
            </p>
            <h3 className="text-sm font-semibold text-gray-600">Version History</h3>
            <ul className="text-xs text-gray-500 list-disc pl-5">
              <li><strong>v2.0</strong> – PWA support, local storage, precise age counter, new banner & UI (2025)</li>
              <li><strong>v1.0</strong> – Original Android app (2015)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
