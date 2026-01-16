import { motion } from 'framer-motion'

export function AboutMe() {
    return (
        <section id="about" className="py-32 px-4 md:px-8 bg-[#050505] relative overflow-hidden">

            {/* Background Decoration - Gentle Amber Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                className="max-w-6xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Visual Container: The "Digital Barrier" */}
                <div className="relative p-8 md:p-16 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-md border border-[#D4AF37]/20 shadow-[0_0_50px_-20px_rgba(212,175,55,0.15)] group hover:border-[#D4AF37]/40 transition-all duration-700">

                    {/* Decorative Corner Lines */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-xl" />


                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#EAEAEA]">
                        用最安靜的工具<br /><span className="text-[#A1A1AA] text-2xl md:text-4xl font-normal block mt-4">對抗最吵雜的世界</span>
                    </h2>

                    <div className="space-y-12 text-2xl md:text-3xl text-[#EAEAEA] leading-relaxed tracking-wide font-normal text-justify md:text-left">
                        <p>
                            世界很吵，我知道你只想靜一靜。<br />
                            我們常在演算法與通知的洪流裡，弄丟了原本要去的地方。
                        </p>

                        <p>
                            我不擅長社交，但我擅長在混亂中搭建秩序。<br />
                            <strong className="text-[#D4AF37] font-normal">Oryn</strong> 是我為你打造的<span className="text-[#EAEAEA] border-b border-[#D4AF37]/30 pb-0.5">數位結界</span>。在這裡，我幫你把那些試圖搶奪你注意力的瑣事擋在門外。
                        </p>

                        <p>
                            沒有干擾，沒有紅點，只有純粹的工具。<br />
                            讓你能從對抗噪音的疲憊中解放出來，把時間留給真正重要的事物——或是，好好與自己獨處。
                        </p>

                        <div className="pt-8 flex flex-col items-center md:items-end gap-2 opacity-80">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-2" />
                            <p className="text-sm md:text-base text-[#D4AF37] font-medium tracking-widest uppercase">
                                —— Oryn 開發者
                            </p>
                            <p className="text-xs md:text-sm text-[#71717A]">
                                你的秩序建築師
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
