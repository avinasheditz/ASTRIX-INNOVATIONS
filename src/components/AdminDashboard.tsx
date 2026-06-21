import { useState, useEffect, FormEvent } from 'react';
import { 
  X, Lock, User, FileText, Database, Layers, MessageSquare, 
  Trash2, Edit, Plus, CheckCircle, AlertCircle, LogOut, ChevronRight,
  Briefcase, Settings, Shield, Terminal, RefreshCw, BarChart3, Mail, Eye, Sliders
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
  
  // Expanded tab directory
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'projects' | 'blogs' | 'messages' | 'careers' | 'audit_logs' | 'settings'>('dashboard');

  // Database resource collections
  const [stats, setStats] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [projects, setProjects] = useState<Innovation[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [sysSettings, setSysSettings] = useState<any>({});
  const [seoConfig, setSeoConfig] = useState<any>({});

  // Dynamic loading indicator
  const [loading, setLoading] = useState(false);

  // Forms states
  const [editingProject, setEditingProject] = useState<Partial<Innovation> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingService, setEditingService] = useState<any | null>(null);

  // --- Creative Form Inputs ---
  const [serviceForm, setServiceForm] = useState({
    title: '',
    short_description: '',
    full_description: '',
    category: 'AI Systems',
    icon: 'Cpu',
    sort_order: '1'
  });

  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    industry: 'Technology' as Innovation['industry'],
    technologiesUsed: '',
    imageUrl: '',
    longDescription: '',
    keyFeatures: '',
    specLabels: ['Form Factor', 'Sensor Latency', 'Throughput'],
    specValues: ['', '', '']
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Technology' as BlogPost['category'],
    excerpt: '',
    author: 'Administrator',
    content: ''
  });

  const [careerForm, setCareerForm] = useState({
    title: '',
    department: 'Hardware controls',
    location: 'Munich, Germany',
    job_type: 'full_time',
    description: '',
    requirements: ''
  });

  const [seoForm, setSeoForm] = useState({
    slug: '/',
    meta_title: '',
    meta_description: '',
    keywords: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    website_name: 'Astrix Innovations',
    contact_email: 'operations@astrix.com',
    maintenance_mode: false
  });

  // Check stored credentials on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('astrix_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchAdminData(savedToken);
    }
  }, []);

  // Sync resource states on tab change
  useEffect(() => {
    if (isAuthenticated && token) {
      if (activeTab === 'dashboard') {
        fetchStats();
      } else if (activeTab === 'services') {
        fetchServices();
      } else if (activeTab === 'audit_logs') {
        fetchActivityLogs();
      } else if (activeTab === 'careers') {
        fetchCareersAndApplications();
      } else if (activeTab === 'settings') {
        fetchSettingsAndSEO();
      }
    }
  }, [activeTab, isAuthenticated, token]);

  // Fetch stats count parameters
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch active system services
  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
      const indRes = await fetch('/api/industries');
      if (indRes.ok) {
        const data = await indRes.json();
        setIndustries(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch security activity records
  const fetchActivityLogs = async () => {
    try {
      const res = await fetch('/api/admin/activity-logs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActivityLogs(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch available postings and received applications
  const fetchCareersAndApplications = async () => {
    try {
      const resJobs = await fetch('/api/careers');
      if (resJobs.ok) {
        const data = await resJobs.json();
        setCareers(data);
      }
      const resApps = await fetch('/api/admin/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resApps.ok) {
        const data = await resApps.json();
        setApplications(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch SEO pages and Settings variables
  const fetchSettingsAndSEO = async () => {
    try {
      const resSet = await fetch('/api/settings');
      if (resSet.ok) {
        const data = await resSet.json();
        setSysSettings(data);
        setSettingsForm({
          website_name: data.website_name || 'Astrix Innovations',
          contact_email: data.contact_email || 'operations@astrix.com',
          maintenance_mode: !!data.maintenance_mode
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
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger loading details of SEO form on dropdown select change
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
    } catch (err) {
      console.error(err);
    }
  };

  // Core background loading coordinator 
  const fetchAdminData = async (authToken: string) => {
    setLoading(true);
    const headers = { 'Authorization': `Bearer ${authToken}` };
    try {
      // Inbound Messages
      const msgsRes = await fetch('/api/admin/messages', { headers });
      if (msgsRes.ok) {
        const msgs = await msgsRes.json();
        setMessages(msgs);
      }

      // Projects
      const projsRes = await fetch('/api/projects');
      if (projsRes.ok) {
        const projs = await projsRes.json();
        setProjects(projs);
      }

      // Blogs
      const blogsRes = await fetch('/api/blogs');
      if (blogsRes.ok) {
        const bls = await blogsRes.json();
        setBlogs(bls);
      }

      await fetchStats();
    } catch (err) {
      console.error('Core administrative synchronization failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
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
        setSuccessMsg('Authentication Approved. Controls fully decrypted.');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Identity confirmation negative: passcode sequence illegal.');
      }
    } catch (err) {
      setError('System lookup failure. Core nodes offline.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem('astrix_admin_token');
    setToken('');
    setIsAuthenticated(false);
    onClose();
  };

  const notifyDataChanged = () => {
    window.dispatchEvent(new CustomEvent('astrix-data-updated'));
  };

  // ---------- SERVICES CONTROLLERS ----------
  const handleServiceSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const payload = {
      title: serviceForm.title,
      short_description: serviceForm.short_description,
      full_description: serviceForm.full_description,
      category: serviceForm.category,
      icon: serviceForm.icon,
      sort_order: parseInt(serviceForm.sort_order) || 1
    };

    const isEdit = !!editingService;
    const url = isEdit ? `/api/services/${editingService.id}` : '/api/services';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg(isEdit ? 'Service metrics scaled successfully.' : 'New technological capability launched.');
        setServiceForm({ title: '', short_description: '', full_description: '', category: 'AI Systems', icon: 'Cpu', sort_order: '1' });
        setEditingService(null);
        fetchServices();
        fetchStats();
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await res.json();
        setError(err.error || 'Failure to dispatch parameters.');
      }
    } catch (err) {
      setError('Internal server route missing.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Archive this critical service competency?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSuccessMsg('Service catalog successfully removed index.');
        fetchServices();
        fetchStats();
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setError('Server pipeline reject.');
    }
  };

  // ---------- INDUSTRY CREATORS ----------
  const [indForm, setIndForm] = useState({ name: '', description: '', icon: 'Flame' });
  const handleIndustrySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/industries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(indForm)
      });
      if (res.ok) {
        setSuccessMsg('New sector boundary added to network grids.');
        setIndForm({ name: '', description: '', icon: 'Flame' });
        fetchServices();
        fetchStats();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await res.json();
        setError(err.error || 'Pipeline error.');
      }
    } catch (err) {
      setError('Engineering core link failure.');
    }
  };

  // ---------- PROJECT OPERATIONS ----------
  const resetProjectForm = () => {
    setProjForm({
      title: '',
      description: '',
      industry: 'Technology',
      technologiesUsed: '',
      imageUrl: '',
      longDescription: '',
      keyFeatures: '',
      specLabels: ['Form Factor', 'Sensor Latency', 'Throughput'],
      specValues: ['', '', '']
    });
    setEditingProject(null);
  };

  const startEditProject = (p: Innovation) => {
    setEditingProject(p);
    setProjForm({
      title: p.title,
      description: p.description,
      industry: p.industry,
      technologiesUsed: p.technologiesUsed.join(', '),
      imageUrl: p.imageUrl,
      longDescription: p.longDescription,
      keyFeatures: p.keyFeatures.join('\n'),
      specLabels: p.specs?.map(s => s.label) || ['', '', ''],
      specValues: p.specs?.map(s => s.value) || ['', '', '']
    });
  };

  const handleProjectSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    const preparedSpecs = projForm.specLabels
      .map((l, idx) => ({ label: l, value: projForm.specValues[idx] }))
      .filter(s => s.label && s.value);

    const payload = {
      title: projForm.title,
      description: projForm.description,
      industry: projForm.industry,
      technologiesUsed: projForm.technologiesUsed.split(',').map(t => t.trim()).filter(Boolean),
      imageUrl: projForm.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      longDescription: projForm.longDescription,
      keyFeatures: projForm.keyFeatures.split('\n').map(f => f.trim()).filter(Boolean),
      specs: preparedSpecs
    };

    const isEdit = !!editingProject;
    const url = isEdit ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccessMsg(isEdit ? 'Project specifications updated.' : 'New corporate project deployed successfully.');
        resetProjectForm();
        fetchAdminData(token);
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await response.json();
        setError(err.error || 'Failed to submit project parameters.');
      }
    } catch (err) {
      setError('Failed to dispatch server update request.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you absolutely sure you want to decommission this project record?')) return;
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccessMsg('Project record expunged from primary grids.');
        fetchAdminData(token);
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setError('Failed to execute project deletion.');
    }
  };

  // ---------- BLOG OPERATIONS ----------
  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      category: 'Technology',
      excerpt: '',
      author: 'Administrator',
      content: ''
    });
    setEditingBlog(null);
  };

  const startEditBlog = (b: BlogPost) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      category: b.category,
      excerpt: b.excerpt,
      author: b.author,
      content: b.content
    });
  };

  const handleBlogSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      title: blogForm.title,
      category: blogForm.category,
      excerpt: blogForm.excerpt,
      author: blogForm.author,
      content: blogForm.content
    };

    const isEdit = !!editingBlog;
    const url = isEdit ? `/api/admin/blogs/${editingBlog.id}` : '/api/admin/blogs';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccessMsg(isEdit ? 'Blog entry parameters updated.' : 'New article cataloged in Astrix Insights.');
        resetBlogForm();
        fetchAdminData(token);
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await response.json();
        setError(err.error || 'Failed to save blog parameters.');
      }
    } catch (err) {
      setError('Communication loss with database engine during save.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this blog post?')) return;
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccessMsg('Blog post expunged.');
        fetchAdminData(token);
        notifyDataChanged();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setError('Failed to purge blog.');
    }
  };

  // ---------- CAREERS CONTROLLERS ----------
  const handleCareerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const payload = {
      title: careerForm.title,
      department: careerForm.department,
      location: careerForm.location,
      job_type: careerForm.job_type,
      description: careerForm.description,
      requirements: careerForm.requirements.split('\n').map(r => r.trim()).filter(Boolean)
    };

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg('Career posting published successfully.');
        setCareerForm({ title: '', department: 'Hardware controls', location: 'Munich, Germany', job_type: 'full_time', description: '', requirements: '' });
        fetchCareersAndApplications();
        fetchStats();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await res.json();
        setError(err.error || 'Unable to publish vacancy.');
      }
    } catch (err) {
       setError('Careers server post failed.');
    }
  };

  // ---------- WEBSITE SETTINGS AND SEO SUBMITS ----------
  const handleSettingsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        setSuccessMsg('Global system settings updated on control gateways.');
        fetchSettingsAndSEO();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await res.json();
        setError(err.error || 'Unable to update variables.');
      }
    } catch (err) {
      setError('Settings write error.');
    }
  };

  const handleSEOSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const payload = {
      slug: seoForm.slug,
      meta_title: seoForm.meta_title,
      meta_description: seoForm.meta_description,
      keywords: seoForm.keywords.split(',').map(k => k.trim()).filter(Boolean)
    };

    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg(`Meta details for page "${seoForm.slug}" recalculated.`);
        fetchSettingsAndSEO();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const err = await res.json();
        setError(err.error || 'SEO write reject.');
      }
    } catch (err) {
      setError('SEO engine timeout.');
    }
  };

  const [contactSearch, setContactSearch] = useState('');
  const [logSearch, setLogSearch] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[92vh] bg-neutral-950 text-left">
        
        {/* Header Block with System ID */}
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C3FE8] to-[#00D4FF] flex items-center justify-center relative shrink-0">
              <Database className="w-4.5 h-4.5 text-white" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <h2 className="font-orbitron font-extrabold text-white text-sm sm:text-base tracking-widest uppercase">ASTRIX OPERATIONS COMMAND</h2>
              <p className="text-[9px] font-mono tracking-widest text-[#00D4FF] uppercase flex items-center gap-1.5">
                <span>Core Node: secure_intel_tunnel_v414</span>
                <span className="text-gray-500">||</span>
                <span>Active Operator: {isAuthenticated ? 'superadmin@astrix.com' : 'anonymous'}</span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Notifications Panel */}
        {error && (
          <div className="p-3 bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2 px-6">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2 px-6">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Barrier Screen */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto p-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#6C3FE8]/10 to-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center relative">
              <Lock className="w-6 h-6 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 bg-[#00D4FF]/5 rounded-2xl filter blur-md" />
            </div>

            <div className="text-center">
              <h3 className="font-orbitron font-extrabold text-white text-base tracking-widest">GATEWAY IDENTITY VERIFICATION</h3>
              <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed font-light font-display">Provide secure administrative email credentials to decode local database schemas.</p>
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-gray-400 tracking-wider uppercase">Administrative Email</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter 'admin@astrix.com'"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/60 text-xs sm:text-sm text-white placeholder-gray-600 pl-10 pr-4 py-3 rounded-xl border border-white/5 focus:border-[#00D4FF]/30 focus:outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-gray-400 tracking-wider uppercase">Secure Encryption Passphrase</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    placeholder="Enter 'password123'"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/60 text-xs sm:text-sm text-white placeholder-gray-600 pl-10 pr-4 py-3 rounded-xl border border-white/5 focus:border-[#00D4FF]/30 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C3FE8] to-[#00D4FF] text-white font-orbitron font-extrabold text-xs tracking-widest uppercase hover:brightness-110 active:scale-98 cursor-pointer transition-all shadow-lg shadow-[#6C3FE8]/25"
            >
              INITIALIZE COMMAND PROMPT
            </button>
          </form>
        ) : (
          /* Main Command Center Deck */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Command Tabs (Responsive flow) */}
            <div className="w-full md:w-64 border-r border-white/5 bg-black/35 flex flex-col justify-between p-4 overflow-y-auto space-y-6 shrink-0">
              <div className="space-y-5">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 tracking-widest block uppercase font-bold mb-2 px-2.5">
                    OVERVIEW DECK
                  </span>
                  
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                      activeTab === 'dashboard'
                        ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-orbitron">Dashboard Stats</span>
                    </div>
                    {stats && (
                      <span className="bg-cyan-500/10 text-cyan-300 text-[8.5px] px-2 py-0.5 rounded border border-cyan-500/20 font-mono">
                        LIVE
                      </span>
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-500 tracking-widest block uppercase font-bold mb-2 px-2.5">
                    CORE ASSETS
                  </span>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('services')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'services'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4" />
                        <span className="font-display font-medium">Manage Services</span>
                      </div>
                      <span className="bg-white/5 text-[9px] px-1.5 py-0.5 rounded text-gray-400 font-mono">
                        {services.length || 3}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'projects'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span className="font-display font-medium">Manage Projects</span>
                      </div>
                      <span className="bg-white/5 text-[9px] px-1.5 py-0.5 rounded text-gray-400 font-mono">{projects.length}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('blogs')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'blogs'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-display font-medium">Manage Blogs</span>
                      </div>
                      <span className="bg-white/5 text-[9px] px-1.5 py-0.5 rounded text-gray-400 font-mono">{blogs.length}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-500 tracking-widest block uppercase font-bold mb-2 px-2.5">
                    HUMAN CAPITAL & LEADS
                  </span>

                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('messages')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'messages'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-display font-medium">Inbound Leads</span>
                      </div>
                      <span className="bg-white/5 text-[9px] px-1.5 py-0.5 rounded text-gray-400 font-mono">{messages.length}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('careers')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'careers'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-display font-medium">Careers Control</span>
                      </div>
                      <span className="bg-white/5 text-[9px] px-1.5 py-0.5 rounded text-gray-400 font-mono">
                        {careers.length || 2}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-500 tracking-widest block uppercase font-bold mb-2 px-2.5">
                    METRIC CONTROL
                  </span>

                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'settings'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span className="font-display font-medium">Core Settings & SEO</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('audit_logs')}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs tracking-wide transition-all cursor-pointer ${
                        activeTab === 'audit_logs'
                          ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span className="font-display font-medium">Security Audits</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 font-mono text-[8px] text-gray-500 space-y-1">
                  <div className="flex justify-between text-cyan-400">
                    <span>SECURITY STAGE:</span>
                    <span className="font-bold">ACTIVE</span>
                  </div>
                  <div>CIP CODE: TLS_1_3_XOR</div>
                  <div>MDM DB STATUS: CONNECTED</div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-xs text-red-400 transition-all font-mono tracking-widest font-bold cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>DECOMMISSION CONNECTION</span>
                </button>
              </div>
            </div>

            {/* Core Operational Deck view panels */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* TAB 1: INTERACTIVE DASHBOARD SYSTEM STAR */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Title */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-orbitron text-lg font-bold text-white tracking-widest uppercase">System Telemetrics Deck</h3>
                      <p className="text-xs text-gray-400">Continuous relational lookup metrics linking all Astrix website configurations.</p>
                    </div>
                    <button 
                      onClick={() => fetchAdminData(token)}
                      className="p-2 rounded-lg border border-white/5 hover:bg-white/5 text-gray-400 hover:text-[#00D4FF] cursor-pointer transition-all flex items-center gap-1.5 text-[10px] font-mono"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>POLL CORE CONTROLLERS</span>
                    </button>
                  </div>

                  {/* Real stats grids */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Active Services', val: stats?.counts?.services || 3, icon: Sliders, col: 'text-cyan-400 border-cyan-500/10' },
                      { label: 'Decommissioned Projects', val: stats?.counts?.projects || projects.length, icon: Layers, col: 'text-purple-400 border-purple-500/10' },
                      { label: 'Insights & Research', val: stats?.counts?.blogs || blogs.length, icon: FileText, col: 'text-blue-400 border-blue-500/10' },
                      { label: 'Inbound Leads', val: stats?.counts?.messages || messages.length, icon: MessageSquare, col: 'text-emerald-400 border-emerald-500/10' },
                    ].map((card, idx) => (
                      <div key={idx} className="glass-panel p-5 rounded-2xl border-white/5 bg-black/40 relative overflow-hidden flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                          <card.icon className={`w-5 h-5 ${card.col.split(' ')[0]}`} />
                        </div>
                        <div className="space-y-0.5 text-left">
                          <h4 className="font-orbitron font-extrabold text-2xl text-white">{card.val}</h4>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-medium block">
                            {card.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section 2: Extended table metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Database Health Card */}
                    <div className="md:col-span-8 glass-panel p-6 rounded-2xl border-white/5 bg-black/40 text-left space-y-4">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#00D4FF] tracking-widest font-bold">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span>RELATIONAL TABLE METRICS ENGINE</span>
                      </div>
                      
                      <div className="space-y-3 font-mono text-xs text-gray-400">
                        <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                          <span className="font-bold text-white uppercase">User Accounts Table (role-based)</span>
                          <span className="text-gray-500 font-semibold">{stats?.counts?.users || 2} nodes indexed</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                          <span className="font-bold text-white uppercase">Careers Core (job postings)</span>
                          <span className="text-gray-500 font-semibold">{stats?.counts?.careers || careers.length} live openings</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                          <span className="font-bold text-white uppercase">Job Applications (candidate records)</span>
                          <span className="text-gray-500 font-semibold">{stats?.counts?.applications || applications.length} candidates filed</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                          <span className="font-bold text-white uppercase">Newsletter subscribers table</span>
                          <span className="text-gray-500 font-semibold">{stats?.counts?.newsletter || 1} active tunnels</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-bold text-[#00D4FF] uppercase">Audit activity logger capacity</span>
                          <span className="text-cyan-400 font-bold">{stats?.counts?.auditLogs || activityLogs.length} total events audited</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Node Health indicators */}
                    <div className="md:col-span-4 glass-panel p-6 rounded-2xl border-white/5 bg-black/40 text-left flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-gray-500 tracking-widest block uppercase font-bold">
                          INFRASTRUCTURE HEALTH
                        </span>
                        <h4 className="font-orbitron font-extrabold text-white text-base">Node Connection Synced</h4>
                      </div>

                      <div className="space-y-2.5 pt-4 font-mono text-[10px] text-gray-400">
                        <div className="flex justify-between">
                          <span>Edge CPU Weight:</span>
                          <span className="text-emerald-400 font-bold">{stats?.system_load?.cpu || '24.2%'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DDR memory:</span>
                          <span className="text-emerald-400 font-bold">{stats?.system_load?.memory || '1.2 GB'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Secure Handshake Sync:</span>
                          <span className="text-emerald-400 font-bold">{stats?.system_load?.ping || '8ms'}</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-center font-mono text-[9px] font-bold uppercase tracking-wider">
                        SECURE_KERNEL_OK // STANDBY
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MANAGE SERVICES AND INDUSTRIES */}
              {activeTab === 'services' && (
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="font-orbitron text-base font-bold text-white tracking-widest">Dynamic Technological Services</h3>
                    <p className="text-xs text-gray-400 mt-1">Configure and recalibrate core capabilities showcased across the platform.</p>
                  </div>

                  {/* Add Service form */}
                  <form onSubmit={handleServiceSubmit} className="glass-panel p-5 rounded-2xl border-white/5 space-y-4 bg-white/[0.01]">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase border-b border-white/5 pb-2">
                      {editingService ? `RECONFIGURING CAPABILITY: ${editingService.title}` : 'DEPLOY NEW ASTRIX SERVICE NODE'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Service Title</label>
                        <input
                          type="text"
                          required
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Core Category Folder</label>
                        <input
                          type="text"
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-400">Abstract Brief Description</label>
                      <input
                        type="text"
                        required
                        value={serviceForm.short_description}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, short_description: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-400">Detailed Full Description</label>
                      <textarea
                        rows={3}
                        value={serviceForm.full_description}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, full_description: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Lucide Vector Icon Name</label>
                        <input
                          type="text"
                          value={serviceForm.icon}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, icon: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Sort Ordering weight</label>
                        <input
                          type="number"
                          value={serviceForm.sort_order}
                          onChange={(e) => setServiceForm(prev => ({ ...prev, sort_order: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                      <div className="md:col-span-1 pt-5 flex items-center">
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-orbitron font-semibold text-[10px] tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                        >
                          {editingService ? 'COMMIT SERVICE DATA' : 'PUBLISH CAPABILITY'}
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* List of active services */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-purple-400 tracking-wider block font-bold uppercase text-left">
                      DEPLOYED DIGITAL SERVICES INDEX
                    </span>

                    <div className="rounded-2xl border border-white/5 overflow-hidden text-xs bg-black/40 font-display">
                      {services.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3.5 border-b border-white/5 hover:bg-white/[0.01]">
                          <div className="text-left font-display">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{item.title}</span>
                              <span className="bg-purple-500/15 text-purple-300 text-[8px] font-mono px-2 py-0.2 rounded border border-purple-500/20">{item.category}</span>
                            </div>
                            <span className="text-gray-400 text-[10.5px] font-light mt-1 block max-w-lg truncate">{item.short_description}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingService(item);
                                setServiceForm({
                                  title: item.title,
                                  short_description: item.short_description,
                                  full_description: item.full_description || '',
                                  category: item.category || 'AI Systems',
                                  icon: item.icon || 'Cpu',
                                  sort_order: String(item.sort_order || 1)
                                });
                              }}
                              className="p-1.5 rounded-lg border border-cyan-500/10 hover:border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(item.id)}
                              className="p-1.5 rounded-lg border border-red-500/10 hover:border-red-500/40 text-red-500 hover:bg-red-500/10 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sectors / Industries management wrapper */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    
                    {/* Add Industry */}
                    <form onSubmit={handleIndustrySubmit} className="glass-panel p-5 rounded-2xl border-white/5 space-y-4 bg-white/[0.01]">
                      <span className="text-[10px] font-mono text-cyan-400 tracking-wider block font-bold uppercase text-left">
                        INDEX NEW INDUSTRY CONTEXT
                      </span>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-500">Sector Name</label>
                        <input
                          type="text"
                          required
                          value={indForm.name}
                          onChange={(e) => setIndForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-500 font-light">Short Sector Description</label>
                        <input
                          type="text"
                          required
                          value={indForm.description}
                          onChange={(e) => setIndForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 rounded-xl"
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-2.5 w-full bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-300 font-orbitron font-semibold text-[9.5px] uppercase hover:bg-cyan-500/20 active:scale-95 transition-all text-center cursor-pointer"
                      >
                        PUBLISH INDUSTRIAL METRIC CODESET
                      </button>
                    </form>

                    {/* Sectors layout logs list */}
                    <div className="glass-panel p-5 rounded-2xl border-white/5 bg-black/40 space-y-3.5 text-left">
                      <span className="text-[10px] font-mono text-gray-500 tracking-widest block uppercase font-bold">
                        ACTIVE INDUSTRIES LEDGER
                      </span>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {industries.map((ind) => (
                          <div key={ind.id} className="p-2 border border-white/[0.03] rounded-lg flex items-center justify-between text-[11px]">
                            <span className="font-bold text-white">{ind.name}</span>
                            <span className="text-gray-500 font-mono text-[9px] uppercase font-semibold">Active Sector</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 3: DYNAMIC INNOVATION PORTFOLIOS AND PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <h3 className="font-orbitron text-base font-bold text-white tracking-widest">Dynamic Innovation Portfolios</h3>
                      <p className="text-xs text-gray-400 mt-1">Manage physical hardware prototypes cataloged globally.</p>
                    </div>
                    {editingProject && (
                      <button 
                        onClick={resetProjectForm}
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono hover:text-white cursor-pointer"
                      >
                        ABORT EDIT
                      </button>
                    )}
                  </div>

                  {/* Submit/Edit project form */}
                  <form onSubmit={handleProjectSubmit} className="glass-panel p-5 rounded-2xl border-white/5 space-y-4 bg-white/[0.01]">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2 text-left">
                      {editingProject ? `Editing Product Specs: ${editingProject.title}` : 'Deploy New Dynamic Project'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Project Title</label>
                        <input
                          type="text"
                          required
                          value={projForm.title}
                          onChange={(e) => setProjForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Structural Industry Sector</label>
                        <select
                          value={projForm.industry}
                          onChange={(e) => setProjForm(prev => ({ ...prev, industry: e.target.value as Innovation['industry'] }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-[#ffffff0a] focus:outline-none"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Engineering">Engineering & Manufacturing</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-400 font-light">Short Abstract / Tagline Summary</label>
                      <input
                        type="text"
                        required
                        value={projForm.description}
                        onChange={(e) => setProjForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Technologies Array (comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. React, Node.js, D3.js, ROS"
                          value={projForm.technologiesUsed}
                          onChange={(e) => setProjForm(prev => ({ ...prev, technologiesUsed: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Photo Catalog URL</label>
                        <input
                          type="text"
                          placeholder="Unsplash image URL or fallback"
                          value={projForm.imageUrl}
                          onChange={(e) => setProjForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-400 font-light">Deep Dive Long Specifications Narrative</label>
                      <textarea
                        rows={3}
                        required
                        value={projForm.longDescription}
                        onChange={(e) => setProjForm(prev => ({ ...prev, longDescription: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-400 font-light">Bullet Specs / Core Highlights (One per line)</label>
                      <textarea
                        rows={2}
                        placeholder="Key highlight 1&#10;Key highlight 2"
                        value={projForm.keyFeatures}
                        onChange={(e) => setProjForm(prev => ({ ...prev, keyFeatures: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 focus:outline-none"
                      />
                    </div>

                    {/* Specifications table editor */}
                    <div className="space-y-2 text-left">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">Hardware & Technical Parameters Table</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        {[0, 1, 2].map((idx) => (
                          <div key={idx} className="flex gap-2 bg-neutral-900/60 p-2 border border-white/5 rounded-xl">
                            <input
                              type="text"
                              placeholder={`Spec Metric`}
                              value={projForm.specLabels[idx] || ''}
                              onChange={(e) => {
                                const labels = [...projForm.specLabels];
                                labels[idx] = e.target.value;
                                setProjForm(prev => ({ ...prev, specLabels: labels }));
                              }}
                              className="w-1/2 p-2 bg-black/40 border border-white/5 rounded text-xs text-white placeholder-gray-600 focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder={`Spec Value`}
                              value={projForm.specValues[idx] || ''}
                              onChange={(e) => {
                                const vals = [...projForm.specValues];
                                vals[idx] = e.target.value;
                                setProjForm(prev => ({ ...prev, specValues: vals }));
                              }}
                              className="w-1/2 p-2 bg-black/40 border border-white/5 rounded text-xs text-white placeholder-gray-600 focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-3 bg-gradient-to-r from-[#6C3FE8] to-[#00D4FF] rounded-xl text-white font-orbitron font-extrabold text-[10px] tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{editingProject ? 'COMMIT PARAMETERS' : 'PUBLISH ON PRIMARY GRID'}</span>
                    </button>
                  </form>

                  {/* List of projects with CRUD edits */}
                  <div className="space-y-4">
                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider text-left">PROJECT LEDGER</h4>
                    <div className="rounded-2xl border border-white/5 overflow-hidden text-xs bg-black/40">
                      {projects.map((p) => (
                        <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.01] gap-4">
                          <div className="text-left font-display">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold">{p.title}</span>
                              <span className="bg-[#00D4FF]/10 text-cyan-400 text-[8.5px] font-mono border border-cyan-500/20 px-2 py-0.2 rounded uppercase">
                                {p.industry}
                              </span>
                            </div>
                            <p className="text-gray-400 text-[10.5px] mt-1 pr-6 truncate max-w-sm font-light">{p.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => startEditProject(p)}
                              className="p-1.5 rounded-lg border border-cyan-500/10 hover:border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 cursor-pointer"
                              title="Edit Project Specification"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-1.5 rounded-lg border border-red-500/10 hover:border-red-500/40 text-red-400 hover:bg-red-500/10 cursor-pointer"
                              title="Delete Project Records"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: BLOGS AND INSIGHT RESEARCH PAPERS */}
              {activeTab === 'blogs' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <h3 className="font-orbitron text-base font-bold text-white tracking-widest uppercase">System Logbooks & Research Publications</h3>
                      <p className="text-xs text-gray-400 mt-1">Catalog tech logs, patents, and investigative clinical white papers.</p>
                    </div>
                    {editingBlog && (
                      <button 
                        onClick={resetBlogForm}
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono hover:text-white cursor-pointer"
                      >
                        CLOSE EDIT
                      </button>
                    )}
                  </div>

                  {/* Blog Form */}
                  <form onSubmit={handleBlogSubmit} className="glass-panel p-5 rounded-2xl border-white/5 space-y-4 bg-white/[0.01]">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2 text-left">
                      {editingBlog ? `Editing Article Schema: ${editingBlog.title}` : 'Draft New Logbook Post'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Post Title / Heading</label>
                        <input
                          type="text"
                          required
                          value={blogForm.title}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Science / Sector Category</label>
                        <select
                          value={blogForm.category}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value as BlogPost['category'] }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 focus:outline-none"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Engineering">Engineering & Robotics</option>
                          <option value="Innovation">Innovation & Compounding</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Primary Scientist Author Name</label>
                        <input
                          type="text"
                          required
                          value={blogForm.author}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400 font-light font-sans">Short Excerpt Abstract</label>
                        <input
                          type="text"
                          required
                          placeholder="A quick summary showing on visual grid..."
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-400">Content narrative Body</label>
                      <textarea
                        rows={6}
                        required
                        value={blogForm.content}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-3 bg-gradient-to-r from-[#6C3FE8] to-[#00D4FF] rounded-xl text-white font-orbitron font-extrabold text-[10px] tracking-wider uppercase hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{editingBlog ? 'COMMIT ARTICLE' : 'DEPLOY INSIGHT ARTICLE'}</span>
                    </button>
                  </form>

                  {/* List of blogs with CRUD edits */}
                  <div className="space-y-4">
                    <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider block text-left">LOGBOOK PUBLICATIONS LEDGER</span>
                    <div className="rounded-2xl border border-white/5 overflow-hidden text-xs bg-black/40">
                      {blogs.map((b) => (
                        <div key={b.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.01] gap-4">
                          <div className="text-left font-display">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold">{b.title}</span>
                              <span className="bg-[#6C3FE8]/10 text-indigo-400 text-[8.5px] font-mono border border-violet-500/20 px-2 py-0.2 rounded uppercase">
                                {b.category}
                              </span>
                            </div>
                            <div className="text-[9.5px] text-gray-500 mt-1 font-mono">Author: {b.author || 'Super Admin'} | {b.date}</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => startEditBlog(b)}
                              className="p-1.5 rounded-lg border border-cyan-500/10 hover:border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="p-1.5 rounded-lg border border-red-500/10 hover:border-red-500/40 text-red-400 hover:bg-red-500/10 cursor-pointer"
                              title="Purge Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: INBOUND CONTACT AND NEWSLETTER LEADS INBOXES */}
              {activeTab === 'messages' && (
                <div className="space-y-8">
                  {/* Title and stats search */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
                    <div>
                      <h3 className="font-orbitron text-base font-bold text-white tracking-widest uppercase">Inbound Consultations Deck</h3>
                      <p className="text-xs text-gray-400">Incoming partner scopes compiled from active contact points.</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Search leads..."
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                        className="px-3.5 py-2 bg-black/40 text-xs text-white border border-white/5 rounded-xl font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Leads Inbox render list */}
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="py-12 text-center glass-panel rounded-2xl border-white/5 text-gray-500 font-mono text-xs">
                        NO INBOUND MESSAGES DETECTED ON NETWORKS.
                      </div>
                    ) : (
                      messages
                        .filter(m => !contactSearch || (m.name || '').toLowerCase().includes(contactSearch.toLowerCase()) || (m.email || '').toLowerCase().includes(contactSearch.toLowerCase()))
                        .map((m) => (
                          <div key={m.id} className="glass-panel p-5 rounded-2xl border-white/5 bg-white/[0.01] hover:border-cyan-500/20 transition-all space-y-3">
                            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-white/5 pb-2.5">
                              <div className="text-left font-display">
                                <span className="font-bold text-white hover:text-cyan-400 transition-colors text-xs sm:text-sm block">{m.name}</span>
                                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10 inline-block mt-1">{m.email}</span>
                                {m.phone && (
                                  <span className="text-[9px] font-mono text-gray-400 ml-2">Phone: {m.phone}</span>
                                )}
                                {m.company && (
                                  <span className="text-[9px] font-mono text-purple-400 bg-purple-500/5 px-2 py-0.5 border border-purple-500/10 rounded ml-2 uppercase">
                                    {m.company}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-1.5 font-mono text-[9px]">
                                <span className="text-gray-500">{m.created_at ? new Date(m.created_at).toLocaleString() : new Date(m.timestamp).toLocaleString()}</span>
                                <select
                                  value={m.status || 'new'}
                                  onChange={async (e) => {
                                    try {
                                      const res = await fetch(`/api/contact/${m.id}`, {
                                        method: 'PUT',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ status: e.target.value })
                                      });
                                      if (res.ok) {
                                        setSuccessMsg(`Lead status changed.`);
                                        fetchAdminData(token);
                                        setTimeout(() => setSuccessMsg(''), 2000);
                                      }
                                    } catch (e) {
                                      // Ignore
                                    }
                                  }}
                                  className="bg-black text-[9px] text-[#00D4FF] border border-white/5 p-1 rounded focus:outline-none"
                                >
                                  <option value="new">NEW INQUIRY</option>
                                  <option value="read">READ</option>
                                  <option value="replied">REPLIED</option>
                                  <option value="closed">CLOSED</option>
                                </select>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-pre-wrap pl-2 border-l border-cyan-505 border-cyan-500/30 text-left">
                              {m.message}
                            </p>
                          </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: CAREERS & JOB VACANCIES MANAGER */}
              {activeTab === 'careers' && (
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="font-orbitron text-base font-bold text-white tracking-widest uppercase">Careers & Recruitments Coordination</h3>
                    <p className="text-xs text-gray-400 mt-1">Publish organizational roles and process received candidate files.</p>
                  </div>

                  {/* Post career job vacancy */}
                  <form onSubmit={handleCareerSubmit} className="glass-panel p-5 rounded-2xl border-white/5 space-y-4 bg-white/[0.01]">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase block text-left">
                      PUBLISH NEW GLOBAL VACANCY
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-500">Position Title</label>
                        <input
                          type="text"
                          required
                          value={careerForm.title}
                          onChange={(e) => setCareerForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-500">Department</label>
                        <input
                          type="text"
                          required
                          value={careerForm.department}
                          onChange={(e) => setCareerForm(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-500">Geographic Location</label>
                        <input
                          type="text"
                          required
                          value={careerForm.location}
                          onChange={(e) => setCareerForm(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-500">Contract parameters</label>
                        <select
                          value={careerForm.job_type}
                          onChange={(e) => setCareerForm(prev => ({ ...prev, job_type: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/10"
                        >
                          <option value="full_time">Full-Time position</option>
                          <option value="part_time">Part-Time position</option>
                          <option value="remote">Fully Remote contract</option>
                          <option value="internship">Ph.D. / Internship</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-500 font-light">Detailed Role Abstract</label>
                      <textarea
                        rows={2}
                        required
                        value={careerForm.description}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-gray-500 font-light">Detailed candidate requirements (one per line)</label>
                      <textarea
                        rows={2}
                        placeholder="PhD in related sensor science&#10;Prior calibration familiarity"
                        value={careerForm.requirements}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, requirements: e.target.value }))}
                        className="w-full bg-black/40 text-xs text-white p-2.5 rounded-xl border border-white/5"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl text-white font-orbitron font-extrabold text-[10px] tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>DEPLOY CAREER POSTING</span>
                    </button>
                  </form>

                  {/* Received Job Applications */}
                  <div className="space-y-4 pt-4 border-t border-white/5 text-left">
                    <span className="font-orbitron font-extrabold text-xs text-white uppercase tracking-wider block">
                      CANDIDATE APPLICATIONS LEDGER ({applications.length})
                    </span>

                    <div className="space-y-3">
                      {applications.length === 0 ? (
                        <div className="p-12 text-center border border-white/5 bg-black/40 rounded-2xl text-gray-500 text-xs font-mono">
                          NO APPLICANTS SUBMITTED YET ON PIPELINES.
                        </div>
                      ) : (
                        applications.map((app) => (
                          <div key={app.id} className="p-5 border border-white/5 bg-black/40 rounded-2xl space-y-3.5 hover:border-violet-500/20 transition-all">
                            <div className="flex justify-between items-start border-b border-white/5 pb-2">
                              <div>
                                <h5 className="font-bold text-white text-sm font-display">{app.name}</h5>
                                <span className="text-[9.5px] font-mono text-cyan-400">{app.email} | {app.phone}</span>
                              </div>
                              <span className="text-[9px] font-mono text-gray-500">Filing date: {new Date(app.created_at).toLocaleDateString()}</span>
                            </div>

                            <p className="text-[11.5px] text-gray-300 font-light font-display leading-relaxed whitespace-pre-wrap">
                              {app.message || 'No candidate statement cataloged.'}
                            </p>

                            <div className="flex gap-3 text-[9.5px] font-mono text-gray-400">
                              <span>Resume: <a href={app.resume_file} className="text-violet-400 underline hover:text-violet-300">{app.resume_file.split('/').slice(-1)[0]}</a></span>
                              {app.portfolio_url && (
                                <span>Portfolio: <a href={app.portfolio_url} target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">Link</a></span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: ADMINISTRATIVE SITE SETTINGS AND SEO PAGES */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="font-orbitron text-base font-bold text-white tracking-widest uppercase">System Metadata Console</h3>
                    <p className="text-xs text-gray-400 mt-1 font-light">Global platform metadata configurations and SEO descriptors.</p>
                  </div>

                  {/* 2 column row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Website basic config settings */}
                    <form onSubmit={handleSettingsSubmit} className="glass-panel p-5 rounded-2xl border-white/5 bg-black/45 space-y-4">
                      <span className="text-[10px] font-mono text-cyan-400 block font-bold uppercase text-left border-b border-white/5 pb-2">
                        GLOBAL PARAMETERS DIRECTORY
                      </span>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Website Brand Display Name</label>
                        <input
                          type="text"
                          required
                          value={settingsForm.website_name}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, website_name: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 rounded-xl font-mono"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Default Corporate Contact email</label>
                        <input
                          type="email"
                          required
                          value={settingsForm.contact_email}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, contact_email: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 rounded-xl font-mono"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900 border border-white/[0.04]">
                        <div className="text-left space-y-0.5">
                          <label className="text-[11px] font-bold text-white uppercase block">Activate Maintenance Shield</label>
                          <span className="text-[9px] text-gray-500 font-mono">Locks down client access to site</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settingsForm.maintenance_mode}
                          onChange={(e) => setSettingsForm(prev => ({ ...prev, maintenance_mode: e.target.checked }))}
                          className="w-4 h-4 rounded text-purple-600 bg-black border-white/10"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#6C3FE8] hover:bg-[#6C3FE8]/80 text-white font-orbitron font-extrabold text-[9.5px] uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        SAVE GLOBAL CONFIG STATE
                      </button>
                    </form>

                    {/* SEO Meta tags Manager */}
                    <form onSubmit={handleSEOSubmit} className="glass-panel p-5 rounded-2xl border-white/5 bg-black/45 space-y-4">
                      <span className="text-[10px] font-mono text-purple-400 block font-bold uppercase text-left border-b border-white/5 pb-2">
                        SEO PAGES TAG MANAGER
                      </span>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Target route page URL</label>
                        <select
                          value={seoForm.slug}
                          onChange={(e) => handleSEOSlugChange(e.target.value)}
                          className="w-full bg-neutral-900 text-xs text-white p-2.5 rounded-xl border border-white/10"
                        >
                          <option value="/">Home Path [/]</option>
                          <option value="/about">About Us [/about]</option>
                          <option value="/services">Capabilities [/services]</option>
                          <option value="/careers">Careers Portal [/careers]</option>
                          <option value="/insights">Insights blog [/insights]</option>
                          <option value="/contact">Contact Coordinates [/contact]</option>
                        </select>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Html meta description title</label>
                        <input
                          type="text"
                          required
                          value={seoForm.meta_title}
                          onChange={(e) => setSeoForm(prev => ({ ...prev, meta_title: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Html meta descriptions summary block</label>
                        <textarea
                          rows={2}
                          value={seoForm.meta_description}
                          onChange={(e) => setSeoForm(prev => ({ ...prev, meta_description: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 focus:outline-none rounded-xl"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-gray-400">Index Keywords (comma arrays)</label>
                        <input
                          type="text"
                          placeholder="Astrix, diagnostic telemetry, co-bot"
                          value={seoForm.keywords}
                          onChange={(e) => setSeoForm(prev => ({ ...prev, keywords: e.target.value }))}
                          className="w-full bg-black/40 text-xs text-white p-2.5 border border-white/5 rounded-xl font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-orbitron font-extrabold text-[9.5px] uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        ALIGN METADATA DESCRIPTIONS
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 8: AUDITING ACTIVITY LOGS SECURE DECK */}
              {activeTab === 'audit_logs' && (
                <div className="space-y-6">
                  {/* Title and stats search */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
                    <div>
                      <h3 className="font-orbitron text-base font-bold text-white tracking-widest uppercase flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-400" />
                        <span>Security Auditing Control</span>
                      </h3>
                      <p className="text-xs text-gray-400">Immutable trace sequence logging operator movements and DB parameters modification.</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        className="px-3.5 py-2 bg-black/40 text-xs text-white border border-white/5 rounded-xl font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Terminal Log screen mockup */}
                  <div className="glass-panel p-5 rounded-2xl bg-neutral-950 border border-white/5 font-mono text-left space-y-4">
                    <div className="flex items-center justify-between font-mono text-[9px] text-[#00D4FF] border-b border-white/5 pb-2">
                      <span>AUDIT TERMINAL CLIENT STATUS: ONLINE_VERIFIED</span>
                      <span>TRACE PROTOCOLS [TLS_1.3_ENVELOPED]</span>
                    </div>

                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                      {activityLogs.length === 0 ? (
                        <div className="py-12 text-center text-gray-600 text-xs">
                          NO EVENT INTEGRATION TIMELINE RECORDS FOUND inside databases.
                        </div>
                      ) : (
                        activityLogs
                          .filter(log => !logSearch || (log.action || '').toLowerCase().includes(logSearch.toLowerCase()) || (log.description || '').toLowerCase().includes(logSearch.toLowerCase()) || (log.module || '').toLowerCase().includes(logSearch.toLowerCase()))
                          .map((log) => (
                            <div key={log.id} className="p-2.5 rounded bg-black/40 border border-white/[0.03] space-y-1.5 hover:bg-neutral-900/40 text-[10.5px]">
                              <div className="flex justify-between flex-wrap text-[9px] font-bold">
                                <span className={
                                  log.action.includes('FAIL') 
                                    ? 'text-red-400' 
                                    : log.action.includes('SUCCESS') || log.action.includes('INIT') 
                                      ? 'text-emerald-400' 
                                      : 'text-cyan-400'
                                }>
                                  [{log.action}] // {log.module}
                                </span>
                                <span className="text-gray-500 font-normal">
                                  {new Date(log.created_at).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-gray-400 leading-normal font-sans text-left">
                                {log.description}
                              </p>
                              <div className="text-[8.5px] text-gray-600 font-semibold uppercase">
                                IP: {log.ip_address} | AGENT: {log.user_agent.slice(0, 48)}...
                              </div>
                            </div>
                        ))
                      )}
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
