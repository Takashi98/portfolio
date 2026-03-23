import { useState } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

const WHATSAPP_NUMBER = '918707849873';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please provide more details (min 10 chars)"),
});

export default function ContactSection() {
  const { register, handleSubmit, formState: { errors } } = useRHForm({
    resolver: zodResolver(formSchema),
    defaultValues: { projectType: '' },
  });

  const onSubmit = (data) => {
    const text = [
      `Hello, I would like to connect.`,
      ``,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Project Type: ${data.projectType}`,
      `Budget: ${data.budget || 'Not specified'}`,
      `Timeline: ${data.timeline || 'Not specified'}`,
      ``,
      `Message:`,
      data.message,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="w-full py-section-y px-section-x bg-background border-t border-borderContent">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16">

          {/* Left: Heading */}
          <div className="md:w-5/12 flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted block mb-3">Get In Touch</span>
            <h2 className="text-display-section uppercase leading-tight mb-8">
              Let's Work<br /> Together.
            </h2>
            <p className="text-textSecondary text-lg text-balance mb-8 leading-relaxed opacity-80">
              Have a project, collaboration, or hiring opportunity? Fill the form and you'll be redirected to WhatsApp to send me the message directly.
            </p>

            <div className="mt-8 md:mt-auto">
              <div className="border-t border-borderContent pt-6 space-y-3">
                <p className="font-mono text-[11px] text-textMuted uppercase tracking-widest">Or reach out directly</p>
                <a href="mailto:vishalprjpt15@gmail.com" className="text-textSecondary hover:text-textPrimary transition-colors text-sm block">vishalprjpt15@gmail.com</a>
                <a href="https://wa.me/918707849873" target="_blank" rel="noopener" className="text-textSecondary hover:text-[#25D366] transition-colors text-sm block">WhatsApp: +91 8707849873</a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:w-7/12">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">

              {/* Name */}
              <div className="flex flex-col gap-2 relative">
                <input
                  type="text"
                  placeholder="Full Name *"
                  {...register("name")}
                  className={`bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-borderContent'} py-4 focus:outline-none focus:border-colorBrand focus:bg-surface transition-colors font-mono text-sm text-textPrimary placeholder:text-textMuted`}
                />
                {errors.name && <span className="text-red-500 text-xs font-mono absolute -bottom-5 left-0">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 relative">
                <input
                  type="email"
                  placeholder="Email Address *"
                  {...register("email")}
                  className={`bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-borderContent'} py-4 focus:outline-none focus:border-colorBrand focus:bg-surface transition-colors font-mono text-sm text-textPrimary placeholder:text-textMuted`}
                />
                {errors.email && <span className="text-red-500 text-xs font-mono absolute -bottom-5 left-0">{errors.email.message}</span>}
              </div>

              {/* Project Type */}
              <div className="flex flex-col gap-2 relative">
                <select
                  {...register("projectType")}
                  className={`bg-transparent border-b ${errors.projectType ? 'border-red-500' : 'border-borderContent'} py-4 focus:outline-none focus:border-colorBrand hover:bg-surface appearance-none cursor-pointer text-textSecondary font-mono text-sm`}
                >
                  <option value="">Project Type / Inquiry *</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Shopify Store">Shopify Store</option>
                  <option value="Full-Stack Application">Full-Stack Application</option>
                  <option value="Freelance / Contract">Freelance / Contract</option>
                  <option value="Hiring / Job Opportunity">Hiring / Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
                {errors.projectType && <span className="text-red-500 text-xs font-mono absolute -bottom-5 left-0">{errors.projectType.message}</span>}
              </div>

              {/* Budget & Timeline row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Budget (optional)"
                    {...register("budget")}
                    className="bg-transparent border-b border-borderContent py-4 focus:outline-none focus:border-colorBrand focus:bg-surface transition-colors font-mono text-sm text-textPrimary placeholder:text-textMuted"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Timeline (optional)"
                    {...register("timeline")}
                    className="bg-transparent border-b border-borderContent py-4 focus:outline-none focus:border-colorBrand focus:bg-surface transition-colors font-mono text-sm text-textPrimary placeholder:text-textMuted"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 relative">
                <textarea
                  placeholder="Tell me about your project or opportunity... *"
                  {...register("message")}
                  rows={4}
                  className={`bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-borderContent'} py-4 focus:outline-none focus:border-colorBrand focus:bg-surface transition-colors resize-none font-mono text-sm text-textPrimary placeholder:text-textMuted`}
                />
                {errors.message && <span className="text-red-500 text-xs font-mono absolute -bottom-5 left-0">{errors.message.message}</span>}
              </div>

              {/* Submit → WhatsApp */}
              <button
                type="submit"
                className="group mt-4 flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] hover:bg-[#1fba59] text-white rounded-2xl text-base font-display uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.98] shadow-[0_8px_30px_-5px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Continue to WhatsApp</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Note */}
              <p className="font-mono text-[10px] text-textMuted uppercase tracking-widest opacity-50 text-center">
                You'll review the message in WhatsApp before sending
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
