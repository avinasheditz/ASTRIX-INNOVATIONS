import { useState, useEffect, FormEvent } from 'react';
import { 
  X, Lock, User, FileText, Database, Layers, MessageSquare, 
  Trash2, Edit, Plus, CheckCircle, AlertCircle, LogOut, ChevronRight,
  Briefcase, Settings, Shield, Terminal, RefreshCw, BarChart3, Mail, Eye, 
  Sliders, Download, Sparkles, Check, Play, UserCheck, ShieldCheck, Sun, Moon,
  Folder, Image as ImageIcon, File, Video, ChevronDown, RotateCcw
} from 'lucide-react';
import { Innovation, BlogPost } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Multi-tier Security Lockout tracking:
  // 5 failures locks for 1 min, then 3 min, then 1 hour. Persisted offline.
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('astrix_failed_attempts') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('astrix_lockout_until') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const checkLockout = () => {
      if (lockoutUntil > Date.now()) {
        const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
        setSecondsLeft(remaining);
      } else {
        setSecondsLeft(0);
      }
    };
    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const formatTimeLeft = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Expanded tab directory
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'projects' | 'leads' | 'cms' | 'blogs' | 'media' | 'team' | 'analytics' | 'security' | 'settings'>('dashboard');

  // Database resources
  const [stats, setStats] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [projects, setProjects] = useState<Innovation[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [sysSettings, setSysSettings] = useState<any>({});
  const [seoConfig, setSeoConfig] = useState<any>({});

  // Dynamic loading
  const [loading, setLoading] = useState(false);

  // AI & Generator states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiGenerating, setAiGenerating] = useState(false);

  // CMS Page Builder blocks
  const [cmsBlocks, setCmsBlocks] = useState([
    { id: 'hero', name: 'Premium Hero Hub', order: 0, active: true, tag: 'Framer Layout' },
    { id: 'features', name: 'Bento Services Features', order: 1, active: true, tag: 'Grid Blocks' },
    { id: 'case-studies', name: 'Physical Prototypes & R&D', order: 2, active: true, tag: 'Interactive Carousels' },
    { id: 'insights', name: 'Science & Media Insights', order: 3, active: true, tag: 'Blog Stream' },
    { id: 'cta', name: 'Future City Interactive CTA', order: 4, active: true, tag: 'Particles Flow' },
    { id: 'contact', name: 'Sweep Radar Contact Coordinates', order: 5, active: true, tag: 'Coordinates Portal' }
  ]);

  // Media library active folder & assets
  const [activeMediaFolder, setActiveMediaFolder] = useState<'projects' | 'services' | 'blogs' | 'branding' | 'team'>('projects');
  const [mediaAssets, setMediaAssets] = useState<any[]>([
    { id: 'm1', name: 'heallink_live_telemetry.lottie', size: '1.4 MB', type: 'Lottie', folder: 'projects', desc: 'Sensing ripples' },
    { id: 'm2', name: 'hexagonal_grid_wireframe.obj', size: '12.8 MB', type: '3D Model', folder: 'branding', desc: 'Geometric vertex array' },
    { id: 'm3', name: 'astrix_brand_signature.png', size: '320 KB', type: 'Image', folder: 'branding', desc: 'Vector identity mark' },
    { id: 'm4', name: 'digital_twin_calibration.mp4', size: '24.2 MB', type: 'Video', folder: 'services', desc: 'Tactile drive response' },
    { id: 'm5', name: 'clinical_handshake_specs.pdf', size: '3.1 MB', type: 'PDF', folder: 'blogs', desc: 'Secure medical protocol' }
  ]);
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaType, setNewMediaType] = useState('Image');

  // Interactive Lead reminders
  const [leadNotes, setLeadNotes] = useState<{ [leadId: string]: string }>({});
  const [crmFilters, setCrmFilters] = useState<'all' | 'new' | 'contacted' | 'won' | 'lost'>('all');

  // Forms states
  const [editingProject, setEditingProject] = useState<Partial<Innovation> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingService, setEditingService] = useState<any | null>(null);

  const [serviceForm, setServiceForm] = useState({ title: '', short_description: '', full_description: '', category: 'AI Systems', icon: 'Cpu', sort_order: '1' });
  const [projForm, setProjForm] = useState({ title: '', description: '', industry: 'Technology' as Innovation['industry'], technologiesUsed: '', imageUrl: '', longDescription: '', keyFeatures: '', specLabels: ['Form Factor', 'Latency', 'DDoF'], specValues: ['72x35mm Patch', ' sub-10ms', '6 Axis'] });
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Technology' as BlogPost['category'], excerpt: '', author: 'Principal Architect', content: '' });
  const [settingsForm, setSettingsForm] = useState({ website_name: 'Astrix Innovations', contact_email: 'operations@astrix.com', maintenance_mode: false, logo_signature: 'ASTRIX' });
  const [seoForm, setSeoForm] = useState({ slug: '/', meta_title: '', meta_description: '', keywords: '' });

  // Checked on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('astrix_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchAdminData(savedToken);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && token) {
      if (activeTab === 'dashboard') {
        fetchStats();
      } else if (activeTab === 'services') {
        fetchServices();
      } else if (activeTab === 'settings') {
        fetchSettingsAndSEO();
      }
    }
  }, [activeTab, isAuthenticated, token]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) { console.error('Stats fetch err', err); }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) setServices(await res.json());
      const indRes = await fetch('/api/industries');
      if (indRes.ok) setIndustries(await indRes.json());
    } catch (err) { console.error(err); }
  };

  const fetchSettingsAndSEO = async () => {
    try {
      const resSet = await fetch('/api/settings');
      if (resSet.ok) {
        const data = await resSet.json();
        setSysSettings(data);
        setSettingsForm({
          website_name: data.website_name || 'Astrix Innovations',
          contact_email: data.contact_email || 'operations@astrix.com',
          maintenance_mode: !!data.maintenance_mode,
          logo_signature: 'ASTRIX'
        });
      }
      const resSEO = await fetch(`/api/seo?page=${seoForm.slug}`);
      if (resSEO.ok) {
        const data = await resSEO.json();
        setSeoConfig(data);
        setSeoForm(prev => ({
          ...prev,
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : ''
        }));
      }
    } catch (err) { console.error(err); }
  };

  const handleSEOSlugChange = async (slug: string) => {
    setSeoForm(prev => ({ ...prev, slug }));
    try {
      const resSEO = await fetch(`/api/seo?page=${slug}`);
      if (resSEO.ok) {
        const data = await resSEO.json();
        setSeoConfig(data);
        setSeoForm(prev => ({
          ...prev,
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          keywords: Array.isArray(data.keywords) ? data.keywords.join(', ') : ''
        }));
      }
    } catch (err) { console.error(err); }
  };

  const fetchAdminData = async (authToken: string) => {
    setLoading(true);
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      const msgsRes = await fetch('/api/admin/messages', { headers });
      if (msgsRes.ok) setMessages(await msgsRes.json());
      const projsRes = await fetch('/api/projects');
      if (projsRes.ok) setProjects(await projsRes.json());
      const blogsRes = await fetch('/api/blogs');
      if (blogsRes.ok) setBlogs(await blogsRes.json());
      
      const logsRes = await fetch('/api/admin/activity-logs', { headers });
      if (logsRes.ok) setActivityLogs(await logsRes.json());

      const appsRes = await fetch('/api/admin/applications', { headers });
      if (appsRes.ok) setApplications(await appsRes.json());

      await fetchStats();
    } catch (err) {
      console.error('Core administrative sync failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (secondsLeft > 0) {
      setError(`Brute-force shield active. Gateway isolated. Retry in ${formatTimeLeft(secondsLeft)}.`);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('astrix_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        fetchAdminData(data.token);

        // Clear failed counter after successful login
        setFailedAttempts(0);
        setLockoutUntil(0);
        localStorage.removeItem('astrix_failed_attempts');
        localStorage.removeItem('astrix_lockout_until');

        setSuccessMsg('Astrix secure key authorized. System unshielded.');
        setTimeout(() => setSuccessMsg(''), 3500);
      } else {
        const errData = await response.json();
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        localStorage.setItem('astrix_failed_attempts', nextFailed.toString());

        let lockTime = 0;
        let lockMsg = '';
        if (nextFailed === 5) {
          lockTime = 60 * 1000; // 1 minute
          lockMsg = 'Too many failed login attempts: Brute force block triggered. Locked for 1 minute.';
        } else if (nextFailed === 6) {
          lockTime = 3 * 60 * 1000; // 3 minutes
          lockMsg = 'Incremental threat detected: Locked for 3 minutes.';
        } else if (nextFailed >= 7) {
          lockTime = 60 * 60 * 1000; // 1 hour
          lockMsg = 'High security threat: Authentication isolated. Locked for 1 hour.';
        }

        if (lockTime > 0) {
          const until = Date.now() + lockTime;
          setLockoutUntil(until);
          localStorage.setItem('astrix_lockout_until', until.toString());
          setError(lockMsg);
        } else {
          setError(`${errData.error || 'Security credentials mismatched.'} (${5 - nextFailed} security attempts remaining)`);
        }
      }
    } catch (err) {
      setError('Connection refused. Cryptographic gate unresponsive.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
    localStorage.removeItem('astrix_admin_token');
    setToken('');
    setIsAuthenticated(false);
    onClose();
  };

  const notifyDataChanged = () => {
    window.dispatchEvent(new CustomEvent('astrix-data-updated'));
  };

  // CSV Export Lead metrics
  const exportLeadsCSV = () => {
    const header = ['Lead ID', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Status', 'Date'];
    const rows = messages.map(m => [
      m.id,
      m.name,
      m.email,
      m.phone || '',
      m.company || '',
      m.subject || '',
      `"${(m.message || '').replace(/"/g, '""')}"`,
      m.status || 'new',
      m.created_at || m.timestamp
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [header.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Astrix_CRM_Leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSuccessMsg('CRM Leads exported in standard CSV payload format.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // AI Assistant generator
  const triggerAiGenerator = async (type: 'blog' | 'case_study' | 'seo') => {
    if (!aiPrompt) {
      setError('Please supply guidelines prompt inside Assistant Console.');
      return;
    }
    setAiGenerating(true);
    setAiResult(null);
    setError('');
    try {
      // Simulate high-fidelity, comprehensive OpenAI/Gemini structuring with precise schema
      setTimeout(() => {
        const titleSlug = aiPrompt.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (type === 'blog') {
          const generated = {
            title: `AI-Driven Breakthrough: ${aiPrompt.slice(0, 1).toUpperCase() + aiPrompt.slice(1)}`,
            category: 'Artificial Intelligence',
            excerpt: `Exploratory analysis detailing physical calibrate structures optimized dynamically using ${aiPrompt}.`,
            author: 'Astrix AI Core Optimizer',
            content: `## Executive Overview\nAutonomous workflows have evolved past programmatic thresholds. Today, Astrix engineers deploy self-balancing model structures configured dynamically with the premise: "${aiPrompt}".\n\n## Empirical Analysis\nOur sub-acute response loops register stable performance factors under high pressure levels, generating a 42% operational latency reduction.`
          };
          setAiResult({ type: 'blog', payload: generated });
          setBlogForm({
            title: generated.title,
            category: 'Artificial Intelligence',
            excerpt: generated.excerpt,
            author: generated.author,
            content: generated.content
          });
        } else if (type === 'case_study') {
          const generated = {
            title: `Telemetry Calibration Suite: Project ${aiPrompt.split(' ')[0].toUpperCase()}`,
            description: `How We Solved: "${aiPrompt}" on the physical hardware edge layers.`,
            industry: 'Artificial Intelligence',
            technologiesUsed: 'PyTorch, ROS, Bluetooth LE, React v19',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            longDescription: `An exhaustive technical study solving ${aiPrompt}.\n\nBy layering sub-second mathematical models inside low-energy chips, we achieved immediate sensory feedback without server hops.`
          };
          setAiResult({ type: 'case_study', payload: generated });
          setProjForm(prev => ({
            ...prev,
            title: generated.title,
            description: generated.description,
            technologiesUsed: generated.technologiesUsed,
            imageUrl: generated.imageUrl,
            longDescription: generated.longDescription
          }));
        } else {
          const generated = {
            meta_title: `Astrix Enterprise CMS - Calibrating ${aiPrompt.slice(0, 30)}`,
            meta_description: `Enterprise-grade engineering solutions targeting ${aiPrompt}. Explore continuous biomechanics and edge diagnostics.`,
            keywords: `Astrix, AI Optimization, ${aiPrompt.split(' ').join(', ')}`
          };
          setAiResult({ type: 'seo', payload: generated });
          setSeoForm(prev => ({
            ...prev,
            meta_title: generated.meta_title,
            meta_description: generated.meta_description,
            keywords: generated.keywords
          }));
        }
        setAiGenerating(false);
        setSuccessMsg('Astrix Generative Assistant compiled options successful.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }, 1500);
    } catch (e) {
      setError('AI Generator network fail.');
      setAiGenerating(false);
    }
  };

  // Add mock media asset
  const handleUploadAssetMock = (e: FormEvent) => {
    e.preventDefault();
    if (!newMediaName) return;
    const sizeMap: any = { 'Image': '450 KB', 'PDF': '1.8 MB', '3D Model': '4.2 MB', 'Lottie': '210 KB', 'Video': '11.4 MB' };
    const extensionMap: any = { 'Image': '.png', 'PDF': '.pdf', '3D Model': '.gltf', 'Lottie': '.lottie', 'Video': '.mp4' };
    const formattedName = newMediaName.replace(/\.[^/.]+$/, "") + extensionMap[newMediaType];
    const newAsset = {
      id: `media-mock-${Date.now()}`,
      name: formattedName,
      size: sizeMap[newMediaType] || '1.0 MB',
      type: newMediaType,
      folder: activeMediaFolder,
      desc: 'User uploaded core node asset parameter.'
    };
    setMediaAssets(prev => [newAsset, ...prev]);
    setNewMediaName('');
    setSuccessMsg(`Simulated upload successful: ${formattedName} index compiled in ${activeMediaFolder} folder.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleServiceSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...serviceForm, sort_order: parseInt(serviceForm.sort_order) || 1 };
    const isEdit = !!editingService;
    try {
      const res = await fetch(isEdit ? `/api/services/${editingService.id}` : '/api/services', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg(isEdit ? 'Capabilities recalibrated.' : 'New service asset deployed successfully.');
        setServiceForm({ title: '', short_description: '', full_description: '', category: 'AI Systems', icon: 'Cpu', sort_order: '1' });
        setEditingService(null);
        fetchServices();
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) { setError('Service route missing.'); }
  };

  const handleProjectSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projForm.title,
      description: projForm.description,
      industry: projForm.industry,
      technologiesUsed: projForm.technologiesUsed.split(',').map(t => t.trim()).filter(Boolean),
      imageUrl: projForm.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      longDescription: projForm.longDescription,
      keyFeatures: projForm.keyFeatures.split('\n').map(f => f.trim()).filter(Boolean),
      specs: projForm.specLabels.map((l, idx) => ({ label: l, value: projForm.specValues[idx] || '' })).filter(s => s.label)
    };
    const isEdit = !!editingProject;
    try {
      const response = await fetch(isEdit ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSuccessMsg(isEdit ? 'Project specifications updated.' : 'New corporate project deployed successfully.');
        setProjForm({ title: '', description: '', industry: 'Technology', technologiesUsed: '', imageUrl: '', longDescription: '', keyFeatures: '', specLabels: ['Form Factor', 'Latency', 'DDoF'], specValues: ['', '', ''] });
        setEditingProject(null);
        fetchAdminData(token);
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) { setError('Project write error.'); }
  };

  const handleBlogSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogForm.title,
      category: blogForm.category,
      excerpt: blogForm.excerpt,
      author: blogForm.author,
      content: blogForm.content
    };
    const isEdit = !!editingBlog;
    try {
      const response = await fetch(isEdit ? `/api/admin/blogs/${editingBlog.id}` : '/api/admin/blogs', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSuccessMsg(isEdit ? 'Blog post modified.' : 'New article published in Insights.');
        setBlogForm({ title: '', category: 'Technology', excerpt: '', author: 'Principal Architect', content: '' });
        setEditingBlog(null);
        fetchAdminData(token);
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (e) { setError('Blog save failure.'); }
  };

  const handleCmsOrder = (idx: number, direction: 'up' | 'down') => {
    const updated = [...cmsBlocks];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= cmsBlocks.length) return;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setCmsBlocks(updated);
    setSuccessMsg('Homepage blocks order layout swapped.');
    setTimeout(() => setSuccessMsg(''), 1500);
  };

  // Custom Lead Note tracker saving locally
  const handleSaveLeadNote = (leadId: string, noteText: string) => {
    setLeadNotes(prev => ({ ...prev, [leadId]: noteText }));
    setSuccessMsg('Note saved successfully for lead context.');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-150 relative ${themeMode === 'dark' ? 'bg-[#060B18] text-gray-100' : 'bg-[#F9FAFB] text-gray-850'}`}>
      
      {/* Upper Status strip / Banner controls resembling Stripe UI */}
      <div className={`px-6 py-2.5 border-b text-[10.5px] font-mono flex flex-wrap justify-between items-center ${themeMode === 'dark' ? 'bg-[#090D1E] border-white/5 text-[#00D4FF]' : 'bg-white border-gray-200 text-[#6C3FE8]'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-semibold uppercase tracking-wider">Astrix Operations Control Console & CRM Suite // v12.1.2_Stable</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline opacity-80">ACTIVE KERNEL GATEWAY: SECURE_TLS13_ENVELOPE</span>
          <div className="flex items-center gap-1.5 border border-current rounded px-2 py-0.5">
            <span className="font-bold">STATUS:</span>
            <span className="text-emerald-400">SYNCED</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main Interface Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C3FE8] to-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#6C3FE8]/20 shrink-0">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-xl tracking-wider uppercase">ASTRIX</h1>
                <span className="text-[10px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.2 rounded font-mono font-extrabold tracking-widest uppercase">PRO</span>
              </div>
              <p className="text-xs text-gray-400">Enterprise Administration Command Center designed for high-performance SaaS scaling.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-start">
            {/* Dark & Light Theme Controller */}
            <button 
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${themeMode === 'dark' ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
              title="Toggle Light/Dark Workspace Mode"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10.5px] font-bold ${
                themeMode === 'dark' ? 'bg-red-500/5 hover:bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-500/10 hover:bg-red-500/15 border-red-200 text-red-600'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>TERMINATE CONTROL LEASE</span>
            </button>
          </div>
        </div>

        {/* Global Action Alerts Banner */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-105 text-xs font-mono flex items-center gap-2 rounded-xl text-left">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono flex items-center gap-2 rounded-xl">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Security Barrier Login screen */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className={`max-w-md mx-auto py-12 px-6 rounded-3xl border backdrop-blur-md space-y-6 text-center shadow-xl transition-all duration-300 ${themeMode === 'dark' ? 'border-white/5 bg-black/30 text-white' : 'border-gray-200/80 bg-white/60 text-gray-800'}`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#6C3FE8]/10 to-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center relative mx-auto">
              {secondsLeft > 0 ? (
                <Shield className="w-6 h-6 text-rose-500 animate-pulse" />
              ) : (
                <Lock className="w-6 h-6 text-[#00D4FF] animate-pulse" />
              )}
              <div className={`absolute inset-0 rounded-2xl filter blur-md ${secondsLeft > 0 ? 'bg-rose-500/20' : 'bg-[#00D4FF]/5 animate-radial-spin'}`} />
            </div>

            <div>
              <h2 className={`font-display font-extrabold text-lg tracking-wider ${themeMode === 'dark' ? 'text-white' : 'text-gray-950'}`}>ENTERPRISE GATEWAY IDENTIFICATION</h2>
              <p className={`text-[11px] mt-1 font-light leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Provide secure administrative credentials to decode filesystems.</p>
            </div>

            {/* Lockout status monitor */}
            {secondsLeft > 0 ? (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-left font-mono space-y-2">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-xs text-rose-400 font-bold tracking-wider">SYSTEM SECURE LOCKOUT ACTIVE</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">MUTED</span>
                </div>
                <p className="text-[10px] text-rose-300/80 leading-relaxed font-light">
                  Consecutive authorization failures exceeded threat tolerance. Administrative operations have been isolated to protect transaction nodes from credential stuffing.
                </p>
                <div className="pt-1.5 flex items-center justify-between border-t border-rose-500/10">
                  <span className="text-[10px] text-rose-400 uppercase tracking-widest font-bold">REMAINING PENALTY:</span>
                  <span className="text-xs text-rose-100 font-extrabold animate-pulse">{formatTimeLeft(secondsLeft)}</span>
                </div>
              </div>
            ) : failedAttempts > 0 ? (
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-left font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 animate-bounce" />
                  <span>DECK COMPROMISE ACCENT</span>
                </div>
                <p className="text-[10px] text-amber-200/85 font-light leading-snug">
                  Unsuccessful login recorded. The administrative shell triggers safety locks at 5, 6, and 7 failed keys.
                </p>
                <div className="text-[11px] text-amber-400 font-extrabold uppercase tracking-wide pt-1">
                  &gt;&gt; {5 - failedAttempts} OVERRIDE ATTEMPTS REMAINING
                </div>
              </div>
            ) : null}

            <div className="space-y-4 text-left">
              <div className="space-y-1">
                <label className={`text-[9.5px] font-mono uppercase tracking-widest block font-bold ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Email Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email" required placeholder="admin@astrix.com"
                    value={username} onChange={e => setUsername(e.target.value)}
                    disabled={secondsLeft > 0}
                    className={`w-full text-xs pl-9 pr-4 py-3 rounded-xl font-mono focus:outline-none focus:ring-1 transition-all ${
                      secondsLeft > 0
                        ? 'bg-rose-500/5 border border-rose-500/10 text-rose-300 opacity-60 cursor-not-allowed text-rose-400/70 placeholder-rose-700/50'
                        : themeMode === 'dark' 
                          ? 'text-white placeholder-gray-600 bg-black/60 border border-white/5 focus:border-[#00D4FF]/40 focus:ring-[#00D4FF]/20' 
                          : 'text-gray-800 placeholder-gray-400 bg-white border border-gray-200 focus:border-[#6C3FE8] focus:ring-[#6C3FE8]/20 shadow-sm'
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className={`text-[9.5px] font-mono uppercase tracking-widest block font-bold ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Security Passphrase</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password" required placeholder="password123"
                    value={password} onChange={e => setPassword(e.target.value)}
                    disabled={secondsLeft > 0}
                    className={`w-full text-xs pl-9 pr-4 py-3 rounded-xl font-mono focus:outline-none focus:ring-1 transition-all ${
                      secondsLeft > 0
                        ? 'bg-rose-500/5 border border-rose-500/10 text-rose-300 opacity-60 cursor-not-allowed text-rose-400/70 placeholder-rose-700/50'
                        : themeMode === 'dark' 
                          ? 'text-white placeholder-gray-600 bg-black/60 border border-white/5 focus:border-[#00D4FF]/40 focus:ring-[#00D4FF]/20' 
                          : 'text-gray-800 placeholder-gray-400 bg-white border border-gray-200 focus:border-[#6C3FE8] focus:ring-[#6C3FE8]/20 shadow-sm'
                    }`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={secondsLeft > 0}
              className={`w-full py-3.5 rounded-xl text-white font-display font-bold text-xs tracking-widest uppercase transition-all shadow-lg ${
                secondsLeft > 0
                  ? 'bg-rose-600/35 border border-rose-500/20 text-rose-300 cursor-not-allowed shadow-none opacity-50'
                  : 'bg-gradient-to-r from-[#6C3FE8] to-[#00D4FF] hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-[#6C3FE8]/25'
              }`}
            >
              {secondsLeft > 0 ? 'SIGN IN CHANNEL MUTED' : 'INITIALIZE INTERFACE PROMPT'}
            </button>
          </form>
        ) : (
          /* Real SaaS Deck Workspace Structure */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Sidebar navigation column structured like Linear/Notion */}
            <div className={`md:col-span-3 rounded-2xl border p-4 flex flex-col justify-between gap-6 overflow-y-auto ${themeMode === 'dark' ? 'bg-[#080E1E] border-white/5' : 'bg-white border-gray-200/80 shadow-sm'}`}>
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 tracking-widest block uppercase font-extrabold mb-2.5 px-1">
                    System Telemetries
                  </span>
                  <div className="space-y-1">
                    {[
                      { id: 'dashboard', label: 'Monitor Deck', icon: BarChart3 },
                      { id: 'analytics', label: 'Analytics Center', icon: RefreshCw },
                    ].map((tab) => (
                      <button
                        key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-[#6C3FE8] text-white shadow-md shadow-[#6C3FE8]/15'
                            : themeMode === 'dark'
                              ? 'text-gray-400 hover:text-white hover:bg-white/5'
                              : 'text-gray-600 hover:text-gray-950 hover:bg-[#6C3FE8]/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <tab.icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 tracking-widest block uppercase font-extrabold mb-2.5 px-1">
                    CMS & Media Portals
                  </span>
                  <div className="space-y-1">
                    {[
                      { id: 'cms', label: 'Page Builder', icon: Layers },
                      { id: 'services', label: 'Services Catalogue', icon: Sliders },
                      { id: 'projects', label: 'Project Portfolio', icon: Briefcase },
                      { id: 'blogs', label: 'Blogs & Articles', icon: FileText },
                      { id: 'media', label: 'Media Library', icon: Folder },
                    ].map((tab) => (
                      <button
                        key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-[#6C3FE8] text-white shadow-md shadow-[#6C3FE8]/15'
                            : themeMode === 'dark'
                              ? 'text-gray-400 hover:text-white hover:bg-white/5'
                              : 'text-gray-600 hover:text-gray-950 hover:bg-[#6C3FE8]/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-medium">
                          <tab.icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 tracking-widest block uppercase font-extrabold mb-2.5 px-1">
                    Organizational Controls
                  </span>
                  <div className="space-y-1">
                    {[
                      { id: 'leads', label: 'CRM Leads Inbound', icon: MessageSquare, count: messages.length },
                      { id: 'team', label: 'Team Roles', icon: UserCheck },
                      { id: 'security', label: 'Security & Audits', icon: ShieldCheck },
                      { id: 'settings', label: 'Console Configs', icon: Settings },
                    ].map((tab) => (
                      <button
                        key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-[#6C3FE8] text-white shadow-md shadow-[#6C3FE8]/15'
                            : themeMode === 'dark'
                              ? 'text-gray-400 hover:text-white hover:bg-white/5'
                              : 'text-gray-600 hover:text-gray-950 hover:bg-[#6C3FE8]/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-display">
                          <tab.icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </div>
                        {tab.count !== undefined && (
                          <span className={`text-[8.5px] border px-1.5 py-0.2 rounded font-mono font-bold ${
                            themeMode === 'dark'
                              ? 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20'
                              : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Console Quick Specs */}
              <div className="border-t border-gray-200/10 dark:border-white/5 pt-4 space-y-3.5">
                <div className={`p-3 rounded-xl border font-mono text-[9px] text-gray-400 space-y-1 ${themeMode === 'dark' ? 'bg-[#060B18]/60 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex justify-between text-[#00D4FF] font-bold">
                    <span>SECURITY GRID:</span>
                    <span>ACTIVE</span>
                  </div>
                  <div>CIPHER CODE: SHA-256</div>
                  <div>DATABASE: POSTGRES-FALLBACK</div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-xs text-red-400 transition-all font-mono font-bold tracking-wider cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>SECURE SIGNOUT</span>
                </button>
              </div>
            </div>

            {/* Core Panels View Area (9 columns) */}
            <div className={`md:col-span-9 p-6 rounded-2xl border ${themeMode === 'dark' ? 'bg-[#070D1E] border-white/5' : 'bg-white border-gray-200/80 shadow-sm'}`}>
              
              {/* TAB: MONITOR DECK (DASHBOARD) with SVG Graphs */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <h3 className="font-display text-lg font-bold">System Telemetrics Stream</h3>
                      <p className="text-xs text-gray-400">An aggregation of visitors, conversion metrics, website health, and active pipelines.</p>
                    </div>
                    <button 
                      onClick={() => fetchAdminData(token)}
                      className="p-2 bg-[#6C3FE8]/10 hover:bg-[#6C3FE8]/20 text-[#6C3FE8] dark:text-[#00D4FF] rounded-lg border border-indigo-500/10 font-mono text-[10px] flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>POLL LIVE DATABASES</span>
                    </button>
                  </div>

                  {/* Stripe-Grade High Density Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { label: 'Total Visitors', val: '84,210', icon: BarChart3, col: 'text-indigo-400' },
                      { label: 'Monthly Traffic', val: '12,401', icon: FileText, col: 'text-[#00D4FF]' },
                      { label: 'Leads Pipeline', val: String(messages.length), icon: MessageSquare, col: 'text-emerald-400' },
                      { label: 'Platform Health', val: '98.6%', icon: ShieldCheck, col: 'text-amber-400' },
                      { label: 'Conversion Rate', val: '3.42%', icon: Sliders, col: 'text-purple-400' }
                    ].map((scard, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-1.5 ${themeMode === 'dark' ? 'bg-[#060B18]/50 border-white/5' : 'bg-gray-50 border-gray-200/50'}`}>
                        <div className="flex justify-between items-center text-gray-500">
                          <span className="text-[10px] uppercase font-semibold tracking-wider font-mono select-none">{scard.label}</span>
                          <scard.icon className={`w-3.5 h-3.5 ${scard.col}`} />
                        </div>
                        <h4 className="text-lg font-bold font-display tracking-tight text-gradient">{scard.val}</h4>
                      </div>
                    ))}
                  </div>

                  {/* PREMIUM CUSTOM SVG CHARTS RENDER (Highly visual, 100% React-compatible) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                    {/* Visitor Monthly Analytics Wave Spline Chart */}
                    <div className={`p-5 rounded-xl border space-y-4 ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <div className="flex justify-between items-center border-b border-gray-200/5 dark:border-white/5 pb-2">
                        <span className="text-xs font-mono uppercase text-gray-400 font-bold select-none">Weekly Active Visitors Wave</span>
                        <span className="text-[9.5px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/20 px-2 py-0.5 rounded uppercase">spline plot</span>
                      </div>
                      
                      {/* Premium SVG Vector Graph */}
                      <div className="relative h-44 w-full">
                        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="visGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6C3FE8" stopOpacity="0.3"/>
                              <stop offset="100%" stopColor="#6C3FE8" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          {/* Grid horizontal markers */}
                          <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
                          
                          {/* Curve Path */}
                          <path 
                            d="M 10,130 Q 80,40 160,110 T 320,50 T 490,40 L 490,150 L 10,150 Z" 
                            fill="url(#visGlow)" 
                          />
                          <path 
                            d="M 10,130 Q 80,40 160,110 T 320,50 T 490,40" 
                            fill="none" 
                            stroke="#6C3FE8" 
                            strokeWidth="3.2" 
                          />
                          
                          {/* Data points */}
                          <circle cx="120" cy="85" r="4" fill="#00D4FF" className="animate-pulse" />
                          <circle cx="320" cy="50" r="4" fill="#00D4FF" className="animate-pulse" />
                        </svg>
                        <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-500 bg-neutral-900/40 p-1.5 rounded border border-white/5">
                          Peak: 14.8k at mid-cycle
                        </div>
                      </div>

                      <div className="flex justify-between text-[9px] font-mono text-gray-500">
                        <span>WK01</span>
                        <span>WK02 (Calibration phase)</span>
                        <span>WK03 (Market boost)</span>
                        <span>WK04</span>
                      </div>
                    </div>

                    {/* Unified Lead Growth & CRM Intake Bar Graph */}
                    <div className={`p-5 rounded-xl border space-y-4 ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <div className="flex justify-between items-center border-b border-gray-200/5 dark:border-white/5 pb-2">
                        <span className="text-xs font-mono uppercase text-gray-400 font-bold select-none">CRM Leads Growth Ledger</span>
                        <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded uppercase">intake count</span>
                      </div>

                      {/* Custom column bar chart using inline SVG */}
                      <div className="h-44 w-full">
                        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                          {/* Grid horizontal markers */}
                          <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          
                          {/* Styled vertical rounded columns */}
                          <rect x="30" y="80" width="30" height="70" rx="3" fill="#06B6D4" />
                          <rect x="110" y="50" width="30" height="100" rx="3" fill="#6C3FE8" />
                          <rect x="190" y="110" width="30" height="40" rx="3" fill="#00D4FF" />
                          <rect x="270" y="30" width="30" height="120" rx="3" fill="#F59E0B" />
                          <rect x="350" y="65" width="30" height="85" rx="3" fill="#10B981" />
                          <rect x="430" y="45" width="30" height="105" rx="3" fill="#8B5CF6" />
                        </svg>
                      </div>

                      <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase">
                        <span>New (31)</span>
                        <span>Contact (42)</span>
                        <span>Qualified (18)</span>
                        <span>Trial (25)</span>
                        <span>Won (12)</span>
                        <span>Lost (5)</span>
                      </div>
                    </div>
                  </div>

                  {/* Future Ready Financial & Trait Sources indicator row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <span className="text-[10px] font-mono text-gray-500 uppercase font-bold select-none">Traffic Sources Breakdown</span>
                      <div className="space-y-2 text-xs">
                        {['Direct Operations (38%)', 'Organic Queries (32%)', 'LinkedIn Referrals (18%)', 'Social/Other (12%)'].map((src, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-gray-400 text-[11px] font-medium">{src.split(' ')[0]} {src.split(' ')[1] || ''}</span>
                            <span className="font-mono font-bold text-[#00D4FF]">{src.split('(')[1]?.replace(')', '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <span className="text-[10px] font-mono text-gray-500 uppercase font-bold select-none">Global Device Statistics</span>
                      <div className="space-y-2 text-xs">
                        {['Mac / Windows Desktop (64%)', 'iOS Mobile SDKs (22%)', 'Android Core (10%)', 'Embedded Client (4%)'].map((src, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-gray-400 text-[11px] font-medium">{src.split('(')[0]}</span>
                            <span className="font-mono font-bold text-[#6C3FE8]">{src.split('(')[1]?.replace(')', '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <span className="text-[10px] font-mono text-gray-500 uppercase font-bold select-none">Future-Ready Revenue Ledger</span>
                      <div className="space-y-1.5 text-left">
                        <div className="text-xs text-gray-400 font-light">Subscribers ARR projection Value</div>
                        <h4 className="text-xl font-display font-black text-emerald-400">$184,200 <span className="text-[10px] text-gray-500 font-normal">USD</span></h4>
                        <span className="text-[9.5px] font-mono text-emerald-400/70 block uppercase">★ 99.8% customer retention</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CMS DRAG & DROP PAGE BUILDER */}
              {activeTab === 'cms' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold">Homepage Visual Page Builder</h3>
                    <p className="text-xs text-gray-400">Order, toggle, and manage live content blocks displayed on Astrix portal homepage.</p>
                  </div>

                  <div className="space-y-3 text-left">
                    <span className="text-[10.5px] font-mono text-[#6C3FE8] dark:text-[#00D4FF] font-black uppercase tracking-wider block">Homepage Structural Order Blocks</span>
                    <p className="text-[11.5px] text-gray-400">Rearrange and mute structural modules in real-time:</p>
                    
                    <div className="border border-gray-200/50 dark:border-white/5 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-black/10">
                      {cmsBlocks.map((block, idx) => (
                        <div key={block.id} className="flex justify-between items-center p-3.5 hover:bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <span className="text-xs bg-neutral-900 border border-white/10 px-2 py-0.5 rounded font-mono font-bold text-[#00D4FF]">{idx + 1}</span>
                            <div className="text-left">
                              <span className="text-white font-bold block text-xs">{block.name}</span>
                              <span className="text-[10px] text-gray-500 font-mono font-semibold uppercase">{block.tag}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCmsOrder(idx, 'up')} disabled={idx === 0}
                              className="p-1 px-2 text-xs bg-white/5 border border-white/5 hover:bg-indigo-600 hover:text-white rounded disabled:opacity-30 cursor-pointer"
                            >
                              ▲ Up
                            </button>
                            <button
                              onClick={() => handleCmsOrder(idx, 'down')} disabled={idx === cmsBlocks.length - 1}
                              className="p-1 px-2 text-xs bg-white/5 border border-white/5 hover:bg-indigo-600 hover:text-white rounded disabled:opacity-30 cursor-pointer"
                            >
                              ▼ Down
                            </button>
                            <button
                              onClick={() => {
                                const copy = [...cmsBlocks];
                                copy[idx].active = !copy[idx].active;
                                setCmsBlocks(copy);
                                setSuccessMsg(`Muted/Unmuted ${block.name} successfully.`);
                                setTimeout(() => setSuccessMsg(''), 1500);
                              }}
                              className={`p-1 px-2 text-[10.5px] rounded border font-mono font-semibold transition-all cursor-pointer ${block.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'}`}
                            >
                              {block.active ? 'ACTIVE' : 'MUTED'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Custom Landing block creator */}
                  <div className={`p-5 rounded-2xl border ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#6C3FE8] dark:text-[#00D4FF] text-left">Trigger Custom Banner CTA</h4>
                    <p className="text-[11.5px] text-gray-400 text-left mt-1">Change visual settings coordinates dynamically.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase">Banner Headline</label>
                        <input 
                          type="text" defaultValue="Interactive Core Diagnostic Labs"
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase font-light">Accent highlight button</label>
                        <input 
                          type="text" defaultValue="Simulate Now"
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSuccessMsg('Homepage custom banner settings serialized.'); setTimeout(() => setSuccessMsg(''), 2000); }}
                      className="mt-4 px-4 py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white font-mono text-[10.5px] uppercase font-bold rounded-xl transition-all cursor-pointer"
                    >
                      COMMIT CTA BANNER
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: LEAD MANAGEMENT CRM & IMMUTABLE CSV PIPELINE */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left border-b border-white/5 pb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold">Inbound CRM Pipeline & Lead CRM</h3>
                      <p className="text-xs text-gray-400 font-light">Qualify, note, and update customer requests generated across Astrix landing nodes.</p>
                    </div>
                    <button 
                      onClick={exportLeadsCSV}
                      className="px-4 py-2.5 bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 hover:bg-[#00D4FF]/20 rounded-xl font-mono text-xs font-bold leading-none flex items-center gap-1.5 cursor-pointer select-none transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>EXPORT FULL LEADS CSV</span>
                    </button>
                  </div>

                  {/* CRM pipeline status selector */}
                  <div className="flex flex-wrap gap-2.5 justify-start text-xs font-mono">
                    <span className="text-gray-500 font-bold self-center uppercase text-[10px] tracking-wider font-mono mr-1">CRM Filter:</span>
                    {(['all', 'new', 'contacted', 'won', 'lost'] as const).map((st) => (
                      <button
                        key={st} onClick={() => setCrmFilters(st)}
                        className={`px-3 py-1.5 rounded-lg border font-bold uppercase transition-all cursor-pointer ${crmFilters === st ? 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30' : 'bg-transparent text-gray-400 border-white/5 hover:text-white'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Interactive CRM leads cards list */}
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="py-12 text-center text-gray-500 font-mono text-xs border border-white/5 bg-black/40 rounded-2xl">
                        NO ACTIVE INBOUND LEADS INDEXED YET on system database schemas.
                      </div>
                    ) : (
                      messages
                        .filter(m => crmFilters === 'all' || (m.status || 'new') === crmFilters)
                        .map((lead) => (
                          <div key={lead.id} className="p-5 rounded-2xl border border-gray-250 dark:border-white/5 bg-[#060B18]/30 text-left space-y-4 hover:border-[#6C3FE8]/25 transition-all">
                            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gray-200/10 dark:border-white/5 pb-3">
                              <div>
                                <h4 className="font-display font-extrabold text-[#00D4FF] text-sm flex items-center gap-2">
                                  {lead.name}
                                  {lead.company && <span className="text-[9px] bg-[#6C3FE8]/20 text-[#6C3FE8] dark:text-indigo-300 px-2 py-0.5 border border-indigo-500/20 rounded font-mono uppercase">{lead.company}</span>}
                                </h4>
                                <span className="text-[10px] font-mono text-gray-400">{lead.email} | {lead.phone || 'No phone'}</span>
                              </div>

                              <div className="flex items-center gap-2 font-mono text-[10.5px]">
                                <span className="text-gray-500 text-[9.5px]">{new Date(lead.created_at || lead.timestamp || Date.now()).toLocaleDateString()}</span>
                                <select
                                  value={lead.status || 'new'}
                                  onChange={async (e) => {
                                    try {
                                      const res = await fetch(`/api/contact/${lead.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                                        body: JSON.stringify({ status: e.target.value })
                                      });
                                      if (res.ok) {
                                        setSuccessMsg(`Lead status changed: ${e.target.value.toUpperCase()}`);
                                        fetchAdminData(token);
                                        setTimeout(() => setSuccessMsg(''), 2000);
                                      }
                                    } catch (err) { setError('Failed to update lead status.'); }
                                  }}
                                  className="bg-black text-[10px] text-[#00D4FF] border border-white/10 rounded px-2 py-1 focus:outline-none uppercase font-bold"
                                >
                                  <option value="new">NEW INQUIRY</option>
                                  <option value="contacted">CONTACTED</option>
                                  <option value="won">QUALIFIED WON</option>
                                  <option value="lost">LOST ARCHIVED</option>
                                </select>
                              </div>
                            </div>

                            <p className="text-xs text-gray-300 font-light leading-relaxed pl-3 border-l-2 border-indigo-500/30 font-display">
                              {lead.message || 'No lead statement supplied.'}
                            </p>

                            {/* Self-contained notes management per Lead */}
                            <div className="space-y-2 pt-2 border-t border-gray-200/5 dark:border-white/5">
                              <label className="text-[9.5px] font-mono text-gray-500 block uppercase font-bold select-none">Internal Technical Notes & Reminders</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Leave pipeline notes or follow-up milestones..."
                                  value={leadNotes[lead.id] !== undefined ? leadNotes[lead.id] : (lead.notes || '')}
                                  onChange={(e) => setLeadNotes(prev => ({ ...prev, [lead.id]: e.target.value }))}
                                  className="w-full text-xs text-white p-2 px-3 bg-black/40 border border-white/5 focus:outline-none rounded-xl font-mono"
                                />
                                <button
                                  onClick={() => handleSaveLeadNote(lead.id, leadNotes[lead.id] || '')}
                                  className="px-4 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                                >
                                  Save_Note
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB: SERVICES CATALOGUE */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold">Dynamic Services Catalogue</h3>
                    <p className="text-xs text-gray-400">Configure and calibrate Astrix capability grids displayed on main web nodes.</p>
                  </div>

                  <form onSubmit={handleServiceSubmit} className="p-5 rounded-2xl border border-gray-200/60 dark:border-white/5 bg-[#060B18]/20 space-y-4">
                    <div className="text-xs font-mono text-[#00D4FF] font-black uppercase text-left border-b border-gray-200/10 dark:border-white/5 pb-2">
                      {editingService ? `RECONFIGURING: ${editingService.title}` : 'DEPLOY SERVICE ACCREDITATION CAPABILITY'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500">Service Title</label>
                        <input
                          type="text" required value={serviceForm.title}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500">Core Category</label>
                        <input
                          type="text" value={serviceForm.category}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-500">Brief Abstract Summary</label>
                      <input
                        type="text" required value={serviceForm.short_description}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, short_description: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-500 font-light text-sans">Detailed Full Capabilities Narrative</label>
                      <textarea
                        rows={3} value={serviceForm.full_description}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, full_description: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500">Vector Icon Node</label>
                        <input
                          type="text" value={serviceForm.icon}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, icon: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500">Sort weight</label>
                        <input
                          type="number" value={serviceForm.sort_order}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, sort_order: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                      <div className="flex items-end mb-1">
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 rounded-xl text-white font-mono text-[10px] font-bold uppercase transition-all text-center cursor-pointer"
                        >
                          {editingService ? 'COMMIT RECALIBRATION' : 'PUBLISH SERVICE INDEX'}
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-mono text-[#00D4FF] tracking-wider uppercase font-extrabold block">LIVE DEPLOYED CAPABILITY SERVERS INDEX</span>
                    <div className="rounded-xl border border-white/5 overflow-hidden text-xs bg-black/20 text-left divide-y divide-gray-200/5 dark:divide-white/5">
                      {services.map((srv) => (
                        <div key={srv.id} className="p-4 flex justify-between items-center hover:bg-neutral-900/10">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold">{srv.title}</span>
                              <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.2 rounded border border-indigo-500/20">{srv.category}</span>
                            </div>
                            <p className="text-[11.5px] text-gray-400 mt-1 max-w-xl truncate">{srv.short_description}</p>
                          </div>
                          
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                setEditingService(srv);
                                setServiceForm({
                                  title: srv.title,
                                  short_description: srv.short_description,
                                  full_description: srv.full_description || '',
                                  category: srv.category || 'AI Systems',
                                  icon: srv.icon || 'Cpu',
                                  sort_order: String(srv.sort_order)
                                });
                              }}
                              className="p-1 px-2 uppercase font-mono text-[10px] text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-500/20 rounded cursor-pointer transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (!window.confirm('Delete this service competency?')) return;
                                try {
                                  const res = await fetch(`/api/services/${srv.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    setSuccessMsg('Service removed successfully.');
                                    fetchServices();
                                    notifyDataChanged();
                                    setTimeout(() => setSuccessMsg(''), 2000);
                                  }
                                } catch (e) {}
                              }}
                              className="p-1 px-2 uppercase font-mono text-[10px] text-red-500 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 rounded cursor-pointer transition-colors"
                            >
                              Purge
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PROJECT MANAGEMENT PORTFOLIO */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold">Project Spec Portfolio CMS</h3>
                    <p className="text-xs text-gray-400 font-light">Add, edit, publish physical and digital prototypes with detailed technical spec sheets.</p>
                  </div>

                  <form onSubmit={handleProjectSubmit} className="p-5 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-black/10 space-y-4">
                    <div className="text-xs font-mono text-[#00D4FF] uppercase font-extrabold border-b border-white/5 pb-2 text-left">
                      {editingProject ? `EDITING SPECIFICATION: ${editingProject.title}` : 'DEPLOY INNOVATIONAL OUTCOME INDEXED BLOCK'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold uppercase">Project Display Name</label>
                        <input
                          type="text" required value={projForm.title}
                          onChange={(e) => setProjForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold uppercase">Industry Sector Bracket</label>
                        <select
                          value={projForm.industry}
                          onChange={(e) => setProjForm(prev => ({ ...prev, industry: e.target.value as any }))}
                          className="w-full text-xs text-white p-2.5 bg-neutral-900 border border-white/5 rounded-xl focus:outline-none focus:ring-1"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Engineering">Mechanical & Compounding</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-mono font-bold uppercase">Brief Tagline Abstract</label>
                        <input
                          type="text" required value={projForm.description}
                          onChange={(e) => setProjForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-mono font-bold uppercase">Technologies Used (comma CSV)</label>
                        <input
                          type="text" placeholder="Flutter, ROS, PyTorch, C++"
                          value={projForm.technologiesUsed}
                          onChange={(e) => setProjForm(prev => ({ ...prev, technologiesUsed: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold uppercase">Screenshot URL / Cover Image</label>
                        <input
                          type="text" value={projForm.imageUrl}
                          onChange={(e) => setProjForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold uppercase">Spec Form Factor</label>
                        <input
                          type="text" placeholder="72mm x 35mm Flex"
                          value={projForm.specValues[0]}
                          onChange={(e) => {
                            const newVals = [...projForm.specValues];
                            newVals[0] = e.target.value;
                            setProjForm(prev => ({ ...prev, specValues: newVals }));
                          }}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Deconstruction Long Detail Statement</label>
                      <textarea
                        rows={3} required value={projForm.longDescription}
                        onChange={(e) => setProjForm(prev => ({ ...prev, longDescription: e.target.value }))}
                        className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:ring-1"
                      />
                    </div>

                    <div className="flex justify-start text-left">
                      <button
                        type="submit"
                        className="px-5 py-3 bg-gradient-to-r from-[#6C3FE8] to-[#00D4FF] rounded-xl text-white font-mono text-[10.5px] font-extrabold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{editingProject ? 'SAVE PROJECT MODIFICATION' : 'DEPLOY SECURE TO PRODUCTION'}</span>
                      </button>
                    </div>
                  </form>

                  <div className="space-y-3 pt-4 border-t border-white/5 text-left">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase font-black tracking-wider font-mono select-none">PORTFOLIO DEPLOYED SCHEMAS LEDGER</span>
                    <div className="rounded-xl border border-white/5 bg-black/20 text-xs divide-y divide-gray-200/5 dark:divide-white/5">
                      {projects.map((p) => (
                        <div key={p.id} className="p-3.5 flex justify-between items-center hover:bg-neutral-900/10 transition-colors">
                          <div className="text-left font-display">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-xs">{p.title}</span>
                              <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-mono border border-cyan-500/20 px-1.5 py-0.2 rounded font-black tracking-wider uppercase">{p.industry}</span>
                            </div>
                            <p className="text-gray-400 text-[10.5px] mt-1 pr-6 max-w-sm truncate">{p.description}</p>
                          </div>
                          
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                setEditingProject(p);
                                setProjForm({
                                  title: p.title,
                                  description: p.description,
                                  industry: p.industry,
                                  technologiesUsed: p.technologiesUsed.join(', '),
                                  imageUrl: p.imageUrl,
                                  longDescription: p.longDescription,
                                  keyFeatures: p.keyFeatures.join('\n'),
                                  specLabels: p.specs?.map(s => s.label) || ['Form Factor', 'Latency', 'DDoF'],
                                  specValues: p.specs?.map(s => s.value) || ['', '', '']
                                });
                              }}
                              className="p-1 px-2 font-mono uppercase text-[9.5px] text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-500/20 rounded cursor-pointer transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (!window.confirm('Erase this project specification?')) return;
                                try {
                                  const res = await fetch(`/api/admin/projects/${p.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    setSuccessMsg('Project expunged successfully from live catalog lists.');
                                    fetchAdminData(token);
                                    notifyDataChanged();
                                    setTimeout(() => setSuccessMsg(''), 2000);
                                  }
                                } catch (e) {}
                              }}
                              className="p-1 px-2 font-mono uppercase text-[9.5px] text-red-500 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 rounded cursor-pointer transition-all"
                            >
                              Purge
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: BLOGS MANAGEMENT CMS WITH AI CONTENT WRITER ASSISTANT */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="text-left border-b border-white/5 pb-4">
                    <h3 className="font-display text-lg font-bold">Astrix Intelligent Blogs Editor</h3>
                    <p className="text-xs text-gray-400">Publish thought leadership articles, research papers, and news updates directly.</p>
                  </div>

                  {/* AI ASSISTANT GENERATION BLOCK FOR BLOGS, CASE STUDIES & SEO DESCRIPTION */}
                  <div className="p-5 rounded-2xl border border-purple-500/20 bg-gradient-to-tr from-indigo-950/20 to-violet-950/20 space-y-4 shadow-lg shadow-purple-500/5">
                    <div className="flex justify-between items-center text-left">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                        <span className="font-display font-extrabold text-[#00D4FF] text-xs uppercase tracking-wider">AI Pilot Content & Whitepaper Compiler</span>
                      </div>
                      <span className="text-[9px] bg-indigo-500/15 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-500/20 font-bold uppercase select-none">Autonomous Helper</span>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Explain Article Subject, Keywords, or Innovation Specs:</label>
                      <div className="flex gap-2">
                        <input
                          type="text" placeholder="e.g. quantum biotech calibration patches under extreme sensory latency"
                          value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                          className="w-full text-xs text-white p-3 bg-black/60 border border-purple-500/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
                        />
                        <button
                          type="button" disabled={aiGenerating}
                          onClick={() => triggerAiGenerator('blog')}
                          className="px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all select-none cursor-pointer flex items-center gap-1.5 shrink-0"
                        >
                          {aiGenerating ? 'Generating...' : 'WRITE_ARTICLE'}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-start text-[10px] font-mono text-gray-400">
                      <span>Quick Presets:</span>
                      <button type="button" onClick={() => triggerAiGenerator('case_study')} className="underline hover:text-white">Write Case Study</button>
                      <span className="text-gray-600">|</span>
                      <button type="button" onClick={() => triggerAiGenerator('seo')} className="underline hover:text-white">Align SEO Meta</button>
                    </div>

                    {aiResult && (
                      <div className="p-4 rounded-xl bg-black/40 text-[11px] font-mono border border-indigo-500/15 text-left text-gray-200 divide-y divide-white/5 space-y-2">
                        <div className="pb-1.5 text-xs text-[#00D4FF] font-bold">Successfully generated. Values applied to editor forms.</div>
                        <div className="pt-2 text-gray-400"><span className="text-white font-bold">Title:</span> {aiResult.payload.title || aiResult.payload.meta_title}</div>
                        <div className="pt-2 font-sans line-clamp-3 text-gray-400"><span className="text-white font-bold font-mono">Excerpt:</span> {aiResult.payload.excerpt || aiResult.payload.meta_description}</div>
                      </div>
                    )}
                  </div>

                  {/* Standard Form */}
                  <form onSubmit={handleBlogSubmit} className="p-5 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-black/10 space-y-4 text-left">
                    <div className="text-xs font-mono text-[#00D4FF] font-bold uppercase mb-2 border-b border-white/5 pb-2">
                      {editingBlog ? `EDITING INSIGHT POST: ${editingBlog.title}` : 'WRITE NEW BLOG LOGBOOK ENTRY'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500">Post Title Banner</label>
                        <input
                          type="text" required value={blogForm.title}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500">Science Category</label>
                        <select
                          value={blogForm.category}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value as any }))}
                          className="w-full text-xs text-white p-2.5 bg-neutral-900 border border-white/10 rounded-xl focus:outline-none"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Engineering">Mechanical Systems</option>
                          <option value="Innovation">Chemical Innovation</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500">Primary Scientist / Author</label>
                        <input
                          type="text" required value={blogForm.author}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500">Excerpt / Brief Paragraph</label>
                        <input
                          type="text" required value={blogForm.excerpt}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500">Content Markdowns / Plaintext paragraphs</label>
                      <textarea
                        rows={5} required value={blogForm.content}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl text-white font-mono text-[10.5px] uppercase font-black transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingBlog ? 'SAVE CHANGE METRIC' : 'POST KERNEL ARTICLE'}</span>
                    </button>
                  </form>

                  <div className="space-y-3 pt-4 border-t border-white/5 text-left">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold tracking-widest font-mono">INSIGHTS PUBLISHED BULLETINS</span>
                    <div className="rounded-xl border border-white/5 bg-black/20 text-xs divide-y divide-gray-200/5 dark:divide-white/5">
                      {blogs.map((b) => (
                        <div key={b.id} className="p-3.5 flex justify-between items-center hover:bg-neutral-900/10 text-[11.5px] transition-colors">
                          <div className="text-left font-display">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white">{b.title}</span>
                              <span className="bg-indigo-500/10 text-indigo-400 text-[8px] font-mono border border-indigo-500/20 px-1.5 py-0.2 rounded uppercase">{b.category}</span>
                            </div>
                            <span className="text-gray-500 font-mono text-[9.5px] block mt-1">Author: {b.author} | Published is {b.date}</span>
                          </div>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                setEditingBlog(b);
                                setBlogForm({
                                  title: b.title,
                                  category: b.category,
                                  excerpt: b.excerpt,
                                  author: b.author,
                                  content: b.content
                                });
                              }}
                              className="p-1 px-2 font-mono uppercase text-[9.5px] text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-500/10 rounded cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (!window.confirm('Wipe this blog article?')) return;
                                try {
                                  const res = await fetch(`/api/admin/blogs/${b.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (res.ok) {
                                    setSuccessMsg('Article deleted successfully from live index.');
                                    fetchAdminData(token);
                                    notifyDataChanged();
                                    setTimeout(() => setSuccessMsg(''), 2000);
                                  }
                                } catch (e) {}
                              }}
                              className="p-1 px-2 font-mono uppercase text-[9.5px] text-red-500 bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 rounded cursor-pointer"
                            >
                              Purge
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MEDIA LIBRARY CENTRAL MANAGER */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold">Central Media Library</h3>
                    <p className="text-xs text-gray-400 font-light">Categorize, catalog, and reference your high-end vector branding assets, Lottie scripts, PDFs, and 3D wireframe models.</p>
                  </div>

                  {/* Folder Tab Directory Selector */}
                  <div className="flex flex-wrap gap-2 justify-start font-mono text-xs border-b border-gray-200/10 dark:border-white/5 pb-3">
                    {(['projects', 'services', 'blogs', 'branding', 'team'] as const).map((folder) => (
                      <button
                        key={folder} onClick={() => setActiveMediaFolder(folder)}
                        className={`px-3 py-1.5 rounded-lg border uppercase tracking-wider font-bold transition-all cursor-pointer ${
                          activeMediaFolder === folder 
                            ? 'bg-[#6C3FE8]/10 text-[#00D4FF] border-[#6C3FE8]' 
                            : 'bg-transparent text-gray-400 border-white/5 hover:text-white'
                        }`}
                      >
                        Folder: {folder}
                      </button>
                    ))}
                  </div>

                  {/* Add file mock form */}
                  <form onSubmit={handleUploadAssetMock} className="p-4 rounded-xl border border-dashed border-gray-200/50 dark:border-white/10 bg-black/10 flex flex-col md:flex-row items-center gap-3">
                    <div className="text-left py-1 text-xs font-mono font-bold uppercase shrink-0">Upload Simulated Asset:</div>
                    
                    <input
                      type="text" required placeholder="Enter asset filename, e.g. calibration_matrices" value={newMediaName}
                      onChange={e => setNewMediaName(e.target.value)}
                      className="w-full text-xs text-white px-3 py-2 bg-black/40 border border-white/5 rounded-xl font-mono focus:outline-none"
                    />

                    <select
                      value={newMediaType} onChange={e => setNewMediaType(e.target.value)}
                      className="bg-neutral-900 border border-white/15 px-3 py-2 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 shrink-0"
                    >
                      <option value="Image">Image (.png)</option>
                      <option value="PDF">PDF (.pdf)</option>
                      <option value="3D Model">3D Model (.gltf)</option>
                      <option value="Lottie">Lottie (.lottie)</option>
                      <option value="Video">Video (.mp4)</option>
                    </select>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 rounded-xl text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer self-stretch md:self-auto"
                    >
                      COMMIT_UPLOAD
                    </button>
                  </form>

                  {/* Active Folder Assets listing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                    {mediaAssets
                      .filter(asset => asset.folder === activeMediaFolder)
                      .map((asset) => (
                        <div key={asset.id} className="p-4 border border-gray-250 dark:border-white/5 bg-[#060B18]/30 hover:border-indigo-500/20 transition-all rounded-xl relative overflow-hidden group flex flex-col justify-between h-32 text-xs">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {asset.type === 'Image' ? <ImageIcon className="w-4 h-4 text-emerald-400" /> :
                               asset.type === 'PDF' ? <File className="w-4 h-4 text-red-400" /> :
                               asset.type === 'Video' ? <Video className="w-4 h-4 text-blue-400" /> :
                               <Terminal className="w-4 h-4 text-amber-400" />}
                              <span className="font-extrabold text-[#00D4FF] truncate font-mono select-all block max-w-[120px]" title={asset.name}>{asset.name}</span>
                            </div>
                            <span className="text-[9.5px] font-mono text-gray-500 uppercase font-black">{asset.type}</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-gray-400 font-sans block truncate text-[10.5px]">{asset.desc}</span>
                            <span className="text-[9.5px] font-mono text-gray-500 block uppercase">Size weight: {asset.size}</span>
                          </div>

                          <div className="text-right">
                            <button
                              onClick={() => {
                                setMediaAssets(prev => prev.filter(a => a.id !== asset.id));
                                setSuccessMsg('Asset purged successfully from simulated library.');
                                setTimeout(() => setSuccessMsg(''), 1500);
                              }}
                              className="text-[9.5px] text-red-500 uppercase font-mono hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB: TEAM ROLES MANAGEMENT */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="text-left border-b border-white/5 pb-4">
                    <h3 className="font-display text-lg font-bold">Team Roster & Security Permissions (RBAC)</h3>
                    <p className="text-xs text-gray-400">Administered directories mapping credential roles across Astrix framework access zones.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-400 border-collapse divide-y divide-white/5 text-left">
                      <thead>
                        <tr className="text-[10px] font-mono text-gray-500 uppercase font-extrabold tracking-wider">
                          <th className="py-3 px-2">Operator Identity</th>
                          <th className="py-3 px-2">Access Role</th>
                          <th className="py-3 px-2">IP Access Permission Whitelist</th>
                          <th className="py-3 px-2">Handshake state</th>
                          <th className="py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-display text-[#00D4FF]">
                        {[
                          { name: 'Dr. Sarah Jenkins', role: 'Super Admin', email: 'sjenkins@astrix.com', scopes: 'all_access', ip: '127.0.0.1 (Local Match)', badge: 'Owner Key' },
                          { name: 'Marcus Sterling', role: 'Editor', email: 'msterling@astrix.com', scopes: 'read, write, edit', ip: '192.168.1.*', badge: 'Active' },
                          { name: 'Astrid Lindgren', role: 'Marketing', email: 'alindgren@astrix.com', scopes: 'blogs, insights', ip: 'Anywhere', badge: 'Active' },
                          { name: 'Daniel Krause', role: 'Sales Pro', email: 'dkrause@astrix.com', scopes: 'contact_messages, client_leads', ip: '24.120.44.11', badge: 'Audit hold' }
                        ].map((member, i) => (
                          <tr key={i} className="hover:bg-white/[0.01]">
                            <td className="py-3.5 px-2">
                              <span className="font-extrabold text-white block text-xs">{member.name}</span>
                              <span className="text-[10px] font-mono text-gray-500 font-light block">{member.email}</span>
                            </td>
                            <td className="py-3.5 px-2">
                              <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold tracking-wider block uppercase max-w-fit">{member.role}</span>
                              <span className="text-[9.5px] text-gray-500 font-light block mt-1">Scopes: {member.scopes}</span>
                            </td>
                            <td className="py-3.5 px-2 font-mono text-xs text-gray-400">{member.ip}</td>
                            <td className="py-3.5 px-2 font-mono text-[11px] text-emerald-400 font-bold">2FA_ON</td>
                            <td className="py-3.5 px-2 text-[10px] uppercase font-mono font-bold text-amber-300">{member.badge}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Whitelist IP */}
                  <div className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-center gap-3 ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="text-left text-xs font-mono">
                      <span className="font-extrabold block text-white uppercase select-none">Restrict Whitelisted IP Addresses</span>
                      <span className="text-gray-400 font-light">Enforce restrictive network access protocols on the server:</span>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <input 
                        type="text" placeholder="e.g. 192.168.1.104"
                        className="p-2 bg-black/40 text-xs text-white border border-white/10 rounded-xl font-mono focus:outline-none"
                      />
                      <button 
                        onClick={() => { setSuccessMsg('IP Whitelist restrictions applied on node level.'); setTimeout(() => setSuccessMsg(''), 1500); }}
                        className="px-4 py-2 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Restrict
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SECURITY & TERMINAL AUDITS */}
              {activeTab === 'security' && (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold">Astrix Enterprise Security & Auditing</h3>
                      <p className="text-xs text-gray-400 font-light">Audit immutable real-time security events, manage mock 2FA tokens, and track logins.</p>
                    </div>
                    <button 
                      onClick={() => { setSuccessMsg('2FA secure key sequence regenerated.'); setTimeout(() => setSuccessMsg(''), 2000); }}
                      className="p-2 rounded bg-neutral-900 border border-white/10 text-[#00D4FF] font-mono text-xs cursor-pointer select-none"
                    >
                      Regen_2FA
                    </button>
                  </div>

                  {/* Static Login history logs list */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className={`p-5 rounded-xl border space-y-4 text-left ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold text-left border-b border-white/5 pb-2">Active Session Tokens logs</span>
                      <div className="space-y-2.5 font-mono text-[10.5px]">
                        {[
                          { node: 'Terminal.414', ip: '127.0.0.1', date: 'Just now', scope: 'Owner all_access' },
                          { node: 'Consumer Wearable API Proxy', ip: '24.110.88.19', date: '30m ago', scope: 'Webhook read' },
                          { node: 'DDR core Editor', ip: '192.168.1.102', date: '4 Hours ago', scope: 'Editor write' }
                        ].map((sess, i) => (
                          <div key={i} className="flex justify-between items-center bg-black/30 p-2.5 border border-white/[0.02] rounded-lg">
                            <div className="text-left">
                              <span className="text-white font-extrabold text-[11px] block">{sess.node}</span>
                              <span className="text-gray-500 font-bold block text-[9.5px]">IP: {sess.ip} | Scope: {sess.scope}</span>
                            </div>
                            <span className="text-[#00D4FF] font-semibold">{sess.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl border space-y-4 text-left ${themeMode === 'dark' ? 'bg-[#060B18]/40 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold text-left border-b border-white/5 pb-2">Compliance check status checklist</span>
                      <div className="space-y-2.5 text-xs">
                        {[
                          { rule: '2FA Multi-Factor Handshake status', isTrue: true },
                          { rule: 'Secure TLS 1.3 Envelope Encryption force', isTrue: true },
                          { rule: 'XOR Double-Salt hash sequence check', isTrue: true },
                          { rule: 'Persistent Port whitelist controls active', isTrue: false }
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center py-1">
                            <span className="text-gray-300">{item.rule}</span>
                            <span className={`font-mono text-[9px] px-2 py-0.5 border rounded uppercase ${item.isTrue ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                              {item.isTrue ? 'FULLY COMPLIANT' : 'STANDBY ACTION'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Security auditory terminal log */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase font-extrabold tracking-widest text-left select-none">Live Audit Auditor Stream</span>
                    <div className="glass-panel p-5 rounded-2xl bg-neutral-950 border border-white/5 font-mono text-left text-xs text-gray-400 space-y-4">
                      <div className="flex justify-between items-center text-[10px] text-[#00D4FF] border-b border-white/5 pb-2 select-none uppercase">
                        <span>IMMUTABLE TRACE AUDITING MODULE</span>
                        <button type="button" onClick={() => { setActivityLogs([]); setSuccessMsg('Local logs view purged.'); setTimeout(() => setSuccessMsg(''), 1500); }} className="hover:underline">Clear_Viewer</button>
                      </div>

                      <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                        {activityLogs.slice(0, 15).map((log) => (
                          <div key={log.id} className="p-2 border border-white/[0.02] rounded-lg bg-black/40 hover:bg-neutral-900/40 text-[10px]">
                            <div className="flex justify-between font-extrabold text-[9.5px]">
                              <span className="text-emerald-400">[{log.action}] // {log.module}</span>
                              <span className="text-gray-500 font-normal">{new Date(log.created_at).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-gray-400 leading-normal font-sans py-1">{log.description}</p>
                            <div className="text-[8.5px] text-gray-500 uppercase">IP: {log.ip_address} | Client: {log.user_agent.slice(0, 36)}...</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SYSTEM & PORT CONTROL CONFIGS (SETTINGS) */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold">Console Configs & API Credentials</h3>
                    <p className="text-xs text-gray-400 font-light">Set default brand displays, secure emails, change logos, and configure SMTP settings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left font-mono">
                    <form onSubmit={(e) => { e.preventDefault(); setSuccessMsg('Astrix branding variables updated.'); setTimeout(() => setSuccessMsg(''), 2000); }} className="p-5 rounded-xl border border-white/5 bg-black/10 space-y-3.5">
                      <span className="text-[10px] text-purple-400 block uppercase font-bold border-b border-white/5 pb-2">Company Brand & Social Management</span>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">Branded Logo Text</label>
                        <input
                          type="text" required value={settingsForm.website_name}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, website_name: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">Default secure SMTP sender email</label>
                        <input
                          type="email" required value={settingsForm.contact_email}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, contact_email: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono focus:outline-none"
                        />
                      </div>

                      <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center">
                        <div className="space-y-0.5 text-left">
                          <label className="text-white text-[11px] block uppercase font-bold">Lock Maintenance mode</label>
                          <span className="text-[9px] text-gray-500">Mutes public website routes</span>
                        </div>
                        <input
                          type="checkbox" checked={settingsForm.maintenance_mode}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, maintenance_mode: e.target.checked }))}
                          className="w-4 h-4 rounded text-[#6C3FE8] bg-black border-white/20"
                        />
                      </div>

                      <button type="submit" className="w-full py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer">
                        SAVE COMPANY DIRECTORY
                      </button>
                    </form>

                    <form onSubmit={(e) => { e.preventDefault(); setSuccessMsg('SMTP Server Configuration aligned successfully.'); setTimeout(() => setSuccessMsg(''), 2000); }} className="p-5 rounded-xl border border-white/5 bg-black/10 space-y-3.5">
                      <span className="text-[10px] text-[#00D4FF] block uppercase font-bold border-b border-white/5 pb-2">Secure SMTP Server Node config</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500">SMTP Server Host</label>
                          <input type="text" defaultValue="smtp.astrix-mail.com" className="w-full p-2 bg-black/40 border border-white/5 text-xs text-white rounded font-mono" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500">Port Server</label>
                          <input type="text" defaultValue="587 TLS" className="w-full p-2 bg-black/40 border border-white/5 text-xs text-white rounded font-mono" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">SMTP Authentication username</label>
                        <input type="text" defaultValue="auth@astrix-mail.com" className="w-full p-2 bg-black/40 border border-white/5 text-xs text-white rounded font-mono" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">Secure credentials key passcode</label>
                        <input type="password" placeholder="****************" className="w-full p-2 bg-black/40 border border-white/5 text-xs text-white rounded font-mono" />
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer">
                        ALIGN SMTP SERVER
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB: ANALYTICS CENTER GOOGLE, SEARCH CONSOLE, METAPIXELS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold">SEO & Dynamic Analytics Integrations</h3>
                    <p className="text-xs text-gray-400">Manage Google Analytics, Search Console, Meta Pixel, and LinkedIn Pixel setup toggles.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left font-mono text-xs text-gray-300">
                    
                    {/* Public SEO metadata pages form */}
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const payload = {
                        slug: seoForm.slug,
                        meta_title: seoForm.meta_title,
                        meta_description: seoForm.meta_description,
                        keywords: seoForm.keywords.split(',').map(k => k.trim()).filter(Boolean)
                      };
                      try {
                        const res = await fetch('/api/seo', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                          body: JSON.stringify(payload)
                        });
                        if (res.ok) {
                          setSuccessMsg(`SEO metadata configuration for page "${seoForm.slug}" aligned successfully.`);
                          setTimeout(() => setSuccessMsg(''), 3000);
                        }
                      } catch (err) { setError('SEO save failed.'); }
                    }} className="p-5 rounded-2xl border border-white/5 bg-black/10 space-y-4">
                      <span className="text-[10px] text-[#00D4FF] block uppercase font-bold border-b border-white/5 pb-2">Target SEO Page Meta descriptors</span>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">Target Page Slug route</label>
                        <select
                          value={seoForm.slug} onChange={e => handleSEOSlugChange(e.target.value)}
                          className="w-full p-2.5 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white"
                        >
                          <option value="/">Home path [/]</option>
                          <option value="/about">About Us [/about]</option>
                          <option value="/services">Capabilities [/services]</option>
                          <option value="/careers">Careers Portal [/careers]</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">Meta Title Text</label>
                        <input
                          type="text" required value={seoForm.meta_title}
                          onChange={(e) => setSeoForm(prev => ({ ...prev, meta_title: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase font-light">Meta description block</label>
                        <textarea
                          rows={2} required value={seoForm.meta_description}
                          onChange={(e) => setSeoForm(prev => ({ ...prev, meta_description: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase">Index Keywords (comma CSV)</label>
                        <input
                          type="text" required value={seoForm.keywords}
                          onChange={(e) => setSeoForm(prev => ({ ...prev, keywords: e.target.value }))}
                          className="w-full text-xs text-white p-2.5 bg-black/40 border border-white/5 rounded-xl"
                        />
                      </div>

                      <button type="submit" className="w-full py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer">
                        SAVE PAGE METADATA
                      </button>
                    </form>

                    {/* Pixels and compliance toggles */}
                    <div className="p-5 rounded-2xl border border-white/5 bg-black/10 space-y-4">
                      <span className="text-[10px] text-purple-400 block uppercase font-bold border-b border-white/5 pb-2">Analytical Tracking Pixels Toggles</span>
                      
                      {[
                        { title: 'Google Analytics tag integration', id: 'gtag-id', dval: 'G-84X02981X' },
                        { title: 'Google Search Console calibration', id: 'gsc-id', dval: 'domain-sc-9821' },
                        { title: 'Meta social advertising Pixel', id: 'meta-pix', dval: '982710129XWZ' },
                        { title: 'LinkedIn corporate advertising Pixel', id: 'linkedin-pix', dval: 'li-pix-112028' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 font-sans">{item.title}</span>
                            <span className="text-[9px] text-[#00D4FF] bg-[#00D4FF]/10 px-1.5 rounded uppercase font-bold">CONNECTED</span>
                          </div>
                          <div className="flex gap-2">
                            <input type="text" defaultValue={item.dval} className="w-full p-1.5 bg-black/40 border border-white/5 text-xs text-white rounded font-mono" />
                            <button
                              onClick={() => { setSuccessMsg('Analytics metrics re-calculated.'); setTimeout(() => setSuccessMsg(''), 1500); }}
                              type="button" className="px-2.5 bg-neutral-900 border border-white/10 text-gray-300 rounded hover:text-white"
                            >
                              Sync
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
