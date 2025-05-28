import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 29,
      annualPrice: 19,
      features: [
        "5,000 words per month",
        "5 content types",
        "Basic templates",
        "Standard support",
        "1 user"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and teams",
      monthlyPrice: 79,
      annualPrice: 59,
      features: [
        "50,000 words per month",
        "All content types",
        "Advanced templates",
        "Priority support",
        "5 users",
        "API access",
        "Custom branding"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 199,
      annualPrice: 149,
      features: [
        "Unlimited words",
        "All content types",
        "Custom templates",
        "Dedicated support",
        "Unlimited users",
        "Advanced API access",
        "Custom integrations",
        "SSO authentication"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.span 
            className="text-primary font-semibold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            PRICING
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Choose the perfect plan for your content needs. All plans include a 14-day free trial.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className={`mr-3 ${isAnnual ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>Monthly</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual <span className="text-green-500 text-sm font-medium">Save 25%</span>
            </span>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              description={plan.description}
              price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
              features={plan.features}
              cta={plan.cta}
              popular={plan.popular}
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-600">
            Need a custom plan? <a href="#" className="text-primary font-medium">Contact our sales team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  features: string[];
  cta: string;
  popular: boolean;
  isAnnual: boolean;
  index: number;
}

const PricingCard = ({ name, description, price, features, cta, popular, isAnnual, index }: PricingCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className={`rounded-xl p-6 ${popular ? 'border-2 border-primary shadow-purple' : 'border border-gray-200 shadow-soft'} bg-white relative`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
      whileHover={{ y: -5, boxShadow: popular ? '0 10px 25px rgba(107, 70, 193, 0.2)' : '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          MOST POPULAR
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-600">/mo {isAnnual && 'billed annually'}</span>
      </div>
      
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button
        className={`w-full py-3 px-4 rounded-full font-medium ${popular ? 'bg-primary text-white hover:bg-primary-600' : 'bg-white border border-primary text-primary hover:bg-primary-50'}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {cta}
      </motion.button>
    </motion.div>
  );
};

export default PricingSection;
