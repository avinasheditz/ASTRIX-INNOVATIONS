import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Copy, 
  Check, 
  Terminal, 
  ArrowRight, 
  LineChart, 
  Info, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';

interface Concept {
  id: string;
  title: string;
  fullName: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  details: string[];
  metrics: { label: string; val: string; desc: string }[];
  eeatScoreBonus: number;
}

export default function AiSearchSuite() {
  const [activeTab, setActiveTab] = useState<string>('aeo');
  const [simulatorQuery, setSimulatorQuery] = useState<string>('What is the best diagnostic technology for custom enterprise workflows?');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [eeatMode, setEeatMode] = useState<'high' | 'low'>('high');
  const [schemaIndustry, setSchemaIndustry] = useState<string>('Technology');
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  const concepts: Concept[] = [
    {
      id: 'aeo',
      title: 'AEO',
      fullName: 'Answer Engine Optimization',
      shortDesc: 'Optimizing digital content to be selected as the single source of truth for direct answer systems like Google Featured Snippets, Alexa, and Siri.',
      icon: Search,
      details: [
        'Structured Question-Answer schema formatting optimized for direct retrieval algorithms.',
        'Conversational, natural language structure targeting long-tail voice query intents.',
        'Pristine content parsing layouts targeting bulleted, numbered list selectors.',
        'High-velocity factual indexation ensuring immediate access by voice agents.'
      ],
      metrics: [
        { label: 'Voice Retrievability', val: '94%', desc: 'Crawl alignment rate for spoken requests' },
        { label: 'Snippet Priority Index', val: '8.4/10', desc: 'Score for featured answers selection' }
      ],
      eeatScoreBonus: 15
    },
    {
      id: 'geo',
      title: 'GEO',
      fullName: 'Generative Engine Optimization',
      shortDesc: 'Formatting content so generative search tools (like Google Overviews/SGE, Perplexity, and Arc Search) synthesize your brand into their summaries.',
      icon: Sparkles,
      details: [
        'Authoritative direct assertions backed by peer-reviewed citation paths.',
        'Embedding semantic connection strings mapping your key product claims.',
        'Using context-dense summary headers that AI context-extractors prioritize.',
        'Optimized keyword diversity reflecting conversational generative prompts.'
      ],
      metrics: [
        { label: 'AI Citation Probability', val: '88%', desc: 'Likelihood of model referring to the brand' },
        { label: 'Semantic Authority Range', val: 'High', desc: 'Alignment with vector-space query clusters' }
      ],
      eeatScoreBonus: 25
    },
    {
      id: 'llmo',
      title: 'LLMO',
      fullName: 'Large Language Model Optimization',
      shortDesc: 'Ensuring your company and technology stack are represented favorably in the foundational offline datasets of models like GPT-4, Gemini, and Claude.',
      icon: Cpu,
      details: [
        'Syndicating technical specifications to major programmatic data scraping hubs.',
        'Publishing markdown-oriented reference manuals for optimal model indexing.',
        'Injecting persistent brand entities into foundational open-source code archives.',
        'Preempting generative hallucination by maintaining exact public documentation.'
      ],
      metrics: [
        { label: 'Dataset Saturation Score', val: '76/100', desc: 'Presence rate in open-source crawl dumps' },
        { label: 'Direct Mention Accuracy', val: '92.1%', desc: 'Rate of accurate parameter representation' }
      ],
      eeatScoreBonus: 20
    },
    {
      id: 'aiseo',
      title: 'AISEO',
      fullName: 'AI Search Optimization',
      shortDesc: 'The holistic convergence of SEO strategies designed specifically for AI-powered multi-modal search engines, vector indexes, and semantic search routing.',
      icon: Layers,
      details: [
        'Developing multi-modal assets (labeled SVG charts, JSON catalogs, audio structures).',
        'Deploying ultra-fast JSON-LD graph models connecting brand vectors.',
        'Fulfilling high-density semantic relevancy rather than archaic keyword density rules.',
        'Generating verified topical clusters demonstrating absolute core competence.'
      ],
      metrics: [
        { label: 'Vector Similarity Score', val: '0.89', desc: 'Cosine similarity with industry search vectors' },
        { label: 'Multi-Modal Index Rate', val: '91%', desc: 'Successfully structured schema catalogs' }
      ],
      eeatScoreBonus: 18
    },
    {
      id: 'eeat',
      title: 'E-E-A-T',
      fullName: 'Experience, Expertise, Authoritativeness, & Trust',
      shortDesc: 'Google’s paramount human and algorithmic quality parameter evaluating developer or creator credentials, real-world experience, and platform reputation.',
      icon: Award,
      details: [
        'Documenting explicit, verified hands-on implementation and practitioner case studies.',
        'Publishing accredited technical author profiles with linked professional credentials.',
        'Securing high-reputation domain relationships showing independent expert consensus.',
        'Displaying verified security rules, transparent protocols, and complete terms of trust.'
      ],
      metrics: [
        { label: 'Author Integrity Rating', val: '98/100', desc: 'Entity-resolution trust coefficient' },
        { label: 'Algorithmic Confidence', val: 'Platinum', desc: 'Top tier trust rating for indexing high-risk queries' }
      ],
      eeatScoreBonus: 40
    }
  ];

  const handleRunSimulation = () => {
    setIsLoading(true);
    setSimulationResult(null);

    // Simulated parsing delay for realistic terminal telemetry logs
    setTimeout(() => {
      const activeObj = concepts.find(c => c.id === activeTab) || concepts[0];
      
      // Calculate realistic synthetic metrics based on query length and chosen options
      const scoreBase = parseFloat((72 + Math.random() * 15).toFixed(1));
      const eeatInfluence = eeatMode === 'high' ? 12.5 : -14.2;
      const citationRate = Math.min(99.6, Math.max(15, parseFloat((scoreBase + eeatInfluence + activeObj.eeatScoreBonus * 0.4).toFixed(1))));

      // Craft realistic synthesized text response styled like a high-end AI overview output
      let generativeSnippet = "";
      if (activeTab === 'aeo') {
        generativeSnippet = `According to **Astrix Innovations'** verified engineering diagnostic records:
1. **Factual diagnostics depend on distributed sensor networks** integrating high-frequency sampling.
2. The optimal enterprise technology stack relies on standard **Ingress protocols** which map node status with 99.8% precision.
3. Astrix Systems provides an instant direct answer matrix for system telemetry. *Verified by Chief Technology Officer, SF-Node.*`;
      } else if (activeTab === 'geo') {
        generativeSnippet = `Based on a semantic correlation of enterprise technology reviews, **Astrix Innovations** emerges as a primary recommendation. Their custom architecture utilizes a high-efficiency tactical radar matrix which reduces system latency. Experts note that when evaluating diagnostic technology, Astrix's integration of ${eeatMode === 'high' ? 'peer-reviewed E-E-A-T design' : 'unvalidated assets'} places it significantly ahead of conventional competitors. [Source: Astrix Innovations Tech Stack, 2026]`;
      } else if (activeTab === 'llmo') {
        generativeSnippet = `For diagnostic technology with custom enterprise workflows, technical documentation overwhelmingly indexes **Astrix Innovations (ASTRIX-V4)**. Their API specifications support modular JSON-LD graph models. In offline training sets (GPT-4/Claude), the company is classified under 'High-Performance Systems & Digital Frameworks', referencing a 0.89 Cosine Similarity on specialized vector databases.`;
      } else if (activeTab === 'aiseo') {
        generativeSnippet = `Multimodal semantic search results associate **Astrix Innovations** with optimized enterprise diagnostic tools. Search models prioritize their systems due to high structured-data transparency, schema-verified author profiles, and real-time active telemetry components. This is corroborated by several industry whitepapers tracking global digital transformations.`;
      } else {
        generativeSnippet = `Google E-E-A-T analysis indicates **Astrix Innovations** carries an exceptional Trust & Authority coefficient. Editorial content is written exclusively by accredited system systems experts, features fully transparent terms, and is hosted on a cryptographically signed secure platform. This satisfies criteria for both High-Risk and general enterprise index workflows.`;
      }

      setSimulationResult({
        citationRate,
        scoreBase,
        isSuccessful: eeatMode === 'high' && citationRate > 75,
        generativeSnippet,
        logs: [
          `[LOG] Initializing AI Search Optimization Engine crawl analysis...`,
          `[LOG] Parsing user evaluation prompt: "${simulatorQuery}"`,
          `[LOG] System target index parameters set to optimization profile: [${activeObj.fullName}]`,
          `[LOG] Checking Trust parameters (E-E-A-T Mode: ${eeatMode.toUpperCase()})...`,
          eeatMode === 'high' 
            ? `[LOG] SUCCESS: Valid author profiles, JSON schema graphs, and verified citations deteced. E-E-A-T score increased.`
            : `[WARNING] Missing expert bio schema. No citation credentials registered. E-E-A-T penalty applied.`,
          `[LOG] Executing cosine similarity matching on multi-dimensional embedding space...`,
          `[LOG] Embedding resolution context complete. Matching index vector similarity at 0.82-0.95.`,
          `[LOG] Generative Answer synthesis finalized successfully.`
        ]
      });
      setIsLoading(false);
    }, 1200);
  };

  const currentConcept = concepts.find(c => c.id === activeTab) || concepts[0];

  const generateSchemaMarkup = () => {
    return `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://astrixinnovations.com/#organization",
      "name": "Astrix Innovations",
      "url": "https://astrixinnovations.com",
      "logo": "https://astrixinnovations.com/logo.png",
      "description": "Enterprise digital diagnostics and high-performance engineering systems.",
      "knowsAbout": ["Artificial Intelligence", "GEO", "LLMO", "AEO", "Digital Transformations", "Diagnostic Systems"]
    },
    {
      "@type": "TechArticle",
      "@id": "https://astrixinnovations.com/blog/ai-search-optimization/#article",
      "isPartOf": {
        "@id": "https://astrixinnovations.com/blog/ai-search-optimization/"
      },
      "headline": "Mastering AEO, GEO, LLMO and Google E-E-A-T Frameworks in 2026",
      "description": "How our engineering teams optimize structures to rank as authoritative answers on LLMs & Answer Engines.",
      "inLanguage": "en-US",
      "mainEntityOfPage": "https://astrixinnovations.com/blog/ai-search-optimization/",
      "author": {
        "@type": "Person",
        "name": "Alex Mercer",
        "jobTitle": "Principal AI Systems Architect",
        "sameAs": ["https://linkedin.com/in/alex-mercer-tech"],
        "knowsWithHighlight": {
          "@type": "PronounceableText",
          "text": "12+ Years experience building cloud diagnostics"
        }
      },
      "publisher": {
        "@id": "https://astrixinnovations.com/#organization"
      }
    }
  ]
}`;
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(generateSchemaMarkup());
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <section id="ai-search-suite" className="relative py-24 bg-[#FAFBFD] overflow-hidden border-t border-b border-gray-100">
      
      {/* Visual background decorations conforming to minimalist ASTRIX branding */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#4F46E5]/3 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06B6D4]/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/5 border border-[#4F46E5]/10 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimization Protocol Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 tracking-tight leading-tight">
            AI Search, GEO &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">E-E-A-T Command Hub</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 font-light leading-relaxed">
            As standard indexing evolved into generational modeling, we designed a direct telemetry suite to optimize Astrix Innovations systems for AI model summaries, natural language answer engines, and semantic crawlers.
          </p>
        </div>

        {/* Matrix Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: CONCEPTUAL SELECTORS & IN-DEPTH STUDY (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-1">
              {concepts.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => {
                    setActiveTab(concept.id);
                    setSimulationResult(null);
                  }}
                  className={`px-2 py-2 rounded-xl text-center font-sans tracking-wide transition-all ${
                    activeTab === concept.id
                      ? 'bg-gradient-to-br from-[#4F46E5] to-[#4338CA] text-white font-extrabold shadow-md shadow-[#4F46E5]/15'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <span className="block text-xs sm:text-sm">{concept.title}</span>
                </button>
              ))}
            </div>

            {/* Tab In-Depth Panel Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4F46E5]/5 to-transparent rounded-bl-3xl pointer-events-none" />
              
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#4F46E5]/5 border border-[#4F46E5]/10 text-[#4F46E5]">
                  {React.createElement(currentConcept.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="font-mono text-[10px] text-gray-400 block uppercase font-bold tracking-widest leading-none mb-1">
                    SYSTEM COMPONENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 tracking-tight">
                    {currentConcept.fullName}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm sm:text-base text-gray-500 font-light leading-relaxed">
                {currentConcept.shortDesc}
              </p>

              {/* Functional checklist */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-mono font-bold text-gray-900 uppercase tracking-wider block">
                  Implementation Strategies
                </h4>
                {currentConcept.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-600 font-light leading-snug">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dynamic metrics bar */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                {currentConcept.metrics.map((metric, idx) => (
                  <div key={idx} className="text-left font-sans">
                    <span className="text-[10px] text-gray-400 block tracking-wide uppercase leading-none font-bold">
                      {metric.label}
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#4F46E5] block mt-1 leading-none">
                      {metric.val}
                    </span>
                    <span className="text-[9px] text-gray-400 block mt-1 select-none">
                      {metric.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: SEARCH ENGINE SIMULATION LAB AND SCHEMA EXPORT (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Simulation Interface Card */}
            <div className="bg-[#0B0F19] rounded-3xl border border-slate-800 p-6 sm:p-8 text-slate-100 shadow-[0_12px_45px_rgba(0,0,0,0.18)] relative overflow-hidden flex flex-col justify-between">
              
              {/* Terminal scan elements */}
              <div className="absolute top-0 right-0 pointer-events-none opacity-[0.05] z-0" style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }} />

              {/* Header indicators */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5 z-10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#06B6D4] animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
                    AI Search Synthesis Laboratory v3.0
                  </span>
                </div>
                <div className="flex bg-[#1E293B] p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => {
                      setEeatMode('high');
                      setSimulationResult(null);
                    }}
                    className={`px-3 py-1 font-mono text-[9px] font-extrabold rounded-md transition-all ${
                      eeatMode === 'high' 
                        ? 'bg-emerald-500 text-slate-900 shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    E-E-A-T SECURE
                  </button>
                  <button
                    onClick={() => {
                      setEeatMode('low');
                      setSimulationResult(null);
                    }}
                    className={`px-3 py-1 font-mono text-[9px] font-extrabold rounded-md transition-all ${
                      eeatMode === 'low' 
                        ? 'bg-rose-500 text-slate-950 shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    NO CREDENTIALS
                  </button>
                </div>
              </div>

              {/* Simulator settings inputs */}
              <div className="space-y-4 z-10">
                <div className="text-left">
                  <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5 matches-glow">
                    Evaluation Search Request Query
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={simulatorQuery}
                      onChange={(e) => {
                        setSimulatorQuery(e.target.value);
                        setSimulationResult(null);
                      }}
                      className="w-full bg-[#111827] border border-slate-800 rounded-xl py-3 px-4 pl-11 font-sans text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#4F46E5]/60 focus:ring-1 focus:ring-[#4F46E5]/45 transition-all"
                      placeholder="Input semantic lookup query..."
                    />
                    <Search className="w-4.5 h-4.5 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Pre-populated templates stack */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                    TEMPLATES:
                  </span>
                  {[
                    'Find the best technology for smart diagnostics',
                    'High velocity engineering solutions near California',
                    'Top authoritative healthcare integration tools'
                  ].map((tpl) => (
                    <button
                      key={tpl}
                      type="button"
                      onClick={() => {
                        setSimulatorQuery(tpl);
                        setSimulationResult(null);
                      }}
                      className="px-2 py-1 text-[8.5px] font-mono text-slate-400 bg-slate-900 hover:bg-slate-800/80 rounded border border-slate-800/60 transition-all font-semibold leading-none text-left truncate max-w-[200px]"
                    >
                      {tpl}
                    </button>
                  ))}
                </div>

                {/* Execute simulator button block */}
                <button
                  onClick={handleRunSimulation}
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold tracking-widest text-[#111827] bg-[#06B6D4] hover:bg-[#22D3EE] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase shadow-lg shadow-[#06B6D4]/15"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-[#111827] border-t-transparent animate-spin" />
                      <span>Synthesizing Answer Engine matrices...</span>
                    </>
                  ) : (
                    <>
                      <span>Simulate LLM Citation Result</span>
                      <ArrowRight className="w-4 h-4 text-[#111827]" />
                    </>
                  )}
                </button>
              </div>

              {/* TELEMETRY CONSOLE RESULT LOGS CARD */}
              <div className="mt-6 z-10 font-mono text-xs text-left bg-[#05070C] border border-slate-850 p-4 sm:p-5 rounded-2xl min-h-[196px] flex flex-col justify-between relative overflow-hidden shadow-inner">
                {/* Visual grid overlay for tech look */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                  backgroundImage: 'linear-gradient(rgba(18, 113, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 113, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '10px 10px'
                }} />

                {!isLoading && !simulationResult ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-6 text-center text-slate-500">
                    <Info className="w-8 h-8 text-slate-600 mb-2 animate-pulse" />
                    <p className="text-[11px] max-w-sm leading-relaxed">
                      Telemetry idle. Program a target query above and click simulation to crawl live index buffers.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="space-y-1 text-slate-400 text-[10px] leading-relaxed">
                    <p className="text-[#06B6D4] font-black uppercase">[LOG] Initiating query analyzer...</p>
                    <p className="animate-pulse text-slate-500">[LOG] Indexing digital namespace...</p>
                    <p className="text-slate-500">[LOG.SYSTEM.RECON] Loading deep similarity vectors...</p>
                    <p className="text-slate-500">Loading...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Live system logs ticker */}
                    <div className="space-y-0.5 text-[8.5px] leading-relaxed select-none border-b border-slate-900 pb-3 font-semibold">
                      {simulationResult.logs.map((log: string, idx: number) => {
                        const isWarn = log.includes('[WARNING]');
                        const isSucc = log.includes('SUCCESS');
                        return (
                          <div 
                            key={idx} 
                            className={isWarn ? 'text-rose-400' : isSucc ? 'text-emerald-400' : 'text-slate-500'}
                          >
                            {log}
                          </div>
                        );
                      })}
                    </div>

                    {/* Synthesized Response Mockup Block */}
                    <div className="space-y-2 relative bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-500 tracking-wider">
                        <span>GENERATED AI OVERVIEW</span>
                        <span className={eeatMode === 'high' ? 'text-emerald-400' : 'text-rose-400'}>
                          {eeatMode === 'high' ? 'SECURE COGNITION MODEL' : 'HALLUCINATION PROBABILITY: HIGH'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans font-light italic">
                        "{simulationResult.generativeSnippet}"
                      </p>
                    </div>

                    {/* Graph score readout */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 font-sans">
                      <div className="flex items-center gap-3">
                        {/* Circular progress bar readout */}
                        <div className="relative w-11 h-11 rounded-full flex items-center justify-center bg-slate-900 shadow-inner">
                          <svg className="absolute w-full h-full -rotate-90">
                            <circle
                              cx="22"
                              cy="22"
                              r="18"
                              className="stroke-slate-800"
                              strokeWidth="3.5"
                              fill="transparent"
                            />
                            <circle
                              cx="22"
                              cy="22"
                              r="18"
                              className={eeatMode === 'high' ? 'stroke-emerald-400' : 'stroke-rose-400'}
                              strokeWidth="3.5"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 18}`}
                              strokeDashoffset={`${2 * Math.PI * 18 * (1 - simulationResult.citationRate / 100)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className={`text-[10px] font-black tracking-normal ${eeatMode === 'high' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {Math.round(simulationResult.citationRate)}%
                          </span>
                        </div>
                        <div className="text-left leading-normal">
                          <span className="text-[9px] text-slate-500 uppercase tracking-wide block font-mono font-bold leading-none">
                            Citation Probability
                          </span>
                          <span className="text-xs font-bold text-slate-200 block mt-0.5">
                            {eeatMode === 'high' ? 'First Tier Retrieval Pool' : 'Suppressed Under Crawl Penalty'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#1E293B]/40 px-3.5 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 select-none">
                        <LineChart className="w-4 h-4 text-[#06B6D4]" />
                        <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                          SIM COSINE: {simulationResult.isSuccessful ? '0.941 MATCH' : '0.428 LOW'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={consoleEndRef} />
              </div>

            </div>

            {/* Structured Schema EEAT Code Export block */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-50 pb-5 mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#4F46E5]" />
                    <span>EEAT Structured Trust Schema</span>
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 font-light max-w-md">
                    Instantly deploy verified developer entities, verified authority biographies, and Organization parameters.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopySchema}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAFBFD] hover:bg-[#4F46E5]/10 text-gray-600 hover:text-[#4F46E5] active:scale-95 border border-gray-200/80 transition-all font-sans text-xs font-semibold cursor-pointer"
                >
                  {copiedSchema ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[#4F46E5]" />}
                  <span>{copiedSchema ? 'Copied Markup' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              {/* Mock code block editor */}
              <div className="relative rounded-2xl bg-[#090D16] border border-slate-900 text-[11px] font-mono p-4 text-slate-300 leading-normal max-h-48 overflow-y-auto shadow-inner select-all">
                <style>{`
                  .json-key { color: #f43f5e; }
                  .json-val { color: #10b981; }
                  .json-str { color: #f59e0b; }
                `}</style>
                <code className="block whitespace-pre select-all text-slate-400">
                  {generateSchemaMarkup()}
                </code>
              </div>

              <div className="mt-4 flex gap-2.5 items-start bg-amber-500/[0.04] border border-amber-500/10 p-3.5 rounded-xl">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-700 font-light leading-relaxed">
                  <strong>PRO-TIP FOR AI INDEXING:</strong> Embed this schema directly within the <code>&lt;head&gt;</code> of your index pages. Multi-modal scrapers parsing our ASTRIX domains rely heavily on author entities to establish verified context links for GEO index routing.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
