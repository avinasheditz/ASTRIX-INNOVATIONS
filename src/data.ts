/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IndustryItem, Innovation, ResearchProject, BlogPost, CareerPosition } from './types';

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'technology',
    name: 'Technology',
    iconName: 'Laptop',
    tagline: 'Sovereign Digital Ecosystems',
    description: 'We build secure, hyperscale digital platforms, SaaS systems, and responsive web products that modernize enterprise operations.',
    bullets: [
      'Interactive Web Platforms & Dashboards',
      'High-Performance Mobile Applications',
      'Scalable Secure SaaS Architectures',
      'Enterprise System Integration & Migrations'
    ],
    gradient: 'from-cyan-500 to-indigo-600',
    glowColor: 'shadow-neon-cyan'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    iconName: 'Activity',
    tagline: 'Next-Generation Healthtech Solutions',
    description: 'Operating at the epicenter of medical technology, design, and hardware-telemetry diagnostics to optimize patient outcomes.',
    bullets: [
      'Digital Healthcare Solutions & Platforms',
      'Health Technology Platforms & Hardware Integrations',
      'Healthcare Automation & Workflow Schedulers',
      'Advanced Medical Device Prototyping'
    ],
    gradient: 'from-emerald-400 to-cyan-500',
    glowColor: 'shadow-neon-cyan'
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    iconName: 'Cpu',
    tagline: 'Cognitive Intelligent Automation',
    description: 'Deploying neural models, autonomous AI agents, and computer vision systems to solve high-entropy logistics and automation cases.',
    bullets: [
      'Autonomous AI Agent Assist systems',
      'High-Performance Predictive & Recommendation Engines',
      'Computer Vision & Object Classification Pipelines',
      'Intelligent Automation & Synthetic Inference Models'
    ],
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'shadow-neon-pink'
  },
  {
    id: 'engineering',
    name: 'Engineering & Manufacturing',
    iconName: 'Wrench',
    tagline: 'Advanced Industrial Automation & Systems',
    description: 'Bridging physical hardware and logical control boards. Custom industrial solutions featuring high precision and smart telemetry.',
    bullets: [
      'Mechanical Design & CAD Simulations',
      'Physical Product Development & Testing',
      'Automation Systems & Robotics Control Protocols',
      'Industrial Innovation & Energy Optimizers'
    ],
    gradient: 'from-blue-500 to-emerald-500',
    glowColor: 'shadow-neon-blue'
  }
];

export const INNOVATIONS: Innovation[] = [
  {
    id: 'heal-link',
    title: 'HealLink Bio-Telemetry Monitor',
    description: 'Integrated multi-vital wireless patch tracking cardiotachometer and blood oxygen saturation via smart sub-dermal sensors.',
    industry: 'Healthcare',
    technologiesUsed: ['React', 'Node.js', 'TensorFlow Lite', 'Bluetooth LE', 'D3.js'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    longDescription: 'HealLink represents an inflection point in sub-acute telemetry. Combining high-accuracy photometric sensors with low-energy wireless streaming, it allows patients to comfortably transmit crucial vitals without hospital tethering. Its low-latency machine learning anomaly alert detects irregular sinus rhythms ahead of critical escalation.',
    keyFeatures: [
      'Continuous 120-hour wireless cardiac monitoring',
      'Edge-computed heart rate variability (HRV) classification',
      'Ultra-compact IP68 medical-grade design',
      'Instant patient telemetry routing dashboard'
    ],
    specs: [
      { label: 'Form Factor', value: '72mm x 35mm Flexible Patch' },
      { label: 'Sensor Type', value: 'PPG Photoreceiver & 3-Axis Acc' },
      { label: 'Latency', value: '18ms On-Edge Analysis' },
      { label: 'Protocol', value: 'Secure BLE Encrypted Socket' }
    ]
  },
  {
    id: 'nexis-arm',
    title: 'Nexis Industrial Co-Bot Engine',
    description: 'Precision robotic arm automation control unit with self-calibration algorithms and high-load safety optical barriers.',
    industry: 'Engineering',
    technologiesUsed: ['Flutter', 'Node.js', 'ROS (Robot Operating System)', 'C++', 'Three.js'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    longDescription: 'The Nexis robot synchronization architecture is designed to integrate seamlessly into active plant floors without long shutdown installations. Driven by custom real-time kernel controllers, this robotic arm works collaboratively with technicians, stopping dynamically if proximity criteria are breached.',
    keyFeatures: [
      'Self-calibrating 6-axis spatial coordinate system',
      'Optical proximity security radar with 12ms emergency stop',
      'Highly intuitive mechanical training mode',
      'Unified cloud analytics tracking payload and uptime metrics'
    ],
    specs: [
      { label: 'Degree of Freedom', value: '6 Axis Collaborative' },
      { label: 'Payload Capacity', value: '12.5 kg' },
      { label: 'Accuracy', value: '0.02 mm Repeatability' },
      { label: 'Integration', value: 'MQTT, Modbus, OPC UA' }
    ]
  },
  {
    id: 'intel-logistic',
    title: 'Synthetix Predictive Logistics Model',
    description: 'Enterprise resource intelligence forecasting route times, weather patterns, and fuel pricing to optimize global shipping lines.',
    industry: 'Artificial Intelligence',
    technologiesUsed: ['React', 'Next.js', 'PyTorch', 'FastUI', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80',
    longDescription: 'Synthetix coordinates complex multi-mode distribution grids. By analyzing weather fluctuations, nautical shipping queues, carbon compliance pricing, and ground logistics, it predicts shipment delays up to 7 days before occurrence and redirects assets into optimal regional corridors.',
    keyFeatures: [
      'Deep learning multi-variate trajectory predictions',
      'Automatic ocean routing alternative generators',
      'Direct carbon-emission optimization calculators',
      'Web-based tracking panels with integrated alerts'
    ],
    specs: [
      { label: 'Model Architecture', value: 'Graph Neural Network (GNN)' },
      { label: 'Processed Events', value: '150M+ Continuous Datapoints' },
      { label: 'Accuracy Rate', value: '94.2% Spatial Timelines' },
      { label: 'Response Latency', value: '< 200ms Global Re-Calculation' }
    ]
  },
  {
    id: 'neuro-core',
    title: 'NeuroCore Brain-Computer Interface',
    description: 'High-fidelity non-invasive neural interface tracking alpha-wave focal focus to assist high-stress control panels.',
    industry: 'Technology',
    technologiesUsed: ['React', 'Next.js', 'WebAssembly', 'Python', 'Rust'],
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    longDescription: 'NeuroCore intercepts microvolt EEG pulses. Operating in high-stress pilot circles, control rooms, and surgical centers, it analyzes physical fatigue and mental drift to alert dispatchers and dynamic safety triggers ahead of visual signs of exhaust.',
    keyFeatures: [
      'Non-invasive 16-channel microvolt recording crown',
      'Sub-10ms EEG spectral density transformation',
      'Individual focus calibration neural curves',
      'Compact, lightweight carbon construction'
    ],
    specs: [
      { label: 'Frequency Range', value: '0.5Hz to 120Hz (Beta/Alpha)' },
      { label: 'Signal Resolution', value: '24-Bit Digital ADC Converters' },
      { label: 'Connection Type', value: 'Wireless Proprietary GHz Band' },
      { label: 'Calibration Time', value: '45-Seconds Guided Interface' }
    ]
  },
  {
    id: 'aero-turbine',
    title: 'Aero-Hydro Kinetic Turbine',
    description: 'Ultra-low velocity kinetic turbine constructed from bio-polymer composite designed for continuous micro-hydro power sources.',
    industry: 'Engineering',
    technologiesUsed: ['React', 'SolidWorks', 'CFD Analytics', 'Node.js', 'Rust'],
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    longDescription: 'An optimized hydrodynamic blade rotation unit designed for small river basins or ventilation ducts. By utilising customizable bio-materials and fluid diversion corridors, this turbine sustains electrical production even at velocities below 1.2 m/s, offering clean local energy grids.',
    keyFeatures: [
      'Bio-mimetic hydrodynamic turbine blade design',
      'Intelligent digital generator optimizing rotational load',
      'Corrosion-free composite body lasting 15+ years',
      'Minimal environmental footprint with fish-safe redirection'
    ],
    specs: [
      { label: 'Minimum Fluid Velocity', value: '0.8 m/sec' },
      { label: 'Nominal Rated Output', value: '2.4 kW Continuous' },
      { label: 'Materials', value: 'Recycled Ocean Carbon Fiber Grid' },
      { label: 'Maintenance Interval', value: '40,000 Hours Continuous' }
    ]
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'res-quantum',
    title: 'Quantum Entropic Cryo-Memory Grid',
    category: 'Emerging Tech',
    stage: 'Concept',
    description: 'A liquid-helium cooled storage lattice mapping absolute neural network weights onto entropic structures to enable instant model retention.',
    longDetail: 'Conventional computing arrays hit a memory wall when attempting continuous model fine-tuning. By capturing matrix values in quantum physical systems cooled to sub-2 Kelvin, we aim to design zero-power state recorders that execute model swaps instantly without fetching cloud pipelines.',
    metrics: [
      { label: 'Operating Temp', value: '1.8 Kelvin' },
      { label: 'Theoretic Bandwidth', value: '1.2 Exabytes / sec' },
      { label: 'Thermal Loss', value: '< 4 MicroWatts at Load' }
    ]
  },
  {
    id: 'res-cyber',
    title: 'Bi-Directional Tactile Direct Feedback Array',
    category: 'Healthcare Innovation',
    stage: 'Prototype',
    description: 'Prosthetic micro-electrode matrices converting mechanical strain measurements into synthetic sensory pulses routed to muscle nerve lines.',
    longDetail: 'We are engineering sensory feedback circuits that communicate touch back to amputees. Equipped with miniaturized structural piezoceramic sensors on fingers, this prototype transmits micro-electrical pulses in harmony with user-specific skin resistance, rendering natural sensory responses.',
    metrics: [
      { label: 'Contact Points', value: '64 High-Density Nodes' },
      { label: 'Electrical Pulse', value: '1.2uA - 8uA Range' },
      { label: 'Physical Latency', value: '2.5ms Sensor to Muscle' }
    ]
  },
  {
    id: 'res-swarm',
    title: 'Distributed Multi-Agent Robotic Co-location Swarm',
    category: 'AI Research',
    stage: 'Simulating',
    description: 'Dynamic neural logic networks keeping micro-bots aligned in spatial geometry without utilizing cellular, GPS, or optical control grids.',
    longDetail: 'Traditional automated swarms depend heavily on external cameras or satellite coordinate lookups. Utilizing ultra-wideband signal tracking combined with autonomous peer-to-peer calculations on-edge, these micro-bots establish dynamic formations inside radio-shielded industrial areas.',
    metrics: [
      { label: 'Simulation Nodes', value: '500+ Active Agents' },
      { label: 'System Accuracy', value: '3.2mm Radial Separation' },
      { label: 'Agent Weight', value: '45 Grams Prototype' }
    ]
  },
  {
    id: 'res-thermal',
    title: 'Thermic Hybrid Liquid Phase Changer Capsule',
    category: 'Prototype',
    stage: 'Field Trial',
    description: 'Advanced industrial heat exchanger utilizing non-toxic phase-shifting organic compounds to buffer large temperature spikes in server cabinets.',
    longDetail: 'As artificial intelligence processors release substantial heat transients, liquid cooling requires dense auxiliary heat exchangers. This hybrid unit absorbs instantaneous temperature spikes through organic phase change materials, radiating energy progressively to cut active fan and pump workloads.',
    metrics: [
      { label: 'Thermal Absorption', value: '250kJ per cubic dm' },
      { label: 'Cabinet Temperature Delta', value: '-12°C Under Max Spikes' },
      { label: 'Uptime Multiplier', value: '1.8x Pump Lifespan Improvement' }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'Artificial Intelligence',
    title: 'Architecting On-Device Edge Models for Industrial Environments',
    excerpt: 'How on-device deep learning algorithms are revolutionizing dangerous industrial workspace operations with sub-10ms response cycles.',
    date: 'June 18, 2026',
    readTime: '6 min read',
    author: 'Dr. Evelyn Carter',
    content: 'Industrial settings are inherently unpredictable, filled with metallic structures that block radio pathways, and requiring immediate system response to physical workspace events. In this paper, we explore how Astrix Innovations designed custom quantized deep networks executed locally on single-board computer systems to evaluate technician safety postures. By utilizing 4-bit integer quantization and hardware-accelerated compilers, we achieved millisecond classifications without routing streams to distant servers, maintaining reliable automation despite local communications blackouts.'
  },
  {
    id: 'post-2',
    category: 'Healthcare',
    title: 'Telemetry Security Guidelines: Bridging Medical Hardware and Consumer Wearables',
    excerpt: 'Ensuring end-to-end envelope-encrypted signals across sub-acute clinical environments without latency degradation.',
    date: 'May 28, 2026',
    readTime: '8 min read',
    author: 'Marcus Vance, PhD',
    content: 'Modern clinical protocols demand continuous monitoring, moving patients out of costly ICU wards cardially while keeping clinical teams connected. However, establishing constant telemetry raises severe data security obstacles. This post highlights the architectural mechanics of envelope-encrypted Bluetooth LE packets, verifying user and patient authenticity through physical cryptographic hardware chips placed directly on custom bio-sensing patches.'
  },
  {
    id: 'post-3',
    category: 'Engineering',
    title: 'Evaluating Regenerative Composite Structures for Clean Energy Systems',
    excerpt: 'An inside look into structural stress simulations utilizing carbon fiber geometries designed for extreme hydrodynamic pressure environments.',
    date: 'April 15, 2026',
    readTime: '5 min read',
    author: 'Li Wei, Head of Industrial Engineering',
    content: 'Tidal and river basin kinetic generation demands materials that are extremely resilient yet carry small ecological burdens. Traditional steel assemblies face heavy corrosion and require extensive lubricating greases. Astrix Innovations introduces a carbon fiber matrix filled with bio-polymer resins that deflects micro-impacts and resists bio-fouling, delivering stellar uptime numbers without contaminating natural waterways.'
  }
];

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: 'pos-1',
    title: 'Senior Embedded AI Firmware Engineer',
    type: 'Full-time',
    department: 'Artificial Intelligence & Robotics',
    location: 'San Francisco, CA / Remote',
    description: 'We are seeking an expert firmware engineer talented in deploying deep models directly onto small micro-controllers. You will lead the micro-kernel development for our robotics and telemetry devices.',
    requirements: [
      'BSc/MSc in Computer Science, Electronic Engineering, or related path',
      '4+ years embedding deep networks (C, C++, Rust, WebAssembly)',
      'Expert knowledge of ARM Cortex hardware compilation and TensorFlow Lite micro',
      'Strong grasp of high-frequency signal processing and filtering'
    ]
  },
  {
    id: 'pos-2',
    title: 'Graduate Healthcare Technology Intern',
    type: 'Internship',
    department: 'Digital Health Solutions',
    location: 'Boston, MA / Hybrid',
    description: 'Work alongside leading clinical hardware researchers to collect, clean, and test real-time biomedical sensor data. You will participate actively in custom PPG and EEG telemetry studies.',
    requirements: [
      'Currently enrolled in Biomedical Engineering, Computer Science or equivalent program',
      'Familiarity with Python, numpy, pandas, and physical signal analysis tools',
      'Curious mind enthusiastic about combining hardware sensors with elegant React platforms',
      'Basic knowledge of medical software standards (HIPAA, HL7, FHIR)'
    ]
  },
  {
    id: 'pos-3',
    title: 'Research Collaborator: Biomimetic Material Geometries',
    type: 'Research Collaboration',
    department: 'Industrial Innovation & Engineering',
    location: 'Munich, Germany / Hybrid',
    description: 'A 12-month research contract focusing on simulating fluid flow around bio-polymer turbine structures. This position is run in partnership with leading global technology institutions.',
    requirements: [
      'PhD or equivalent in Mechanical Engineering, Fluid Dynamics, or Aero-Hydro sciences',
      'In-depth knowledge of Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD)',
      'Experience authoring peer-reviewed research papers detailing structural performance',
      'High-level competence utilizing simulation software and Rust-based data processors'
    ]
  }
];
