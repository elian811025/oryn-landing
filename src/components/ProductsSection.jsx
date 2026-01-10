import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

// Slow underwater easeOut
const slowEase = [0, 0, 0.2, 1]

const products = [
    {
        id: 'deepflow',
        image: '/product-deepflow.png',
        color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
        id: 'synapse',
        image: '/product-synapse.png',
        color: 'from-teal-500/20 to-cyan-500/20',
    },
    {
        id: 'resonance',
        image: '/product-resonance.png',
        color: 'from-blue-500/20 to-purple-500/20',
    },
]

function ProductCard({ product, isReversed }) {
    const { t } = useTranslation()
    const productKey = `products.${product.id}`

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
        >
            {/* Z-Pattern Layout */}
            <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>

                {/* Image Side - Slides in from the side */}
                <motion.div
                    className="flex-1 w-full"
                    initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: slowEase }}
                >
                    <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: slowEase }}
                    >
                        {/* Glassmorphism Card for Image */}
                        <div className="glass rounded-3xl overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-50`} />
                            <img
                                src={product.image}
                                alt={t(`${productKey}.name`)}
                                className="w-full h-auto relative z-10 transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Glow Effect */}
                        <div className={`absolute -inset-4 bg-gradient-to-r ${product.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
                    </motion.div>
                </motion.div>

                {/* Content Side - Fades in up */}
                <motion.div
                    className="flex-1 w-full"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: slowEase }}
                >
                    <div className="glass glass-border rounded-3xl p-8 lg:p-12">
                        {/* Product Name */}
                        <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-text-primary">
                            {t(`${productKey}.name`)}
                        </h3>

                        {/* Slogan */}
                        <p className="text-primary text-lg font-medium mb-6 italic">
                            {t(`${productKey}.slogan`)}
                        </p>

                        {/* Description */}
                        <p className="text-text-secondary text-lg leading-relaxed">
                            {t(`${productKey}.description`)}
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export function ProductsSection() {
    const { t } = useTranslation()

    return (
        <section id="products" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: slowEase }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent">
                            {t('products.title')}
                        </span>
                    </h2>
                </motion.div>

                {/* Product Cards - Z-Pattern */}
                <div className="space-y-24 lg:space-y-32">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isReversed={index % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
