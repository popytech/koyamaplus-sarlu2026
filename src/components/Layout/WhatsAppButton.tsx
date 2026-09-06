import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '224625753109';
  const message = encodeURIComponent('Bonjour, je souhaite avoir plus d\'informations sur vos services.');

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-brand-red hover:bg-brand-blue text-white rounded-lg p-4 shadow-lg transition-all hover:scale-110"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
