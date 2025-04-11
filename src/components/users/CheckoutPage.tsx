"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface Suggestion {
  place_id: string;
  description: string;
  compound?: {
    province?: string;
    district?: string;
    commune?: string;
  };
}

const apiKey = "vyYBQQ9k6jT97B6IGJmUpp3KFKaLNlovKcH7sUYz   "; // Thay bằng API Key hợp lệ

const CheckoutPage: React.FC = () => {
  const [address, setAddress] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [sessionToken, setSessionToken] = useState(crypto.randomUUID());

  const fetchSuggestions = async (query: string) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=${apiKey}&input=${encodeURIComponent(
          query
        )}&sessiontoken=${sessionToken}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        setSuggestions(data.predictions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Lỗi khi gọi AutoComplete API:", error);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/place/detail?place_id=${encodeURIComponent(
          placeId
        )}&api_key=${apiKey}`
      );
      const data = await response.json();

      if (data.result) {
        const { province, district, commune } = data.result.compound || {};
        setProvince(province || "Chưa có dữ liệu");
        setDistrict(district || "Chưa có dữ liệu");
        setCommune(commune || "Chưa có dữ liệu");
      } else {
        console.error("Không tìm thấy chi tiết địa chỉ");
      }
    } catch (error) {
      console.error("Lỗi khi gọi Place Detail API:", error);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setAddress(suggestion.description);
    setShowSuggestions(false);

    // Gọi API lấy chi tiết địa chỉ
    fetchPlaceDetails(suggestion.place_id);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tìm kiếm địa chỉ</h1>
      <div className="space-y-4">
        {/* Input địa chỉ */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Địa chỉ
          </label>
          <Input
            id="address"
            placeholder="Nhập địa chỉ của bạn"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              fetchSuggestions(e.target.value);
            }}
          />
          {/* Gợi ý */}
          {showSuggestions && (
            <div className="absolute z-10 bg-white border rounded-md shadow-md w-full mt-1">
              {suggestions.map((suggestion: Suggestion) => (
                <div
                  key={suggestion.place_id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Select tỉnh */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tỉnh/Thành phố
          </label>
          <select
            className="w-full mt-1 p-2 border rounded-md"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">{province || "Chưa có dữ liệu"}</option>
          </select>
        </div>

        {/* Select quận/huyện */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quận/Huyện
          </label>
          <select
            className="w-full mt-1 p-2 border rounded-md"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">{district || "Chưa có dữ liệu"}</option>
          </select>
        </div>

        {/* Select phường/xã */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phường/Xã
          </label>
          <select
            className="w-full mt-1 p-2 border rounded-md"
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
          >
            <option value="">{commune || "Chưa có dữ liệu"}</option>
          </select>
        </div>

        {/* Submit */}
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          onClick={() => alert("Thông tin địa chỉ đã được lưu!")}
        >
          Lưu địa chỉ
        </button>
      </div>
    </div>
  );
};
export default CheckoutPage;
