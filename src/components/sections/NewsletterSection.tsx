import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NewsletterSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef} className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Stay Updated with AI Content Tips
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Subscribe to our newsletter for the latest AI content generation strategies, tips, and exclusive offers.
          </motion.p>
          
          <motion.form 
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <motion.button
              type="submit"
              className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
          
          <motion.p 
            className="text-sm text-white/70 mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
