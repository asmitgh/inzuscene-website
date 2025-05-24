"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, Tag, ChevronLeft, Share2 } from "lucide-react";
import { ScrollProgress } from "@/components/scroll-progress";
import { Button } from "@/components/ui/button";

// Define types for content blocks and blog posts
interface ContentBlock {
  type: "paragraph" | "subheading" | "image" | "list";
  content?: string;
  url?: string;
  caption?: string;
  items?: string[];
}

interface Author {
  name: string;
  avatar: string;
  role: string;
}

interface BlogPostType {
  title: string;
  content: ContentBlock[];
  author: Author;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
}

// Use a Record<string, BlogPostType> to allow dynamic indexing
const blogPosts: Record<string, BlogPostType> = {
  "1": {
    title: "The Future of ERP: AI-Driven Insights and Automation",
    content: [
      {
        type: "paragraph",
        content:
          "Artificial Intelligence is revolutionizing how enterprises manage their resources and operations. Modern ERP systems are no longer just transaction processing platforms – they're becoming intelligent advisors that can predict, recommend, and automate complex business processes.",
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
        caption: "AI-powered analytics dashboard showing real-time business insights",
      },
      {
        type: "subheading",
        content: "The Rise of Intelligent ERP Systems",
      },
      {
        type: "paragraph",
        content:
          "Traditional ERP systems have been the backbone of enterprise operations for decades. However, with the integration of AI and machine learning capabilities, these systems are evolving into what industry experts call 'intelligent ERP' or 'iERP'.",
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
        caption: "Modern enterprise operations center utilizing AI-driven ERP systems",
      },
      {
        type: "subheading",
        content: "Key Benefits of AI-Driven ERP",
      },
      {
        type: "list",
        items: [
          "Predictive Analytics for Better Decision Making",
          "Automated Routine Tasks and Workflows",
          "Real-time Insights and Reporting",
          "Enhanced Customer Experience",
          "Improved Resource Allocation",
        ],
      },
      {
        type: "image",
        url: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg",
        caption: "AI algorithms processing enterprise data for predictive insights",
      },
    ],
    author: {
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      role: "Enterprise Solutions Architect",
    },
    category: "ERP Implementation",
    readTime: "8 min read",
    date: "Mar 15, 2024",
    tags: ["ERP", "Artificial Intelligence", "Automation", "Digital Transformation"],
  },
  // Add more blog posts here as needed...
};

export default function BlogPost() {
  const params = useParams();
  // Ensure `id` is a string even if params.id might be string or string[]
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <div>Post not found</div>;
  }

  const post = blogPosts[id];
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="pt-20">
      <ScrollProgress />

      {/* Article Header */}
      <header className="relative py-24 bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Link>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-white/80">{post.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center text-white/80">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.readTime}
                </div>

                <div className="text-white/80">{post.date}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.content.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                    >
                      {block.content}
                    </motion.p>
                  );
                case "image":
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-8"
                    >
                      <div className="relative h-[400px] rounded-xl overflow-hidden">
                        <Image
                          src={block.url!}
                          alt={block.caption!}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {block.caption && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                          {block.caption}
                        </p>
                      )}
                    </motion.div>
                  );
                case "subheading":
                  return (
                    <motion.h2
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-2xl font-bold mb-4 mt-8"
                    >
                      {block.content}
                    </motion.h2>
                  );
                case "list":
                  return (
                    <motion.ul
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="list-disc list-inside mb-6 space-y-2"
                    >
                      {block.items!.map((item, i) => (
                        <li key={i} className="text-lg text-gray-700 dark:text-gray-300">
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  );
                default:
                  return null;
              }
            })}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share & More */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <Button variant="outline" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" /> Share Article
              </Button>
              <Link href="/blog" className="text-[#3825e2] hover:text-[#38ba99]">
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}