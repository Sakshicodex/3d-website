import React, { useState } from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ handleDecals }) => {
  const [file, setFile] = useState(null);

  const handleOption = (type) => {
    // Ensure a file is selected before proceeding
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    // Read the selected file and pass it to handleDecals for processing
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      handleDecals(type, reader.result);
    };

    // Prevent the default form submission behavior
    event.preventDefault();
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <form>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </form>

        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {!file ? 'No file selected' : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => handleOption('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => handleOption('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
