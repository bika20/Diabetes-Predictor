import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#e6d9c8] relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#303c66] text-white px-8 py-4 shadow-md z-40">
        <h1 className="text-2xl font-semibold">GlucoSense</h1>
      </nav>

      {/* Main Section */}
      <div className="pt-28 px-10 flex flex-col md:flex-row items-center justify-between gap-50">

        {/* Left Side */}
        <div className="relative md:w-1/2 h-[calc(100vh-7rem)] flex flex-col items-center">

          <div className="mt-8 ml-6">
            {/* Guidelines Link */}
          <div className="mb-6 mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white px-6 py-2 rounded-lg shadow-md text-blue-700 hover:bg-gray-100 transition text-xl"
            >
              Read these guidelines on how to fill in the information
            </button>
          </div>

          {/* Doctor Image */}
          <Image
            src="/doctor.png"
            alt="Doctor"
            width={300}
            height={300}
            className="object-contain fixed"
            
          />
        </div>

          </div>
        {/* Right Side - Form */}
        <div className="md:w-3/4 flex flex-col items-center mt-10 md:mt-0">

          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Number of Pregnancies" />
              <InputField label="Glucose Level" />
              <InputField label="Blood Pressure" />
              <InputField label="Skin Thickness" />
              <InputField label="Insulin Level" />
              <InputField label="BMI" />
              <InputField label="Diabetes Pedigree Function" />
              <InputField label="Age" />
            </div>

            <div className="flex justify-center mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full shadow-md font-bold text-xl ">
                Predict
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-red-600 mt-6 max-w-lg text-sm">
            <span className="font-semibold">DISCLAIMER!</span><br />
            This tool provides risk estimation only.<br />
            It is not a medical diagnosis.<br />
            Always consult a healthcare professional for medical advice.
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#e7ebdf] rounded-2xl shadow-xl max-w-5xl w-full p-8 relative overflow-y-auto max-h-[90vh]">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
              
              {/* Left Column */}
              <div>
                <h3 className="font-semibold mb-2">1. Pregnancies</h3>
                <p>Enter total number of times pregnant.</p>
                <p>Range: 0 – 20</p>

                <h3 className="font-semibold mt-4 mb-2">2. Glucose Level (mg/dL)</h3>
                <p>Enter fasting plasma glucose level.</p>
                <p>Normal: 70 – 99</p>

                <h3 className="font-semibold mt-4 mb-2">3. Blood Pressure (mm Hg)</h3>
                <p>Enter diastolic value.</p>
                <p>Typical: 60 – 80</p>

                <h3 className="font-semibold mt-4 mb-2">4. Skin Thickness (mm)</h3>
                <p>Typical: 10 – 50 mm</p>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="font-semibold mb-2">5. Insulin (mu U/ml)</h3>
                <p>2-hour serum insulin level.</p>
                <p>Typical: 15 – 276</p>

                <h3 className="font-semibold mt-4 mb-2">6. BMI</h3>
                <p>BMI = weight(kg) / height(m)^2</p>

                <h3 className="font-semibold mt-4 mb-2">7. Diabetes Pedigree Function</h3>
                <p>Indicates genetic likelihood.</p>

                <h3 className="font-semibold mt-4 mb-2">8. Age</h3>
                <p>Enter age in years (10 – 120).</p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Input Component */
function InputField({ label }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        type="number"
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}