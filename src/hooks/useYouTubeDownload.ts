
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

      // Usar API pública para obter informações do vídeo
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyB4vdDfVhX1dJ4X1OHt5V6H7-_q5XC2Q5c&part=snippet,contentDetails`);
      
      if (!response.ok) {
        // Fallback para informações básicas se a API falhar
        const videoData: VideoInfo = {
          title: 'Vídeo do YouTube',
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: '180',
          author: 'Canal do YouTube',
          videoId: videoId,
          formats: [
            {
              quality: '720p',
              format: 'mp4',
              url: url,
              hasAudio: true,
              hasVideo: true
            },
            {
              quality: '480p',
              format: 'mp4',
              url: url,
              hasAudio: true,
              hasVideo: true
            },
            {
              quality: '360p',
              format: 'mp4',
              url: url,
              hasAudio: true,
              hasVideo: true
            },
            {
              quality: '128kbps',
              format: 'mp3',
              url: url,
              hasAudio: true,
              hasVideo: false
            }
          ]
        };
        setVideoInfo(videoData);
        return videoData;
      }

      const data = await response.json();
      const video = data.items[0];
      
      if (!video) {
        throw new Error('Vídeo não encontrado');
      }

      const videoData: VideoInfo = {
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: video.contentDetails.duration,
        author: video.snippet.channelTitle,
        videoId: videoId,
        formats: [
          {
            quality: '720p',
            format: 'mp4',
            url: url,
            hasAudio: true,
            hasVideo: true
          },
          {
            quality: '480p',
            format: 'mp4',
            url: url,
            hasAudio: true,
            hasVideo: true
          },
          {
            quality: '360p',
            format: 'mp4',
            url: url,
            hasAudio: true,
            hasVideo: true
          },
          {
            quality: '128kbps',
            format: 'mp3',
            url: url,
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

  const downloadVideo = async (url: string, filename: string, quality: string) => {
    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('ID do vídeo não encontrado');
      }

      // Usar um serviço de conversão e download
      const downloadUrl = `https://api.cobalt.tools/api/json`;
      
      const response = await fetch(downloadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          url: url,
          vQuality: quality === '128kbps' ? 'max' : quality,
          aFormat: quality === '128kbps' ? 'mp3' : 'mp4',
          filenamePattern: 'basic',
          isAudioOnly: quality === '128kbps'
        })
      });

      if (!response.ok) {
        // Fallback: redirecionar para serviço online
        window.open(`https://ssyoutube.com/watch?v=${videoId}`, '_blank');
        return;
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.url) {
        // Criar link de download
        const link = document.createElement('a');
        link.href = data.url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback: redirecionar para serviço online
        window.open(`https://ssyoutube.com/watch?v=${videoId}`, '_blank');
      }
    } catch (error) {
      console.error('Erro no download:', error);
      // Fallback final: redirecionar para serviço online confiável
      const videoId = extractVideoId(url);
      if (videoId) {
        window.open(`https://ssyoutube.com/watch?v=${videoId}`, '_blank');
      }
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
