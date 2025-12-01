"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { identifyProduct } from '@/ai/flows/identify-product-flow';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Camera, CameraOff, Loader, RefreshCw, Zap, Flashlight, FlashlightOff } from 'lucide-react';

export default function ProductScanner() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [supportsFlashlight, setSupportsFlashlight] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (capturedImage) return; // Don't re-request if we have an image
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
          }
        });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Check for flashlight support
        const track = stream.getVideoTracks()[0];
        // @ts-ignore - getCapabilities is not yet in the standard TS lib for MediaStreamTrack
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        if ('torch' in capabilities) {
          setSupportsFlashlight(true);
        }

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast, capturedImage]);

  const toggleFlashlight = async () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    const stream = videoRef.current.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];

    try {
      // @ts-ignore - torch is not in standard constraints
      await track.applyConstraints({
        advanced: [{ torch: !isFlashlightOn }]
      });
      setIsFlashlightOn(!isFlashlightOn);
    } catch (err) {
      console.error("Error toggling flashlight:", err);
      toast({
        variant: "destructive",
        title: "Flashlight Error",
        description: "Could not toggle flashlight.",
      });
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    };
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUri);
    setIsFlashlightOn(false); // Reset flashlight state

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    setIsProcessing(true);

    try {
      const result = await identifyProduct({ photoDataUri: capturedImage });

      // Store image in sessionStorage to avoid long URLs
      sessionStorage.setItem('scannedImage', capturedImage);

      const encodedData = btoa(JSON.stringify(result));
      // URL-safe base64 encoding
      const safeEncodedData = encodedData.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      router.push(`/product/${safeEncodedData}`);
    } catch (e: any) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: e.message || "Could not analyze the product image.",
      });
      setIsProcessing(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsProcessing(false);
    setHasCameraPermission(null); // To re-trigger useEffect for camera
    setIsFlashlightOn(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border rounded-lg overflow-hidden relative flex flex-col items-center justify-center aspect-[9/12]">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured product" className="w-full h-full object-cover" />
        ) : (
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
        )}

        {/* Flashlight Button */}
        {!capturedImage && supportsFlashlight && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 rounded-full transition-all duration-300 ${isFlashlightOn ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-black/40 text-white hover:bg-black/60'}`}
            onClick={toggleFlashlight}
          >
            {isFlashlightOn ? <FlashlightOff className="h-6 w-6" /> : <Flashlight className="h-6 w-6" />}
          </Button>
        )}

        {hasCameraPermission === null && !capturedImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground bg-background/80">
            <Loader className="animate-spin h-10 w-10" />
            <p>Starting camera...</p>
          </div>
        )}
        {hasCameraPermission === false && !capturedImage && (
          <Alert variant="destructive" className="absolute bottom-4 m-4">
            <CameraOff className="h-4 w-4" />
            <AlertTitle>Camera Error</AlertTitle>
            <AlertDescription>Camera access is required. Please allow access in your browser settings.</AlertDescription>
          </Alert>
        )}
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-primary-foreground bg-black/50 backdrop-blur-sm">
            <Zap className="animate-pulse h-12 w-12" />
            <p className="text-lg font-semibold">Analyzing Product...</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        {capturedImage ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleRetake}
              disabled={isProcessing}
              className="h-14 text-lg"
            >
              <RefreshCw className="mr-2 h-6 w-6" />
              Retake
            </Button>
            <Button
              onClick={handleAnalyze}
              disabled={isProcessing}
              className="h-14 text-lg"
            >
              {isProcessing ? <><Loader className="mr-2 h-6 w-6 animate-spin" /> Processing...</> : <><Zap className="mr-2 h-6 w-6" /> Analyze</>}
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleCapture}
            disabled={!hasCameraPermission || isProcessing}
            className="w-full h-14 text-lg"
          >
            <Camera className="mr-2 h-6 w-6" />
            Capture Image
          </Button>
        )}
      </div>
    </div>
  );
}
