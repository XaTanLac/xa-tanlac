import React from 'react'

import { AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps'
import { Box, Button, Icon } from 'zmp-ui'

export type Poi = { key: string; location: google.maps.LatLngLiteral }

interface MapControllerProps {
  locations?: Poi[]
  mapId?: string
  onSelectedLocation?: (lat?: number, lng?: number) => void
  onGetCurrentLocation?: () => void
}

const MapController: React.FC<MapControllerProps> = (props) => {
  return (
    <Map
      mapId={props.mapId ?? 'map-id'}
      style={{ width: '100%', height: '88vh' }}
      defaultCenter={{ lat: 16, lng: 106 }}
      defaultZoom={5}
      gestureHandling='greedy'
      disableDefaultUI={true}
      controlSize={40}
      fullscreenControl
      fullscreenControlOptions={{ position: 22 }}
      zoomControl
      zoomControlOptions={{ position: 9 }}
      onClick={(e) => {
        const latLng = e?.detail.latLng
        const lat = latLng?.lat
        const lng = latLng?.lng
        props.onSelectedLocation?.(lat, lng)
      }}
    >
      <PoiMarkers pois={props.locations || []} />
      <Box className='absolute bottom-44 right-2 flex justify-center'>
        <Box
          className='!w-fit !p-3 bg-white rounded-full shadow-md active:bg-gray-200'
          onClick={props.onGetCurrentLocation}
        >
          <Icon className='text-gray-600' icon='zi-radio-checked' size={20} />
        </Box>
      </Box>
    </Map>
  )
}

const PoiMarkers: React.FC<{ pois: Poi[] }> = (props) => {
  return (
    <div>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker className='animation-bounce' key={poi.key} position={poi.location}>
          <Pin />
        </AdvancedMarker>
      ))}
    </div>
  )
}

export default MapController
