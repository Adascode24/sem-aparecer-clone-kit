
import { Download, FileVideo, Music, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoFormat {
  quality: string;
  format: string;
  url: string;
  hasAudio: boolean;
  hasVideo: boolean;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: VideoFormat[];
}

interface DownloadOptionsProps {
  videoInfo: VideoInfo;
  onDownload: (url: string, filename: string) => void;
}

const DownloadOptions = ({ videoInfo, onDownload }: DownloadOptionsProps) => {
  const formatDuration = (seconds: string) => {
    const mins = Math.floor(parseInt(seconds) / 60);
    const secs = parseInt(seconds) % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFormatIcon = (format: VideoFormat) => {
    if (format.hasVideo && format.hasAudio) {
      return <FileVideo className="h-4 w-4" />;
    } else if (format.hasAudio) {
      return <Music className="h-4 w-4" />;
    } else {
      return <Monitor className="h-4 w-4" />;
    }
  };

  const getFormatType = (format: VideoFormat) => {
    if (format.hasVideo && format.hasAudio) {
      return 'Vídeo + Áudio';
    } else if (format.hasAudio) {
      return 'Apenas Áudio';
    } else {
      return 'Apenas Vídeo';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      {/* Video Info */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b">
        <img 
          src={videoInfo.thumbnail} 
          alt={videoInfo.title}
          className="w-full md:w-48 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {videoInfo.title}
          </h3>
          <p className="text-gray-600 mb-1">Canal: {videoInfo.author}</p>
          <p className="text-gray-600">Duração: {formatDuration(videoInfo.duration)}</p>
        </div>
      </div>

      {/* Download Options */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Escolha a qualidade e formato:
        </h4>
        
        {videoInfo.formats.map((format, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {getFormatIcon(format)}
              <div>
                <span className="font-medium text-gray-800">
                  {format.quality} - {format.format.toUpperCase()}
                </span>
                <p className="text-sm text-gray-600">
                  {getFormatType(format)}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => onDownload(
                format.url, 
                `${videoInfo.title}.${format.format}`
              )}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          💡 <strong>Dica:</strong> Para áudio apenas, escolha as opções que mostram "Apenas Áudio". 
          Para vídeo completo, escolha "Vídeo + Áudio".
        </p>
      </div>
    </div>
  );
};

export default DownloadOptions;
