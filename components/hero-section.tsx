"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 rounded-full backdrop-blur-xl border border-white/20">
                  <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
                  New Collection Drop
                </Badge>
              </motion.div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.1] text-balance">
                Step Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Comfort & Style
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Discover our curated collection of premium footwear. Where ergonomic design meets contemporary fashion for every lifestyle.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/shop">
                <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group rounded-full">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-2 rounded-full hover:bg-secondary/50">
                  View Collection
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 pt-4 border-t border-border/50"
            >
              {[
                { label: "Happy Customers", value: "50K+" },
                { label: "Average Rating", value: "4.9" },
                { label: "Shoe Styles", value: "1000+" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="font-heading font-bold text-2xl text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative"
          >
            <div className="relative z-10 glass-card rounded-3xl p-4 sm:p-6 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
              <div className="aspect-[4/5] sm:aspect-square relative rounded-2xl overflow-hidden bg-secondary/20">
                <img
                  src="/modern-stylish-shoes-collection-lifestyle-photogra.png"
                  alt="Premium shoe collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative Blobs */}
            <div className="absolute -top-20 -right-20 w-24 h-24 bg-primary/20 rounded-full blur-xl -z-10 opacity-15 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-24 h-24 bg-accent/20 rounded-full blur-xl -z-10 opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />

            {/* Floating Badges */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-8 -right-4 glass px-4 py-2 rounded-full text-sm font-semibold shadow-xl border-l-4 border-accent"
            >
              🎉 Free Shipping
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-12 -left-4 glass px-4 py-2 rounded-full text-sm font-semibold shadow-xl border-l-4 border-primary"
            >
              ✨ 30-Day Returns
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

