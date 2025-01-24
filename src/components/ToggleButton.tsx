interface ToggleButtonProps {
    useFakeData: boolean;
    setUseFakeData: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const ToggleButton: React.FC<ToggleButtonProps> = ({ useFakeData, setUseFakeData }) => (
    <button
      onClick={() => setUseFakeData((prev) => !prev)}
      className="mb-2 mr-8 w-48 flex items-center justify-center py-2 bg-transparent text-red-50 mt-2 font-boldfont-primary rounded-md border-2  border-white shadow-md hover:bg-green-700"
    >
      {useFakeData ? 'Use Fake Data' : 'Switch to API Data' }
    </button>
  );
  
  export default ToggleButton;
  