import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  label?: string;
  accentColor?: 'emerald' | 'blue';
}

export default function ImageUpload({
  images,
  onChange,
  multiple = false,
  label = 'Image',
  accentColor = 'emerald',
}: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accent = accentColor === 'blue'
    ? { border: 'border-brand-blue', bg: 'bg-brand-blue/5', text: 'text-brand-blue' }
    : { border: 'border-brand-red', bg: 'bg-brand-red/5', text: 'text-brand-red' };

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target!.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    const base64s = await Promise.all(imageFiles.map(readFile));
    onChange(multiple ? [...images, ...base64s] : [base64s[0]]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div
        role="button"
        tabIndex={0}
        aria-label={`Zone d'upload — ${label}`}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragging
            ? `${accent.border} ${accent.bg}`
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
        <p className="text-sm text-gray-600">
          Glissez-déposez {multiple ? 'des images' : 'une image'} ici ou{' '}
          <span className={`${accent.text} font-medium`}>cliquez pour parcourir</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG, WEBP</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {images.map((src, i) => (
            <div key={i} className="relative group">
              <img
                src={src}
                alt={`Aperçu ${i + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-brand-red text-white rounded-lg p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Supprimer l'image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
