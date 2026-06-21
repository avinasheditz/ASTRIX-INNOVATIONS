/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Innovation {
  id: string;
  title: string;
  description: string;
  industry: 'Technology' | 'Healthcare' | 'Artificial Intelligence' | 'Engineering';
  technologiesUsed: string[];
  imageUrl: string;
  longDescription: string;
  keyFeatures: string[];
  specs: { label: string; value: string }[];
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  bullets: string[];
  gradient: string;
  glowColor: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  category: 'Emerging Tech' | 'Engineering Concept' | 'AI Research' | 'Healthcare Innovation' | 'Prototype';
  stage: 'Concept' | 'Simulating' | 'Prototype' | 'Field Trial';
  description: string;
  longDetail: string;
  metrics: { label: string; value: string }[];
}

export interface BlogPost {
  id: string;
  category: 'Technology' | 'Healthcare' | 'Artificial Intelligence' | 'Engineering' | 'Innovation';
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  type: 'Full-time' | 'Internship' | 'Research Collaboration';
  department: string;
  location: string;
  description: string;
  requirements: string[];
}
