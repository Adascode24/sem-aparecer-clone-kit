
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Play, Music, FileVideo, Smartphone, Monitor, Loader2 } from 'lucide-react';
import { useYouTubeDownload } from '@/hooks/useYouTubeDownload';
import DownloadOptions from './DownloadOptions';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [url, setUrl] = useState('');
  const { loading, error, videoInfo, getVideoInfo, downloadVideo } = useYouTubeDownload();
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um link do YouTube",
        variant: "destructive"
      });
      return;
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      toast({
        title: "Erro",
        description: "Por favor, insira um link válido do YouTube",
        variant: "destructive"
      });
      return;
    }

    try {
      await getVideoInfo(url);
      toast({
        title: "Sucesso!",
        description: "Vídeo carregado com sucesso. Escolha o formato para download."
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o vídeo. Verifique o link e tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleVideoDownload = (downloadUrl: string, filename: string) => {
    downloadVideo(downloadUrl, filename);
    toast({
      title: "Download iniciado!",
      description: "O download do arquivo foi iniciado."
    });
  };

  return (
    <section id="inicio" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Baixe Vídeos do YouTube
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A maneira mais fácil e rápida de baixar seus vídeos favoritos do YouTube em alta qualidade
          </p>
        </div>

        {/* Download Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16 max-w-4xl mx-auto border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              type="url"
              placeholder="Cole o link do YouTube aqui... (exemplo: https://youtube.com/watch?v=...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-12 text-lg border-2 border-gray-200 focus:border-red-500"
              disabled={loading}
            />
            <Button
              onClick={handleDownload}
              disabled={loading}
              className="h-12 px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Analisar Vídeo
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            ✓ Grátis para sempre • ✓ Sem registro necessário • ✓ Downloads ilimitados
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Download Options */}
        {videoInfo && (
          <div className="mb-16">
            <DownloadOptions 
              videoInfo={videoInfo} 
              onDownload={handleVideoDownload}
            />
          </div>
        )}

        {/* Format Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4">
              <FileVideo className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Vídeo MP4</h3>
            <p className="text-gray-600 text-center">Baixe em qualidade HD, Full HD ou 4K</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
              <Music className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Áudio MP3</h3>
            <p className="text-gray-600 text-center">Extraia apenas o áudio em alta qualidade</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
              <Smartphone className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Para Mobile</h3>
            <p className="text-gray-600 text-center">Formatos otimizados para celular</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>+1M Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Sem Vírus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
