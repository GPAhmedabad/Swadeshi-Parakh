"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { identifyProduct } from '@/ai/flows/identify-product-flow';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Camera, CameraOff, Loader, RefreshCw, Zap, Flashlight, FlashlightOff, ArrowRight } from 'lucide-react';

export default function ProductScanner() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [supportsFlashlight, setSupportsFlashlight] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionStep, setInstructionStep] = useState(1);

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
      await track.applyConstraints({
        advanced: [{ torch: !isFlashlightOn } as any]
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

    const video = videoRef.current;
    const canvas = document.createElement('canvas');

    // Calculate new dimensions (max 640px) to reduce token usage/cost
    const MAX_SIZE = 640;
    let width = video.videoWidth;
    let height = video.videoHeight;

    if (width > height) {
      if (width > MAX_SIZE) {
        height *= MAX_SIZE / width;
        width = MAX_SIZE;
      }
    } else {
      if (height > MAX_SIZE) {
        width *= MAX_SIZE / height;
        height = MAX_SIZE;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    };
    context.drawImage(video, 0, 0, width, height);

    // Use slightly lower quality (0.8) to further reduce size
    const dataUri = canvas.toDataURL('image/jpeg', 0.8);
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
    } catch (e: unknown) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Could not analyze the product image.";
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
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
        {!capturedImage && supportsFlashlight && !showInstructions && (
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

        {/* Instruction Overlay */}
        {showInstructions && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-2xl max-w-sm w-full space-y-4">
              {instructionStep === 1 ? (
                <>
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src="/images/dos-and-donts.jpeg"
                      alt="Scanning Instructions"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-base font-extrabold text-center text-gray-900 dark:text-white leading-normal drop-shadow-sm">
                      "ब्रांड का नाम स्पष्ट रूप से दिखाई दे, ऐसे स्कैन करें।"
                    </p>
                  </div>

                  <Button
                    onClick={() => setInstructionStep(2)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 group"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src="/images/dont-scan-face.jpg"
                      alt="Don't Scan Face"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400">सावधानी</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      कृपया किसी व्यक्ति का चेहरा स्कैन न करें।
                    </p>
                    <p className="text-xs text-muted-foreground">
                      यह ऐप केवल उत्पादों को स्कैन करने के लिए है।
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowInstructions(false)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 group"
                  >
                    Done
                  </Button>
                </>
              )}
            </div>
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
              {isProcessing ? <><Loader className="mr-2 h-6 w-6 animate-spin" /> Processing...</> : "Analyze"}
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleCapture}
            disabled={!hasCameraPermission || isProcessing || showInstructions}
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
