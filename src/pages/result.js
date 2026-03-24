import Image from "next/image";
import { useRouter } from "next/router";

export default function Result() {
    const router = useRouter();

  // 🔥 Example (later from backend)
  const probability = 0.58;


  // 🎯 Decide risk level
  let riskLevel = "";
  if (probability < 0.3) riskLevel = "low";
  else if (probability < 0.7) riskLevel = "moderate";
  else riskLevel = "high";

  // 🎯 Config for UI
  const config = {
    low: {
      title: "LOW RISK!",
      bannerColor: "bg-green-600",
      boxColor: "bg-green-100",
      textColor: "text-green-700",
     imgtext:"Low Likelihood of Diabetes",
      text: "Minimal Risk Detected",
      meter: "/low-risk.jpg",
    },
    moderate: {
      title: "MODERATE RISK!",
      bannerColor: "bg-yellow-500",
      boxColor: "bg-yellow-100",
      imgtext:"Moderate Likelihood of Diabetes",

      textColor: "text-yellow-700",
      text: "Elevated Risk Detected",
      meter: "/medium-risk.jpg",
    },
    high: {
      title: "HIGH RISK!",
      bannerColor: "bg-red-500",
      boxColor: "bg-red-100",
      imgtext:"High Likelihood of Diabetes",
      textColor: "text-red-700",
      text: "Significant Risk Detected",
      meter: "/high-risk.jpg",
    },
  };

  const current = config[riskLevel];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-[#303c66] text-white px-8 py-4 fixed top-0 left-0 w-full z-40 shadow-md">
        <h1 className="text-2xl font-semibold">GlucoSense</h1>
      </nav>

      {/* Main Content */}
      <div className="pt-24 p-8 flex flex-col items-center">

        {/* Top Banner */}
        <div className={`${current.bannerColor} text-white px-12 py-5 rounded-xl text-center mb-6`}>
          <h2 className="text-3xl font-bold">{current.title}</h2>
          <p className="text-lg mt-1">
            Probability: {(probability * 100).toFixed(0)}%
          </p>
        </div>

        {/* First Div */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mb-6 grid md:grid-cols-2 gap-6">

          {/* Meter */}
          <div className="flex justify-center items-center gap-3">
            <Image
              src={current.meter}
              alt="meter"
              width={200}
              height={100}
              className="object-contain"
              
            />
             <p className="text-md font-medium">
    {current.imgtext}
  </p>
          </div>

          {/* Interpretation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Interpretation</h3>
            <hr className="opacity-30"></hr>

            <div className={`p-3 rounded mb-4 font-medium text-center ${current.boxColor} ${current.textColor}`}>
              {current.text}
            </div>

            <ul className="list-disc ml-5 text-sm space-y-2">
              <li>Monitor blood sugar regularly</li>
              <li>Maintain a healthy lifestyle</li>
              <li>Consult a doctor if necessary</li>
            </ul>
          </div>
        </div>

        {/* Second Div */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mb-4">
          <h3 className="text-center font-semibold mb-4">
            Next Steps and Recommendations
          </h3>
          <hr className="opacity-30"></hr>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Lifestyle */}
            <div >
                <div>
              <h4 className="font-semibold mb-2 text-green-700 py-2 px-3 bg-green-100 mt-2 w-[300px] text-center">
                Lifestyle Advice
              </h4></div>
              <ul className="list-disc  ml-5 text-sm space-y-2 ">
                <li>Exercise regularly</li>
                <li>Eat a balanced diet</li>
                <li>Maintain a healthy weight</li>
              </ul>
            </div>

            {/* Medical */}
            <div>
                <div>
              <h4 className="font-semibold mb-2 text-yellow-700 w-[300px] text-center bg-yellow-100 mt-2 py-2 px-3">
                Medical Advice
              </h4></div>
              <ul className="list-disc ml-5 text-sm space-y-2">
                <li>Consult a healthcare professional</li>
                <li>Get an HbA1c test</li>
                <li>Schedule regular check-ups</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Third Div */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mb-6">
          <h3 className="font-semibold mb-2">Input Summary</h3>
          <hr className="opacity-30 mt-0 mb-3"></hr>

          <ul className="list-disc ml-5 text-sm space-y-2">
            <li>Glucose Level: 128 mg/dL</li>
            <li>BMI: 22.1</li>
            <li>Blood Pressure: 82 mm Hg</li>
            <li>Age: 50</li>
          </ul>
        </div>

        {/* Button */}
        <button  onClick={() => router.push("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition duration-200">
          Predict Again!
        </button>

      </div>
    </div>
  );
}