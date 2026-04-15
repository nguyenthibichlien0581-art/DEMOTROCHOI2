import { useEffect, useRef, useState } from 'react';
import { FaceMesh, Results } from '@mediapipe/face_mesh';

export type Gesture = 'LEFT' | 'RIGHT' | 'NOD' | 'NONE';

export const useFaceTracking = (videoElement: HTMLVideoElement | null) => {
  const [gesture, setGesture] = useState<Gesture>('NONE');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const faceMeshRef = useRef<FaceMesh | null>(null);
  const requestRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isInitializing = useRef(false);
  
  // For nod detection
  const noseYHistory = useRef<number[]>([]);
  const lastNodTime = useRef<number>(0);

  useEffect(() => {
    if (!videoElement || isInitializing.current) return;

    isInitializing.current = true;
    let active = true;

    const detect = async () => {
      if (!active) return;

      // 1. Sửa lỗi đứt vòng lặp: Bắt buộc gọi lại requestAnimationFrame để duy trì vòng lặp chờ
      if (!faceMeshRef.current || !videoElement) {
        requestRef.current = requestAnimationFrame(detect);
        return;
      }

      // 2. Kiểm tra kích thước khung hình an toàn
      if (videoElement.readyState >= 2 && videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        try {
          // 4. Bắt lỗi (Error Handling): Bọc trong try...catch để không làm sập luồng nhận diện
          await faceMeshRef.current.send({ image: videoElement });
        } catch (err) {
          console.error('AI Detection Frame Error:', err);
        }
      }

      requestRef.current = requestAnimationFrame(detect);
    };

    const initialize = async () => {
      try {
        const faceMesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMesh.onResults((results: Results) => {
          if (!active) return;
          if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
            setGesture('NONE');
            return;
          }

          const landmarks = results.multiFaceLandmarks[0];
          
          // 1. Roll detection (Tilt Left/Right)
          const leftEye = landmarks[33];
          const rightEye = landmarks[263];
          
          const dx = rightEye.x - leftEye.x;
          const dy = rightEye.y - leftEye.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          // 2. Nod detection
          const noseTip = landmarks[1];
          noseYHistory.current.push(noseTip.y);
          if (noseYHistory.current.length > 10) {
            noseYHistory.current.shift();
          }

          const now = Date.now();
          if (now - lastNodTime.current > 1000) {
            const minY = Math.min(...noseYHistory.current);
            const maxY = Math.max(...noseYHistory.current);
            const diff = maxY - minY;
            
            if (diff > 0.05) {
              setGesture('NOD');
              lastNodTime.current = now;
              return;
            }
          }

          if (angle > 15) {
            setGesture('RIGHT');
          } else if (angle < -15) {
            setGesture('LEFT');
          } else {
            setGesture('NONE');
          }
        });

        faceMeshRef.current = faceMesh;

        // Khởi tạo Camera thủ công để kiểm soát luồng tốt hơn
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false
        });
        
        if (!active) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        videoElement.srcObject = stream;
        
        // Đảm bảo video bắt đầu phát
        await videoElement.play().catch(err => {
          console.warn('Autoplay prevented or video play error:', err);
        });

        // Bắt đầu vòng lặp nhận diện
        requestRef.current = requestAnimationFrame(detect);
        
        if (active) {
          setIsLoaded(true);
          setError(null);
        }
      } catch (err) {
        console.error('Face tracking initialization failed:', err);
        if (active) {
          setError(err instanceof Error ? err.message : 'Không thể truy cập Camera. Vui lòng kiểm tra quyền truy cập.');
          setIsLoaded(false);
        }
      } finally {
        isInitializing.current = false;
      }
    };

    initialize();

    return () => {
      active = false;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
      }
      isInitializing.current = false;
    };
  }, [videoElement]);

  return { gesture, isLoaded, error };
};
