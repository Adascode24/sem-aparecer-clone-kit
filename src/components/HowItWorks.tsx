
import { Copy, Download, Play } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Copy className="h-12 w-12 text-blue-500" />,
      title: "1. Copie o Link",
      description: "Copie o link do vídeo do YouTube que você quer baixar"
    },
    {
      icon: <Play className="h-12 w-12 text-green-500" />,
      title: "2. Cole e Processe",
      description: "Cole o link na caixa acima e clique em 'Baixar Agora'"
    },
    {
      icon: <Download className="h-12 w-12 text-red-500" />,
      title: "3. Baixe o Arquivo",
      description: "Escolha a qualidade e formato desejado e baixe seu vídeo"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Como Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Baixar vídeos do YouTube nunca foi tão fácil! Siga estes 3 passos simples:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mx-auto mb-6 border-4 border-gray-100">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2"></div>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              💡 Dica Importante
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Certifique-se de respeitar os direitos autorais dos criadores de conteúdo. 
              Use este serviço apenas para vídeos que você tem permissão para baixar ou para uso pessoal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
