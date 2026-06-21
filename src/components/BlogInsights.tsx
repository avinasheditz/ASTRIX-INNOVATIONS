import { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, Clock, X, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function BlogInsights() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>(BLOG_POSTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setBlogsList(data);
          }
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();

    window.addEventListener('astrix-data-updated', fetchBlogs);
    return () => window.removeEventListener('astrix-data-updated', fetchBlogs);
  }, []);

  const categories = ['All', 'Technology', 'Healthcare', 'Artificial Intelligence', 'Engineering'];

  const filteredPosts = blogsList.filter((post) => {
    return activeCategory === 'All' || post.category === activeCategory;
  });

  return (
    <section id="insights" className="py-24 relative overflow-hidden text-left border-t border-gray-100 bg-[#FAFBFD]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-50/25 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2 font-sans text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
              <BookOpen className="w-4 h-4" />
              <span>THE ASTRIX LOG &middot; BLOG PAGE</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Corporate Intelligence
            </h2>
            <p className="font-sans text-gray-500 text-sm mt-1.5 font-light max-w-lg">
              Explore scientific logs, clinical updates, and software engineering papers authored by our staff.
            </p>
          </div>
          
          {/* Quick Categories Filter row */}
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#4F46E5]/30 hover:shadow-[0_12px_45px_-12px_rgba(79,70,229,0.06)] transition-all duration-250 cursor-pointer transform hover:-translate-y-1 shadow-sm text-left"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between font-sans text-[10px] text-[#4F46E5]">
                  <span className="bg-indigo-50 border border-indigo-100/70 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-sans font-extrabold text-base text-gray-900 group-hover:text-[#4F46E5] leading-snug transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-5 border-t border-gray-100 mt-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7.5 h-7.5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs text-[#4F46E5] font-extrabold">
                    {(post.author || 'Astrix Researcher').split(' ').map(n => n ? n[0] : '').join('')}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-800 block leading-none">{post.author || 'Astrix Researcher'}</span>
                    <span className="text-[9px] text-gray-400 font-medium block mt-1">{post.date || ''}</span>
                  </div>
                </div>
                
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#4F46E5] transition-colors" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Embedded Document Reading Dialog */}
      {selectedPost && (
        <div id="blog-reader-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Header controls */}
            <div className="p-6 pb-2 border-b border-gray-100 flex items-start justify-between shrink-0 text-left">
              <div className="space-y-1.5">
                <span className="bg-indigo-50 text-[#4F46E5] text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase">
                  {selectedPost.category}
                </span>
                <h3 className="font-sans font-extrabold text-lg md:text-xl text-gray-900 mt-1.5 leading-tight">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black border border-gray-200 transition-colors shrink-0 ml-4 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable details text */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-left">
              {/* Writer meta tags */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-gray-400 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-1.5 font-semibold">
                  <User className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>AUTHOR: {(selectedPost.author || 'Astrix Researcher').toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>DATE: {(selectedPost.date || '').toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>READ TIME: {(selectedPost.readTime || '').toUpperCase()}</span>
                </div>
              </div>

              {/* Main reading content */}
              <div className="text-gray-600 font-sans text-sm md:text-base leading-relaxed space-y-4 font-light">
                <p className="indent-8 font-light tracking-wide first-letter:text-3xl first-letter:font-extrabold first-letter:text-[#4F46E5] first-letter:mr-1">
                  {selectedPost.content}
                </p>
                <p className="italic text-xs text-gray-400 pt-4 border-t border-gray-100">
                  All publications, patents, and structural studies detailed under Astrix Lab Logs are properties of Astrix Innovations IP. Any redistribution demands express digital verification.
                </p>
              </div>
            </div>

            {/* Print or close controls */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-sm shadow-indigo-500/10"
              >
                Dismiss Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
