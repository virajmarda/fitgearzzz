import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight uppercase" data-testid="contact-title">
            Contact Us
          </h1>
          <p className="text-xl text-zinc-400 font-manrope mb-12 leading-relaxed">
            Have a question? We're here to help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 shadow-lg" data-testid="contact-form">
              <h2 className="font-oswald text-2xl font-bold text-white mb-6 uppercase">Send Us a Message</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-zinc-300 mb-2 block">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                    required
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-zinc-300 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                    required
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-zinc-300 mb-2 block">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                    required
                    data-testid="contact-subject-input"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-zinc-300 mb-2 block">Message</Label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-2xl px-4 py-3 focus:border-orange-500 focus:outline-none"
                    required
                    data-testid="contact-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full py-3"
                  data-testid="contact-submit-button"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-3xl p-8 shadow-lg">
              <h2 className="font-oswald text-2xl font-bold text-white mb-6 uppercase">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-oswald text-lg font-semibold text-white mb-1">Address</h3>
                    <p className="text-zinc-400 font-manrope">123 Fitness Street<br />Gym City, CA 90210<br />United States</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-oswald text-lg font-semibold text-white mb-1">Phone</h3>
                    <a href="tel:+15551234567" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope">
                      +1 (555) 123-4567
                    </a>
                    <p className="text-zinc-500 text-sm mt-1">Mon-Fri 9am-6pm PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-oswald text-lg font-semibold text-white mb-1">Email</h3>
                    <a href="mailto:support@fitgear.com" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope">
                      support@fitgear.com
                    </a>
                    <p className="text-zinc-500 text-sm mt-1">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 shadow-lg">
              <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">Business Hours</h2>
              <div className="space-y-2 text-zinc-300 font-manrope">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="text-white font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-white font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-white font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
