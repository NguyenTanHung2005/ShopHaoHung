'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { paymentGuide, racketGuide } from './content';

export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState<'payment' | 'racket' | 'purchase'>('payment');

  const tabs = [
    { id: 'payment', label: 'Hướng dẫn thanh toán', icon: '💳' },
    { id: 'racket', label: 'Hướng dẫn chọn vợt', icon: '🏸' },
    { id: 'purchase', label: 'Luồng mua hàng', icon: '🛒' },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Trung tâm hướng dẫn
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Khám phá các hướng dẫn chi tiết để có trải nghiệm mua sắm và lựa chọn sản phẩm thể thao tốt nhất tại ShopHaoHung.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR TABS */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 sticky top-24">
              <nav className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 shadow-inner'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 min-h-[600px]">
              
              {activeTab === 'payment' && (
                <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {paymentGuide}
                  </ReactMarkdown>
                </article>
              )}

              {activeTab === 'racket' && (
                <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-strong:text-emerald-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {racketGuide}
                  </ReactMarkdown>
                </article>
              )}

              {activeTab === 'purchase' && (
                <div className="animate-in fade-in duration-500">
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Quy trình mua hàng</h2>
                    <p className="text-slate-600">Luồng đặt hàng tiêu chuẩn và nhanh chóng tại ShopHaoHung</p>
                  </div>

                  <div className="relative max-w-2xl mx-auto py-8">
                    {/* Vertical connecting line */}
                    <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-blue-100 -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-8 relative">
                      {/* STEP 1 */}
                      <div className="flex flex-col md:flex-row items-center gap-6 group">
                        <div className="md:w-1/2 flex md:justify-end w-full">
                          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 w-full md:max-w-sm transition-transform group-hover:-translate-y-1">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">1. Chọn sản phẩm</h3>
                            <p className="text-sm text-slate-500">Duyệt danh mục và chọn sản phẩm ưng ý với đúng kích thước/màu sắc.</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-blue-500/30 shrink-0">1</div>
                        <div className="md:w-1/2 w-full hidden md:block"></div>
                      </div>

                      {/* STEP 2 */}
                      <div className="flex flex-col md:flex-row items-center gap-6 group">
                        <div className="md:w-1/2 w-full hidden md:block"></div>
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-emerald-500/30 shrink-0">2</div>
                        <div className="md:w-1/2 flex md:justify-start w-full">
                          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 w-full md:max-w-sm transition-transform group-hover:-translate-y-1">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">2. Thêm vào giỏ hàng</h3>
                            <p className="text-sm text-slate-500">Kiểm tra lại số lượng và bấm Thêm vào giỏ. Bạn có thể tiếp tục mua sắm hoặc tới thẳng giỏ hàng.</p>
                          </div>
                        </div>
                      </div>

                      {/* STEP 3 */}
                      <div className="flex flex-col md:flex-row items-center gap-6 group">
                        <div className="md:w-1/2 flex md:justify-end w-full">
                          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 w-full md:max-w-sm transition-transform group-hover:-translate-y-1 border-l-4 border-l-amber-400">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">3. Đăng nhập / Đăng ký</h3>
                            <p className="text-sm text-slate-500">Đăng nhập để tự động điền thông tin và tích lũy điểm thưởng. Bắt buộc để quản lý đơn hàng.</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-amber-500/30 shrink-0">3</div>
                        <div className="md:w-1/2 w-full hidden md:block"></div>
                      </div>

                      {/* STEP 4 */}
                      <div className="flex flex-col md:flex-row items-center gap-6 group">
                        <div className="md:w-1/2 w-full hidden md:block"></div>
                        <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-purple-500/30 shrink-0">4</div>
                        <div className="md:w-1/2 flex md:justify-start w-full">
                          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 w-full md:max-w-sm transition-transform group-hover:-translate-y-1">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">4. Nhập thông tin & Địa chỉ</h3>
                            <p className="text-sm text-slate-500">Điền chính xác địa chỉ nhận hàng và số điện thoại liên hệ để shipper giao tận nơi.</p>
                          </div>
                        </div>
                      </div>

                      {/* STEP 5 */}
                      <div className="flex flex-col md:flex-row items-center gap-6 group">
                        <div className="md:w-1/2 flex md:justify-end w-full">
                          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 w-full md:max-w-sm transition-transform group-hover:-translate-y-1 border-r-4 border-r-rose-400">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">5. Thanh toán</h3>
                            <p className="text-sm text-slate-500">Chọn hình thức Nhận hàng thanh toán (COD) hoặc Chuyển khoản ngân hàng trực tiếp.</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-rose-500/30 shrink-0">5</div>
                        <div className="md:w-1/2 w-full hidden md:block"></div>
                      </div>

                      {/* STEP 6 */}
                      <div className="flex flex-col md:flex-row items-center gap-6 group">
                        <div className="md:w-1/2 w-full hidden md:block"></div>
                        <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg shadow-cyan-500/30 shrink-0">✓</div>
                        <div className="md:w-1/2 flex md:justify-start w-full">
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg w-full md:max-w-sm transition-transform group-hover:-translate-y-1 text-white">
                            <h3 className="font-bold text-xl mb-2">Hoàn tất đặt hàng</h3>
                            <p className="text-sm text-white/90">Bạn có thể theo dõi tiến trình đơn hàng tại trang Dashboard của tài khoản cá nhân.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
