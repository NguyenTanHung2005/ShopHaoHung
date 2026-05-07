'use client';

import { ImageUpload } from '@/components/upload';
import { useState } from 'react';

export default function UploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Upload image</h2>
      </div>

      <ImageUpload label="Ảnh sản phẩm / avatar" onFileSelected={(file) => setFileName(file?.name ?? null)} />

      {fileName ? <p className="text-sm text-slate-600">File đã chọn: {fileName}</p> : null}
    </div>
  );
}
