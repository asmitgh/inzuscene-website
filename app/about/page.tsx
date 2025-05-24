"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollProgress } from "@/components/scroll-progress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SplineComponent } from "@/components/Home/SplineComponent"
export default function AboutPage() {
  return (
    <div className="pt-20">
      <ScrollProgress />
      <SplineComponent />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600    text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Our Story
              </h1>
              <p className="text-xl mb-8 text-white/80">
                Transforming enterprises through innovative technology solutions
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  <span className="gradient-text">Our Mission</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  To empower enterprises to transcend the ordinary — by harnessing world-class platforms, orchestrating intelligent systems, and crafting experiences that don’t just work — they resonate.
We don’t reinvent the platform. We unlock its full potential — with precision, performance, and purpose.
                </p>
                
                <h2 className="text-3xl font-bold mb-6">
                  <span className="gradient-text">Our Vision</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  To be the #1 force behind future-ready enterprises — where every cloud, every system, and every interaction is amplified through design, intelligence, and integration.
We envision a world where technology doesn’t just support business — it elevates it. And Inzuscene is the lever.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
                alt="Our Mission"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Our Core Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Excellence",
                description: "We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations."
              },
              {
                icon: "💡",
                title: "Innovation",
                description: "We embrace innovation and creative thinking to solve complex business challenges."
              },
              {
                icon: "🤝",
                title: "Partnership",
                description: "We build lasting partnerships with our Customers, working together to achieve shared success."
              },
              {
                icon: "⚡",
                title: "Agility",
                description: "We adapt quickly to change and embrace new technologies and methodologies."
              },
              {
                icon: "🎓",
                title: "Continuous Learning",
                description: "We invest in continuous learning and development to stay ahead of industry trends."
              },
              {
                icon: "🌍",
                title: "Global Impact",
                description: "We make a positive impact on businesses and communities worldwide."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Global Presence */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Global Presence</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With offices and partners worldwide, we deliver excellence across borders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                region: "Singapore",
                location: "60, Paya Lebar Road, #07-54, Paya Lebar Square, Singapore 409051",
                focus: " "
              },
              {
                region: "USA",
                location: "815 Brazos St., Suite 500, Austin, TX 78701, USA",
                focus: " "
              },
              {
                region: "UAE",
                location: "1405, Addax Tower, Al Reem Island, Abu Dhabi, United Arab Emirates",
                focus: " "
              },
              {
                region: "South Africa",
                location: "8B, Kilimanjaro St, Bronkhorspruit, Centurion, South Africa",
                focus: " "
              },
              {
                region: "India",
                location: "9th Floor, Kankaria Estate, 6 Little Russel Street, Kolkata – 700071, India",
                focus: " "
              },
              {
                region: "Oman",
                location: "Bosher, Muscat Governorate, Muscat, Oman",
                focus: " "
              }
            ].map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{office.region}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{office.location}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{office.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Leadership */}
      {/* <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Our Leadership</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Shiladitya Mukherjee",
                role: "Chief Executive Officer",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              },
              {
                name: "Gawie Van der Merwie",
                role: "Chief Technology Officer",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              },
              {
                name: "Anuradha Mukherjee",
                role: "Chief Operations Officer",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              },
              {
                name: "Kamal Sharma",
                role: "Chief Strategy Officer",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              },
              {
                name: "Catherine",
                role: "Chief Marketing Officer",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              }
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* CTA Section */}
      <section className="py-24 morphing-bg text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8">
              Let's discuss how our solutions can help you achieve your goals
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-white text-[#3825e2] hover:bg-gray-100"
            >
              <a href="/contact">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
