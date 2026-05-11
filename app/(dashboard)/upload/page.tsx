'use client';

import { Badge, Button } from '@/components/common';
import { useState } from 'react';

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📸 Upload Files</h2>
        <p className="mt-2 text-slate-600">Tải lên ảnh sản phẩm, avatar hoặc các tài liệu cần thiết khác.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{uploadedFiles.length}</div>
          <div className="text-sm text-slate-600">Files uploaded</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-green-600">100%</div>
          <div className="text-sm text-slate-600">Success rate</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-amber-600">512 MB</div>
          <div className="text-sm text-slate-600">Storage used</div>
        </div>
      </div>

      <div
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-4xl mb-2">📁</div>
        <p className="text-lg font-semibold text-slate-900 mb-2">Kéo thả tệp ở đây</p>
        <p className="text-sm text-slate-600 mb-4">hoặc chọn từ máy tính</p>
        <label>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <Button variant="primary" size="sm" onClick={(e) => e.currentTarget.parentElement?.querySelector('input')?.click()}>
            Chọn file
          </Button>
        </label>
        <p className="text-xs text-slate-500 mt-4">Hỗ trợ: JPG, PNG, PDF, DOC, DOCX (Max 50 MB mỗi file)</p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">📋 Danh sách files</h3>
          </div>
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Filename</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Size</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {uploadedFiles.map((file, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-950">{file.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{file.type.split('/')[1] || 'unknown'}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{(file.size / 1024 / 1024).toFixed(2)} MB</td>
                  <td className="px-4 py-4">
                    <Badge variant="success">✅ Ready</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-5 border-t border-slate-200 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setUploadedFiles([])}>
              Clear All
            </Button>
            <Button variant="primary" disabled={uploadedFiles.length === 0}>
              Upload Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
