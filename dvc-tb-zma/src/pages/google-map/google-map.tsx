import './google-map.scss'

import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Box, Button, Icon, Input, Page, Text, useLocation, useNavigate, useSnackbar } from 'zmp-ui'

import MapController, { Poi } from '@/components/map-controller'
import useUserLocation from '@/hooks/use-user-location'
import DefaultHeader from '@/layouts/default-header'
import { cn } from '@/utils/string-handler'
import { useMap } from '@vis.gl/react-google-maps'

const GoogleMapPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const map = useMap()

  const { openSnackbar } = useSnackbar()

  const {
    userLocation,
    isLoading: loadingUserLocation,
    refetch: refetchUserLocation,
    error,
  } = useUserLocation({ autoFetch: false })

  const [locations, setLocations] = useState<Poi[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [searchAddress, setSearchAddress] = useState<string>('')
  const [dropdownItems, setDropdownItems] = useState<ISearchAddress[]>([])
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)

  const debouncedSearchAddress = useDebounceValue(searchAddress, 1000)

  const handleGetCurrentLocation = (): void => {
    refetchUserLocation()
    openSnackbar({
      text: 'Đang lấy vị trí hiện tại của bạn...',
      type: 'info',
      duration: 2000,
    })
  }

  const handleSubmitAddress = (): void => {
    if (locations.length === 0 || !locations[0]?.location) {
      openSnackbar({
        text: 'Vui lòng chọn một vị trí trên bản đồ',
        type: 'error',
        duration: 3000,
      })
      return
    }

    if (!selectedAddress.trim()) {
      openSnackbar({
        text: 'Vui lòng nhập địa chỉ',
        type: 'error',
        duration: 3000,
      })
      return
    }

    if ('/phan-anh-kien-nghi/form' === location.state?.data.from) {
      navigate(`/phan-anh-kien-nghi/form`, {
        state: {
          data: {
            latLng: {
              lat: locations[0].location.lat,
              lng: locations[0].location.lng,
            },
            typePhanAnh: location.state?.data.typePhanAnh,
            address: selectedAddress,
            email: location.state?.data.email,
            description: location.state?.data.description,
            fileUploads: location.state?.data.fileUploads,
          },
        },
        replace: true,
      })
    } else {
      navigate('/job-posting/form', {
        state: {
          data: {
            latLng: {
              lat: locations[0].location.lat,
              lng: locations[0].location.lng,
            },
            address: selectedAddress,
            company: location.state?.data.company,
            description: location.state?.data.description,
            taxCode: location.state?.data.taxCode,
            title: location.state?.data.title,
          },
        },
        replace: true,
      })
    }
  }

  const handleSelectedLocation = (lat?: number, lng?: number): void => {
    if (!lat || !lng) return
    const latLng = new google.maps.LatLng(lat, lng)

    handleGeocode({ location: latLng }, 'Không tìm thấy địa chỉ cho vị trí này.', (results) => {
      if (results && results.length > 0) {
        const address = results[0].formatted_address

        // Set the selected address and update locations
        setSelectedAddress(address)
        if (lat && lng) {
          setLocations([{ key: 'selected-location', location: { lat, lng } }])
        }
      }
    })
  }

  const handleGeocode = (
    request: google.maps.GeocoderRequest,
    errorText?: string,
    callBack?: (results: google.maps.GeocoderResult[]) => void,
    callBackError?: () => void,
  ): void => {
    if (!map) return

    if (typeof google !== 'undefined' && google.maps) {
      const geocoder = new google.maps.Geocoder()

      // Use the geocoder to get the address from the latLng
      geocoder.geocode(request, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          callBack && callBack(results)
        } else {
          callBackError && callBackError()
          if (errorText) {
            openSnackbar({
              text: errorText,
              type: 'error',
              duration: 3000,
            })
          }
        }
      })
    }
  }

  // Effect to handle user location and geocoding
  useEffect(() => {
    if (loadingUserLocation) return
    if (error) {
      openSnackbar({
        text: 'Vui lòng cấp quyền truy cập vị trí để hiển thị vị trí của bạn trên bản đồ.',
        type: 'info',
        duration: 5000,
      })
      return
    }

    if (userLocation) {
      handleSelectedLocation(userLocation.lat, userLocation.lng)

      map?.setCenter(userLocation)
      map?.setZoom(16)
    }
  }, [userLocation, loadingUserLocation, error])

  // Effect to handle search address and geocoding
  useEffect(() => {
    if (!debouncedSearchAddress[0]) {
      setDropdownItems([])
      setLoadingSearch(false)
      return
    }

    handleGeocode(
      { address: debouncedSearchAddress[0] },
      '',
      (results) => {
        if (results && results.length > 0) {
          const items: ISearchAddress[] = results.map((result) => ({
            address: result.formatted_address,
            location: result.geometry.location.toJSON(),
          }))

          setDropdownItems(items)
        }
      },
      () => {
        setDropdownItems([])
      },
    )
    setLoadingSearch(false)
  }, [debouncedSearchAddress[0]])

  useEffect(() => {
    const lat = location.state.data.latLng?.lat
    const lng = location.state.data.latLng?.lng
    const addr = location.state.data.address

    // If any required parameter is missing, fetch user location
    if (!lat || !lng || !addr) {
      refetchUserLocation()
      return
    }

    // Parse coordinates with validation
    const parsedLat = parseFloat(lat)
    const parsedLng = parseFloat(lng)

    // Validate parsed coordinates
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      refetchUserLocation()
      return
    }

    // Update location and address
    setLocations([{ key: 'selected-location', location: { lat: parsedLat, lng: parsedLng } }])
    setSelectedAddress(addr)

    // Use timeout to ensure map is fully loaded before setting center and zoom
    const timeoutId = setTimeout(() => {
      if (map) {
        map.setCenter({ lat: parsedLat, lng: parsedLng })
        map.setZoom(16)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Page className='bg-white'>
      <DefaultHeader title='Bản đồ' showBackIcon={false} />
      <Box className='!pt-4' />
      <MapController
        locations={locations}
        onSelectedLocation={handleSelectedLocation}
        onGetCurrentLocation={handleGetCurrentLocation}
      />
      <Box id='search-input' className='absolute top-14 left-0 w-full !px-5'>
        <SearchInputMapCustom
          loading={loadingSearch}
          value={searchAddress}
          dropdownItems={dropdownItems}
          onChange={(val) => {
            setLoadingSearch(true)
            setSearchAddress(val)
          }}
          onSelect={(item) => {
            setSearchAddress(item.address)
            setSelectedAddress(item.address)
            setLocations([{ key: 'selected-location', location: item.location }])
            map?.setCenter(item.location)
            map?.setZoom(16)
          }}
        />
      </Box>
      <SelectedAddressSheet address={selectedAddress} setAddress={setSelectedAddress} onSubmit={handleSubmitAddress} />
    </Page>
  )
}

interface SelectedAddressSheetProps {
  address: string
  setAddress: (address: string) => void
  onSubmit?: () => void
}
const SelectedAddressSheet: React.FC<SelectedAddressSheetProps> = ({ address, setAddress, onSubmit }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <Box className='absolute bottom-0 left-0 w-full bg-sky-600'>
      <Box
        flex
        justifyContent='space-between'
        alignContent='center'
        className='!py-3 !px-5 border-b-[1px] border-gray-200 active:opacity-80'
        onClick={() => {
          setIsCollapsed(!isCollapsed)
        }}
      >
        <Text size='large' className='!font-medium text-white'>
          Địa chỉ đã chọn
        </Text>
        <Box>
          <Icon
            className={`transform transition-transform duration-200 text-white ${!isCollapsed ? 'rotate-180' : ''}`}
            icon='zi-chevron-up'
            size={28}
          />
        </Box>
      </Box>
      <Box
        className={cn(!isCollapsed ? 'scale-in-ver-bottom' : 'scale-out-ver-bottom', '!px-5 bg-white content-center')}
      >
        <Box>
          <Input
            required
            clearable
            placeholder='Địa chỉ đã chọn'
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          />
          <Button size='medium' className='!rounded-lg !mt-5 w-full' onClick={onSubmit}>
            Hoàn tất
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

interface ISearchAddress {
  address: string
  location: google.maps.LatLngLiteral
}

interface SearchInputMapCustomProps {
  value: string
  dropdownItems?: ISearchAddress[]
  loading?: boolean
  onChange?: (value: string) => void
  onSelect?: (item: ISearchAddress) => void
}
const SearchInputMapCustom: React.FC<SearchInputMapCustomProps> = ({
  value,
  dropdownItems,
  loading,
  onChange,
  onSelect,
}) => {
  return (
    <Box>
      <Input.Search
        clearable
        className='!rounded-full pl-2'
        placeholder='Tìm kiếm địa chỉ'
        size='medium'
        enterKeyHint='search'
        onChange={(event) => onChange?.(event.target.value)}
        value={value}
        loading={loading}
      />
      {value.length > 0 && (
        <Box className='bg-white !rounded-lg !px-3 !py-2 max-h-[70vh] overflow-y-auto'>
          {dropdownItems && dropdownItems?.length === 0 ? (
            <Text className='py-2 text-gray-500'>Không tìm thấy trên Google Maps</Text>
          ) : (
            <>
              {dropdownItems?.map((item) => (
                <Box
                  key={item.address}
                  flex
                  alignContent='center'
                  className='w-full active:bg-gray-100'
                  onClick={() => onSelect?.(item)}
                >
                  <Box className='bg-gray-200 !rounded-full !p-1 !mr-3'>
                    <Icon className='text-gray-700' icon='zi-location' />
                  </Box>
                  <Box
                    flex
                    justifyContent='space-between'
                    alignContent='center'
                    className='flex-1 border-b-2 border-gray-200 !py-2'
                  >
                    <Box>
                      <Text className='!font-medium text-gray-800'>{item.address.split(',')[0]}</Text>
                      <Text className='truncate w-60 mt-1 text-gray-500' size='xxSmall'>
                        {item.address}
                      </Text>
                    </Box>
                    <Box className='!pr-3'>
                      <Icon className='-rotate-45 !font-extrabold text-gray-700' icon='zi-arrow-up' size={20} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
export default GoogleMapPage
