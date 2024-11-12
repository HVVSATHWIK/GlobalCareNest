import React, { useState } from 'react';
import { FolderHeart, Upload, Save, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface MedicalRecord {
  id: string;
  type: string;
  date: string;
  description: string;
  attachments: string[];
}

const MedicalPortfolio = () => {
  const user = useAuthStore((state) => state.user);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    dateOfBirth: '',
    bloodType: '',
    height: '',
    weight: '',
    allergies: '',
    medications: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecord = () => {
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      type: '',
      date: '',
      description: '',
      attachments: [],
    };
    setRecords([...records, newRecord]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-[#219B9D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <FolderHeart className="h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Medical Portfolio</h1>
            <p className="text-xl max-w-2xl">
              Manage your complete medical history in one secure place
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-[#219B9D] text-white p-2 rounded-full cursor-pointer">
                <Upload className="h-4 w-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-semibold dark:text-white">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Blood Type
              </label>
              <select
                value={personalInfo.bloodType}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, bloodType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={personalInfo.height}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, height: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={personalInfo.weight}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, weight: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Allergies
              </label>
              <textarea
                value={personalInfo.allergies}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, allergies: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="List any allergies..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Medications
              </label>
              <textarea
                value={personalInfo.medications}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, medications: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="List current medications..."
              />
            </div>
          </div>

          <button className="mt-6 inline-flex items-center px-4 py-2 bg-[#219B9D] text-white rounded-md hover:bg-opacity-90">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>

        {/* Medical Records */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold dark:text-white">Medical Records</h3>
            <button
              onClick={handleAddRecord}
              className="inline-flex items-center px-4 py-2 bg-[#219B9D] text-white rounded-md hover:bg-opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </button>
          </div>

          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Record Type
                    </label>
                    <input
                      type="text"
                      value={record.type}
                      onChange={(e) => {
                        const updatedRecords = records.map((r) =>
                          r.id === record.id ? { ...r, type: e.target.value } : r
                        );
                        setRecords(updatedRecords);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g., Lab Test, Prescription, Surgery"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={record.date}
                      onChange={(e) => {
                        const updatedRecords = records.map((r) =>
                          r.id === record.id ? { ...r, date: e.target.value } : r
                        );
                        setRecords(updatedRecords);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={record.description}
                      onChange={(e) => {
                        const updatedRecords = records.map((r) =>
                          r.id === record.id ? { ...r, description: e.target.value } : r
                        );
                        setRecords(updatedRecords);
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Add details about the medical record..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalPortfolio;