/* eslint-disable no-undef */
/* global google */
import GoogleMapReact from 'google-map-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA2MMmQ2tPm4z0OURwhMNCNBMYlMsDTNu0';

const Pin = () => (
    <div className="relative bg-red-500 text-white text-sm p-2 rounded-full">
        <span className="absolute pin-top pin-right transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 border-2 border-white"></span>
    </div>
);

const Map = ({ lat, lon, location }) => {

    function renderMarkers(map, maps) {
        let marker;
        if (maps) {
            marker = new maps.Marker({
                position: { lat: lat, lng: lon },
                map
            });
        }
        let infoWindow = new maps.InfoWindow({
            content: location === 'JHB' ? '<div><h3>CAVI Johannesburg Campus</h3>' +
                '<a href="https://www.google.com/maps/dir/?api=1&destination=CAVI Brands+Oakhurst Building, 11-13 Saint Andrew Road, Parktown, Johannesburg, 2193" target="_blank" class="text-blue-500 text-lg font-bold underline">Get Directions</a>'
                : '<div><h3>CAVI Cape Town Campus</h3>' +
                '<a href="https://www.google.com/maps/dir/?api=1&destination=Black River Park+2 Fir St, Observatory, Cape Town, 7925" target="_blank" class="text-blue-500 text-lg font-bold underline">Get Directions</a>\n'
        });
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }

    return (
        <div style={ { height: '35vh', width: '100%', padding: '24px' } }>
            <GoogleMapReact center={ { lat: lat, lng: lon } }
                            bootstrapURLKeys={ { key: GOOGLE_MAPS_API_KEY } }
                            defaultCenter={ { lat: lat, lng: lon } }
                            defaultZoom={ 12 }
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={ ({ map, maps }) => renderMarkers(map, maps) }
            >
            </GoogleMapReact>
        </div>
    );
};

export default Map;

