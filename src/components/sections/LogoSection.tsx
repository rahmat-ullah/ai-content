import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LogoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const logos = [
    {
      name: "Company 1",
      logo: "https://via.placeholder.com/150x50?text=Logo+1"
    },
    {
      name: "Company 2",
      logo: "https://via.placeholder.com/150x50?text=Logo+2"
    },
    {
      name: "Company 3",
      logo: "https://via.placeholder.com/150x50?text=Logo+3"
    },
    {
      name: "Company 4",
      logo: "https://via.placeholder.com/150x50?text=Logo+4"
    },
    {
      name: "Company 5",
      logo: "https://via.placeholder.com/150x50?text=Logo+5"
    },
    {
      name: "Company 6",
      logo: "https://via.placeholder.com/150x50?text=Logo+6"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef} className="text-center mb-10">
          <motion.h3 
            className="text-2xl font-semibold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Trusted by Leading Companies
          </motion.h3>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img src={logo.logo} alt={logo.name} className="max-h-12" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSection;
