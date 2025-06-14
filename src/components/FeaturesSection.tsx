
import { Shield, Zap, Heart, Globe, Download, Smartphone } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Super Rápido",
      description: "Downloads em alta velocidade sem espera"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "100% Seguro",
      description: "Sem vírus, malware ou arquivos perigosos"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Totalmente Grátis",
      description: "Sem taxas ocultas ou assinaturas"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Todos os Formatos",
      description: "MP4, MP3, AVI, MOV e muito mais"
    },
    {
      icon: <Download className="h-8 w-8 text-purple-500" />,
      title: "Alta Qualidade",
      description: "Mantenha a qualidade original do vídeo"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-pink-500" />,
      title: "Multi Dispositivo",
      description: "Funciona em PC, celular e tablet"
    }
  ];

  return (
    <section id="recursos" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Por que escolher o TubeBaixar?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A ferramenta mais confiável e completa para baixar vídeos do YouTube
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Experimente agora mesmo - é completamente grátis!
            </p>
            <button className="bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
