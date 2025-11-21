// src/components/QrScanner.tsx

import React, { useState, useEffect, useRef } from "react";
import {
  Html5Qrcode,
  Html5QrcodeResult,
  CameraDevice,
  Html5QrcodeCameraScanConfig,
} from "html5-qrcode";

const QrScanner: React.FC = () => {
  // State to store the list of camera devices
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  // State to store the ID of the selected camera
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  // State to store the result of the scan
  const [scanResult, setScanResult] = useState<string | null>(null);
  // State for cooldown message
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  // Ref to hold the Html5Qrcode instance
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  // Ref to store last scan time
  const lastScanTimeRef = useRef<number>(0);

  // Minimum time between scans (in ms)
  const SCAN_INTERVAL = 3000; // 3 seconds

  // The ID of the element where the video feed will be rendered
  const qrReaderElementId: string = "qr-reader";

  // Effect to handle what happens after a successful scan
  useEffect(() => {
    if (!scanResult) return;

    const date = new Date();
    const dates = date.toDateString();
    const code = scanResult.slice(0, 6);
    const idno = scanResult.slice(7, 18);

    alert(dates);
    alert(code);
    alert(idno);
    console.log(dates, scanResult);
  }, [scanResult]);

  // Effect to get camera devices on component mount
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((availableDevices: CameraDevice[]) => {
        if (availableDevices && availableDevices.length > 0) {
          setDevices(availableDevices);
          setSelectedDeviceId(availableDevices[0].id);
        }
      })
      .catch((err: any) => {
        console.error("Error getting camera devices:", err);
      });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current
          .stop()
          .then(() => console.log("QR Scanner stopped on component unmount."))
          .catch((err: any) =>
            console.error("Error stopping QR Scanner on unmount:", err)
          );
      }
    };
  }, []);

  // Start scanning
  const handleStart = () => {
    if (!selectedDeviceId) {
      alert("Please select a camera.");
      return;
    }

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrReaderElementId);
    }

    setScanResult(null);

    const config: Html5QrcodeCameraScanConfig = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    // Success callback with cooldown
    const qrCodeSuccessCallback = (
      decodedText: string,
      decodedResult: Html5QrcodeResult
    ) => {
      const now = Date.now();

      // Skip if last scan was too recent
      if (now - lastScanTimeRef.current < SCAN_INTERVAL) {
        if (!isCoolingDown) {
          setIsCoolingDown(true);
          setTimeout(() => setIsCoolingDown(false), SCAN_INTERVAL);
        }
        return;
      }

      lastScanTimeRef.current = now;

      console.log(`Scan successful: ${decodedText}`, decodedResult);
      setScanResult(decodedText);

      // Example: send to API (optional)
      /*
      fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr: decodedText }),
      }).catch((err) => console.error("Error sending scan:", err));
      */
    };

    // Error callback
    const qrCodeErrorCallback = (errorMessage: string) => {
      if (!errorMessage.includes("QR code not found")) {
        console.warn(`QR Scanner Error: ${errorMessage}`);
      }
    };

    html5QrCodeRef.current
      .start(selectedDeviceId, config, qrCodeSuccessCallback, qrCodeErrorCallback)
      .catch((err: any) => {
        console.error("Error starting scanner:", err);
        alert(`Error starting scanner: ${(err as Error).message}`);
      });
  };

  // Stop scanning
  const handleStop = () => {
    const scanner = html5QrCodeRef.current;
    if (scanner && scanner.isScanning) {
      scanner
        .stop()
        .then(() => console.log("Scanner stopped successfully."))
        .catch((err: any) => console.error("Error stopping scanner:", err));
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
      <h2>QR Code Scanner</h2>

      {/* Camera Selection */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="camera-select">Choose a camera: </label>
        <select
          id="camera-select"
          value={selectedDeviceId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedDeviceId(e.target.value)
          }
          disabled={!devices.length}
        >
          {devices.map((device: CameraDevice) => (
            <option key={device.id} value={device.id}>
              {device.label || `Camera ${device.id}`}
            </option>
          ))}
        </select>
      </div>

      {/* Live Feed */}
      <div
        id={qrReaderElementId}
        style={{
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></div>

      {/* Controls */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleStart} style={{ marginRight: "10px" }}>
          Start Scan
        </button>
        <button onClick={handleStop}>Stop Scan</button>
      </div>

      {/* Cooldown message */}
      {isCoolingDown && (
        <p style={{ color: "orange", marginTop: "10px" }}>
          Please wait before next scan...
        </p>
      )}

      {/* Result */}
      {scanResult && (
        <div style={{ marginTop: "20px", wordBreak: "break-all" }}>
          <h4>Last Scan Result:</h4>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
