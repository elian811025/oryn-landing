import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ThesisFixer = () => {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // 處理檔案選擇
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // 處理提交 (連接 Python 後端)
    const handleSubmit = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            // 1. 建立 FormData
            const formData = new FormData();
            formData.append('file', file);

            // 2. 發送請求給 Python 後端
            // 注意：這裡的 /api 會透過 vite.config.js 代理轉送給 localhost:8000
            const response = await fetch('/api/fix-thesis', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            // 3. 取得 Blob (檔案內容)
            const blob = await response.blob();

            // 4. 觸發瀏覽器下載
            // 嘗試從 Header 抓檔名，如果抓不到就用預設的
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = `Fixed_${file.name}`;
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename\*=utf-8''(.+)/i);
                if (filenameMatch && filenameMatch[1]) {
                    filename = decodeURIComponent(filenameMatch[1]);
                }
            }

            // 建立下載連結
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            // 清理
            window.URL.revokeObjectURL(url);
            // alert("格式修復完成！請查看下載資料夾。"); // 選擇性開啟

        } catch (error) {
            console.error('Error:', error);
            alert("發生錯誤，請確認後端服務是否正常運行 (Python 視窗有沒有開？)");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* --- 背景裝飾區 (Nebula Effect) --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* --- 導航列 --- */}
            <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
                <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:opacity-80 transition-opacity">
                    ORYN
                </Link>
            </nav>

            {/* --- 主卡片區 --- */}
            <div className="max-w-2xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center shadow-2xl relative z-10">

                {/* 標題區 */}
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-4">
                        Beta 測試版
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                        論文格式救星
                    </h1>
                    <p className="text-gray-400 text-lg">
                        上傳你的 Word 檔 (.docx)，AI 瞬間幫你統一字體 (標楷體+Times)、行距與縮排。
                    </p>
                </div>

                {/* 檔案上傳區 */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-10 mb-8 hover:border-blue-400/50 transition-colors cursor-pointer bg-white/5 relative group">
                    <input
                        type="file"
                        accept=".docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="space-y-4 pointer-events-none">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {file ? '📄' : '📤'}
                        </div>
                        {file ? (
                            <div className="text-blue-300 font-medium">
                                <p className="text-xl">{file.name}</p>
                                <p className="text-sm text-gray-500 mt-1">準備就緒，點擊下方按鈕開始修復</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-lg font-medium text-white">點擊或拖曳檔案到這裡</p>
                                <p className="text-sm text-gray-500">支援 .docx 格式</p>
                            </>
                        )}
                    </div>
                </div>

                {/* 按鈕區 */}
                <div className="flex gap-4 justify-center items-center">
                    <Link to="/" className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 transition-all">
                        取消返回
                    </Link>

                    <button
                        onClick={handleSubmit}
                        disabled={!file || isProcessing}
                        className={`
                  relative px-8 py-3 rounded-lg font-bold shadow-lg transition-all overflow-hidden
                  ${(!file || isProcessing)
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 hover:shadow-blue-500/25'
                            }
                `}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                正在施法中...
                            </span>
                        ) : '開始修復格式 ⚡'}
                    </button>
                </div>
            </div>

            {/* Footer 聲明 */}
            <div className="absolute bottom-4 text-gray-600 text-xs">
                Powered by Oryn Python Engine
            </div>
        </div>
    );
};

export default ThesisFixer;