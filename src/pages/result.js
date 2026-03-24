import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Result() {
  const router = useRouter();

  // Get probability from query
  const probability = parseFloat(router.query.probability);

  // Handle refresh / undefined
  if (!probability && probability !== 0) {
    return <p className="text-center mt-20 text-lg">Loading...</p>;
  }

  // Decide risk level
  let riskLevel = "";
  if (probability < 0.3) riskLevel = "low";
  else if (probability < 0.7) riskLevel = "moderate";
  else riskLevel = "high";

  // Config
  const config = {
    low: {
      title: "LOW RISK!",
      bannerColor: "bg-green-600",
      boxColor: "bg-green-100",
      textColor: "text-green-700",
      imgtext: "Low Likelihood of Diabetes",
      text: "Minimal Risk Detected",
      meter: "/low-risk.jpg",
      icon: "/green_tick.png",
      lifestyle: [
        "Exercise regularly (e.g. 30 minutes a day).",
        "Eat a balanced, healthy diet.",
        "Maintain a healthy weight.",
      ],
      medical: [
        "Moderate sugar and refined carb intake.",
        "Don't slack on physical activity.",
        "No need of medical consultation."
      ],
      interpretation: [
        "Currently low estimated risk of diabetes.",
        "Maintain a healthy lifestyle to prevent future risk.",
        "Routine health check-ups recommended."
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
      icon: "/yellow_sign.png",
      lifestyle: [
        "Reduce sugar and refined card intake.",
        "Increase physical activity.",
        "Keep track of fasting glucose levels.",
      ],
      medical: [
        "Monitor blood glucose levels regularly.",
        "Consult a physician or endocrinologist.",
        "Consider an HbA1c test.",
      ],
      interpretation: [
        "Increased probability of developing diabetes.",
        "Monitor blood sugar levels regularly.",
        "Consider medical consultation."
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
      icon: "/red_sign.png",
      lifestyle: [
        "Adapt a low-carb, healthy diet.",
        "Daily exercise routine.",
        "Avoid sugar intake.",
      ],
      medical: [
        "Consult doctor immediately.",
        "Regular glucose monitoring.",
        "Follow prescribed medication.",
      ],
      interpretation: [
        "Strong probability of diabetes.",
        "Immediate medical evaluation recommended.",
        "Schedule HbA1c and fasting glucose tests."
      ],
    },
  };

  const current = config[riskLevel];

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      {/* Main */}
      <div className="pt-24 p-6 flex flex-col items-center">

        {/* Banner */}
        <div className={`${current.bannerColor} text-white px-10 py-5 rounded-xl text-center mb-6 w-full max-w-xl`}>
          <h2 className="text-3xl font-bold">{current.title}</h2>
          <p className="text-2xl mt-1">
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
            <p className="text-lg font-medium text-center">
              {current.imgtext}
            </p>
          </div>

          {/* Interpretation */}
          <div>
            <h3 className="font-semibold text-xl mb-3 text-center">
              Interpretation
            </h3>

            <div
              className={`flex items-center justify-center gap-2 p-3 rounded mb-4 text-lg font-medium ${current.boxColor} ${current.textColor}`}
            >
              <Image
                src={current.icon}
                alt="meter"
                width={30}
                height={30}
              />
              <span>{current.text}</span>
            </div>

            <div className="flex justify-center">
              <ul className="list-disc space-y-2 text-lg">
                {current.interpretation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mb-6 text-xl">
          <h3 className="text-center font-semibold mb-4">
            Next Steps and Recommendations
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Lifestyle */}
            <div>
              <h4 className="font-semibold mb-3 text-green-700 bg-green-100 py-2 rounded text-center">
                Lifestyle Advice
              </h4>
              <div className="flex justify-center w-[90%]">
                <ul className="list-disc space-y-2 text-lg">
                {current.lifestyle.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              </div>
            </div>

            {/* Medical */}
            <div>
              <h4 className="font-semibold mb-3 text-yellow-700 bg-yellow-100 py-2 rounded text-center">
                Medical Advice
              </h4>
              <div className="flex justify-center w-[90%]">
                <ul className="list-disc space-y-2 text-lg">
                  {current.medical.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-2xl font-semibold transition"
        >
          Predict Again
        </button>

      </div>
    </div>
  );
}