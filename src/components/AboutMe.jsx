import { motion } from 'framer-motion'

export function AboutMe() {
    return (
        <section id="about" className="py-32 px-8 bg-[#050505]">
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-serif leading-relaxed text-[#EAEAEA]">
                    願我們都能在數據的洪流中<br />找回掌舵的權利
                </h2>
                <div className="text-left space-y-12 text-xl md:text-2xl text-[#A1A1AA] leading-[2.2] font-light tracking-wide">
                    <p>傳說中，最早的人類懂得傾聽風的聲音。<br />但現代的我們，耳邊充滿了雜訊。我們害怕空白，害怕暫停，因為一旦安靜下來，我們就不得不面對那個陌生的自己。</p>

                    <p>我不善言辭，習慣隱身於鍵盤之後。<br />正是因為這份與人群的疏離，讓我看清了那些被噪音掩蓋的本質。我發現，真正的強大，不是向外索求認同，而是向內構建秩序。</p>

                    <p><strong className="text-[#D4AF37] font-normal">Oryn 是一面鏡子。</strong><br />它也是我為自己、也為像你一樣渴望在混亂中保有自我的人，所搭建的一座數位聖殿。在這裡，我們不需要面具，不需要討好。</p>

                    <p>我是 Oryn 的開發者，一個沒有名字的建築師。</p>
                </div>
            </motion.div>
        </section>
    )
}
