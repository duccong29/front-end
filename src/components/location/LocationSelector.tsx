"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Province {
  code: string
  name: string
}

interface District {
  code: string
  name: string
}

interface Ward {
  code: string
  name: string
}

interface LocationSelectorProps {
  onProvinceChange: (code: string) => void
  onDistrictChange: (code: string) => void
  onWardChange: (code: string) => void
  initialProvinceCode?: string
  initialDistrictCode?: string
  initialWardCode?: string
}

export default function LocationSelector({
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  initialProvinceCode,
  initialDistrictCode,
  initialWardCode,
}: LocationSelectorProps) {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [selectedWard, setSelectedWard] = useState<string>("")
  const [initialized, setInitialized] = useState(false)

  // Fetch provinces once on mount
  useEffect(() => {
    fetch("/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data)
      })
      .catch((error) => console.error("Error fetching provinces:", error))
  }, [])

  // Initialize with values from props (only once)
  useEffect(() => {
    if (!initialized && provinces.length > 0 && initialProvinceCode) {
      setSelectedProvince(initialProvinceCode)

      // Fetch districts for the initial province
      fetch(`/api/locations?provinceCode=${initialProvinceCode}`)
        .then((response) => response.json())
        .then((data) => {
          setDistricts(data.data)

          if (initialDistrictCode) {
            setSelectedDistrict(initialDistrictCode)

            // Fetch wards for the initial district
            fetch(`/api/locations?districtCode=${initialDistrictCode}`)
              .then((response) => response.json())
              .then((data) => {
                setWards(data.data)

                if (initialWardCode) {
                  setSelectedWard(initialWardCode)
                }

                setInitialized(true)
              })
              .catch((error) => console.error("Error fetching wards:", error))
          } else {
            setInitialized(true)
          }
        })
        .catch((error) => console.error("Error fetching districts:", error))
    } else if (!initialized && provinces.length > 0) {
      setInitialized(true)
    }
  }, [provinces, initialProvinceCode, initialDistrictCode, initialWardCode, initialized])

  // Handle province change by user
  const handleProvinceChange = (value: string) => {
    if (value !== selectedProvince) {
      setSelectedProvince(value)
      setSelectedDistrict("")
      setSelectedWard("")
      onProvinceChange(value)

      // Fetch districts for the selected province
      fetch(`/api/locations?provinceCode=${value}`)
        .then((response) => response.json())
        .then((data) => setDistricts(data.data))
        .catch((error) => console.error("Error fetching districts:", error))
    }
  }

  // Handle district change by user
  const handleDistrictChange = (value: string) => {
    if (value !== selectedDistrict) {
      setSelectedDistrict(value)
      setSelectedWard("")
      onDistrictChange(value)

      // Fetch wards for the selected district
      fetch(`/api/locations?districtCode=${value}`)
        .then((response) => response.json())
        .then((data) => setWards(data.data))
        .catch((error) => console.error("Error fetching wards:", error))
    }
  }

  // Handle ward change by user
  const handleWardChange = (value: string) => {
    if (value !== selectedWard) {
      setSelectedWard(value)
      onWardChange(value)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Label>Tỉnh/Thành:</Label>
        <Select value={selectedProvince} onValueChange={handleProvinceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn tỉnh/thành" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.code} value={province.code}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label>Quận/Huyện:</Label>
        <Select value={selectedDistrict} onValueChange={handleDistrictChange} disabled={!selectedProvince}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn quận/huyện" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.code} value={district.code}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label>Phường/Xã:</Label>
        <Select value={selectedWard} onValueChange={handleWardChange} disabled={!selectedDistrict}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn phường/xã" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward.code} value={ward.code}>
                {ward.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

