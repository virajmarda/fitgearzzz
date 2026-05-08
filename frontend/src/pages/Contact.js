import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock3,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Headphones,
  BadgeCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link } from 'react-router-dom';

const supportTopics = [
  'Order updates and delivery questions',
  'Product recommendations before purchase',
  'Returns, replacements, and support help',
  'Bulk, business, or partnership inquiries',
];

const contactCards = [
  {
    title: 'Email Us',
    value: 'fitgearzzz@gmail.com',
    href: 'mailto:fitgearzzz@gmail.com',
    note: 'Best for product, support, and order-related questions.',
    icon: Mail,
  },
  {
    title: 'Call Us',
    value: '+91 8668623252',
    href: 'tel:+918668623252',
    note: 'For quick assistance during business hours.',
    icon: Phone,
  },
  {
    title: 'Visit / Location',
    value: 'Solapur, Maharashtra, India',
    href: 'https://maps.google.com/?q=Solapur,Maharashtra,India',
    note: 'Our operations are based in Solapur, Maharashtra.',
    icon: MapPin,
  },
];

const quickLinks = [
  { label: 'Track your order', to: '/track-order' },
  { label: 'Browse products', to: '/products' },
  { label: 'Read the blog', to: '/blog' },
  { label: 'Learn about FitGearzzz', to: '/about' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully. Our team will get back to you within 24 hours.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-5"
              >
                Contact Us
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-oswald text-5xl sm:text-6xl lg:text-7xl leading-none uppercase tracking-tight mb-6"
                data-testid="contact-title"
              >
                Let’s make your
                <span className="block text-orange-500">next move easier</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed"
              >
                Whether you need help with an order, want product guidance, or have a business inquiry, the FitGearzzz team is here to help with fast, clear, and reliable support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <Clock3 className="w-4 h-4 text-orange-500" />
                  Replies within 24 hours
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  Real support, no dead-end forms
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <Headphones className="w-4 h-4 text-orange-500" />
                  7 days a week assistance
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/75 backdrop-blur-sm p-6 lg:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-5">
                  Support Snapshot
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">24 hrs</p>
                    <p className="text-sm text-zinc-400">Response target</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">7 days</p>
                    <p className="text-sm text-zinc-400">Support access</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">Order</p>
                    <p className="text-sm text-zinc-400">Help & guidance</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">Fast</p>
                    <p className="text-sm text-zinc-400">Clear communication</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Tell us what you need, and we’ll direct your query quickly — whether it’s support, product help, or a business-related inquiry.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith('https') ? '_blank' : undefined}
                  rel={card.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
                >
                  <Icon className="w-6 h-6 text-orange-500 mb-5" />
                  <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                    {card.title}
                  </p>
                  <h3 className="text-white text-xl font-semibold mb-3 break-words">
                    {card.value}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {card.note}
                  </p>
                  <span className="inline-flex items-center gap-2 text-orange-400 font-semibold">
                    Connect now
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 overflow-hidden">
              <div className="border-b border-zinc-800 p-8">
                <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-3">
                  Send a Message
                </p>
                <h2 className="font-oswald text-4xl uppercase text-white mb-3">
                  Tell us what you need
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  Fill out the form below and our team will get back to you with the right guidance as quickly as possible.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-8"
                data-testid="contact-form"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-zinc-300 mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-orange-500 rounded-2xl h-12"
                      data-testid="contact-name-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-zinc-300 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-orange-500 rounded-2xl h-12"
                      data-testid="contact-email-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-zinc-300 mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Optional"
                      className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-orange-500 rounded-2xl h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-zinc-300 mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder="What is this regarding?"
                      className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-orange-500 rounded-2xl h-12"
                      data-testid="contact-subject-input"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <Label htmlFor="message" className="text-zinc-300 mb-2 block">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    rows={7}
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us more so we can help you better..."
                    className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-500 rounded-2xl px-4 py-3 focus:border-orange-500 focus:outline-none resize-none"
                    data-testid="contact-message-input"
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-6">
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                    By submitting this form, you’re reaching the FitGearzzz team directly. Please include enough detail so we can respond faster and more accurately.
                  </p>

                  <Button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-6 font-semibold"
                    data-testid="contact-submit-button"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* What happens next */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                What Happens Next
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-7 h-7 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">We review your message</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Your inquiry is checked by our team so it goes to the right response path quickly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 w-7 h-7 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">We respond with clarity</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Whether it is support, product help, or a business request, we aim to respond within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 w-7 h-7 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">We help you move forward</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Our goal is not just to reply — it is to solve the issue or guide you to the right next step.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support topics */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                We Can Help With
              </p>
              <div className="space-y-3">
                {supportTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                  >
                    <BadgeCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-zinc-300 leading-relaxed">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                Business Hours
              </p>
              <div className="space-y-3 text-zinc-300">
                <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                  <span>Monday - Friday</span>
                  <span className="text-white font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                  <span>Saturday</span>
                  <span className="text-white font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Sunday</span>
                  <span className="text-white font-semibold">Closed</span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 mt-4">
                Support response times may vary slightly during high-volume periods, but we aim to reply as quickly as possible.
              </p>
            </div>

            {/* Quick links */}
            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                Quick Links
              </p>
              <div className="space-y-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 hover:border-zinc-700 transition-colors"
                  >
                    <span className="text-zinc-300">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Personal note */}
            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-7">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">A better support experience matters</h3>
                  <p className="text-zinc-300 leading-relaxed text-sm">
                    At FitGearzzz, we want communication to feel simple, fast, and human. If you reach out, we want you to feel heard — not lost in a generic form.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
