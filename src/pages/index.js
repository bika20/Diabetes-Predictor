import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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

  // 🔥 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🔥 API Call + Navigation
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

      // 🔥 Navigate to result page
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
    <div className="min-h-screen bg-[#e6d9c8]">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#303c66] text-white px-8 py-4 shadow-md z-40">
        <h1 className="text-2xl font-semibold">GlucoSense</h1>
      </nav>

      {/* Main Section */}
      <div className="pt-28 px-10 flex flex-col md:flex-row items-center justify-between">

        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col items-center justify-between h-[calc(100vh-7rem)]">

          {/* Guidelines Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-white px-6 py-2 rounded-lg shadow-md text-blue-700 hover:bg-gray-100 transition text-lg mt-10"
          >
            Read Guidelines
          </button>

          {/* Doctor Image */}
          <Image
            src="/doctor.png"
            alt="Doctor"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-3/5 flex flex-col items-center mt-10 md:mt-0">

          <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-4xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <InputField label="Pregnancies" name="pregnancies" value={formData.pregnancies} onChange={handleChange} />
              <InputField label="Glucose" name="glucose" value={formData.glucose} onChange={handleChange} />
              <InputField label="Blood Pressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
              <InputField label="Skin Thickness" name="skinThickness" value={formData.skinThickness} onChange={handleChange} />
              <InputField label="Insulin" name="insulin" value={formData.insulin} onChange={handleChange} />
              <InputField label="BMI" name="bmi" value={formData.bmi} onChange={handleChange} />
              <InputField label="DPF" name="dpf" value={formData.dpf} onChange={handleChange} />
              <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />

            </div>

            {/* Predict Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handlePredict}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition"
              >
                Predict
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-red-600 mt-6 max-w-lg text-sm">
            <span className="font-semibold">DISCLAIMER!</span><br />
            This tool provides risk estimation only.<br />
            It is not a medical diagnosis.<br />
            Always consult a healthcare professional.
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#e7ebdf] rounded-2xl shadow-xl max-w-5xl w-full p-8 relative overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-2xl font-bold"
            >
              ✕
            </button>

            <p className="text-center text-lg font-medium">
              Fill all values carefully as per medical standards.
            </p>

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
      <label className="text-sm font-medium mb-1 text-gray-700">
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