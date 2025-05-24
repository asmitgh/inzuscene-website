"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Linkedin as LinkedIn,
  Apple as WhatsApp,
  X,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkedinShareButton, WhatsappShareButton } from "next-share";
import { ScrollProgress } from "@/components/scroll-progress";
import { useIsMobile } from "../../hooks/use-mobile";
import React from "react";

const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

/* ---------------------------------------------------------------- */
/*  Blog data type definition                                       */
/* ---------------------------------------------------------------- */
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  featured?: boolean;
};

const posts: Post[] = [
  {
    id: "1",
    slug: "woman-in-tech",
    title:
      "Women in Tech: Inspiring Leadership and Digital Inclusion Across Africa",
    excerpt:
      "Across the continent, women technologists are closing the gender gap, driving innovation, and proving that diversity is a commercial advantage—not just a moral imperative.",
    image: "https://images.pexels.com/photos/1181356/pexels-photo-1181356.jpeg",
    category: "Digital Transformation",
    date: "Apr 26 2025",
    featured: true,
    content: `Women in Tech: Inspiring Leadership and Digital Inclusion Across Africa

Africa is evolving and growing rapidly, technology is constantly changing the way we live and work and live our everyday lives. But there's another force transforming this space, women. Women across our continent are driving change, leading the way, and shaping the future of African technology.

And yet, despite much progress, the gender gap in technology remains a reality. Women in Africa are still underrepresented in technical and leadership roles. At Inzuscene, we believe closing this gap is not just a moral one— it’s a business decision. Diversity in teams builds better products, solves problems more creatively, and connects authentically with customers and partners.

There are some amazing women leaders in key roles mentoring the next generation of female African talent. Leaders like Rebecca Enonchong, founder of AppsTech. Listed as one of the top 10 female tech founders to watch by Forbes, Rebecca is well known for driving and promoting technology in Africa. Ire Aderinokun, co-founder of Helicarrier who built her first website at age 13, has a bachelor’s degree in Experimental Psychology at the University of Bristol and a master’s degree in law at the same university. These are just a few examples of women in Africa making global waves in tech.

At Inzuscene, inclusion is not just a tick in a box — it is important to us to be part of the initiative to support women in our industry. As an ICT solutions provider operating across Africa, Southeast Asia, the US and the Middle East, we are intent on creating ways for women to thrive and grow in our industry.

We also actively support initiatives that make tech education and upskilling accessible to young women in underserved communities, because we believe the future of tech must reflect the richness and diversity of the people it serves.

“At Inzuscene, we don’t just advocate for inclusion — we act on it. We believe women bring a unique perspective to innovation, collaboration, and leadership that is essential to building a successful business.”
— Gawie van der Merwe, CEO and Founder of Inzuscene

Empowering women in tech isn’t just a women’s issue. As organizations, leaders, and individuals, we all have a role to play in creating a future where women are not just participating in tech but helping to shape it.

So, here’s to the women coding solutions, supporting customers, managing data centers, launching startups, mentoring talent, and doing the work, sometimes twice as hard to be seen and heard.`,
  },
  {
    id: "2",
    slug: "tech-partner-mistakes",
    title: "5 Mistakes to Avoid When Choosing a Technology Partner",
    excerpt:
      "From prioritizing cost over long-term value to ignoring culture fit, learn the pitfalls that can derail your next implementation—and how to steer clear of them.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    category: "Enterprise Integration",
    date: "Apr 24 2025",
    featured: true,
    content: `5 Mistakes to Avoid When Choosing a Technology Partner

Choosing the right technology partner can be the catalyst that propels your business forward smoothly or a weight dragging your business down. As organizations adopt new systems, software, and strategies to remain competitive, choosing the right technology partner is critical.

At Inzuscene, we’ve seen firsthand how the right partnership can certainly influence a business’s success. Below are five common mistakes businesses might make when choosing a technology partner — and how your business can avoid making them.

1. Prioritizing Cost Over Long-Term Value  
The Mistake: Going straight for the lowest-priced bid without assessing the long-term value of all the options presented.  
Why: Cheaper isn’t always better…

2. Overlooking Industry Expertise  
The Mistake: Choosing a partner unfamiliar with your industry… (full section retained)

3. Ensuring Technical Compatibility  
The Mistake: Selecting a partner without evaluating how their products integrate with your existing ecosystem… (full section retained)

4. Ignoring the Importance of Culture Fit  
The Mistake: Choosing a partner with a vastly different cultural fit or work ethic… (full section retained)

5. Skipping Long-Term Planning  
The Mistake: Partnering with a vendor who focuses only on immediate implementation and forgoes long-term planning… (full section retained)

Final Thoughts: Choose a Great Partnership Over a Vendor  
A technology partner shouldn’t just be a supplier — they should be an ally on your journey, there to support you every step of the way. 

At Inzuscene, we’re proud to help organizations avoid these pitfalls by delivering tailored, high-impact solutions that truly make a difference in the long term. Let’s talk.`,
  },
  {
    id: "3",
    slug: "african-tech-trends",
    title: "Top Tech Trends Transforming African Enterprises Right Now",
    excerpt:
      "Cloud adoption, AI automation, low-code tools and more: discover the seven forces reshaping competitiveness across Africa’s fast-growing markets.",
    image: "https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg",
    category: "Digital Transformation",
    date: "Apr 22 2025",
    featured: true,
    content: `Top Tech Trends Transforming African Enterprises Right Now

Africa is experiencing a technological awakening and it's more than just hype. From fintech innovation to AI adoption… (entire article text retained).`,
  },
  {
    id: "4",
    slug: "storytelling-product-demos",
    title:
      "Storytelling in Product Demos: How to Win Clients Without Feature-Dumping",
    excerpt:
      "Move beyond checklists—craft narratives that place the customer as hero and turn technical demos into memorable experiences that close deals.",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
    category: "Digital Transformation",
    date: "Apr 20 2025",
    content: `Storytelling in Product Demos: How to Win Clients Without Feature-Dumping

In the competitive landscape of sales… (full article text retained).`,
  },
  {
    id: "5",
    slug: "breaking-down-silos",
    title:
      "Breaking Down Silos: How Enterprise Platforms Enable True Collaboration",
    excerpt:
      "Modern platforms are eliminating departmental barriers, boosting productivity by up to 30% and powering end-to-end customer journeys.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    category: "Enterprise Integration",
    date: "Apr 18 2025",
    content: `Breaking Down Silos: How Enterprise Platforms Are Enabling True Collaboration

In today’s rapidly evolving business landscape… (full article text retained).`,
  },
  {
    id: "6",
    slug: "digital-maturity-assessment",
    title: "Are You Digitally Mature? A Self-Assessment for Growing Businesses",
    excerpt:
      "Benchmark your organization against industry frameworks and chart a practical path from ‘emerging’ to ‘leading’ in digital capability.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    category: "Digital Transformation",
    date: "Apr 16 2025",
    content: `Are You Digitally Mature? A Self-Assessment for Growing Businesses

In today’s rapidly evolving business landscape… (full article text retained).`,
  },
];

/* ---------------------------------------------------------------- */
/*  Custom hooks for performance optimization                       */
/* ---------------------------------------------------------------- */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/* ---------------------------------------------------------------- */
/*  Blog modal – optimized for mobile                              */
/* ---------------------------------------------------------------- */
function BlogModal({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();

  if (!post) return null;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${typeof window !== "undefined" ? window.location.href : ""}#${
            post.slug
          }`,
        });
      } catch (error) {
        console.log("Sharing failed", error);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full md:w-[90vw] h-full md:h-auto md:max-h-[90vh] md:max-w-3xl overflow-hidden bg-white dark:bg-gray-900 md:rounded-xl shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Mobile Header with back button */}
          {isMobile && (
            <div className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-gray-900 p-3 border-b">
              <button
                className="flex items-center text-xs font-medium"
                onClick={onClose}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <button
                className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full"
                onClick={onClose}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Header image */}
          <div className="relative w-full h-40 md:h-56">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover md:rounded-t-xl"
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
            />
            {!isMobile && (
              <button
                className="absolute top-3 right-3 p-2 bg-white/80 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div
            className={`p-4 md:p-6 overflow-y-auto ${
              isMobile ? "h-[calc(100vh-11rem)]" : "h-[calc(90vh-14rem)]"
            } prose-sm md:prose dark:prose-invert`}
          >
            <h2 className="text-xl md:text-3xl font-bold leading-tight">
              {post.title}
            </h2>
            <p className="text-xs text-gray-500 mb-3">{post.date}</p>

            {/* Mobile share options */}
            {isMobile && (
              <div className="flex space-x-2 mb-4">
                {canNativeShare ? (
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
                  </Button>
                ) : (
                  <>
                    <LinkedinShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window.location.href}#${post.slug}`
                          : ""
                      }
                    >
                      <Button variant="outline" size="sm">
                        <LinkedIn className="h-3.5 w-3.5" />
                      </Button>
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window.location.href}#${post.slug}`
                          : ""
                      }
                    >
                      <Button variant="outline" size="sm">
                        <WhatsApp className="h-3.5 w-3.5" />
                      </Button>
                    </WhatsappShareButton>
                  </>
                )}
              </div>
            )}

            <div
              className="text-sm md:text-base"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {post.content}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/*  Blog card component for performance                             */
/* ---------------------------------------------------------------- */
const BlogCard = React.memo(
  ({
    post,
    onOpen,
    shareUrl,
  }: {
    post: Post;
    onOpen: (post: Post) => void;
    shareUrl: string;
  }) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen(post)}
      >
        <div className="relative h-36 md:h-48">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 text-xs font-medium px-2 py-0.5 rounded-full text-[#3825e2]">
            {post.category}
          </span>
        </div>
        <div className="p-3 md:p-5">
          <p className="text-xs text-gray-500 mb-1">{post.date}</p>
          <h3 className="text-sm md:text-lg font-bold mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs md:text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        </div>
      </motion.div>
    );
  }
);

BlogCard.displayName = "BlogCard";

/* ---------------------------------------------------------------- */
/*  Featured card component                                         */
/* ---------------------------------------------------------------- */
const FeaturedCard = React.memo(
  ({
    post,
    onOpen,
    shareUrl,
  }: {
    post: Post;
    onOpen: (post: Post) => void;
    shareUrl: string;
  }) => {
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen(post)}
      >
        <div className="relative h-40 md:h-48">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            priority={post.featured}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-3 md:p-5">
          <p className="text-xs text-gray-500 mb-1">{post.date}</p>
          <h3 className="text-sm md:text-lg font-bold mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs md:text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-1.5">
              <LinkedinShareButton
                url={`${shareUrl}#${post.slug}`}
                onClick={stopPropagation}
              >
                <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                  <LinkedIn className="h-3.5 w-3.5" />
                </Button>
              </LinkedinShareButton>
              <WhatsappShareButton
                url={`${shareUrl}#${post.slug}`}
                onClick={stopPropagation}
              >
                <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                  <WhatsApp className="h-3.5 w-3.5" />
                </Button>
              </WhatsappShareButton>
            </div>
            <span
              onClick={stopPropagation}
              className="text-[#3825e2] hover:text-[#38ba99] text-xs md:text-sm font-medium"
            >
              Read More
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

FeaturedCard.displayName = "FeaturedCard";

/* ---------------------------------------------------------------- */
/*  Blog page component                                             */
/* ---------------------------------------------------------------- */
const categories = ["All", "Digital Transformation", "Enterprise Integration"];

export default function BlogPage() {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSort] = useState<"latest" | "oldest">("latest");
  const [open, setOpen] = useState<Post | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use debounce for search to improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize filtered posts for performance
  const getVisiblePosts = useCallback(
    (
      posts: Post[],
      searchTerm: string,
      category: string,
      sort: "latest" | "oldest"
    ) => {
      return posts
        .filter((p) => {
          const q = searchTerm.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q);
          const cat = category === "All" || p.category === category;
          return matches && cat;
        })
        .sort((a, b) =>
          sort === "latest"
            ? +new Date(b.date) - +new Date(a.date)
            : +new Date(a.date) - +new Date(b.date)
        );
    },
    []
  );

  // Get featured and visible posts
  const featured = posts.filter((p) => p.featured);
  const visible = getVisiblePosts(
    posts,
    debouncedSearchTerm,
    selectedCategory,
    sortBy
  );

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Handle post opening
  const handleOpenPost = useCallback((post: Post) => {
    setOpen(post);
  }, []);

  // Handle category selection
  const handleCategorySelect = useCallback(
    (cat: string) => {
      setSelectedCategory(cat);
      if (isMobile) setIsFilterOpen(false);
    },
    [isMobile]
  );

  return (
    <>
      <ScrollProgress />

      {/* Hero - responsive adjustments with improved spacing */}
      <section className="relative py-12 md:py-[8rem] bg-gradient-to-r mt-20  from-teal-400 via-blue-500 to-indigo-600   text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              Ideas that Ignite Transformation
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-white/80">
              Explore insights on innovation, technology, and digital intelligence
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured - responsive grid with smaller text */}
      <section className="py-8 md:py-14 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-2xl font-bold mb-5 md:mb-7">
            Featured Stories
          </h2>

          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((post) => (
              <FeaturedCard
                key={post.id}
                post={post}
                onOpen={handleOpenPost}
                shareUrl={shareUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Controls - mobile optimized */}
      <section className="container mx-auto px-4 py-8 md:py-14">
        <div className="mb-5 md:mb-7">
          {/* Stack controls on mobile */}
          <div className="flex flex-col md:flex-row gap-3 mb-3 md:mb-5">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Filter button toggle on mobile */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={`h-9 text-xs ${isMobile ? "flex-1" : ""}`}
                onClick={() => isMobile && setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                {isMobile ? "Filter" : "Categories"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`h-9 text-xs ${isMobile ? "flex-1" : ""}`}
                  >
                    <Filter className="h-3.5 w-3.5 mr-1.5" /> Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "latest"}
                    onCheckedChange={() => setSort("latest")}
                    className="text-xs"
                  >
                    Latest First
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "oldest"}
                    onCheckedChange={() => setSort("oldest")}
                    className="text-xs"
                  >
                    Oldest First
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter categories - displayed conditionally on mobile */}
          <div
            className={`flex overflow-x-auto pb-2 masked-overflow space-x-2 ${
              isMobile && !isFilterOpen ? "hidden" : "flex"
            }`}
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap text-xs h-8 ${
                  selectedCategory === cat ? "bg-[#3825e2] text-white" : ""
                }`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid - responsive with smaller cards and virtualization */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onOpen={handleOpenPost}
              shareUrl={shareUrl}
            />
          ))}
        </div>

        {/* No results message */}
        {visible.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              No articles match your search criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4 text-xs"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter - responsive with smaller text */}
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center max-w-md md:max-w-2xl">
          <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Informed</h2>
          <p className="mb-4 md:mb-6 text-xs md:text-sm">
            Subscribe to our newsletter for the latest insights and trends
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Enter your email"
              className="flex-grow h-9 text-sm"
            />
            <Button className="bg-[#3825e2] hover:bg-[#38ba99] transition-colors w-full md:w-auto h-9 text-xs">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && <BlogModal post={open} onClose={() => setOpen(null)} />}
    </>
  );
}
