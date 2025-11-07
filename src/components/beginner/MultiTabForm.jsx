import { useState } from "react";
import Nav from "../Nav"; 

const MultiTabForm = () => {
  const tabs = [
    { id: 1, name: "profile" },
    { id: 2, name: "interests" },
    { id: 3, name: "settings" },
  ];

  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    frontend: false,
    backend: false,
    darkmode: false,
  });

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.age.trim()) {
      alert("Please fill in Name and Age before submitting.");
      return;
    }
    console.log("Submitted data:", formData);
  };

  const renderTab = () => {
    if (activeTab === "profile") {
      return (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded-md"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            className="p-2 rounded-md"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
          />
        </div>
      );
    }

    if (activeTab === "interests") {
      return (
        <div className="flex flex-col gap-3">
          <label>
            <input
              type="checkbox"
              checked={formData.frontend}
              onChange={(e) =>
                setFormData({ ...formData, frontend: e.target.checked })
              }
            />
            <span className="ml-2">Frontend</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={formData.backend}
              onChange={(e) =>
                setFormData({ ...formData, backend: e.target.checked })
              }
            />
            <span className="ml-2">Backend</span>
          </label>
        </div>
      );
    }

    if (activeTab === "settings") {
      return (
        <div className="flex flex-col gap-4">
          <label>
            <input

              type="checkbox"
              checked={formData.darkmode}
              onChange={(e) =>
                setFormData({ ...formData, darkmode: e.target.checked })
              }
            />
            <span className="ml-2">Dark Mode</span>
          </label>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Nav /> 
      <section className="flex flex-col items-center justify-center min-h-screen dark:bg-slate-900 p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2 rounded-md capitalize ${
                activeTab === tab.name
                  ? "bg-blue-600 text-white "
                  : "bg-gray-300 dark:bg-slate-600 dark:text-white cursor-pointer"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="w-full max-w-sm p-4 dark:text-white text-black bg-gray-200 font-semibold dark:bg-slate-700 rounded-md shadow">
          {renderTab()}
        </div>
      </section>
    </>
  );
};

export default MultiTabForm;
