import React from 'react';
import { Metadata } from 'next';
import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Giới thiệu | ShopHaoHung`,
  description: `Tìm hiểu về lịch sử, sứ mệnh và giá trị cốt lõi của ShopHaoHung - Hệ thống shop thể thao hàng đầu.`,
};

export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/30 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/30 blur-[100px]" />
        
        <div className="container relative mx-auto px-4 z-10">
          <h1 className="text-5xl font-black tracking-tight md:text-7xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Về {APP_NAME}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/80 md:text-xl leading-relaxed">
            Hệ thống shop thể thao hàng đầu Việt Nam, cung cấp những sản phẩm chất lượng cao, chính hãng với dịch vụ tận tâm và chuyên nghiệp.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white p-8 md:p-12 shadow-2xl shadow-slate-200/50">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Hành trình của chúng tôi
              </div>
              <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Đam mê khởi tạo thành công</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Khởi nguồn từ một diễn đàn cung cấp thông tin chuyên nghiệp về tin tức và kiến thức thể thao vào <strong>tháng 12/2011</strong>, chúng tôi nhận thấy sự phát triển mạnh mẽ của phong trào cầu lông trong nước. Với mong muốn phục vụ tốt hơn cho cộng đồng, <strong>tháng 12/2012</strong>, ban quản trị đã mạnh dạn xây dựng hệ thống <strong>{APP_NAME}</strong>.
                </p>
                <p>
                  Đến với chúng tôi, bạn hoàn toàn yên tâm về chất lượng sản phẩm, đội ngũ tư vấn chuyên nghiệp và mức giá cực kỳ hợp lý. Bên cạnh website mua sắm trực tuyến hiện đại, <strong>{APP_NAME}</strong> còn phát triển mạnh mẽ các kênh mạng xã hội nhằm cung cấp thông tin nhanh nhất, tạo dựng uy tín lớn mạnh trong cộng đồng yêu thể thao trong và ngoài nước.
                </p>
                <p>
                  Với tiêu chí đảm bảo cung cấp đầy đủ các mặt hàng chuyên dụng như giày, vợt cầu lông, túi vợt, balo, quần áo và phụ kiện... trải dài qua nhiều phân khúc giá, các lông thủ cần gì cứ đến ngay với <strong>{APP_NAME}</strong>. Chúng tôi là nhà phân phối các thương hiệu hàng đầu thế giới như <strong>Yonex, Lining, Victor, Mizuno</strong>, cho đến các hãng tầm trung giá rẻ như <strong>Adidas, Forza, Apacs, Kamito</strong> với mẫu mã vô cùng đa dạng.
                </p>
                <div className="mt-6 rounded-2xl bg-blue-50 p-4 border border-blue-100">
                  <p className="text-blue-800 font-medium">
                    ✨ <strong className="font-bold">Đặc biệt:</strong> {APP_NAME} tự hào là địa chỉ căng vợt cầu lông chuẩn xác hàng đầu Việt Nam. Tất cả cửa hàng đều được trang bị máy đan vợt điện tử cao cấp, cùng đội ngũ nhân viên liên tục được trau dồi các kỹ thuật đan vợt tiên tiến nhất thế giới.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg group bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900 transition-transform duration-700 group-hover:scale-105 opacity-80" />
              {/* Animated background circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-3xl font-black text-white tracking-widest leading-loose">Hơn 50 chi nhánh<br/><span className="text-emerald-400">trên toàn quốc</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Tầm Nhìn & Sứ Mệnh</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi trên chặng đường phát triển.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-4xl">🔭</span> Tầm Nhìn
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Trở thành nhà phân phối và sản xuất thiết bị thể thao lớn nhất Việt Nam. Dẫn đầu cả nước trong việc nâng cao sức khỏe cộng đồng, tự lực sản xuất sản phẩm phù hợp người Việt và mở rộng hệ thống khắp 64 tỉnh thành.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-xl hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-4xl">🎯</span> Sứ Mệnh
            </h3>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính mình. Đề cao tinh thần hợp tác và xây dựng môi trường làm việc nhân văn.
            </p>
          </div>
        </div>

        <h3 className="text-3xl font-black text-center text-slate-900 mb-12">Giá Trị Cốt Lõi</h3>
        <div className="grid gap-6 md:grid-cols-5">
          {[
            { title: 'TRUNG', desc: 'Trung thực với Khách hàng - Đối tác - Nhân viên. Đặt quyền lợi người tiêu dùng lên trên hết.', color: 'from-amber-400 to-orange-500' },
            { title: 'TÍN', desc: 'Đặt chữ TÍN lên hàng đầu. Đảm bảo đúng cam kết về chất lượng sản phẩm và dịch vụ.', color: 'from-rose-400 to-red-500' },
            { title: 'TÂM', desc: 'Lấy khách hàng làm trung tâm. Xem sự hài lòng của khách hàng là thước đo thành công.', color: 'from-pink-400 to-fuchsia-500' },
            { title: 'TRÍ', desc: 'Đề cao sự sáng tạo, dám nghĩ dám làm, ứng dụng khoa học kỹ thuật để tạo bản sắc riêng.', color: 'from-violet-400 to-purple-500' },
            { title: 'NHÂN', desc: 'Xây dựng mối quan hệ bằng sự thiện chí. Coi người lao động là tài sản quý giá nhất.', color: 'from-cyan-400 to-blue-500' },
          ].map((val, idx) => (
            <div key={idx} className="group relative rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className={`absolute inset-x-0 -top-px h-1 rounded-t-2xl bg-gradient-to-r ${val.color} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${val.color} text-xl font-black text-white shadow-lg`}>
                {val.title[0]}
              </div>
              <h4 className="mb-2 text-xl font-bold text-slate-900">{val.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-slate-900 p-8 md:p-16 text-center text-white relative overflow-hidden">
          {/* Abstract pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black md:text-5xl uppercase tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Together We Can</h2>
            <p className="mx-auto max-w-2xl text-slate-300 text-lg">
              Luôn thỏa mãn và có trách nhiệm với khách hàng bằng cách không ngừng cải tiến, đa dạng hóa sản phẩm và dịch vụ với giá cả cạnh tranh nhất.
            </p>
            <div className="pt-8 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto text-left">
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                 <h4 className="font-bold text-emerald-400 mb-2 text-xl">Trung tâm TPHCM</h4>
                 <p className="text-slate-300 leading-relaxed">
                   📍 390/2 Hà Huy Giáp, Phường Thạnh Lộc, Quận 12<br/>
                   📞 Hotline: <span className="font-semibold text-white">0936 155 994</span>
                 </p>
               </div>
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                 <h4 className="font-bold text-cyan-400 mb-2 text-xl">Chi nhánh Quận 1</h4>
                 <p className="text-slate-300 leading-relaxed">
                   📍 20 Cao Bá Nhạ, Phường Nguyễn Cư Trinh, Quận 1<br/>
                   📞 Hotline: <span className="font-semibold text-white">0931 823 614</span>
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
