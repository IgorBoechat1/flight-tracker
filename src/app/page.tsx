import { FlightProvider } from '@/components/context/FlightContext';
import Map from '@/components/Map';

function MyApp({ Component, pageProps }: any) {
  return (
    <FlightProvider>
      <Map /> {/* Display the Map component */}
    </FlightProvider>
  );
}

export default MyApp;
