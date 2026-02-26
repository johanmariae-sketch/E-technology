"use client";

import { motion } from "framer-motion";
import { ArrowRight, Truck, CreditCard, Clock, Shield } from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "@/types/content";
import rawContent from "@/data/content.json";
const content = rawContent as SiteContent;

const perks = [
  { icon: Truck, text: "Envíos a todo el país" },
  { icon: CreditCard, text: "Tarjetas de crédito" },
  { icon: Clock, text: "L-V 9:30AM — 8PM" },
  { icon: Shield, text: "Garantía oficial" },
];

export default function Hero() {
  // Get the most liked post as featured
  const featured = [...content.posts].sort((a, b) => b.likes - a.likes)[0];
  const secondFeatured = [...content.posts].sort((a, b) => b.likes - a.likes)[1];

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1B3D] via-[#1B2D6E] to-[#2B4BAA]" />

      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-white/20" />
        <div className="absolute top-40 right-40 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#3B7DFF]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-16 min-h-[100dvh] flex flex-col justify-end">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          {/* Left — Text */}
          <div className="pb-8 lg:pb-16">
            {/* Brand name — prominent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mb-6"
            >
              <h2 className="font-[family-name:var(--font-heading)] text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase">
                E Technology Store
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-white/60 text-sm font-medium">Tienda abierta — Piantini, Santo Domingo</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6"
            >
              <span className="block font-[family-name:var(--font-heading)] text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Tecnología es
              </span>
              <span className="block text-4xl sm:text-6xl lg:text-7xl font-bold italic text-[#6BA1FF] mt-1 sm:mt-2" style={{ fontFamily: "Georgia, serif" }}>
                Confianza.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-white/60 text-base sm:text-lg max-w-xs sm:max-w-md mb-8 sm:mb-10 leading-relaxed"
            >
              Los mejores smartphones, tablets y accesorios. {content.profile.followers.toLocaleString()} personas ya confían en nosotros.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#products"
                className="btn-magnetic inline-flex items-center justify-center gap-2 bg-white text-[#1B2D6E] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm group"
              >
                Ver productos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={content.profile.externalUrl || `https://wa.me/`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm hover:bg-white/20"
              >
                Contactar por WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Right — Featured product showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-end items-end gap-4 pb-16"
          >
            {/* Main featured card */}
            {featured?.images[0] && (
              <div className="relative w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
                <Image
                  src={featured.images[0]}
                  alt="Producto destacado"
                  fill
                  className="object-cover"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[#6BA1FF] text-xs font-[family-name:var(--font-mono)] font-medium uppercase tracking-wider">Destacado</span>
                  <p className="text-white text-sm mt-1 line-clamp-2">{featured.caption.slice(0, 60)}</p>
                </div>
              </div>
            )}
            {/* Secondary card */}
            {secondFeatured?.images[0] && (
              <div className="relative w-48 h-72 rounded-[2rem] overflow-hidden shadow-xl shadow-black/20 border border-white/10 mb-8">
                <Image
                  src={secondFeatured.images[0]}
                  alt="Producto"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[#6BA1FF] text-xs font-[family-name:var(--font-mono)] font-medium uppercase tracking-wider">Popular</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom perks bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8"
        >
          {perks.map((perk) => (
            <div
              key={perk.text}
              className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3"
            >
              <perk.icon className="w-4 h-4 text-[#6BA1FF] flex-shrink-0" />
              <span className="text-white/70 text-xs font-medium">{perk.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
