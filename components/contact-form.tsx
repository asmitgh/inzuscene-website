"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        setIsSubmitted(true);
        toast({
          title: 'Message sent successfully!',
          description: "We'll get back to you as soon as possible.",
        });
      })
      .catch(() => {
        toast({
          title: 'Error sending message',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleNext = () => setFormStep((prev) => prev + 1);
  const handlePrevious = () => setFormStep((prev) => prev - 1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {formStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="name" className="text-lg font-medium">
                      Your Name
                    </Label>
                    <Input id="name" {...register('name')} className="mt-2" />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="mt-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-lg font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      {...register('company')}
                      className="mt-2"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-lg font-medium">
                      Industry
                    </Label>
                    <Select onValueChange={(value) => setValue('industry', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="energy">
                          Energy & Utilities
                        </SelectItem>
                        <SelectItem value="aerospace">
                          Aerospace & Defense
                        </SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="financial">
                          Financial Services
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full btn-gradient"
                      disabled={
                        !watch('name') || !watch('email') || !watch('company')
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="service" className="text-lg font-medium">
                      Service Interest
                    </Label>
                    <Select onValueChange={(value) => setValue('service', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="erp">ERP Implementation</SelectItem>
                        <SelectItem value="cloud">Cloud & Infrastructure</SelectItem>
                        <SelectItem value="low-code">Low-Code Solutions</SelectItem>
                        <SelectItem value="data">Data Analytics & BI</SelectItem>
                        <SelectItem value="integration">
                          System Integration
                        </SelectItem>
                        <SelectItem value="consulting">IT Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-lg font-medium">
                      Budget Range
                    </Label>
                    <Select onValueChange={(value) => setValue('budget', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<50k">Less than $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-250k">
                          $100,000 - $250,000
                        </SelectItem>
                        <SelectItem value="250k-500k">
                          $250,000 - $500,000
                        </SelectItem>
                        <SelectItem value="500k+">$500,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timeline" className="text-lg font-medium">
                      Project Timeline
                    </Label>
                    <Select
                      onValueChange={(value) => setValue('timeline', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate Start</SelectItem>
                        <SelectItem value="1-3months">1-3 Months</SelectItem>
                        <SelectItem value="3-6months">3-6 Months</SelectItem>
                        <SelectItem value="6months+">6+ Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-lg font-medium">
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell us about your project requirements..."
                      className="mt-2 min-h-[150px]"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 btn-gradient"
                      disabled={!watch('service') || !watch('message') || isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          Sending...
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              <div className="pt-2">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Step {formStep + 1} of 2</span>
                  <span>{formStep === 0 ? 'Basic Info' : 'Project Details'}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '50%' }}
                    animate={{ width: formStep === 0 ? '50%' : '100%' }}
                    className="h-full bg-gradient-to-r from-[#3825e2] to-[#38ba99]"
                  />
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for reaching out. One of our experts will contact you shortly.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormStep(0);
                }}
                variant="outline"
              >
                Send Another Message
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
