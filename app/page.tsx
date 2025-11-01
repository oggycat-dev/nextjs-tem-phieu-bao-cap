'use client';

import { useState } from 'react';
import Image from 'next/image';

type InventoryItem = {
  name: string;
  unit: string;
  quantity: number;
  icon: string;
  description?: string;
};

type InventoryKey = 'thit' | 'gao' | 'vai' | 'duong' | 'dau' | 'thoc' | 'banh' | 'ca' | 'trung' | 'sua';

type SocialClass = {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  inventory: Record<InventoryKey, InventoryItem>;
};

const SOCIAL_CLASSES: SocialClass[] = [
  {
    id: 'db',
    name: 'Cán bộ cao cấp',
    code: 'Tiêu chuẩn ĐB (Đặc Biệt)',
    description: 'Dành cho lãnh đạo cấp cao nhất',
    icon: '⭐',
    inventory: {
      thit: { name: 'Thịt Lợn', unit: 'kg', quantity: 2.0, icon: '🥩', description: 'Thịt lợn thượng hạng' },
      gao: { name: 'Gạo Tẻ', unit: 'kg', quantity: 15, icon: '🌾', description: 'Gạo tẻ cao cấp' },
      vai: { name: 'Vải May', unit: 'm', quantity: 5, icon: '🧵', description: 'Vải nhập khẩu' },
      duong: { name: 'Đường Trắng', unit: 'kg', quantity: 1.5, icon: '🍬', description: 'Đường tinh luyện' },
      dau: { name: 'Dầu Ăn', unit: 'lít', quantity: 1.5, icon: '🛢️', description: 'Dầu ăn cao cấp' },
      thoc: { name: 'Thóc', unit: 'kg', quantity: 10, icon: '🌽', description: 'Thóc hảo hạng' },
      banh: { name: 'Bánh Mì', unit: 'ổ', quantity: 15, icon: '🍞', description: 'Bánh mì Pháp' },
      ca: { name: 'Cá Tươi', unit: 'kg', quantity: 2, icon: '🐟', description: 'Cá biển tươi' },
      trung: { name: 'Trứng Gà', unit: 'quả', quantity: 20, icon: '🥚', description: 'Trứng gà ta' },
      sua: { name: 'Sữa Tươi', unit: 'lít', quantity: 5, icon: '🥛', description: 'Sữa tươi nguyên kem' }
    }
  },
  {
    id: 'a',
    name: 'Cán bộ cấp Bộ trưởng',
    code: 'Tiêu chuẩn A',
    description: 'Dành cho cấp Bộ trưởng',
    icon: '🏛️',
    inventory: {
      thit: { name: 'Thịt Lợn', unit: 'kg', quantity: 1.5, icon: '🥩', description: 'Thịt lợn nạc' },
      gao: { name: 'Gạo Tẻ', unit: 'kg', quantity: 12, icon: '🌾', description: 'Gạo tẻ tốt' },
      vai: { name: 'Vải May', unit: 'm', quantity: 4, icon: '🧵', description: 'Vải tốt' },
      duong: { name: 'Đường Trắng', unit: 'kg', quantity: 1.2, icon: '🍬', description: 'Đường trắng' },
      dau: { name: 'Dầu Ăn', unit: 'lít', quantity: 1.2, icon: '🛢️', description: 'Dầu ăn tốt' },
      thoc: { name: 'Thóc', unit: 'kg', quantity: 8, icon: '🌽', description: 'Thóc loại tốt' },
      banh: { name: 'Bánh Mì', unit: 'ổ', quantity: 12, icon: '🍞', description: 'Bánh mì trắng' },
      ca: { name: 'Cá Tươi', unit: 'kg', quantity: 1.5, icon: '🐟', description: 'Cá tươi' },
      trung: { name: 'Trứng Gà', unit: 'quả', quantity: 15, icon: '🥚', description: 'Trứng gà' },
      sua: { name: 'Sữa Đặc', unit: 'hộp', quantity: 4, icon: '🥛', description: 'Sữa đặc Ông Thọ' }
    }
  },
  {
    id: 'c',
    name: 'Cán bộ cấp Vụ/Cục',
    code: 'Tiêu chuẩn C',
    description: 'Dành cho trưởng các cục, vụ, viện',
    icon: '📋',
    inventory: {
      thit: { name: 'Thịt Lợn', unit: 'kg', quantity: 0.8, icon: '🥩', description: 'Thịt lợn' },
      gao: { name: 'Gạo Tẻ', unit: 'kg', quantity: 8, icon: '🌾', description: 'Gạo tẻ' },
      vai: { name: 'Vải May', unit: 'm', quantity: 3, icon: '🧵', description: 'Vải cotton' },
      duong: { name: 'Đường Trắng', unit: 'kg', quantity: 0.8, icon: '🍬', description: 'Đường cát trắng' },
      dau: { name: 'Dầu Ăn', unit: 'lít', quantity: 0.8, icon: '🛢️', description: 'Dầu thực vật' },
      thoc: { name: 'Thóc', unit: 'kg', quantity: 5, icon: '🌽', description: 'Thóc' },
      banh: { name: 'Bánh Mì', unit: 'ổ', quantity: 8, icon: '🍞', description: 'Bánh mì' },
      ca: { name: 'Cá Khô', unit: 'kg', quantity: 0.8, icon: '🐟', description: 'Cá khô' },
      trung: { name: 'Trứng Gà', unit: 'quả', quantity: 10, icon: '🥚', description: 'Trứng gà' },
      sua: { name: 'Sữa Đặc', unit: 'hộp', quantity: 3, icon: '🥛', description: 'Sữa đặc' }
    }
  },
  {
    id: 'e',
    name: 'Công nhân viên chức',
    code: 'Tiêu chuẩn E',
    description: 'Dành cho cán bộ, công nhân viên chức',
    icon: '👔',
    inventory: {
      thit: { name: 'Thịt Lợn', unit: 'kg', quantity: 0.5, icon: '🥩', description: 'Thịt lợn nạc' },
      gao: { name: 'Gạo Tẻ', unit: 'kg', quantity: 5, icon: '🌾', description: 'Gạo tẻ thường' },
      vai: { name: 'Vải May', unit: 'm', quantity: 2, icon: '🧵', description: 'Vải cotton' },
      duong: { name: 'Đường Trắng', unit: 'kg', quantity: 0.5, icon: '🍬', description: 'Đường cát trắng' },
      dau: { name: 'Dầu Ăn', unit: 'lít', quantity: 0.5, icon: '🛢️', description: 'Dầu thực vật' },
      thoc: { name: 'Thóc', unit: 'kg', quantity: 3, icon: '🌽', description: 'Thóc chưa xay' },
      banh: { name: 'Bánh Mì', unit: 'ổ', quantity: 5, icon: '🍞', description: 'Bánh mì trắng' },
      ca: { name: 'Cá Khô', unit: 'kg', quantity: 0.4, icon: '🐟', description: 'Cá khô mặn' },
      trung: { name: 'Trứng Gà', unit: 'quả', quantity: 6, icon: '🥚', description: 'Trứng gà tươi' },
      sua: { name: 'Sữa Đặc', unit: 'hộp', quantity: 2, icon: '🥛', description: 'Sữa đặc có đường' }
    }
  },
  {
    id: 'i',
    name: 'Công nhân môi trường độc hại',
    code: 'Tiêu chuẩn I',
    description: 'Dành cho công nhân làm việc trong điều kiện khắc nghiệt',
    icon: '⚠️',
    inventory: {
      thit: { name: 'Thịt Lợn', unit: 'kg', quantity: 1.0, icon: '🥩', description: 'Thịt lợn bồi dưỡng' },
      gao: { name: 'Gạo Tẻ', unit: 'kg', quantity: 8, icon: '🌾', description: 'Gạo tẻ tăng cường' },
      vai: { name: 'Vải May', unit: 'm', quantity: 2.5, icon: '🧵', description: 'Vải bảo hộ' },
      duong: { name: 'Đường Trắng', unit: 'kg', quantity: 1.0, icon: '🍬', description: 'Đường bổ sung' },
      dau: { name: 'Dầu Ăn', unit: 'lít', quantity: 0.8, icon: '🛢️', description: 'Dầu dinh dưỡng' },
      thoc: { name: 'Thóc', unit: 'kg', quantity: 5, icon: '🌽', description: 'Thóc' },
      banh: { name: 'Bánh Mì', unit: 'ổ', quantity: 8, icon: '🍞', description: 'Bánh mì bổ dưỡng' },
      ca: { name: 'Cá Khô', unit: 'kg', quantity: 0.7, icon: '🐟', description: 'Cá giàu protein' },
      trung: { name: 'Trứng Gà', unit: 'quả', quantity: 12, icon: '🥚', description: 'Trứng bồi dưỡng' },
      sua: { name: 'Sữa Đặc', unit: 'hộp', quantity: 4, icon: '🥛', description: 'Sữa bổ sung dinh dưỡng' }
    }
  },
  {
    id: 'n',
    name: 'Nhân dân',
    code: 'Tiêu chuẩn N',
    description: 'Dành cho người dân bình thường',
    icon: '👨‍🌾',
    inventory: {
      thit: { name: 'Thịt Lợn', unit: 'kg', quantity: 0.3, icon: '🥩', description: 'Thịt lợn có mỡ' },
      gao: { name: 'Gạo Tẻ', unit: 'kg', quantity: 3, icon: '🌾', description: 'Gạo tẻ hạn chế' },
      vai: { name: 'Vải May', unit: 'm', quantity: 1, icon: '🧵', description: 'Vải thô' },
      duong: { name: 'Đường Trắng', unit: 'kg', quantity: 0.2, icon: '🍬', description: 'Đường ít' },
      dau: { name: 'Dầu Ăn', unit: 'lít', quantity: 0.3, icon: '🛢️', description: 'Dầu hạn chế' },
      thoc: { name: 'Thóc', unit: 'kg', quantity: 2, icon: '🌽', description: 'Thóc lẫn tạp' },
      banh: { name: 'Bánh Mì', unit: 'ổ', quantity: 3, icon: '🍞', description: 'Bánh mì đen' },
      ca: { name: 'Cá Khô', unit: 'kg', quantity: 0.2, icon: '🐟', description: 'Cá khô giá rẻ' },
      trung: { name: 'Trứng Gà', unit: 'quả', quantity: 3, icon: '🥚', description: 'Trứng ít' },
      sua: { name: 'Sữa Đặc', unit: 'hộp', quantity: 1, icon: '🥛', description: 'Sữa đặc 1 hộp' }
    }
  }
];

export default function Home() {
  const [selectedClass, setSelectedClass] = useState<SocialClass | null>(null);
  const [inventory, setInventory] = useState<Record<InventoryKey, InventoryItem> | null>(null);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning'>('success');
  const [showDoiMoi, setShowDoiMoi] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<string[]>([]);
  
  // Trạng thái cửa hàng - không phải lúc nào cũng có hàng!
  const [shopStock, setShopStock] = useState<Record<InventoryKey, number>>({
    thit: 10,
    gao: 20,
    vai: 8,
    duong: 5,
    dau: 6,
    thoc: 15,
    banh: 12,
    ca: 7,
    trung: 18,
    sua: 9
  });
  
  // Trạng thái xếp hàng
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueProgress, setQueueProgress] = useState(0);
  const [queueItem, setQueueItem] = useState<InventoryKey | null>(null);
  
  // Trạng thái xem ảnh
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectClass = (socialClass: SocialClass) => {
    setSelectedClass(socialClass);
    setInventory(socialClass.inventory);
    setMessage('');
    setPurchaseHistory([]);
    setShowDoiMoi(false);
    setIsQueuing(false);
    setQueueProgress(0);
    
    // Random hóa hàng trong kho (mô phỏng tình trạng thiếu hụt)
    setShopStock({
      thit: Math.floor(Math.random() * 8) + 3,
      gao: Math.floor(Math.random() * 15) + 10,
      vai: Math.floor(Math.random() * 6) + 2,
      duong: Math.floor(Math.random() * 5) + 2,
      dau: Math.floor(Math.random() * 5) + 3,
      thoc: Math.floor(Math.random() * 10) + 8,
      banh: Math.floor(Math.random() * 10) + 5,
      ca: Math.floor(Math.random() * 6) + 2,
      trung: Math.floor(Math.random() * 12) + 8,
      sua: Math.floor(Math.random() * 7) + 3
    });
  };

  const handleBuy = (item: InventoryKey) => {
    if (!inventory || isQueuing) return;
    
    // Kiểm tra tem phiếu còn không
    if (inventory[item].quantity <= 0) {
      setMessage(`✗ Bạn đã hết tiêu chuẩn mua ${inventory[item].name} tháng này!`);
      setMessageType('error');
      return;
    }
    
    // Kiểm tra cửa hàng còn hàng không
    if (shopStock[item] <= 0) {
      setMessage(`📦 Xin lỗi! Cửa hàng đã HẾT ${inventory[item].name}. Vui lòng quay lại ngày mai.`);
      setMessageType('warning');
      return;
    }
    
    // Bắt đầu xếp hàng!
    setIsQueuing(true);
    setQueueItem(item);
    setQueueProgress(0);
    setMessage('👥 Đang xếp hàng chờ đợi... Vui lòng kiên nhẫn!');
    setMessageType('warning');
    
    // Mô phỏng thời gian xếp hàng (2-4 giây)
    const queueTime = Math.random() * 2000 + 2000;
    const interval = 50;
    const steps = queueTime / interval;
    let currentStep = 0;
    
    const queueInterval = setInterval(() => {
      currentStep++;
      setQueueProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(queueInterval);
        
        // Có xác suất bị hết hàng khi đến lượt (10% cơ hội)
        const isSoldOut = Math.random() < 0.1;
        
        if (isSoldOut) {
          setMessage(`😢 Đến lượt bạn rồi nhưng ${inventory[item].name} vừa HẾT! Bạn xếp hàng uổng công.`);
          setMessageType('error');
          setShopStock(prev => ({ ...prev, [item]: 0 }));
        } else {
          // Mua thành công!
          const itemData = inventory[item];
          const purchasedAmount = itemData.quantity;
          
          setInventory(prevInventory => {
            if (!prevInventory) return null;
            return {
              ...prevInventory,
              [item]: { ...prevInventory[item], quantity: 0 }
            };
          });
          
          setShopStock(prev => ({ 
            ...prev, 
            [item]: Math.max(0, prev[item] - 1)
          }));
          
          setMessage(`✓ Xếp hàng thành công! Bạn đã mua được ${purchasedAmount} ${itemData.unit} ${itemData.name}!`);
          setMessageType('success');
          
          setPurchaseHistory(prev => [
            ...prev,
            `${new Date().toLocaleTimeString('vi-VN')}: Xếp hàng ${Math.round(queueTime/1000)}s → Mua ${purchasedAmount} ${itemData.unit} ${itemData.name}`
          ]);
        }
        
        setIsQueuing(false);
        setQueueProgress(0);
        setQueueItem(null);
      }
    }, interval);
  };

  const allItemsUsed = inventory ? Object.values(inventory).every(item => item.quantity === 0) : false;

  // Màn hình chọn thành phần xã hội
  if (!selectedClass) {
    return (
      <div className="container">
        <header className="header">
          <h1 className="title">🎫 TRẢI NGHIỆM TEM PHIẾU THỜI BAO CẤP</h1>
          <p className="subtitle">Giai đoạn 1976-1986 | Trước Đổi Mới</p>
        </header>

        <main className="main-content">
          <div className="class-selection">
            <h2 className="selection-title">👤 BẠN LÀ AI TRONG XÃ HỘI THỜI BAO CẤP?</h2>
            <p className="selection-subtitle">
              Chọn một thành phần xã hội để trải nghiệm cuộc sống với tem phiếu theo từng tiêu chuẩn khác nhau
            </p>

            <div className="class-grid">
              {SOCIAL_CLASSES.map((socialClass) => (
                <button
                  key={socialClass.id}
                  className="class-card"
                  onClick={() => handleSelectClass(socialClass)}
                >
                  <div className="class-icon">{socialClass.icon}</div>
                  <h3 className="class-name">{socialClass.name}</h3>
                  <div className="class-code">{socialClass.code}</div>
                  <p className="class-description">{socialClass.description}</p>
                  
                  <div className="class-preview">
                    <div className="preview-label">Ví dụ định lượng tháng:</div>
                    <div className="preview-items">
                      <span>🥩 Thịt: {socialClass.inventory.thit.quantity}kg</span>
                      <span>🌾 Gạo: {socialClass.inventory.gao.quantity}kg</span>
                      <span>🥚 Trứng: {socialClass.inventory.trung.quantity} quả</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="info-box">
              <h3>📚 Thông tin lịch sử</h3>
              <p>
                Trong thời kỳ bao cấp (1976-1986), tem phiếu được phân phối theo tiêu chuẩn khác nhau 
                tùy thuộc vào vị trí xã hội. Sự chênh lệch này phản ánh cơ chế phân phối 
                không đồng đều trong nền kinh tế kế hoạch hóa tập trung.
              </p>
              
              <div className="historical-images">
                <h4>🖼️ Hình ảnh tem phiếu thật thời bao cấp</h4>
                <div className="image-gallery">
                  <div className="gallery-item" onClick={() => setSelectedImage('/tem1.webp')}>
                    <Image 
                      src="/tem1.webp" 
                      alt="Tem phiếu lương thực thời bao cấp" 
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <p className="image-caption">Tem phiếu lương thực</p>
                  </div>
                  <div className="gallery-item" onClick={() => setSelectedImage('/tem2.webp')}>
                    <Image 
                      src="/tem2.webp" 
                      alt="Sổ tem phiếu gia đình" 
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <p className="image-caption">Sổ tem phiếu gia đình</p>
                  </div>
                  <div className="gallery-item" onClick={() => setSelectedImage('/tem3.webp')}>
                    <Image 
                      src="/tem3.webp" 
                      alt="Tem phiếu mua hàng" 
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <p className="image-caption">Tem phiếu mua hàng</p>
                  </div>
                  <div className="gallery-item" onClick={() => setSelectedImage('/tem4.jpg')}>
                    <Image 
                      src="/tem4.jpg" 
                      alt="Tem phiếu thực phẩm" 
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <p className="image-caption">Tem phiếu thực phẩm</p>
                  </div>
                </div>
                <p className="gallery-note">💡 Click vào ảnh để xem rõ hơn</p>
              </div>
            </div>
          </div>
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedImage(null)}>✕</button>
              <img src={selectedImage} alt="Tem phiếu phóng to" />
              <p className="modal-caption">Tem phiếu thật thời bao cấp (1976-1986)</p>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>Sản phẩm học tập về giai đoạn Đổi Mới 1986-1996</p>
          <p>📚 Đất nước ra khỏi khủng hoảng - Hướng tới phát triển</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🎫 TRẢI NGHIỆM TEM PHIẾU THỜI BAO CẤP</h1>
        <p className="subtitle">
          Bạn đang trải nghiệm: <strong>{selectedClass.icon} {selectedClass.name}</strong>
        </p>
        <button 
          className="change-class-btn"
          onClick={() => {
            setSelectedClass(null);
            setInventory(null);
          }}
        >
          🔄 Đổi thành phần xã hội
        </button>
      </header>

      <main className="main-content">
        <div className="two-columns">
          {/* Sổ Tem Phiếu */}
          <div className="card tem-phieu">
            <h2 className="card-title">📋 SỔ TEM PHIẾU CỦA BẠN</h2>
            <p className="card-subtitle">Tiêu chuẩn tháng này</p>
            
            <ul className="inventory-list">
              {inventory && Object.entries(inventory).map(([key, item]) => (
                <li key={key} className={`inventory-item ${item.quantity === 0 ? 'used' : ''}`}>
                  <span className="item-icon">{item.icon}</span>
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    {item.description && <span className="item-desc">{item.description}</span>}
                  </div>
                  <span className="item-quantity">
                    {item.quantity > 0 ? `${item.quantity} ${item.unit}` : 'ĐÃ HẾT'}
                  </span>
                </li>
              ))}
            </ul>

            {purchaseHistory.length > 0 && (
              <div className="history">
                <h3>Lịch sử mua hàng:</h3>
                <ul className="history-list">
                  {purchaseHistory.map((entry, index) => (
                    <li key={index}>{entry}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cửa Hàng */}
          <div className="card cua-hang">
            <h2 className="card-title">🏪 CỬA HÀNG MẬU DỊCH</h2>
            <p className="card-subtitle">
              {isQueuing ? '👥 Đang xếp hàng...' : 'Xuất trình tem phiếu để xếp hàng mua'}
            </p>
            
            {isQueuing && queueItem && (
              <div className="queue-status">
                <div className="queue-message">
                  ⏳ Đang xếp hàng mua {inventory?.[queueItem]?.name}...
                </div>
                <div className="queue-bar">
                  <div 
                    className="queue-progress" 
                    style={{ width: `${queueProgress}%` }}
                  />
                </div>
                <div className="queue-text">
                  {Math.round(queueProgress)}% - Xin vui lòng chờ đợi
                </div>
              </div>
            )}
            
            <div className="shop-items">
              {inventory && Object.entries(inventory).map(([key, item]) => {
                const itemKey = key as InventoryKey;
                const stockLevel = shopStock[itemKey];
                const isOutOfStock = stockLevel <= 0;
                const isLowStock = stockLevel > 0 && stockLevel <= 3;
                
                return (
                  <button
                    key={key}
                    className={`shop-button ${item.quantity === 0 ? 'disabled' : ''} ${isOutOfStock ? 'out-of-stock' : ''} ${isLowStock ? 'low-stock' : ''}`}
                    onClick={() => handleBuy(itemKey)}
                    disabled={item.quantity === 0 || isQueuing || isOutOfStock}
                    title={item.description}
                  >
                    <span className="shop-icon">{item.icon}</span>
                    <div className="shop-info">
                      <span className="shop-text">{item.name}</span>
                      <span className="shop-amount">
                        {item.quantity > 0 ? `Tem: ${item.quantity} ${item.unit}` : 'HẾT TEM'}
                      </span>
                      <span className={`stock-status ${isOutOfStock ? 'out' : isLowStock ? 'low' : 'ok'}`}>
                        {isOutOfStock ? '📦 Hết hàng' : isLowStock ? `⚠️ Còn ${stockLevel} người` : `✓ Còn hàng (${stockLevel})`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            {allItemsUsed && !showDoiMoi && !isQueuing && (
              <div className="hint">
                💡 Bạn đã hết tem phiếu. Cuộc sống thời bao cấp khó khăn như vậy đó!
              </div>
            )}
            
            <div className="shop-note">
              <strong>📌 Lưu ý:</strong> Dù có tem phiếu nhưng không đảm bảo có hàng. 
              Bạn phải xếp hàng chờ đợi và có thể mua không được!
            </div>
          </div>
        </div>

        {/* Nút Tìm Hiểu */}
        {!showDoiMoi && (
          <div className="learn-section">
            <button 
              className="learn-button"
              onClick={() => setShowDoiMoi(true)}
            >
              🌟 Tìm hiểu về Đổi Mới 1986
            </button>
          </div>
        )}

        {/* Thông điệp Đổi Mới */}
        {showDoiMoi && (
          <div className="doi-moi-message">
            <h2>🌅 CUỘC CÁCH MẠNG ĐỔI MỚI 1986</h2>
            
            <div className="doi-moi-content">
              <p className="highlight">
                Cuộc sống đã từng khó khăn như vậy. Người dân không chỉ bị giới hạn bởi tem phiếu, 
                mà còn phải xếp hàng dài hàng giờ đồng hồ, và nhiều khi đến lượt vẫn không mua được gì 
                vì hàng đã hết. Đó là thực trạng của nền kinh tế kế hoạch hóa tập trung, thiếu hụt trầm trọng.
              </p>
              
              <h3>📜 Đại hội Đảng lần thứ VI (12/1986)</h3>
              <p>
                Đảng Cộng sản Việt Nam đã đưa ra đường lối Đổi Mới toàn diện, 
                từ bỏ cơ chế kế hoạch hóa tập trung quan料, bao cấp, chuyển sang nền kinh tế thị trường 
                định hướng xã hội chủ nghĩa.
              </p>

              <h3>🎯 Những thành tựu nổi bật (1986-1996)</h3>
              <ul className="achievements">
                <li>✓ <strong>Xóa bỏ chế độ tem phiếu</strong> - Người dân tự do mua bán</li>
                <li>✓ <strong>Kinh tế tăng trưởng</strong> - GDP tăng bình quân 7-8%/năm</li>
                <li>✓ <strong>Xuất khẩu gạo</strong> - Từ nước thiếu lương thực thành nước xuất khẩu</li>
                <li>✓ <strong>Đời sống cải thiện</strong> - Thu nhập và đời sống người dân được nâng cao</li>
                <li>✓ <strong>Hội nhập quốc tế</strong> - Mở cửa, thu hút đầu tư nước ngoài</li>
              </ul>

              <p className="conclusion">
                Nhờ có đường lối Đổi Mới, Việt Nam đã thoát khỏi khủng hoảng kinh tế - xã hội, 
                đưa đất nước phát triển và hội nhập với thế giới. 
                <strong> Ngày nay, bạn không còn cần đến tem phiếu nữa!</strong>
              </p>
            </div>

            <button 
              className="close-button"
              onClick={() => setShowDoiMoi(false)}
            >
              ✓ Đã hiểu
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Sản phẩm học tập về giai đoạn Đổi Mới 1986-1996</p>
        <p>📚 Đất nước ra khỏi khủng hoảng - Hướng tới phát triển</p>
      </footer>
    </div>
  );
}
