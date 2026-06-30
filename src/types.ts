/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuoteFormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  monthlyEnquiries: string;
  platforms: {
    website: boolean;
    whatsapp: boolean;
    telegram: boolean;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}
