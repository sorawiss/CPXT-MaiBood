import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Analytics - MAIBOOD",
  description: "Advanced community food management analytics and insights",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-textsecondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-textprimary rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-textprimary">ชุมชนวิเคราะห์ข้อมูล</h1>
            </div>
            <div className="p2 text-textsecondary">
              ข้อมูลแบบ Real-time • อัพเดทล่าสุด: {new Date().toLocaleDateString('th-TH')} {new Date().toLocaleTimeString('th-TH')}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Community Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="p2 text-textsecondary">สมาชิกในชุมชน</p>
                <p className="text-3xl font-bold text-textprimary">2,847</p>
                <p className="p2 text-green-600">+12% จากเดือนที่แล้ว</p>
              </div>
              <div className="w-12 h-12 bg-backgroundsecondary rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-textprimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="p2 text-textsecondary">การซื้อขายในชุมชน</p>
                <p className="text-3xl font-bold text-textprimary">1,234</p>
                <p className="p2 text-green-600">+18% จากเดือนที่แล้ว</p>
              </div>
              <div className="w-12 h-12 bg-backgroundsecondary rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-textprimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="p2 text-textsecondary">ร้านค้าในชุมชน</p>
                <p className="text-3xl font-bold text-textprimary">156</p>
                <p className="p2 text-green-600">+5% จากเดือนที่แล้ว</p>
              </div>
              <div className="w-12 h-12 bg-backgroundsecondary rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-textprimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="p2 text-textsecondary">มูลค่าการซื้อขาย</p>
                <p className="text-3xl font-bold text-textprimary">฿89,230</p>
                <p className="p2 text-green-600">+25% จากเดือนที่แล้ว</p>
              </div>
              <div className="w-12 h-12 bg-backgroundsecondary rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-textprimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Community Trading Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Trading Areas */}
          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <h3 className="text-lg font-semibold text-textprimary mb-4">พื้นที่ที่มีการซื้อขายเยอะที่สุด</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-textprimary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">ลาดพร้าว</span>
                    <p className="p2 text-textsecondary">1,234 การซื้อขาย</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">+15%</span>
                  <p className="p2 text-textsecondary">จากเดือนที่แล้ว</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-textprimary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">ห้วยขวาง</span>
                    <p className="p2 text-textsecondary">987 การซื้อขาย</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">+12%</span>
                  <p className="p2 text-textsecondary">จากเดือนที่แล้ว</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-textprimary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">ดินแดง</span>
                    <p className="p2 text-textsecondary">756 การซื้อขาย</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">+8%</span>
                  <p className="p2 text-textsecondary">จากเดือนที่แล้ว</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-textprimary rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">บางกะปิ</span>
                    <p className="p2 text-textsecondary">543 การซื้อขาย</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">+5%</span>
                  <p className="p2 text-textsecondary">จากเดือนที่แล้ว</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fast Consumed Foods Analysis */}
          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <h3 className="text-lg font-semibold text-textprimary mb-4">อาหารที่กินหมดเร็ว (ความนิยมในชุมชน)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-textprimary rounded"></div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">เนื้อหมู</span>
                    <p className="p2 text-textsecondary">กินหมดใน 2.3 วัน</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-textprimary">95%</span>
                  <p className="p2 text-textsecondary">ความนิยม</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-textprimary rounded"></div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">อกไก่</span>
                    <p className="p2 text-textsecondary">กินหมดใน 2.8 วัน</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-textprimary">88%</span>
                  <p className="p2 text-textsecondary">ความนิยม</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-textprimary rounded"></div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">ไข่</span>
                    <p className="p2 text-textsecondary">กินหมดใน 3.2 วัน</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-textprimary">82%</span>
                  <p className="p2 text-textsecondary">ความนิยม</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-textprimary rounded"></div>
                  <div>
                    <span className="text-sm font-medium text-textprimary">ผักบุ้ง</span>
                    <p className="p2 text-textsecondary">กินหมดใน 1.5 วัน</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-textprimary">75%</span>
                  <p className="p2 text-textsecondary">ความนิยม</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Performance Analysis */}
        <div className="bg-background rounded-2xl p-6 border border-textsecondary/20 mb-8">
          <h3 className="text-lg font-semibold text-textprimary mb-6">ประสิทธิภาพร้านค้าในชุมชน</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Performing Stores */}
            <div>
              <h4 className="font-medium text-textprimary mb-4">🏆 ร้านขายดี</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                  <div>
                    <p className="font-medium text-textprimary">ร้านแม่ป้อม</p>
                    <p className="p2 text-textsecondary">ขายอาหารไทย</p>
                    <p className="p2 text-textsecondary">พื้นที่: ลาดพร้าว</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textprimary">฿12,450</p>
                    <p className="p2 text-textsecondary">ยอดขาย/เดือน</p>
                    <p className="p2 text-green-600">+45% จากเดือนที่แล้ว</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                  <div>
                    <p className="font-medium text-textprimary">ร้านลุงสม</p>
                    <p className="p2 text-textsecondary">ขายเนื้อสด</p>
                    <p className="p2 text-textsecondary">พื้นที่: ห้วยขวาง</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textprimary">฿9,870</p>
                    <p className="p2 text-textsecondary">ยอดขาย/เดือน</p>
                    <p className="p2 text-green-600">+32% จากเดือนที่แล้ว</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                  <div>
                    <p className="font-medium text-textprimary">ร้านป้าส้ม</p>
                    <p className="p2 text-textsecondary">ขายผักสด</p>
                    <p className="p2 text-textsecondary">พื้นที่: ดินแดง</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textprimary">฿8,230</p>
                    <p className="p2 text-textsecondary">ยอดขาย/เดือน</p>
                    <p className="p2 text-green-600">+28% จากเดือนที่แล้ว</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stores with Excess Inventory */}
            <div>
              <h4 className="font-medium text-textprimary mb-4">⚠️ ร้านที่มีของเหลือเยอะ</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                  <div>
                    <p className="font-medium text-textprimary">ร้านลุงดำ</p>
                    <p className="p2 text-textsecondary">ขายผลไม้</p>
                    <p className="p2 text-textsecondary">พื้นที่: บางกะปิ</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">45%</p>
                    <p className="p2 text-textsecondary">ของเหลือ</p>
                    <p className="p2 text-red-600">เสี่ยงต่อการเสีย</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                  <div>
                    <p className="font-medium text-textprimary">ร้านป้าทอง</p>
                    <p className="p2 text-textsecondary">ขายนม</p>
                    <p className="p2 text-textsecondary">พื้นที่: ลาดพร้าว</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">32%</p>
                    <p className="p2 text-textsecondary">ของเหลือ</p>
                    <p className="p2 text-orange-600">ควรลดการสั่งซื้อ</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-backgroundsecondary rounded-2xl">
                  <div>
                    <p className="font-medium text-textprimary">ร้านลุงแดง</p>
                    <p className="p2 text-textsecondary">ขายขนม</p>
                    <p className="p2 text-textsecondary">พื้นที่: ห้วยขวาง</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600">28%</p>
                    <p className="p2 text-textsecondary">ของเหลือ</p>
                    <p className="p2 text-yellow-600">ควรปรับราคา</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Community Insights */}
        <div className="bg-textprimary rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">AI วิเคราะห์ชุมชน</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="font-semibold mb-3">🎯 วิเคราะห์พฤติกรรมชุมชน</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium mb-1">รูปแบบการซื้อ:</p>
                    <ul className="text-xs space-y-1">
                      <li>• 85% ซื้ออาหารสดในวันเสาร์-อาทิตย์</li>
                      <li>• 70% ชอบซื้อจากร้านเดิมที่เคยซื้อ</li>
                      <li>• 60% ใช้แอปสั่งซื้อในช่วง 18:00-20:00</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">ความชอบอาหาร:</p>
                    <ul className="text-xs space-y-1">
                      <li>• อาหารไทย 90% (ข้าวผัด, ต้มยำ, ผัดไทย)</li>
                      <li>• อาหารจีน 75% (ข้าวมันไก่, หมูแดง)</li>
                      <li>• อาหารญี่ปุ่น 60% (ซูชิ, ราเมน)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="font-semibold mb-3">📊 ข้อมูลสถิติชุมชน</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>อายุเฉลี่ยของสมาชิก</span>
                    <span className="font-mono">32.5 ปี</span>
                  </div>
                  <div className="flex justify-between">
                    <span>รายได้เฉลี่ยต่อเดือน</span>
                    <span className="font-mono">฿25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>จำนวนสมาชิกต่อครัวเรือน</span>
                    <span className="font-mono">3.2 คน</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ระยะเวลาอยู่ในชุมชน</span>
                    <span className="font-mono">5.8 ปี</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="font-semibold mb-3">💡 คำแนะนำสำหรับชุมชน</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium mb-1">สำหรับร้านค้า:</p>
                    <ul className="text-xs space-y-1">
                      <li>• ร้านลุงดำ: ลดการสั่งซื้อผลไม้ลง 30%</li>
                      <li>• ร้านป้าทอง: เพิ่มการขายนมผ่านแอป</li>
                      <li>• ร้านลุงแดง: ลดราคาขนมในช่วงเย็น</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">สำหรับสมาชิก:</p>
                    <ul className="text-xs space-y-1">
                      <li>• ซื้ออาหารสดในวันเสาร์เพื่อความสดใหม่</li>
                      <li>• ใช้แอปสั่งซื้อในช่วง 18:00-20:00</li>
                      <li>• ลองอาหารจากร้านใหม่ในชุมชน</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="font-semibold mb-3">🚀 โอกาสการเติบโต</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>ตลาดอาหารสด</span>
                    <span className="font-mono text-green-400">+25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>บริการจัดส่ง</span>
                    <span className="font-mono text-blue-400">+40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ร้านอาหารใหม่</span>
                    <span className="font-mono text-purple-400">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>แอปพลิเคชัน</span>
                    <span className="font-mono text-yellow-400">+60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Community Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Peak Hours Analysis */}
          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <h3 className="text-lg font-semibold text-textprimary mb-4">ช่วงเวลาที่มีการซื้อขายสูงสุด</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p2 text-textsecondary">18:00 - 20:00</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-backgroundsecondary rounded-full h-2">
                    <div className="bg-textprimary h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-textprimary">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="p2 text-textsecondary">12:00 - 14:00</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-backgroundsecondary rounded-full h-2">
                    <div className="bg-textprimary h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-textprimary">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="p2 text-textsecondary">08:00 - 10:00</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-backgroundsecondary rounded-full h-2">
                    <div className="bg-textprimary h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-textprimary">45%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Community Preferences */}
          <div className="bg-background rounded-2xl p-6 border border-textsecondary/20">
            <h3 className="text-lg font-semibold text-textprimary mb-4">ความชอบของชุมชน</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p2 text-textsecondary">อาหารไทย</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-backgroundsecondary rounded-full h-2">
                    <div className="bg-textprimary h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-textprimary">90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="p2 text-textsecondary">อาหารจีน</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-backgroundsecondary rounded-full h-2">
                    <div className="bg-textprimary h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-textprimary">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="p2 text-textsecondary">อาหารญี่ปุ่น</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-backgroundsecondary rounded-full h-2">
                    <div className="bg-textprimary h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-textprimary">60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="bg-textprimary rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">ผลกระทบต่อชุมชน</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">฿6B</div>
              <div className="text-white/80">โอกาสตลาดรวม</div>
              <div className="p2 text-white/60 mt-1">ตลาดอาหารชุมชนในกรุงเทพ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-white/80">อัตราการคงอยู่</div>
              <div className="p2 text-white/60 mt-1">สมาชิกที่ใช้งานต่อเนื่อง</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">฿500K</div>
              <div className="text-white/80">รายได้ที่คาดการณ์</div>
              <div className="p2 text-white/60 mt-1">ต่อปีจากฟีเจอร์พรีเมียม</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
