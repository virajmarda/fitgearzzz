import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Award, Users, Target, TrendingUp, Heart, Zap } from 'lucide-react';

const Story = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const storyMilestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Started with a vision to democratize fitness equipment access across India.',
      icon: Target,
      stats: '1K+ Early Believers'
    },
    {
      year: '2022',
      title: 'Rapid Growth',
      description: 'Expanded to 50+ cities, delivering premium fitness gear to thousands of homes.',
      icon: TrendingUp,
      stats: '10K+ Happy Customers'
    },
    {
      year: '2024',
      title: 'Excellence Standard',
      description: 'Became India\'s #1 trusted fitness equipment brand with 50K+ active users.',
      icon: Award,
      stats: '50K+ Active Users'
    },
    {
      year: '2026',
      title: 'The Future',
      description: 'Building the ultimate fitness ecosystem with smart equipment and AI coaching.',
      icon: Zap,
      stats: 'Unlimited Potential'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'We live and breathe fitness, dedicated to your transformation journey.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Only the finest materials and engineering for lasting performance.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive ecosystem where everyone achieves their goals.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge technology and design.'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / windowHeight);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openVideoModal = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    setShowVideo(false);
    setIsPlaying(false);
  };

  return (
    iv className="min-h-screen bg-black text-white">
        {/* Hero Video Section */}
        <section className="relative h-screen overflow-hidden">
          {/* Background Video/Image */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                From a small vision to India's most trusted fitness equipment brand
              </p>

              {/* Play Video Button */}
              <motion.button
                onClick={openVideoModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 px-8 py-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
                <span className="text-xl font-semibold">Watch Our Journey</span>
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Mission</h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To empower every Indian to achieve their fitness goals by making premium equipment accessible, affordable, and inspiring.
              </p>
            </motion.div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="relative py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Journey</h2>
              <p className="text-xl text-gray-300">Milestones that shaped us</p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-500 hidden lg:block"></div>

              {storyMilestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center mb-24 last:mb-0 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex-col`}
                  >
                    {/* Content Card */}
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}>
                      <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-orange-500/50 transition-all duration-300 group">
                        <div className="text-orange-500 text-6xl font-bold mb-4">{milestone.year}</div>
                        <h3 className="text-3xl font-bold mb-4 group-hover:text-orange-500 transition-colors">{milestone.title}</h3>
                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">{milestone.description}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-500 font-semibold">
                          {milestone.stats}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-black z-10 hidden lg:flex">
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Mobile Icon */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 lg:hidden">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-32 px-4 bg-gradient-to-b from-black via-orange-950/20 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-16">We're Just <span className="text-orange-500">Getting Started</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="text-center">
                  <div className="text-7xl font-bold text-orange-500 mb-4">50K+</div>
                  <div className="text-2xl text-gray-300">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-7xl font-bold text-orange-500 mb-4">4.9/5</div>
                  <div className="text-2xl text-gray-300">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-7xl font-bold text-orange-500 mb-4">15K+</div>
                  <div className="text-2xl text-gray-300">Reviews</div>
                </div>
              </div>

              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
              >
                Join Our Community
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all group"
                >
                  <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                </button>

                {/* Video Placeholder - Replace with actual video embed */}
                <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-24 h-24 text-orange-500 mx-auto mb-6" />
                    <p className="text-2xl text-gray-300">Video Player</p>
                    <p className="text-gray-500 mt-2">Embed your brand story video here</p>
                    <p className="text-sm text-gray-600 mt-4">YouTube, Vimeo, or custom video URL</p>
                  </div>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6 text-white" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                      )}
                    </button>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Story;
