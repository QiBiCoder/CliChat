/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Building2,
  User,
  Mail,
  Phone,
  Briefcase,
  HelpCircle,
  Sparkles,
  CheckSquare,
  Square,
  AlertCircle,
  Loader2
} from "lucide-react";

interface QuoteWizardProps {
  id?: string;
}

export default function QuoteWizard({ id = "quote" }: QuoteWizardProps) {
  // Wizard state
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [monthlyEnquiries, setMonthlyEnquiries] = useState("");
  
  // Platform selection (Website, WhatsApp, Telegram)
  const [platformWeb, setPlatformWeb] = useState(false);
  const [platformWhatsApp, setPlatformWhatsApp] = useState(false);
  const [platformTelegram, setPlatformTelegram] = useState(false);

  // Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Pricing Logic (Confidential - Base Price = GHS 2999, each platform adds GHS 1000)
  const [estimatedTotal, setEstimatedTotal] = useState(2999);

  // Live total updates
  useEffect(() => {
    let price = 2999;
    if (platformWeb) price += 1000;
    if (platformWhatsApp) price += 1000;
    if (platformTelegram) price += 1000;
    setEstimatedTotal(price);
  }, [platformWeb, platformWhatsApp, platformTelegram]);

  // Form validation for each step
  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!businessName.trim()) newErrors.businessName = "Business name is required";
      if (!contactName.trim()) newErrors.contactName = "Contact name is required";
      
      if (!email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[+0-9\s-]{8,20}$/.test(phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (currentStep === 2) {
      if (!industry) newErrors.industry = "Please select your industry";
      if (!monthlyEnquiries) newErrors.monthlyEnquiries = "Please select monthly customer enquiries volume";
    }

    if (currentStep === 3) {
      if (!platformWeb && !platformWhatsApp && !platformTelegram) {
        newErrors.platforms = "Please select at least one channel to deploy your AI";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // Submission handler via real EmailJS integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError("");

    // Setup active platforms string for email summary
    const activePlatforms: string[] = [];
    if (platformWeb) activePlatforms.push("Website");
    if (platformWhatsApp) activePlatforms.push("WhatsApp");
    if (platformTelegram) activePlatforms.push("Telegram");

    // Map template parameters exactly for the requested variables
    const templateParams = {
      business_name: businessName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      industry: industry,
      monthly_enquiries: monthlyEnquiries,
      selected_platforms: activePlatforms.join(", "),
      estimated_total: `GHS ${estimatedTotal.toLocaleString()}`,
      submitted_at: new Date().toLocaleString("en-GH", { timeZone: "Africa/Accra" }),
    };

    // User's verified EmailJS keys
    const SERVICE_ID = "service_up6rc0p";
    const TEMPLATE_ID = "template_tziuu71";
    const PUBLIC_KEY = "nWS37xvspd7TaQMuG";

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (error: any) {
      console.error("EmailJS submission failure:", error);
      setSubmitError(
        "Oops! We encountered an error while sending your request. Please try again or reach out to support."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden bg-slate-950 border-t border-white/5">
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full mb-4">
            Interactive Quote Wizard
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            Get Your Instant AI Agent Quote
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-4 leading-relaxed">
            Fill out our quick 3-step configurator to receive a precise custom deployment quote based on your channel needs.
          </p>
        </div>

        {/* Wizard Card Frame */}
        <div className="glass-card rounded-[32px] border border-white/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col md:flex-row relative">
          
          {/* Floating step label */}
          <div className="absolute top-4 right-4 bg-brand-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-xl z-20 font-mono tracking-wider">
            STEP {step} OF 3
          </div>

          {/* Side Info Board - Stays same throughout steps */}
          <div className="w-full md:w-2/5 bg-white/[0.02] backdrop-blur-md p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="w-5 h-5 text-brand-primary" />
                <span className="font-display font-semibold text-xs text-brand-primary tracking-widest uppercase">
                  Agent Configurator
                </span>
              </div>

              {/* Steps Progress Checkpoints */}
              <div className="flex flex-col gap-6">
                {[
                  { num: 1, label: "Your Identity", sub: "Business and contact details" },
                  { num: 2, label: "Business Volume", sub: "Industry and enquiries scale" },
                  { num: 3, label: "AI Channels", sub: "Platform delivery choices" }
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border ${
                        step > item.num
                          ? "bg-brand-success border-brand-success text-slate-950"
                          : step === item.num
                          ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                          : "bg-slate-900 border-white/5 text-slate-500"
                      }`}
                    >
                      {step > item.num ? <Check className="w-4 h-4" /> : item.num}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${step === item.num ? "text-white" : "text-slate-400"}`}>
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Total Indicator (Updates live!) */}
            {!isSuccess && (
              <div className="mt-12 md:mt-0 p-5 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
                  Estimated Total Subscription:
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xs text-brand-primary font-bold">GHS</span>
                  <span className="text-3xl font-display font-bold text-white tracking-tight animate-fade-in">
                    {estimatedTotal.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block leading-relaxed">
                  Calculated automatically based on your customized channels.
                </span>
              </div>
            )}
          </div>

          {/* Form Content Area */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* SUCCESS SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center justify-center my-auto py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-success/15 border border-brand-success/30 flex items-center justify-center text-brand-success mb-6 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-2">
                    Application Received!
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
                    Thank you for requesting a custom quote for <span className="text-white font-semibold">{businessName}</span>. 
                    Our engineering team is already reviewing your specs. We will contact you at <span className="text-white">{email}</span> within 24 hours.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 w-full text-left text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Estimated Total:</span>
                      <span className="text-brand-success font-bold">GHS {estimatedTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 mt-1">
                      <span className="text-slate-400">Selected Channels:</span>
                      <span className="text-white">
                        {[platformWeb && "Website", platformWhatsApp && "WhatsApp", platformTelegram && "Telegram"]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                  {/* STEP 1: IDENTITY */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h3 className="font-display font-bold text-xl text-white tracking-tight mb-1">
                          Tell us about yourself
                        </h3>
                        <p className="text-xs text-slate-400">
                          Let's associate your custom agent quote with your brand correctly.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        {/* Business Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" /> Business Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Accra Superstores"
                            value={businessName}
                            onChange={(e) => {
                              setBusinessName(e.target.value);
                              if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: "" }));
                            }}
                            className={`px-4 py-3 bg-white/5 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary ${
                              errors.businessName ? "border-rose-500/50" : "border-white/10"
                            }`}
                          />
                          {errors.businessName && (
                            <span className="text-rose-400 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.businessName}
                            </span>
                          )}
                        </div>

                        {/* Contact Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" /> Contact Person *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kwame Boateng"
                            value={contactName}
                            onChange={(e) => {
                              setContactName(e.target.value);
                              if (errors.contactName) setErrors((prev) => ({ ...prev, contactName: "" }));
                            }}
                            className={`px-4 py-3 bg-white/5 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary ${
                              errors.contactName ? "border-rose-500/50" : "border-white/10"
                            }`}
                          />
                          {errors.contactName && (
                            <span className="text-rose-400 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.contactName}
                            </span>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" /> Corporate Email *
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. kwame@accrasuperstores.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                            className={`px-4 py-3 bg-white/5 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary ${
                              errors.email ? "border-rose-500/50" : "border-white/10"
                            }`}
                          />
                          {errors.email && (
                            <span className="text-rose-400 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.email}
                            </span>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" /> WhatsApp / Phone Number *
                          </label>
                          <input
                            type="tel"
                            placeholder="e.g. +233 24 123 4567"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                            }}
                            className={`px-4 py-3 bg-white/5 border rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary ${
                              errors.phone ? "border-rose-500/50" : "border-white/10"
                            }`}
                          />
                          {errors.phone && (
                            <span className="text-rose-400 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: VOLUME & BUSINESS SCALE */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h3 className="font-display font-bold text-xl text-white tracking-tight mb-1">
                          Business Scale Details
                        </h3>
                        <p className="text-xs text-slate-400">
                          These insights help us optimize the background intelligence model constraints.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6">
                        {/* Industry */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" /> Select Industry *
                          </label>
                          <select
                            value={industry}
                            onChange={(e) => {
                              setIndustry(e.target.value);
                              if (errors.industry) setErrors((prev) => ({ ...prev, industry: "" }));
                            }}
                            className={`px-4 py-3.5 bg-white/5 border rounded-2xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer ${
                              errors.industry ? "border-rose-500/50" : "border-white/10"
                            }`}
                          >
                            <option value="">Choose Industry...</option>
                            <option value="Retail & E-commerce">Retail & E-commerce</option>
                            <option value="Restaurant & Food Services">Restaurant & Food Services</option>
                            <option value="Education & E-learning">Education & E-learning</option>
                            <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                            <option value="Logistics & Delivery">Logistics & Delivery</option>
                            <option value="Real Estate & Housing">Real Estate & Housing</option>
                            <option value="Tech & Financial Services">Tech & Financial Services</option>
                            <option value="Other">Other Category</option>
                          </select>
                          {errors.industry && (
                            <span className="text-rose-400 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.industry}
                            </span>
                          )}
                        </div>

                        {/* Enquiries Volume */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5" /> Monthly Customer Enquiries *
                          </label>
                          <select
                            value={monthlyEnquiries}
                            onChange={(e) => {
                              setMonthlyEnquiries(e.target.value);
                              if (errors.monthlyEnquiries) setErrors((prev) => ({ ...prev, monthlyEnquiries: "" }));
                            }}
                            className={`px-4 py-3.5 bg-white/5 border rounded-2xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer ${
                              errors.monthlyEnquiries ? "border-rose-500/50" : "border-white/10"
                            }`}
                          >
                            <option value="">Select Monthly Enquiries Scale...</option>
                            <option value="Under 500 queries">Under 500 queries / month</option>
                            <option value="500 - 1,500 queries">500 - 1,500 queries / month</option>
                            <option value="1,500 - 5,000 queries">1,500 - 5,000 queries / month</option>
                            <option value="5,000+ queries">5,000+ queries / month</option>
                          </select>
                          {errors.monthlyEnquiries && (
                            <span className="text-rose-400 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.monthlyEnquiries}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CHANNELS & SUMMIT */}
                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <h3 className="font-display font-bold text-xl text-white tracking-tight mb-1">
                          Select Channels
                        </h3>
                        <p className="text-xs text-slate-400">
                          Choose the platforms where Kwame or Akua AI will reply to your users.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <label className="text-xs font-semibold text-slate-400">Select where you want your AI:</label>

                        <div className="flex flex-col gap-3">
                          {/* Website */}
                          <div
                            onClick={() => {
                              setPlatformWeb(!platformWeb);
                              setErrors((prev) => ({ ...prev, platforms: "" }));
                            }}
                            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-250 ${
                              platformWeb
                                ? "bg-brand-primary/10 border-brand-primary"
                                : "bg-slate-900/50 border-white/5 hover:border-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {platformWeb ? (
                                <CheckSquare className="w-5 h-5 text-brand-primary" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-600" />
                              )}
                              <div>
                                <h4 className="text-sm font-semibold text-white">Website Integration</h4>
                                <p className="text-[11px] text-slate-400">Custom chat bubble directly on your homepage</p>
                              </div>
                            </div>
                          </div>

                          {/* WhatsApp */}
                          <div
                            onClick={() => {
                              setPlatformWhatsApp(!platformWhatsApp);
                              setErrors((prev) => ({ ...prev, platforms: "" }));
                            }}
                            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-250 ${
                              platformWhatsApp
                                ? "bg-brand-success/10 border-brand-success"
                                : "bg-slate-900/50 border-white/5 hover:border-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {platformWhatsApp ? (
                                <CheckSquare className="w-5 h-5 text-brand-success" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-600" />
                              )}
                              <div>
                                <h4 className="text-sm font-semibold text-white">WhatsApp Integration</h4>
                                <p className="text-[11px] text-slate-400">Deploy on custom local WhatsApp Business numbers</p>
                              </div>
                            </div>
                          </div>

                          {/* Telegram */}
                          <div
                            onClick={() => {
                              setPlatformTelegram(!platformTelegram);
                              setErrors((prev) => ({ ...prev, platforms: "" }));
                            }}
                            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-250 ${
                              platformTelegram
                                ? "bg-brand-primary/10 border-brand-primary"
                                : "bg-slate-900/50 border-white/5 hover:border-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {platformTelegram ? (
                                <CheckSquare className="w-5 h-5 text-brand-primary" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-600" />
                              )}
                              <div>
                                <h4 className="text-sm font-semibold text-white">Telegram Channel Bot</h4>
                                <p className="text-[11px] text-slate-400">Reply inside groups, channels, or private chat bots</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {errors.platforms && (
                          <span className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.platforms}
                          </span>
                        )}

                        {submitError && (
                          <span className="text-rose-400 text-xs mt-1 p-3 bg-rose-950/25 border border-rose-500/20 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {submitError}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Buttons controls */}
                  <div className="flex items-center gap-4 mt-8 border-t border-white/5 pt-6">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-display font-bold text-sm flex items-center gap-2 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="ml-auto px-6 py-3 rounded-xl bg-brand-primary hover:opacity-90 text-white font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/10"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent hover:opacity-95 text-white font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                          </>
                        ) : (
                          <>
                            Get Final Quote <Check className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
