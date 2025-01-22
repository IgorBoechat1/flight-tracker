// Helper function to generate random coordinates within Europe
const getRandomCoordinatesInEurope = () => {
    const latitude = 35 + Math.random() * (70 - 35); // Europe latitude range: 35 to 70
    const longitude = -10 + Math.random() * (40 - -10); // Europe longitude range: -10 to 40
    return { latitude, longitude };
  };
  
  // Helper function to generate a random string of a given length
  const getRandomString = (length: number): string =>
    Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  
  // Plane data configuration for different types of planes
  const planeConfigs = [
    { imageUrl: '/cessna172.jpg', planeName: 'Cessna 172' },
    { imageUrl: '/cessna182.jpg', planeName: 'Cessna 182' },
    { imageUrl: '/piperpa28.jpg', planeName: 'Piper PA-28' },
    { imageUrl: '/p40wh.jpg', planeName: 'P-40 Warhawk' },
    { imageUrl: '/t6texan.jpg', planeName: 'T-6 Texan' },
    { imageUrl: '/aeroncachamps.jpg', planeName: 'Aeronca Champ' },
    { imageUrl: '/b25mitchell.jpg', planeName: 'Boeing B-25 Mitchell' },
    { imageUrl: '/cessna206.jpg', planeName: 'Cessna 206' },
    { imageUrl: '/albatros.jpg', planeName: 'L-39 Albatros' },
    { imageUrl: '/p51.jpg', planeName: 'P-51 Mustang' },
    { imageUrl: '/piperpa44.jpg', planeName: 'Piper PA-44 Seminole' },
    { imageUrl: '/f35.jpg', planeName: 'F-35 Lightning II' },
    { imageUrl: '/b17.jpg', planeName: 'Boeing B-17 Flying Fortress' },
    { imageUrl: '/c130.jpg', planeName: 'Lockheed C-130 Hercules' },
    { imageUrl: '/diamondd40.jpg', planeName: 'Diamond DA40' },
    { imageUrl: '/sr22.jpg', planeName: 'Cirrus SR22' },
    { imageUrl: '/mooney.jpg', planeName: 'Mooney M20P' },
    { imageUrl: '/lancer.jpg', planeName: 'B-1B Lancer' },
    { imageUrl: '/grob115.jpg', planeName: 'Grob G115' },
    { imageUrl: '/b90.jpg', planeName: 'Beechcraft King Air B90' },
    { imageUrl: '/cessna185.jpg', planeName: 'Cessna 185' },
    { imageUrl: '/bell407.jpg', planeName: 'Bell 407' },
  ];
  
  // Function to generate random flight data for a given count
  const generateRandomFlightData = (count: number): Flight[] => {
    return Array.from({ length: count }, (_, index) => {
      // Get random coordinates for the flight
      const { latitude, longitude } = getRandomCoordinatesInEurope();
  
      // Select plane configuration (cycled based on index)
      const planeConfig = planeConfigs[index % planeConfigs.length];
  
      return {
        icao24: getRandomString(6),
        callsign: `CALL${getRandomString(4)}`,
        origin_country: 'Europe',
        latitude,
        longitude,
        imageUrl: planeConfig.imageUrl,
        planeName: planeConfig.planeName,
      };
    });
  };
  
  // Interface for the Flight data type
  export interface Flight {
    icao24: string;
    callsign: string;
    origin_country: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
    planeName: string;
  }
  
  // Example usage of the generateRandomFlightData function:
  const flights = generateRandomFlightData(10); // Generate 10 fake flights
  
  export default generateRandomFlightData;
  