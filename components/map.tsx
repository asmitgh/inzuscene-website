import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Declare the global window interface to properly type the initMap function
declare global {
  interface Window {
    initMap: () => void;
    google: any; // Ideally use a proper Google Maps type definition
  }
}

interface Location {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export default function GlobalOfficesMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  
  // Sample locations data
  const locations: Location[] = [
    {
      id: 1,
      name: "New York Headquarters",
      position: { lat: 40.7128, lng: -74.0060 },
      address: "350 Fifth Avenue, New York, NY 10118",
      phone: "+1 (212) 555-1234",
      email: "newyork@company.com",
      hours: "Mon-Fri: 9am-5pm EST"
    },
    {
      id: 2,
      name: "London Office",
      position: { lat: 51.5074, lng: -0.1278 },
      address: "10 Downing Street, London SW1A 2AA, UK",
      phone: "+44 20 7123 4567",
      email: "london@company.com",
      hours: "Mon-Fri: 9am-5pm GMT"
    },
    {
      id: 3,
      name: "Tokyo Office",
      position: { lat: 35.6762, lng: 139.6503 },
      address: "1-1 Marunouchi, Chiyoda, Tokyo 100-0005, Japan",
      phone: "+81 3-1234-5678",
      email: "tokyo@company.com",
      hours: "Mon-Fri: 9am-5pm JST"
    }
  ];

  const renderMap = () => {
    if (!window.google || !mapRef.current) return;
    
    // Create a new map centered approximately in the middle of all locations
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 30, lng: 0 },
      zoom: 2,
      styles: [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            { saturation: -80 }
          ]
        }
      ]
    });
    
    // Add markers for each location
    locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: location.position,
        map: map,
        title: location.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#3825e2',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8
        }
      });
      
      // Create info window for each marker
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-3">
            <h3 class="font-semibold text-lg mb-2">${location.name}</h3>
            <p class="text-sm mb-1">${location.address}</p>
            <p class="text-sm mb-1">${location.phone}</p>
            <p class="text-sm mb-1">${location.email}</p>
            <p class="text-sm">${location.hours}</p>
          </div>
        `
      });
      
      // Add click listener to open info window
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  };

  useEffect(() => {
    // Define the callback function for when the API loads
    window.initMap = () => {
      setMapLoaded(true);
      renderMap();
    };
    
    // Load Google Maps API script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Keep a reference to the script element for proper cleanup
      scriptRef.current = script;
      
      document.head.appendChild(script);
    } else {
      // If Google Maps is already loaded, call initMap directly
      window.initMap();
    }
    
    // Cleanup function
    return () => {
      // Only try to remove the script if we have a reference to it
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      
      // Reset the window.initMap function
      if ('initMap' in window) {
        window.initMap = () => {};
      }
    };
  }, []);
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Our Global Offices
        </h2>
        <div className="relative w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-hidden border dark:border-gray-700">
          {/* Map container with fixed height */}
          <div 
            ref={mapRef}
            className="relative h-96 md:h-[500px] lg:h-[600px] w-full"
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3825e2]"></div>
              </div>
            )}
          </div>
          
          {/* Optional: List view of offices below the map */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div 
                key={location.id} 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {location.name}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <p className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>{location.address}</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    <span>{location.phone}</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    <span>{location.email}</span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    <span>{location.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}