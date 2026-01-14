-- ============================================
-- ORYN SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the 'features' table for voting system
CREATE TABLE IF NOT EXISTS features (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    votes INTEGER DEFAULT 0,
    rank INTEGER DEFAULT 0,
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the 'suggestions' table for wishlist/ideas
CREATE TABLE IF NOT EXISTS suggestions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the 'messages' table for message board
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT DEFAULT '匿名',
    content TEXT NOT NULL,
    is_dev BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DISABLE ROW LEVEL SECURITY (for easy setup)
-- ============================================

-- Disable RLS on all tables for public access
ALTER TABLE features DISABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- ============================================
-- INITIAL SEED DATA - Features
-- ============================================

INSERT INTO features (id, title, category, description, votes, rank, is_live) VALUES
-- Web App
('web-1', '論文格式救星 (Live)', 'web', '丟入 Word 檔，自動校正排版。目前已上線 Beta 版，持續迭代中。', 56, 1, TRUE),
('web-2', '雷包組員偵測器', 'web', '專案管理頁面。組員三天沒進度，系統自動寄信給教授 CC 全組。', 12, 2, FALSE),
('web-3', 'PDF 轉譯與對話', 'web', '上傳英文文獻，左邊原文右邊翻譯，還能直接問 AI 論文細節。', 8, 3, FALSE),

-- Chrome Extension
('ext-1', '文獻神偷 (Scholar Snatcher)', 'extension', '在 Google Scholar 一鍵下載 PDF 並「自動重新命名」為 [年份] 作者 - 標題。', 0, 0, FALSE),
('ext-2', '專注力場', 'extension', '論文模式開啟時，若試圖打開 FB/IG，畫面會被黑底藍字覆蓋質問：「寫完了嗎？」', 0, 0, FALSE),
('ext-3', '購物車冷靜期', 'extension', '在網拍結帳頁面強制加入「24 小時倒數計時」按鈕，時間到才能付款。', 0, 0, FALSE),

-- Mobile App
('app-1', '社死鬧鐘', 'mobile', '早八沒起床掃描牙膏 QR Code，App 自動發布丟臉動態到 Instagram 限動。', 0, 0, FALSE),
('app-2', 'AA 帳單終結者', 'mobile', '拍發票自動辨識品項，拖曳名字分帳，自動生成 Line Pay 連結。', 0, 0, FALSE),
('app-3', '冰箱食材管家', 'mobile', '買東西拍照辨識，自動設定過期提醒，減少浪費。', 0, 0, FALSE),

-- Desktop App
('desk-1', '桌面整理術', 'desktop', '一鍵將桌面亂七八糟的檔案吸入「論文」、「迷因」、「行政」資料夾歸位。', 0, 0, FALSE),
('desk-2', '論文時光機', 'desktop', '監控論文存檔，自動在背景備份歷史版本，檔案毀損也能一鍵回溯。', 0, 0, FALSE),
('desk-3', '護眼強制令', 'desktop', '每 50 分鐘強制鎖定螢幕 5 分鐘，無法透過工作管理員關閉。', 0, 0, FALSE),

-- Automation Script
('script-1', '高鐵/選課 餘額監控', 'script', '7x24 小時後台刷票，一有釋出名額立刻 Line 通知或自動搶票。', 0, 0, FALSE),
('script-2', '教授公告推播', 'script', '監控系網或實驗室網站，有新公告直接轉發摘要到你的 Line。', 0, 0, FALSE),
('script-3', '租屋雷達', 'script', '設定條件（內埔、5000元、可養貓），符合條件的新物件秒通知。', 0, 0, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- DONE! Tables created and seeded.
-- ============================================
