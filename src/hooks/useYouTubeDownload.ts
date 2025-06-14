
import { useState } from 'react';

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  videoId: string;
  formats: Array<{
    quality: string;
    format: string;
    url: string;
    hasAudio: boolean;
    hasVideo: boolean;
  }>;
}

export const useYouTubeDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const validateURL = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getVideoInfo = async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!validateURL(url)) {
        throw new Error('URL do YouTube inválida');
      }

      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Não foi possível extrair o ID do vídeo');
      }

      // Simular informações do vídeo (em produção, você usaria uma API backend)
      const videoData: VideoInfo = {
        title: 'Vídeo do YouTube',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: '180', // 3 minutos
        author: 'Canal do YouTube',
        videoId: videoId,
        formats: [
          {
            quality: '720p',
            format: 'mp4',
            url: `https://youtube.com/watch?v=${videoId}`,
            hasAudio: true,
            hasVideo: true
          },
          {
            quality: '480p',
            format: 'mp4',
            url: `https://youtube.com/watch?v=${videoId}`,
            hasAudio: true,
            hasVideo: true
          },
          {
            quality: '360p',
            format: 'mp4',
            url: `https://youtube.com/watch?v=${videoId}`,
            hasAudio: true,
            hasVideo: true
          },
          {
            quality: '128kbps',
            format: 'mp3',
            url: `https://youtube.com/watch?v=${videoId}`,
            hasAudio: true,
            hasVideo: false
          }
        ]
      };

      setVideoInfo(videoData);
      return videoData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar vídeo';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = (url: string, filename: string) => {
    // Para downloads reais, você precisaria de um serviço backend
    // Por enquanto, vamos redirecionar para um serviço de download online
    const videoId = extractVideoId(url);
    if (videoId) {
      // Redirecionar para um serviço de download de YouTube
      window.open(`https://ytmp3.cc/youtube-to-mp3/?q=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return {
    loading,
    error,
    videoInfo,
    getVideoInfo,
    downloadVideo
  };
};
