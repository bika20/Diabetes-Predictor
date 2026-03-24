import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  // 🔥 Form State
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // API Call + Navigation
  const handlePredict = async () => {
    const requestData = {
      Pregnancies: Number(formData.pregnancies),
      Glucose: Number(formData.glucose),
      BloodPressure: Number(formData.bloodPressure),
      SkinThickness: Number(formData.skinThickness),
      Insulin: Number(formData.insulin),
      BMI: Number(formData.bmi),
      DiabetesPedigreeFunction: Number(formData.dpf),
      Age: Number(formData.age),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      // Navigate to result page
      router.push({
        pathname: "/result",
        query: { probability: data.probability },
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9ecfff] to-[#edf5ff]">

      <Navbar />

      {/* Main Section */}
      <div className="pt-28 px-4 sm:px-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col items-center gap-8 md:justify-between md:h-[calc(100vh-7rem)]">

          {/* Guidelines Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-white px-6 sm:px-10 py-3 rounded-lg shadow-md text-blue-700 hover:bg-gray-100 transition text-sm sm:text-lg text-center mt-6 md:mt-20"
          >
            Read these guidelines on how to fill in the information
          </button>

          {/* Doctor Image */}
          <Image
            src="/doctor.png"
            alt="Doctor"
            width={300}
            height={300}
            className="object-contain w-[200px] sm:w-[260px] md:w-[300px]"
          />
        </div>

        {/* Right Side - Form */} 
        <div className="md:w-3/5 flex flex-col items-center mt-10 md:mt-0 ">

          <div className="bg-white rounded-2xl shadow-lg px-4 sm:px-8 md:px-10 py-6 w-full max-w-4xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">

              <InputField label="Pregnancies" name="pregnancies" value={formData.pregnancies} onChange={handleChange} />
              <InputField label="Glucose" name="glucose" value={formData.glucose} onChange={handleChange} />
              <InputField label="Blood Pressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
              <InputField label="Skin Thickness" name="skinThickness" value={formData.skinThickness} onChange={handleChange} />
              <InputField label="Insulin" name="insulin" value={formData.insulin} onChange={handleChange} />
              <InputField label="BMI (Body Mass Index)" name="bmi" value={formData.bmi} onChange={handleChange} />
              <InputField label="Diabetes Pedigree Function" name="dpf" value={formData.dpf} onChange={handleChange} />
              <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />

            </div>

            {/* Predict Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handlePredict}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition text-white px-8 sm:px-12 py-3 rounded-full text-base sm:text-xl font-semibold"
              >
                Predict
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-red-600 mt-6 max-w-lg text-sm sm:text-lg px-4">
            <span className="font-bold">DISCLAIMER!</span><br />
            This tool provides risk estimation only. It is not a medical diagnosis.
            Always consult a healthcare professional.
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#eef2e6] rounded-3xl shadow-2xl max-w-6xl w-full p-10 relative overflow-y-auto max-h-[90vh] border border-gray-300">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-3xl font-bold text-gray-700 hover:text-black cursor-pointer"
            >
              ✕
            </button>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg">

              {/* LEFT COLUMN */}
              <div className="space-y-6">

                <div>
                  <h3 className="font-semibold text-lg">1. Pregnancies</h3>
                  <ul className="list-disc ml-5">
                    <li>Enter total number of times pregnant.</li>
                    <li>If male, enter 0.</li>
                    <li>Range: 0 – 20</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">2. Glucose Level (mg/dL)</h3>
                  <ul className="list-disc ml-5">
                    <li>Enter fasting plasma glucose level.</li>
                    <li>Measured after 8 hours fasting.</li>
                    <li><b>Typical ranges:</b></li>
                    <li>Normal: 70 – 99</li>
                    <li>Prediabetes: 100 – 125</li>
                    <li>Diabetes: 126+</li>
                    <li>Allowed range: 0 – 300</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">3. Blood Pressure (mm Hg)</h3>
                  <ul className="list-disc ml-5">
                    <li>Enter diastolic blood pressure.</li>
                    <li>Example: 120/80 → enter 80</li>
                    <li>Normal: 60 – 80</li>
                    <li>Allowed: 0 – 150</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">4. Skin Thickness (mm)</h3>
                  <ul className="list-disc ml-5">
                    <li>Enter measured value from report.</li>
                    <li>Do NOT guess randomly.</li>
                    <li>Typical range: 10 – 50 mm</li>
                  </ul>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6 border-l md:pl-10">

                <div>
                  <h3 className="font-semibold text-lg">5. Insulin (mu U/ml)</h3>
                  <ul className="list-disc ml-5">
                    <li>2-hour serum insulin level.</li>
                    <li>If unavailable, consult physician.</li>
                    <li>Typical range: 15 – 276</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">6. BMI (Body Mass Index)</h3>
                  <p className="italic text-center my-2">
                    BMI = weight(kg) / height(m)²
                  </p>
                  <ul className="list-disc ml-5">
                    <li>Enter calculated BMI.</li>
                    <li>Example: 70kg, 1.75m → BMI ≈ 22.9</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">7. Diabetes Pedigree Function</h3>
                  <ul className="list-disc ml-5">
                    <li>Indicates genetic likelihood.</li>
                    <li>Based on family history.</li>
                    <li>Range: 0.0 – 2.5</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">8. Age</h3>
                  <ul className="list-disc ml-5">
                    <li>Enter age in years.</li>
                    <li>Range: 10 – 120</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Input Component */
function InputField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-medium text-gray-900">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}