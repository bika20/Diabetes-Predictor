import Image from "next/image";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();

  // 🔥 Get probability from query
  const probability = parseFloat(router.query.probability);

  // ⛔ Handle refresh / undefined
  if (!probability && probability !== 0) {
    return <p className="text-center mt-20 text-lg">Loading...</p>;
  }

  // 🎯 Decide risk level
  let riskLevel = "";
  if (probability < 0.3) riskLevel = "low";
  else if (probability < 0.7) riskLevel = "moderate";
  else riskLevel = "high";

  // 🎯 Config
  const config = {
    low: {
      title: "LOW RISK!",
      bannerColor: "bg-green-600",
      boxColor: "bg-green-100",
      textColor: "text-green-700",
      imgtext: "Low Likelihood of Diabetes",
      text: "Minimal Risk Detected",
      meter: "/low-risk.jpg",
      lifestyle: [
        "Exercise regularly",
        "Eat a balanced diet",
        "Maintain a healthy weight",
      ],
      medical: [
        "Routine checkups",
        "Monitor basic health metrics",
      ],
    },
    moderate: {
      title: "MODERATE RISK!",
      bannerColor: "bg-yellow-500",
      boxColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      imgtext: "Moderate Likelihood of Diabetes",
      text: "Elevated Risk Detected",
      meter: "/medium-risk.jpg",
      lifestyle: [
        "Improve diet quality",
        "Increase physical activity",
        "Maintain healthy weight",
      ],
      medical: [
        "Consult a doctor",
        "Check HbA1c levels",
        "Monitor glucose regularly",
      ],
    },
    high: {
      title: "HIGH RISK!",
      bannerColor: "bg-red-500",
      boxColor: "bg-red-100",
      textColor: "text-red-700",
      imgtext: "High Likelihood of Diabetes",
      text: "Significant Risk Detected",
      meter: "/high-risk.jpg",
      lifestyle: [
        "Strict diet control",
        "Daily exercise routine",
        "Avoid sugar intake",
      ],
      medical: [
        "Consult doctor immediately",
        "Regular glucose monitoring",
        "Follow prescribed medication",
      ],
    },
  };

  const current = config[riskLevel];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#303c66] text-white px-8 py-4 shadow-md z-40">
        <h1 className="text-2xl font-semibold">GlucoSense</h1>
      </nav>

      {/* Main */}
      <div className="pt-24 p-6 flex flex-col items-center">

        {/* Banner */}
        <div className={`${current.bannerColor} text-white px-10 py-5 rounded-xl text-center mb-6 w-full max-w-3xl`}>
          <h2 className="text-3xl font-bold">{current.title}</h2>
          <p className="text-lg mt-1">
            Probability: {(probability * 100).toFixed(0)}%
          </p>
        </div>

        {/* First Card */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mb-6 grid md:grid-cols-2 gap-6">

          {/* Image Section */}
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src={current.meter}
              alt="meter"
              width={220}
              height={120}
              className="object-contain"
            />
            <p className="text-md font-medium text-center">
              {current.imgtext}
            </p>
          </div>

          {/* Interpretation */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-center">
              Interpretation
            </h3>

            <div className={`p-3 rounded mb-4 text-center font-medium ${current.boxColor} ${current.textColor}`}>
              {current.text}
            </div>

            <ul className="list-disc list-inside text-center space-y-2 text-sm">
              <li>Monitor blood sugar regularly</li>
              <li>Maintain a healthy lifestyle</li>
              <li>Consult a doctor if necessary</li>
            </ul>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mb-6">
          <h3 className="text-center font-semibold mb-4">
            Next Steps and Recommendations
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-center">

            {/* Lifestyle */}
            <div>
              <h4 className="font-semibold mb-3 text-green-700 bg-green-100 py-2 rounded">
                Lifestyle Advice
              </h4>
              <ul className="space-y-2 text-sm">
                {current.lifestyle.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Medical */}
            <div>
              <h4 className="font-semibold mb-3 text-yellow-700 bg-yellow-100 py-2 rounded">
                Medical Advice
              </h4>
              <ul className="space-y-2 text-sm">
                {current.medical.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition"
        >
          Predict Again
        </button>

      </div>
    </div>
  );
}