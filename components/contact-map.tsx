"use client";

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface Office {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  email: string;
}

const offices: Office[] = [
  {
    name: "India Office",
    position: { lat: 22.5726, lng: 88.3639 },
    address: "9th Floor, Kankaria Estate 6 Little Russel Street, Kolkata- 700071, India",
    email: "info@inzuscene.com"
  },
  {
    name: "South Africa Office",
    position: { lat: -25.7461, lng: 28.1881 },
    address: "8B, Kilimanjaro St, Bronkhorspruit, Centurion, South Africa",
    email: "info@inzuscene.com"
  },
  {
    name: "UAE Office",
    position: { lat: 24.4539, lng: 54.3773 },
    address: "1405, Addax Tower, Reem Island, Abu Dhabi, UAE",
    email: "info@inzuscene.com"
  },
  {
    name: "USA Office",
    position: { lat: 30.2672, lng: -97.7431 },
    address: "815 Brazos St., Ste. 500 Austin, TX 78701, Travis Country, USA",
    email: "info@inzuscene.com"
  }
];

const mapStyles = {
  height: "600px",
  width: "100%"
};

const defaultCenter = {
  lat: 20,
  lng: 0
};

export function ContactMap() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      offices.forEach(office => bounds.extend(office.position));
      map.fitBounds(bounds);
    }
  }, [map]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAPLDoPCFrQACFChA-5i-d9t2S-PZEhoUM">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={2}
        center={defaultCenter}
        onLoad={map => setMap(map)}
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }]
            }
          ]
        }}
      >
        {offices.map((office, index) => (
          <Marker
            key={index}
            position={office.position}
            onClick={() => setSelectedOffice(office)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#3825e2",
              fillOpacity: 1,
              strokeColor: "#38ba99",
              strokeWeight: 2,
            }}
          />
        ))}

        {selectedOffice && (
          <InfoWindow
            position={selectedOffice.position}
            onCloseClick={() => setSelectedOffice(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-lg mb-2">{selectedOffice.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedOffice.address}</p>
              <a 
                href={`mailto:${selectedOffice.email}`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {selectedOffice.email}
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}