import { useState } from 'react';
import { homeData } from '../../data/homeData';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-section-y px-section-x bg-background">
      <div className="md:w-2/3 mx-auto">
        <h2 className="text-display-section uppercase leading-none mb-12 text-center">Frequently <br/> Asked Questions</h2>
        
        <div className="flex flex-col border-t border-borderContent">
          {homeData.faq.map((item, index) => (
            <div key={index} className="border-b border-borderContent">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center py-6 text-left hover:text-textSecondary transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-xl md:text-2xl font-display uppercase pr-8">{item.question}</span>
                {openIndex === index ? <Minus className="w-6 h-6 flex-shrink-0" /> : <Plus className="w-6 h-6 flex-shrink-0" />}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-600 ease-editorial ${openIndex === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-textSecondary text-lg text-balance w-full md:w-4/5 pt-2">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
