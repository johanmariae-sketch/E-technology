"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import type { SiteContent, ProcessedPost } from "@/types/content";
import rawContent from "@/data/content.json";
const content = rawContent as SiteContent;

const categoryLabels: Record<string, string> = {
  all: "Todos",
  phones: "Teléfonos",
  laptops: "Laptops",
  accessories: "Accesorios",
  tablets: "Tablets",
  gaming: "Gaming",
  audio: "Audio",
  wearables: "Wearables",
  deals: "Ofertas",
  general: "General",
};

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...content.categories];
  const filteredPosts =
    activeCategory === "all"
      ? content.posts
      : content.posts.filter((post) => post.category === activeCategory);

  if (content.posts.length === 0) {
    return (
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold mb-4">Productos</h2>
          <p className="text-[#64748B]">
            Ejecuta <code className="text-[#3B7DFF] bg-[#F0F4FF] px-2 py-1 rounded">npm run download</code> para cargar productos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-24 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-[#3B7DFF] text-sm font-semibold font-[family-name:var(--font-mono)] uppercase tracking-wider">
              Catálogo
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mt-2">
              Productos Destacados
            </h2>
          </div>
          <a
            href={`https://instagram.com/${content.profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B7DFF] text-sm font-medium hover:underline inline-flex items-center gap-1"
          >
            Ver todo en Instagram <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-1.5 sm:gap-2 mb-8 sm:mb-10 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn-magnetic whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-[#1B2D6E] text-white border-[#1B2D6E] shadow-lg shadow-[#1B2D6E]/20"
                  : "bg-white text-[#64748B] border-[#E2EAFF] hover:border-[#3B7DFF] hover:text-[#1B2D6E]"
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <ProductCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Results */}
        <p className="text-center text-[#64748B] text-sm mt-10">
          {filteredPosts.length} producto{filteredPosts.length !== 1 ? "s" : ""} disponible{filteredPosts.length !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}

function ProductCard({ post }: { post: ProcessedPost }) {
  const mainImage = post.images[0];
  const rating = Math.min(5, Math.max(3.5, 3.5 + (post.likes / 200)));

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-lift group bg-white rounded-2xl sm:rounded-[1.5rem] border border-[#E2EAFF] overflow-hidden block"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#F0F4FF] overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={post.caption.slice(0, 100) || "Producto"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
            <Eye className="w-8 h-8" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5">
          {post.likes > 100 && (
            <span className="bg-[#EF4444] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Popular
            </span>
          )}
          {post.type === "reel" && (
            <span className="bg-[#1B2D6E] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Video
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-[#1B2D6E]/0 group-hover:bg-[#1B2D6E]/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white text-[#1B2D6E] text-xs font-semibold px-4 py-2 rounded-xl shadow-lg">
            Ver en Instagram
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <span className="text-[#3B7DFF] text-[10px] font-semibold font-[family-name:var(--font-mono)] uppercase tracking-wider">
          {categoryLabels[post.category] || post.category}
        </span>

        {/* Caption */}
        <p className="text-[#0F172A] text-xs sm:text-sm font-medium mt-1 line-clamp-2 leading-snug">
          {post.caption.slice(0, 80) || "Producto disponible"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(rating) ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#E2EAFF] fill-[#E2EAFF]"}`}
            />
          ))}
          <span className="text-[#64748B] text-[10px] ml-1">({post.likes})</span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0F4FF]">
          <span className="flex items-center gap-1 text-[#64748B] text-xs">
            <Heart className="w-3 h-3" /> {post.likes}
          </span>
          <span className="text-[#3B7DFF] text-xs font-semibold group-hover:underline">
            Ver detalles &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}
