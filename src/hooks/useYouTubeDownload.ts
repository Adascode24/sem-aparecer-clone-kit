
import { useState } from 'react';
import ytdl from 'ytdl-core';

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
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

  const getVideoInfo = async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!ytdl.validateURL(url)) {
        throw new Error('URL do YouTube inválida');
      }

      const info = await ytdl.getInfo(url);
      const formats = info.formats
        .filter(format => format.hasAudio || format.hasVideo)
        .map(format => ({
          quality: format.qualityLabel || format.audioBitrate?.toString() || 'Desconhecida',
          format: format.container || 'mp4',
          url: format.url,
          hasAudio: format.hasAudio,
          hasVideo: format.hasVideo
        }))
        .slice(0, 10); // Limitar a 10 formatos

      const videoData: VideoInfo = {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0]?.url || '',
        duration: info.videoDetails.lengthSeconds,
        author: info.videoDetails.author.name,
        formats
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
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    loading,
    error,
    videoInfo,
    getVideoInfo,
    downloadVideo
  };
};
