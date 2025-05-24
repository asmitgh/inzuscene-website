"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Share2,
  Linkedin as LinkedIn,
  Apple as WhatsApp,
  Clock,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkedinShareButton, WhatsappShareButton } from "next-share";

const categories = [
  "All",
  "Digital Transformation",
  "Cloud & Infrastructure",
  "ERP Implementation",
  "Cybersecurity",
  "AI & Machine Learning",
  "Industry 4.0",
  "Low-Code Development",
  "Data Analytics",
  "Enterprise Integration",
];

const blogPosts = [
  {
    id: "1",
    title: "Are You Digitally Mature? A Self-Assessment for Growing Businesses",
    excerpt:
      "This blog helps you understand where your business stands on the digital maturity spectrum and provides actionable steps to advance your digital capabilities.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    author: {
      name: "Shiladitya Mukherjee",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    category: "Digital Transformation",
    date: "Mar 15, 2024",
    featured: true,
    readTime: "10 Min Read",
  },
  {
    id: "2",
    title: "Breaking Down Silos: How Enterprise Platforms Are Enabling True Collaboration",
    excerpt:
      "This blog explores how modern enterprise platforms are dismantling traditional barriers between departments.",
    image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
    author: {
      name: "Shiladitya Mukherjee",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    category: "Digital Transformation",
    date: "Mar 12, 2024",
    featured: true,
    readTime: "8 Min Read",
  },
  {
    id: "3",
    title: "Storytelling in Product Demos: How to Win Clients Without Feature-Dumping",
    excerpt:
      "This blog discovers practical techniques to craft customer-centered stories, structure your demonstrations for maximum impact, and avoid the common pitfall of overwhelming prospects with feature lists that fail to address their core business challenges.",
    image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010130.jpg?t=st=1745509186~exp=1745512786~hmac=1ebdfcec6e2596beec475dd8c246d7b67e9468302cf4f2830c2d13519590b1b4&w=1380",
    author: {
      name: "Shiladitya Mukherjee",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    category: "Digital Transformation",
    date: "Mar 10, 2024",
    featured: true,
    readTime: "12 Min Read",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="pt-20">
      {/* Blog Section Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-[500] text-center text-blue-500 mb-6"
        >
          <span className=" bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 ">News, Insights and More</span>
        </motion.h2>
      </div>

      {/* Featured Posts Grid */}
      <section className="container mx-auto px-[8rem] mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow border border-gray-100"
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-black mb-4 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Author and publication details */}
                <div className="flex items-center mb-4 text-sm text-black">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                  <div className="flex items-center text-black text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <LinkedinShareButton url={`${shareUrl}/${post.id}`}>
                      <LinkedIn className="h-4 w-4 text-black hover:text-blue-600" />
                    </LinkedinShareButton>
                    <WhatsappShareButton url={`${shareUrl}/${post.id}`}>
                      <WhatsApp className="h-4 w-4 text-black hover:text-green-500" />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}