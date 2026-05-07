'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Button } from '@/components/common';
import { formatFileSize } from '@/lib/utils/format';

interface ImageUploadProps {
  label: string;
  accept?: string;
  maxSizeMB?: number;
  previewClassName?: string;
  onFileSelected?: (file: File | null) => void;
}

export function ImageUpload({
  label,
  accept = 'image/png,image/jpeg,image/webp,image/svg+xml',
  maxSizeMB = 2,
  previewClassName = '',
  onFileSelected,
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const info = useMemo(() => {
    if (!file) {
      return null;
    }

    return `${formatFileSize(file.size)} • ${file.type || 'unknown'}`;
  }, [file]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    if (!nextFile) {
      setFile(null);
      onFileSelected?.(null);
      return;
    }

    const allowedTypes = accept.split(',').map((item) => item.trim());
    const isAllowedType = allowedTypes.includes(nextFile.type);
    const isAllowedSize = nextFile.size <= maxSizeMB * 1024 * 1024;

    if (!isAllowedType) {
      setError('File type không hợp lệ');
      setFile(null);
      onFileSelected?.(null);
      return;
    }

    if (!isAllowedSize) {
      setError(`Dung lượng tối đa ${maxSizeMB}MB`);
      setFile(null);
      onFileSelected?.(null);
      return;
    }

    setError(null);
    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
    onFileSelected?.(nextFile);
  };

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
            <p className="mt-1 text-sm text-slate-500">Tải ảnh lên để preview trước khi lưu.</p>
          </div>
          <Badge variant="primary">Preview</Badge>
        </div>

        <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
          Chọn file
          <input className="hidden" type="file" accept={accept} onChange={handleChange} />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {info ? <p className="text-sm text-slate-500">{info}</p> : null}

        {previewUrl ? (
          <div className={`overflow-hidden rounded-2xl bg-slate-50 ${previewClassName}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt={file?.name ?? 'Preview'} className="h-72 w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500">
            Chưa có ảnh preview
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => { setFile(null); setError(null); onFileSelected?.(null); }}>
            Xóa ảnh
          </Button>
          <span className="text-xs text-slate-500">Cho phép: PNG, JPG, WEBP, SVG</span>
        </div>
      </div>
    </div>
  );
}
