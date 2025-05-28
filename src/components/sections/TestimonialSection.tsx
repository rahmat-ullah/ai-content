import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const testimonials = [
    {
      quote: "This AI content generator has completely transformed our content strategy. We're producing twice the content in half the time with better results.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      quote: "The quality of content this tool produces is remarkable. It's like having an expert copywriter available 24/7 who knows our brand voice perfectly.",
      author: "Michael Chen",
      position: "Content Manager, GrowthLabs",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      quote: "We've seen a 40% increase in our conversion rates since implementing this AI content tool. The ROI has been incredible for our business.",
      author: "Jessica Williams",
      position: "CEO, Startup Ventures",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      quote: "As a solo entrepreneur, this tool has been a game-changer. I can now create professional content across all my channels without hiring a team.",
      author: "David Rodriguez",
      position: "Founder, Solo Success",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.span 
            className="text-primary font-semibold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Thousands of marketers, agencies, and businesses trust our AI content generator to create engaging content at scale.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              avatar={testimonial.avatar}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  avatar: string;
  index: number;
}

const TestimonialCard = ({ quote, author, position, avatar, index }: TestimonialCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl p-6 shadow-soft border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center mb-4">
        <svg className="text-primary w-8 h-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div className="flex items-center">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-gray-600 text-sm">{position}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
