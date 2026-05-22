# CIRCL - Học tiêu dùng có trách nhiệm cùng con 🌿

Nền tảng giúp trẻ 8–10 tuổi học quản lý tiền và tiêu dùng có trách nhiệm thông qua nhiệm vụ hằng tuần, Ví 3 Lọ, và sự đồng hành của phụ huynh.

## 🚀 Chạy dự án

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

## 📂 Cấu trúc thư mục

```
src/
  assets/              # Static assets
  components/
    common/            # Reusable components (GlassCard, StatCard, etc.)
    layout/            # App layout with sidebar navigation
    dashboard/         # Dashboard-specific components (Charts)
    child/             # Child-specific components
    parent/            # Parent-specific components
    marketplace/       # Marketplace components
    safety/            # Safety-related components
  data/                # Mock data files
    mockChallenges.js  # 8-week challenge curriculum
    mockItems.js       # Items with categories & actions
    mockReports.js     # Weekly reports & dashboard stats
    mockApprovals.js   # Parent approval queue data
    mockUsers.js       # User profiles (child, parent, admin)
  hooks/               # Custom React hooks
  pages/               # All page components
  routes/              # React Router configuration
  store/               # Zustand state management
  utils/               # API utilities & helpers
  App.jsx              # Root app component
  main.jsx             # Entry point
  index.css            # Global styles & design system
```

## 🎨 Design System

- **Fonts**: Quicksand (display), Inter (body)
- **Colors**: Mint, Leaf, Sun, Coral custom palette
- **Style**: Glassmorphism cards with backdrop-blur
- **Animations**: Framer Motion throughout
- **Charts**: Recharts for dashboard visualizations

## 🔐 Demo Mode

Chọn vai trò khi đăng nhập:
- **Con** (Minh, 9 tuổi) — Trải nghiệm nhiệm vụ tuần, Ví 3 Lọ, Bé dạy AI
- **Phụ huynh** (Chị Lan) — Dashboard, duyệt phê duyệt, xác nhận tiền
- **Admin** — Quản lý hệ thống, pilot metrics

## 🏗️ Tech Stack

- React + Vite
- Tailwind CSS v4
- React Router v6
- Zustand (state management)
- Lucide React (icons)
- Recharts (charts)
- Framer Motion (animations)

## 🔌 Backend-Ready

File `src/utils/api.js` chứa mock async functions sẵn sàng thay thế bằng API thật.
Store Zustand được thiết kế để dễ dàng kết nối backend.

## 🛡️ Safety by Design

- Không chat giữa trẻ
- Phụ huynh duyệt mọi hành động
- Không giữ tiền thật
- Không ảnh mặt trẻ em
- AI minh bạch cho phụ huynh
"# circl" 
