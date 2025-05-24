"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does Inzuscene specialize in?",
    answer: "Inzuscene specializes in end-to-end enterprise technology services. We provide solutions including ERP implementations, Enterprise Service Management (ESM), Field Service Management, cloud migration, data analytics, cybersecurity, and business process consulting. We drive transformation through scalable, tailored technology solutions."
  },
  {
    question: "How is Inzuscene different from other technology service providers?",
    answer: "Our difference lies in our executional rigor and bespoke approach, ensuring every project is executed with precision. Inzuscene's team combines in-depth expertise with global best practices, ensuring that we deliver an entire operational ecosystem that gives our Customers a competitive edge. Our emphasis on quality, security, and design excellence sets us apart, as does our commitment to long-term partnership and customer success."
  },
  {
    question: "What industries does Inzuscene typically work within?",
    answer: "Our expertise spans Manufacturing, Energy, Utilities & Resources, Construction & Engineering, Telecommunications, Oil & Gas, and the Services sectors."
  },
  {
    question: "Does Inzuscene offer post-launch support or maintenance?",
    answer: "Yes. Inzuscene provides comprehensive post-launch support and managed services for all solutions we deliver. Thereafter we provide support, and we offer maintenance plans, continuous monitoring, and regular updates to address any issues or new requirements that arise after go-live."
  },
  {
    question: "How do I get started with Inzuscene?",
    answer: "Getting started is simple. You can reach out to us via info@inzuscene.com or fill out our contact form on the website. We begin with a discovery consultation to understand your challenges, goals, and vision. We will work with you to deliver a tailored solution. We are here to ensure your experience with Inzuscene is seamless and productive from day one."
  }
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto px-4 py-8 md:py-16 md:max-w-4xl">
      <div className="text-center mb-8 md:mb-16">
        <h2 className={`font-bold mb-3 ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
          <span className='bg-clip-text text-transparent bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600  '>
            Frequently Asked Questions
          </span>
        </h2>
      </div>

      <div className="space-y-3 md:space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-100 md:mx-auto mx-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              className={`flex justify-between items-center w-full text-left focus:outline-none ${isMobile ? 'p-4' : 'p-6'}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className={`font-semibold text-gray-800 pr-2 ${isMobile ? 'text-[13px]' : 'text-lg'}`}>
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className={`text-blue-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className={`border-t border-gray-100 pt-3 ${isMobile ? 'px-4 pb-4 text-sm' : 'px-6 pb-6 text-base'}`}>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ 
                      __html: faq.answer.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-blue-600">$1</span>') 
                    }}></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className={`text-center ${isMobile ? 'mt-16 mb-4' : 'mt-16'}`}>
        <h3 className={`font-bold mb-3 text-gray-800 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
          Have Questions? We're Here to Help!
        </h3>
        <p className={`text-gray-700 mb-5 ${isMobile ? 'text-sm px-2' : 'text-base'}`}>
          Reach out to us for any queries or assistance. We're committed to ensuring your Inzuscene experience is seamless and productive.
        </p>
        <a
          href="mailto:info@inzuscene.com"
          className={`inline-block bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
            isMobile ? 'py-2 px-6 text-sm' : 'py-3 px-8 text-base'
          }`}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default FAQComponent;