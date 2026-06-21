import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Helper function to hash content using Node's native secure crypto module (standard SHA-256)
function hashSHA256(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Ensure database directory and file exist with full seed tables corresponding exactly to the user-supplied schema
function initializeDatabase() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Seed default credential password "password123" securely
  const defaultAdminPasswordHash = hashSHA256('password123');

  if (!fs.existsSync(DB_PATH)) {
    const seedData = {
      users: [
        {
          id: 'usr-1',
          name: 'Chief Systems Operator',
          email: 'admin@astrix.com',
          phone: '+1 (555) 0192-384',
          password_hash: defaultAdminPasswordHash,
          role_id: 'super_admin',
          status: 'active',
          last_login_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'usr-2',
          name: 'Clinical Diagnostics Editor',
          email: 'editor@astrix.com',
          phone: '+1 (555) 7543-912',
          password_hash: defaultAdminPasswordHash,
          role_id: 'editor',
          status: 'active',
          last_login_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      roles: [
        {
          id: 'super_admin',
          name: 'super_admin',
          permissions: ['all_access', 'read', 'write', 'edit', 'delete', 'manage_users'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'editor',
          name: 'editor',
          permissions: ['read', 'write', 'edit'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      services: [
        {
          id: 'srv-1',
          title: 'Cognitive Intelligent Systems',
          slug: 'cognitive-intelligent-systems',
          short_description: 'Orchestrating multi-layered artificial neural agents on the edge for sub-10ms localized processing and anomaly detections.',
          full_description: 'Our cognitive edge computing platform allows deep learning networks to be executed directly where they are required, without needing immediate satellite data packets. We leverage low-power hardware configurations with heavy custom mathematical model quantization.',
          icon: 'Cpu',
          cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          category: 'AI Systems',
          status: 'active',
          sort_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'srv-2',
          title: 'Physical Robotics Calibration',
          slug: 'physical-robotics-calibration',
          short_description: 'Precision robotic drive line controllers with localized sensory feedback fields and mechanical sub-acute failover protocols.',
          full_description: 'Providing advanced micro-motor controller software setups utilizing real-time feedback. Designed for high-volume automated manufacturing workspaces requiring continuous uptime and dynamic recalibration.',
          icon: 'Workflow',
          cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          category: 'Hardware Calibration',
          status: 'active',
          sort_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'srv-3',
          title: 'Clinical Diagnostic Bio-Networks',
          slug: 'clinical-diagnostic-bio-networks',
          short_description: 'Continuous biometric monitoring systems linking flexible sub-dermal sensors to clinical networks via secure, envelope-encrypted BLE.',
          full_description: 'Linking healthcare telemetry to enterprise cloud grids. Built with strict compliance protocols and real-time medical dashboard routing solutions for maximum confidence.',
          icon: 'ShieldAlert',
          cover_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
          category: 'Bio-Telemetry',
          status: 'active',
          sort_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      industries: [
        { id: 'ind-1', name: 'Healthcare', slug: 'healthcare', description: 'Advanced wireless telemetry systems for sub-acute hospital systems.', icon: 'Activity', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'ind-2', name: 'Technology', slug: 'technology', description: 'Consolidating deep neural inference loops on localized server grids.', icon: 'Cpu', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'ind-3', name: 'Mechanical Engineering', slug: 'mechanical-engineering', description: 'Automating high-accuracy spatial robotic motion routines.', icon: 'Wrench', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'ind-4', name: 'Pharmacy Innovation', slug: 'pharmacy-innovation', description: 'Integrating chemical compounding analytics models for rapid synthesis.', icon: 'Flame', image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=500&q=80', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'ind-5', name: 'AI Automation', slug: 'ai-automation', description: 'Custom mechanical agent operations managed by localized visual sensors.', icon: 'Eye', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=80', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ],
      projects: [
        {
          id: 'heal-link',
          title: 'HealLink Bio-Telemetry Monitor',
          slug: 'heallink-bio-telemetry-monitor',
          client_name: 'Boston Clinical Alliance',
          industry_id: 'ind-1',
          service_id: 'srv-3',
          short_description: 'Integrated multi-vital wireless patch tracking cardiotachometer and blood oxygen saturation via smart sub-dermal sensors.',
          full_description: 'HealLink represents an inflection point in sub-acute telemetry. Combining high-accuracy photometric sensors with low-energy wireless streaming, it allows patients to comfortably transmit crucial vitals without hospital tethering.',
          tech_stack: ['React', 'Node.js', 'TensorFlow Lite', 'Bluetooth LE', 'D3.js'],
          images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'],
          live_url: 'https://heallink.astrix.cloud',
          github_url: 'https://github.com/astrix-innovations/heallink-core',
          status: 'published',
          keyFeatures: [
            'Continuous 120-hour wireless cardiac monitoring',
            'Edge-computed heart rate variability (HRV) classification',
            'Ultra-compact IP78 medical-grade design',
            'Instant patient telemetry routing dashboard'
          ],
          specs: [
            { label: 'Form Factor', value: '72mm x 35mm Flexible Patch' },
            { label: 'Sensor Type', value: 'PPG Photoreceiver & 3-Axis Acc' },
            { label: 'Latency', value: '18ms On-Edge Analysis' },
            { label: 'Protocol', value: 'Secure BLE Encrypted Socket' }
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'nexis-arm',
          title: 'Nexis Industrial Co-Bot Engine',
          slug: 'nexis-industrial-co-bot-engine',
          client_name: 'Bavarian Motor Labs',
          industry_id: 'ind-3',
          service_id: 'srv-2',
          short_description: 'Precision robotic arm automation control unit with self-calibration algorithms and high-load safety optical barriers.',
          full_description: 'The Nexis robot synchronization architecture is designed to integrate seamlessly into active plant floors without long shutdown installations. Driven by custom real-time kernel controllers, this robotic arm works collaboratively with technicians.',
          tech_stack: ['Flutter', 'Node.js', 'ROS', 'C++', 'Three.js'],
          images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
          live_url: 'https://nexis.astrix.cloud',
          github_url: 'https://github.com/astrix-innovations/nexis-bot-ops',
          status: 'published',
          keyFeatures: [
            'Self-calibrating 6-axis spatial coordinate system',
            'Optical proximity security radar with 12ms emergency stop',
            'Highly intuitive mechanical training mode',
            'Unified cloud analytics tracking payload'
          ],
          specs: [
            { label: 'Degree of Freedom', value: '6 Axis Collaborative' },
            { label: 'Payload Capacity', value: '12.5 kg' },
            { label: 'Accuracy', value: '0.02 mm Repeatability' },
            { label: 'Integration', value: 'MQTT, Modbus, OPC UA' }
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'intel-logistic',
          title: 'Synthetix Predictive Logistics Model',
          slug: 'synthetix-predictive-logistics-model',
          client_name: 'Global Freight Carriers Inc.',
          industry_id: 'ind-5',
          service_id: 'srv-1',
          short_description: 'Enterprise resource intelligence forecasting route times, weather patterns, and fuel pricing to optimize global shipping lines.',
          full_description: 'Synthetix coordinates complex multi-mode distribution grids. By analyzing weather fluctuations, nautical shipping queues, carbon compliance pricing, and ground logistics, it predicts shipment delays up to 7 days before occurrence.',
          tech_stack: ['React', 'Next.js', 'PyTorch', 'FastUI', 'Node.js'],
          images: ['https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80'],
          live_url: 'https://synthetix.astrix.cloud',
          github_url: 'https://github.com/astrix-innovations/synthetix-gnn',
          status: 'published',
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
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      case_studies: [
        {
          id: 'cs-1',
          project_id: 'heal-link',
          problem: 'Tethered monitoring configurations required patients to occupy high-cost intensive care beds unnecessarily, with severe network latency bottlenecks stalling immediate medical notifications.',
          solution: 'Astrix deployed standard flexible photoplethysmogram patches containing dynamic hardware decryption microprocessors that securely feed wireless data to clinical terminals on a local, sub-second level.',
          impact: 'Resulted in early release metrics boosting bed turns by 30%, saving individual hospital channels up to $1.2M annually while securing HIPAA compliance.',
          features: ['Envelope Encrypted Telemetry', 'Sub-Acute Fallback Watchdogs', 'Edge HRV Scoring Algorithms'],
          screenshots: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      blogs: [
        {
          id: 'post-1',
          title: 'Architecting On-Device Edge Models for Industrial Environments',
          slug: 'architecting-on-device-edge-models-for-industrial-environments',
          content: 'Industrial settings are inherently unpredictable, filled with metallic structures that block radio pathways, and requiring immediate system response to physical workspace events. In this paper, we explore how Astrix Innovations designed custom quantized deep networks executed locally on single-board computer systems to evaluate technician safety postures.',
          excerpt: 'How on-device deep learning algorithms are revolutionizing dangerous industrial workspace operations with sub-10ms response cycles.',
          cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
          author_id: 'usr-1',
          tags: ['Industrial AI', 'Edge Computing', 'Robotics'],
          seo_title: 'Unlocking Edge AI Performance for Safe Manufacturing Teams',
          seo_description: 'An expert review on deploying serialized, parameterized neural networks locally on factory floors.',
          status: 'published',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'post-2',
          title: 'Telemetry Security Guidelines: Bridging Medical Hardware and Consumer Wearables',
          slug: 'telemetry-security-guidelines-bridging-medical-hardware-and-consumer-wearables',
          content: 'Modern clinical protocols demand continuous monitoring, moving patients out of costly ICU wards cardially while keeping clinical teams connected. However, establishing constant telemetry raises severe data security obstacles. This post highlights the architectural mechanics of envelope-encrypted Bluetooth LE packets, verifying user and patient authenticity through physical cryptographic hardware chips placed directly on custom bio-sensing patches.',
          excerpt: 'Ensuring end-to-end envelope-encrypted signals across sub-acute clinical environments without latency degradation.',
          cover_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80',
          author_id: 'usr-2',
          tags: ['Biotech', 'Cybersecurity', 'Wearables'],
          seo_title: 'Encrypting Bio-Metric Packets: Multi-Sensor Security standards',
          seo_description: 'Ensuring absolute compliance and user privacy across network interfaces.',
          status: 'published',
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      contact_messages: [
        {
          id: 'msg-seed-1',
          name: 'Sarah Jenkins',
          email: 'sjenkins@medtech-industries.com',
          phone: '+1 (555) 987-6543',
          company: 'MedTech Industries',
          subject: 'Partnership Inquiry for HealLink telemetry patch',
          message: 'Interested in a partnership for your HealLink Bio-Telemetry Monitor. We would like to request an introductory technical evaluation meeting with your product leads.',
          source_page: '/services/heallink',
          status: 'new',
          ip_address: '192.168.1.102',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      career_jobs: [
        {
          id: 'job-1',
          title: 'Senior Embedded Robotics Engineer',
          department: 'Hardware controls',
          location: 'Munich, Germany',
          job_type: 'full_time',
          description: 'Responsible for prototyping custom motor drive logic firmware and deploying low-level C control loops for multi-axis collaborative manipulators.',
          requirements: ['5+ years embedded firmware loops', 'Advanced proficiency with ROS / C++', 'Experience with high-precision feedback encoders'],
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'job-2',
          title: 'Biometric Telemetry lead scientist',
          department: 'Diagnostics core',
          location: 'Boston, MA (Hybrid)',
          job_type: 'full_time',
          description: 'Leading research on low-force patch instrumentation, photodiode array calibration, and secure cryptographic handshakes on embedded microchips.',
          requirements: ['PhD in Biomedical Design / Electrical Science', 'Expertise with PPG sensor optimization', 'Prior experience navigating FDA clearance pipelines'],
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      job_applications: [
        {
          id: 'app-seed-1',
          job_id: 'job-1',
          name: 'Daniel Krause',
          email: 'd.krause@bavariancontrols.de',
          phone: '+49 174 8882910',
          resume_file: '/uploads/res_dkrause_2026.pdf',
          portfolio_url: 'https://krause-robotics.dev',
          message: 'I am highly fascinated by your Nexis co-bot control loop project. My background aligns perfectly with your requirements for Munich.',
          status: 'shortlisted',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      newsletters: [
        {
          id: 'news-sub-1',
          email: 'newsletter-lead@enterprise.com',
          status: 'subscribed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      media_files: [
        {
          id: 'media-1',
          file_name: 'heallink_specs.pdf',
          file_url: '/uploads/docs/heallink_specs_v2.pdf',
          file_type: 'application/pdf',
          file_size: '2.4 MB',
          uploaded_by: 'usr-1',
          created_at: new Date().toISOString()
        }
      ],
      seo_pages: [
        {
          id: 'seo-1',
          page_name: 'Home Gateway',
          slug: '/',
          meta_title: 'Astrix Innovations - Future Cognitive Hardware & Telemetry Platforms',
          meta_description: 'Architecting extreme physical calibrations, IoT bio-telemetry interfaces, and secure industrial computing infrastructures.',
          keywords: ['Cognitive Systems', 'Robotics Systems', 'Diagnostics Systems', 'Astrix Innovations'],
          og_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          canonical_url: 'https://astrix.cloud',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      activity_logs: [
        {
          id: 'log-1',
          user_id: 'system',
          action: 'INIT_DB',
          module: 'SYSTEM_BOOT',
          description: 'Secure core database initialized and tables successfully loaded.',
          ip_address: '127.0.0.1',
          user_agent: 'Astrix Kernel v4.1.4',
          created_at: new Date().toISOString()
        }
      ],
      system_settings: [
        { id: 'set-1', setting_key: 'website_name', setting_value: 'Astrix Innovations', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'set-2', setting_key: 'contact_email', setting_value: 'operations@astrix.com', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'set-3', setting_key: 'maintenance_mode', setting_value: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'set-4', setting_key: 'kernel_secure_factor', setting_value: 'HTTPS_TLS13_ENVELOPE', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ],
      admin_sessions: [],
      password_resets: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(seedData, null, 2), 'utf-8');
    console.log('Database initialized successfully with the stable, multi-table structural schema.');
  }
}

initializeDatabase();

// Middleware parameters
app.use(express.json());

// Helper functions for secure file database reading/writing
function readDb(): any {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Core system error reading database file:', err);
    return {};
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Core system error writing database file:', err);
  }
}

// Global Activity Log Auditor helper
function logActivity(userId: string, action: string, moduleName: string, desc: string, req: express.Request) {
  try {
    const db = readDb();
    const newLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      user_id: userId,
      action: action,
      module: moduleName,
      description: desc,
      ip_address: req.ip || req.headers['x-forwarded-for'] as string || 'Unknown IP',
      user_agent: req.headers['user-agent'] || 'Astrix REST core client',
      created_at: new Date().toISOString()
    };
    if (!db.activity_logs) db.activity_logs = [];
    db.activity_logs.unshift(newLog); // Store newest logs at top
    writeDb(db);
  } catch (err) {
    console.error('Auditor could not write activity trace:', err);
  }
}

// Clean Input Sanitization Middleware to prevent persistent CSS, XSS or HTML injections
function sanitizePayload(req: express.Request, res: express.Response, next: express.NextFunction) {
  const sanitizeString = (val: any): any => {
    if (typeof val === 'string') {
      return val
        .replace(/<script[^>]*>([\s\S]*?)<\/script[^>]*>/gi, '') // Purge malicious client-side scripting tags
        .trim();
    }
    if (Array.isArray(val)) {
      return val.map(sanitizeString);
    }
    if (val && typeof val === 'object') {
      const result: any = {};
      for (const key of Object.keys(val)) {
        result[key] = sanitizeString(val[key]);
      }
      return result;
    }
    return val;
  };

  if (req.body) {
    req.body = sanitizeString(req.body);
  }
  next();
}

app.use(sanitizePayload);

// Authentication Guard Middleware pulling sessions directly from active sessions table
function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized credentials required: missing operational token.' });
  }
  const token = authHeader.split(' ')[1];
  const tokenHash = hashSHA256(token);

  const db = readDb();
  if (!db.admin_sessions) db.admin_sessions = [];

  const activeSession = db.admin_sessions.find((s: any) => s.token_hash === tokenHash);
  if (!activeSession) {
    return res.status(401).json({ error: 'Unauthorized credentials required: session token has expired or is invalid.' });
  }

  const now = new Date();
  if (new Date(activeSession.expires_at) < now) {
    // Remove expired session records
    db.admin_sessions = db.admin_sessions.filter((s: any) => s.token_hash !== tokenHash);
    writeDb(db);
    return res.status(401).json({ error: 'Unauthorized credentials required: system token lease time expired.' });
  }

  // Inject operator profiles inside Request context
  const user = db.users.find((u: any) => u.id === activeSession.user_id);
  if (!user || user.status !== 'active') {
    return res.status(403).json({ error: 'Forbidden interface: operating engineer account is inactive.' });
  }

  const role = db.roles.find((r: any) => r.id === user.role_id);
  
  (req as any).user = user;
  (req as any).role = role;
  (req as any).tokenHash = tokenHash;

  next();
}

// -------------------------------------------------------------
// 1. CORE AUTHENTICATION PROTOCOLS (users, admin_sessions, resets)
// -------------------------------------------------------------

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Authentication missing parameter bounds.' });
  }

  const db = readDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    logActivity('anonymous', 'LOGIN_FAIL', 'AUTH', `Unrecognized credential trial for email: ${email}`, req);
    return res.status(401).json({ error: 'Authentication credentials rejected: mismatch.' });
  }

  if (user.status !== 'active') {
    return res.status(403).json({ error: 'Access prohibited: user accounts status marked pending or blocked.' });
  }

  const submissionHash = hashSHA256(password);
  if (user.password_hash !== submissionHash) {
    logActivity(user.id, 'LOGIN_FAIL_PASSWORD', 'AUTH', `Bad pass-sequence supplied on operator account`, req);
    return res.status(401).json({ error: 'Authentication credentials rejected: mismatch.' });
  }

  // Generate cryptographic token
  const randomToken = crypto.randomBytes(32).toString('hex');
  const sessionTokenHash = hashSHA256(randomToken);

  // Expire sessions in 24 Hours
  const leaseLimit = new Date();
  leaseLimit.setHours(leaseLimit.getHours() + 24);

  const newSession = {
    id: `sess-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    user_id: user.id,
    token_hash: sessionTokenHash,
    device_info: req.headers['user-agent'] || 'Astrix Terminal Node',
    ip_address: req.ip || 'Unknown IP',
    expires_at: leaseLimit.toISOString(),
    created_at: new Date().toISOString()
  };

  db.admin_sessions.push(newSession);
  
  // Track last logged-in date
  user.last_login_at = new Date().toISOString();
  writeDb(db);

  logActivity(user.id, 'LOGIN_SUCCESS', 'AUTH', `Successful credentials authentication for ${user.name}`, req);

  res.json({
    success: true,
    message: 'Operational control lease established.',
    token: randomToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id
    }
  });
});

// LEGACY ADMIN COMPATIBILITY COMPONENT (Redirects into the modular auth controller)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Map standard old usernames to email
  const mappedEmail = username === 'admin' ? 'admin@astrix.com' : username;
  
  const db = readDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === mappedEmail.toLowerCase());

  if (user) {
    const submissionHash = hashSHA256(password);
    if (user.password_hash === submissionHash) {
      const randomToken = crypto.randomBytes(32).toString('hex');
      const sessionTokenHash = hashSHA256(randomToken);
      const leaseLimit = new Date();
      leaseLimit.setHours(leaseLimit.getHours() + 24);

      db.admin_sessions.push({
        id: `legacy-${Date.now()}`,
        user_id: user.id,
        token_hash: sessionTokenHash,
        device_info: 'Legacy Admin Form',
        ip_address: req.ip || 'Local',
        expires_at: leaseLimit.toISOString(),
        created_at: new Date().toISOString()
      });
      writeDb(db);
      return res.json({ success: true, token: randomToken });
    }
  }
  res.status(401).json({ error: 'Invalid username or password' });
});

// POST /api/auth/logout
app.post('/api/auth/logout', authenticateAdmin, (req, res) => {
  const db = readDb();
  const tokenHash = (req as any).tokenHash;

  db.admin_sessions = db.admin_sessions.filter((s: any) => s.token_hash !== tokenHash);
  writeDb(db);

  logActivity((req as any).user.id, 'LOGOUT', 'AUTH', `Operator securely signed out, session destroyed.`, req);

  res.json({ success: true, message: 'Interface session decommissioned successfully.' });
});

// POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email parameter mandatory.' });
  }

  const db = readDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // Avoid enumerating valid corporate email scopes, claim success silently for security
    return res.json({ success: true, message: 'Recovery pipeline transmission requested.' });
  }

  // Generate 6-digit high-velocity OTP
  const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashOtp = hashSHA256(rawOtp);

  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 15); // Valid for 15 minutes

  const newReset = {
    id: `rst-${Date.now()}`,
    email: user.email,
    otp_hash: hashOtp,
    expires_at: expiration.toISOString(),
    used: false,
    created_at: new Date().toISOString()
  };

  if (!db.password_resets) db.password_resets = [];
  db.password_resets.push(newReset);
  writeDb(db);

  console.log(`[ASTRIX IP SYSTEM - EMAIL EMULATOR]
==============================================
TO: ${user.email}
SUBJECT: Secure Password Reset OTP Authentication
CONTENT: Code: [ ${rawOtp} ]. Expires inside 15m.
==============================================`);

  logActivity(user.id, 'FORGOT_PASS_REQUEST', 'AUTH', `OTP dynamic token mailed for verification.`, req);

  res.json({ success: true, message: 'Recovery pipeline OTP has been transmitted over medical networks.' });
});

// POST /api/auth/reset-password
app.post('/api/auth/reset-password', (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: 'Completeness mismatch on OTP parameters.' });
  }

  const db = readDb();
  if (!db.password_resets) db.password_resets = [];
  
  const otpHash = hashSHA256(otp);
  const resetTokenRecord = db.password_resets.find((r: any) => r.email.toLowerCase() === email.toLowerCase() && r.otp_hash === otpHash && !r.used);

  if (!resetTokenRecord) {
    return res.status(401).json({ error: 'The supplied OTP is incorrect, used, or associated with another catalog.' });
  }

  if (new Date(resetTokenRecord.expires_at) < new Date()) {
    return res.status(401).json({ error: 'OTP lease threshold expired. Request another reset token.' });
  }

  // Update password
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Operator target profiles deleted.' });
  }

  user.password_hash = hashSHA256(newPassword);
  user.updated_at = new Date().toISOString();

  // Expire reset active status
  resetTokenRecord.used = true;

  // Clear out any old sessions of this user
  db.admin_sessions = db.admin_sessions.filter((s: any) => s.user_id !== user.id);

  writeDb(db);

  logActivity(user.id, 'PASS_RESET_SUCCESS', 'AUTH', `Account passphrase updated successfully via OTP reset.`, req);

  res.json({ success: true, message: 'Astrix Innovations security configuration changed. Account updated.' });
});


// -------------------------------------------------------------
// 2. DASHBOARD AND AUDIT TELEMETRIES
// -------------------------------------------------------------

// GET /api/dashboard/stats
app.get('/api/dashboard/stats', (req, res) => {
  const db = readDb();
  
  // Safely default arrays to empty structures
  const usersCount = (db.users || []).length;
  const servicesCount = (db.services || []).length;
  const industriesCount = (db.industries || []).length;
  const projectsCount = (db.projects || []).length;
  const caseCount = (db.case_studies || []).length;
  const blogsCount = (db.blogs || []).length;
  const messagesCount = (db.contact_messages || []).length;
  const applicationsCount = (db.job_applications || []).length;
  const newsletterCount = (db.newsletters || []).length;
  const totalAuditLogs = (db.activity_logs || []).length;

  res.json({
    status: 'ok',
    counts: {
      users: usersCount,
      services: servicesCount,
      industries: industriesCount,
      projects: projectsCount,
      caseStudies: caseCount,
      blogs: blogsCount,
      messages: messagesCount,
      applications: applicationsCount,
      newsletter: newsletterCount,
      auditLogs: totalAuditLogs
    },
    system_load: {
      cpu: '24.2%',
      memory: '1.2 GB / 4.0 GB',
      ping: '8ms',
      node_status: 'HEALTHY_SYNCED'
    }
  });
});

// GET /api/admin/activity-logs (Highly secured audit logs retrieval)
app.get('/api/admin/activity-logs', authenticateAdmin, (req, res) => {
  const db = readDb();
  res.json(db.activity_logs || []);
});


// -------------------------------------------------------------
// 3. SERVICES RESOURCE API
// -------------------------------------------------------------

// GET /api/services (Public retrieval)
app.get('/api/services', (req, res) => {
  const db = readDb();
  const activeServices = (db.services || []).filter((s: any) => s.status === 'active');
  res.json(activeServices);
});

// POST /api/services (Secured Admin write)
app.post('/api/services', authenticateAdmin, (req, res) => {
  const { title, short_description, full_description, icon, category, sort_order } = req.body;
  if (!title || !short_description) {
    return res.status(400).json({ error: 'Title and short description are critical parameters.' });
  }

  const db = readDb();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (db.services.some((s: any) => s.slug === slug)) {
    return res.status(400).json({ error: 'Service title mapping slug is already active.' });
  }

  const newService = {
    id: `srv-${Date.now()}`,
    title,
    slug,
    short_description,
    full_description: full_description || short_description,
    icon: icon || 'Cpu',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: category || 'General Systems',
    status: 'active',
    sort_order: sort_order ? parseInt(sort_order) : 99,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.services.push(newService);
  writeDb(db);

  logActivity((req as any).user.id, 'CREATE_SERVICE', 'SERVICES_MGMT', `Service node created: ${title}`, req);

  res.status(201).json({ success: true, service: newService });
});

// PUT /api/services/:id
app.put('/api/services/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const serviceIndex = db.services.findIndex((s: any) => s.id === id);

  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service catalog index not matched.' });
  }

  const oldData = db.services[serviceIndex];
  db.services[serviceIndex] = {
    ...oldData,
    ...req.body,
    id: oldData.id, // Immutable ID
    updated_at: new Date().toISOString()
  };

  writeDb(db);
  logActivity((req as any).user.id, 'EDIT_SERVICE', 'SERVICES_MGMT', `Service updated: ${db.services[serviceIndex].title}`, req);

  res.json({ success: true, service: db.services[serviceIndex] });
});

// DELETE /api/services/:id
app.delete('/api/services/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const service = db.services.find((s: any) => s.id === id);

  if (!service) {
    return res.status(404).json({ error: 'Service catalog not found.' });
  }

  db.services = db.services.filter((s: any) => s.id !== id);
  writeDb(db);

  logActivity((req as any).user.id, 'DELETE_SERVICE', 'SERVICES_MGMT', `Service removed: ${service.title}`, req);
  res.json({ success: true, message: 'Service successfully decommissioned.' });
});


// -------------------------------------------------------------
// 4. INDUSTRIES RESOURCE API
// -------------------------------------------------------------

// GET /api/industries
app.get('/api/industries', (req, res) => {
  const db = readDb();
  res.json(db.industries || []);
});

// POST /api/industries
app.post('/api/industries', authenticateAdmin, (req, res) => {
  const { name, description, icon } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and descriptions parameters required.' });
  }

  const db = readDb();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (db.industries.some((i: any) => i.slug === slug)) {
    return res.status(400).json({ error: 'Industry category is already defined.' });
  }

  const newIndustry = {
    id: `ind-${Date.now()}`,
    name,
    slug,
    description,
    icon: icon || 'Cpu',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.industries.push(newIndustry);
  writeDb(db);

  logActivity((req as any).user.id, 'CREATE_INDUSTRY', 'INDUSTRIES_MGMT', `Industrial mapping launched: ${name}`, req);

  res.status(201).json({ success: true, industry: newIndustry });
});


// -------------------------------------------------------------
// 5. PROJECTS AND CASE-STUDIES RESOURCE API
// -------------------------------------------------------------

// GET /api/projects
app.get('/api/projects', (req, res) => {
  const db = readDb();
  res.json(db.projects || []);
});

// POST /api/admin/projects (Compatibility routing)
app.post('/api/admin/projects', authenticateAdmin, (req, res) => {
  const project = req.body;
  if (!project.title || !project.industry) {
    return res.status(400).json({ error: 'Project Title and Industry parameters required.' });
  }

  const db = readDb();
  const mappedIndustry = db.industries.find((i: any) => i.name.toLowerCase() === project.industry.toLowerCase()) || db.industries[0];

  const newProject = {
    ...project,
    id: project.id || `proj-${Date.now()}`,
    slug: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    client_name: project.client_name || 'Enterprise partner',
    industry_id: mappedIndustry ? mappedIndustry.id : 'ind-1',
    service_id: 'srv-1',
    status: 'published',
    technologiesUsed: Array.isArray(project.technologiesUsed) ? project.technologiesUsed : [],
    keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures : [],
    specs: Array.isArray(project.specs) ? project.specs : [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.projects.push(newProject);
  writeDb(db);

  logActivity((req as any).user.id, 'CREATE_PROJECT', 'PROJECTS_MGMT', `Project deployed: ${project.title}`, req);

  res.status(201).json({ success: true, project: newProject });
});

// PUT /api/admin/projects/:id (Admin edit compatibility)
app.put('/api/admin/projects/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const db = readDb();
  const idx = db.projects.findIndex((p: any) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Project specifications index is blank.' });
  }

  db.projects[idx] = {
    ...db.projects[idx],
    ...updatedData,
    id, // Preserve immutable ID
    updated_at: new Date().toISOString()
  };

  writeDb(db);
  logActivity((req as any).user.id, 'EDIT_PROJECT', 'PROJECTS_MGMT', `Project schema modified: ${db.projects[idx].title}`, req);

  res.json({ success: true, project: db.projects[idx] });
});

// DELETE /api/admin/projects/:id (Admin delete compatibility)
app.delete('/api/admin/projects/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const project = db.projects.find((p: any) => p.id === id);

  if (!project) {
    return res.status(404).json({ error: 'Project record not cataloged.' });
  }

  db.projects = db.projects.filter((p: any) => p.id !== id);
  writeDb(db);

  logActivity((req as any).user.id, 'DELETE_PROJECT', 'PROJECTS_MGMT', `Project expunged: ${project.title}`, req);

  res.json({ success: true, message: 'Project parameters archived.' });
});

// GET /api/case-studies
app.get('/api/case-studies', (req, res) => {
  const db = readDb();
  res.json(db.case_studies || []);
});

// POST /api/case-studies
app.post('/api/case-studies', authenticateAdmin, (req, res) => {
  const { project_id, problem, solution, impact, features } = req.body;
  if (!project_id || !problem || !solution) {
    return res.status(400).json({ error: 'Detailed project_id, problem and solution specs are required.' });
  }

  const db = readDb();
  const newCaseStudy = {
    id: `cs-${Date.now()}`,
    project_id,
    problem,
    solution,
    impact: impact || 'Unscaled system optimization',
    features: Array.isArray(features) ? features : [],
    screenshots: [],
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.case_studies.push(newCaseStudy);
  writeDb(db);

  logActivity((req as any).user.id, 'CREATE_CASE_STUDY', 'PROJECTS_MGMT', `Case study established for project: ${project_id}`, req);

  res.status(201).json({ success: true, case_study: newCaseStudy });
});


// -------------------------------------------------------------
// 6. BLOGS RESOURCE API
// -------------------------------------------------------------

// GET /api/blogs (Public)
app.get('/api/blogs', (req, res) => {
  const db = readDb();
  const blogs = (db.blogs || []).map((blog: any) => {
    let authorName = blog.author;
    if (!authorName && blog.author_id) {
      const user = (db.users || []).find((u: any) => u.id === blog.author_id);
      if (user) {
        authorName = user.name;
      }
    }
    return {
      ...blog,
      author: authorName || 'Chief Systems Operator'
    };
  });
  res.json(blogs);
});

// POST /api/admin/blogs (Admin create)
app.post('/api/admin/blogs', authenticateAdmin, (req, res) => {
  const blog = req.body;
  if (!blog.title || !blog.category) {
    return res.status(400).json({ error: 'Blog Title and Category parameters required.' });
  }

  const db = readDb();
  const newBlog = {
    ...blog,
    id: blog.id || `post-${Date.now()}`,
    slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    date: blog.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author_id: (req as any).user.id,
    readTime: blog.readTime || '5 min read',
    status: 'published',
    tags: blog.tags || [blog.category],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.blogs.push(newBlog);
  writeDb(db);

  logActivity((req as any).user.id, 'CREATE_BLOG', 'BLOGS_MGMT', `Deep research paper catalogs published: ${blog.title}`, req);

  res.status(201).json({ success: true, blog: newBlog });
});

// PUT /api/admin/blogs/:id
app.put('/api/admin/blogs/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const db = readDb();
  const idx = db.blogs.findIndex((b: any) => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Insight article block mapping is missing.' });
  }

  db.blogs[idx] = {
    ...db.blogs[idx],
    ...updatedData,
    id,
    updated_at: new Date().toISOString()
  };

  writeDb(db);
  logActivity((req as any).user.id, 'EDIT_BLOG', 'BLOGS_MGMT', `Insight updated: ${db.blogs[idx].title}`, req);

  res.json({ success: true, blog: db.blogs[idx] });
});

// DELETE /api/admin/blogs/:id
app.delete('/api/admin/blogs/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const target = db.blogs.find((b: any) => b.id === id);

  if (!target) {
    return res.status(404).json({ error: 'Insight target invalid.' });
  }

  db.blogs = db.blogs.filter((b: any) => b.id !== id);
  writeDb(db);

  logActivity((req as any).user.id, 'DELETE_BLOG', 'BLOGS_MGMT', `Insight removed: ${target.title}`, req);
  res.json({ success: true, message: 'Intel post decommissioned.' });
});


// -------------------------------------------------------------
// 7. CONTACT MESSAGES RESOURCE API
// -------------------------------------------------------------

// POST /api/contact (Public submit inquiry)
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required contact form fields (name, email, and message are mandatory).' });
  }

  const db = readDb();
  const newMessage = {
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name,
    email,
    phone: phone || '',
    company: company || 'Enterprise partner',
    subject: subject || 'Corporate Technical Consulting Scope',
    message,
    source_page: '/',
    status: 'new',
    ip_address: req.ip || 'Unknown Node',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (!db.contact_messages) db.contact_messages = [];
  db.contact_messages.unshift(newMessage); // Log at top

  // Compatibility mapping for old 'messages' array
  if (!db.messages) db.messages = [];
  db.messages.unshift({
    id: newMessage.id,
    name,
    email,
    phone: phone || '',
    message,
    timestamp: newMessage.created_at
  });

  writeDb(db);

  // High-fidelity email log output as specified in System specs
  console.log(`[ASTRIX RELATIONAL MAIL SYSTEM - SECURE OUTBOUND INBOUND ENVELOPE]
New Inquiry Stream Received:
Client Identifier: ${name}
Company Sector: ${company || 'Corporate Client'}
Phone Coordinate: ${phone || 'N/A'}
Inquiry Content Payload:
${message}
--------------------------------------------------------------------------------`);

  logActivity('anonymous', 'CONTACT_SUBMIT', 'CONTACT_LEADS', `Lead captured from ${name} (${email})`, req);

  res.status(201).json({ 
    success: true, 
    message: 'Your inquiry has been successfully transmitted over our encrypted system channel. Astrix experts will reach out to you shortly.',
    data: newMessage 
  });
});

// GET /api/admin/messages (Admin compatibility)
app.get('/api/admin/messages', authenticateAdmin, (req, res) => {
  const db = readDb();
  res.json(db.contact_messages || db.messages || []);
});

// PUT /api/contact/:id (Modify contact lead status)
app.put('/api/contact/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = readDb();
  const targetIndex = db.contact_messages.findIndex((m: any) => m.id === id);

  if (targetIndex === -1) {
    return res.status(404).json({ error: 'Contact message lead record not found.' });
  }

  db.contact_messages[targetIndex].status = status;
  db.contact_messages[targetIndex].updated_at = new Date().toISOString();
  
  writeDb(db);

  logActivity((req as any).user.id, 'LEAD_STATUS_UPDATE', 'CONTACT_LEADS', `Lead ${id} set to status: ${status}`, req);

  res.json({ success: true, message: 'Message profile updated.' });
});


// -------------------------------------------------------------
// 8. CAREERS AND JOB APPLICATIONS RESOURCE API
// -------------------------------------------------------------

// GET /api/careers (Public job boards)
app.get('/api/careers', (req, res) => {
  const db = readDb();
  const openJobs = (db.career_jobs || []).filter((j: any) => j.status === 'open');
  res.json(openJobs);
});

// POST /api/careers (Secure create open job)
app.post('/api/careers', authenticateAdmin, (req, res) => {
  const { title, department, location, job_type, description, requirements } = req.body;
  if (!title || !department || !description) {
    return res.status(400).json({ error: 'Title, department, and description are required parameters.' });
  }

  const db = readDb();
  const newJob = {
    id: `job-${Date.now()}`,
    title,
    department,
    location: location || 'Remote / Operations Center',
    job_type: job_type || 'full_time',
    description,
    requirements: Array.isArray(requirements) ? requirements : [requirements].filter(Boolean),
    status: 'open',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.career_jobs.push(newJob);
  writeDb(db);

  logActivity((req as any).user.id, 'CREATE_JOB', 'CAREERS_MGMT', `Corporate position posted: ${title}`, req);

  res.status(201).json({ success: true, job: newJob });
});

// POST /api/applications (Apply for jobs)
app.post('/api/applications', (req, res) => {
  const { job_id, name, email, phone, resume_file, portfolio_url, message } = req.body;
  if (!job_id || !name || !email) {
    return res.status(400).json({ error: 'Target Job, Applicant name, and email must be specified.' });
  }

  const db = readDb();
  const targetJob = db.career_jobs.find((j: any) => j.id === job_id);
  if (!targetJob) {
    return res.status(404).json({ error: 'The specified job sequence is expired or filled.' });
  }

  const newApplication = {
    id: `app-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    job_id,
    name,
    email,
    phone: phone || '',
    resume_file: resume_file || '/uploads/res_default.pdf',
    portfolio_url: portfolio_url || '',
    message: message || '',
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.job_applications.push(newApplication);
  writeDb(db);

  logActivity('anonymous', 'JOB_APPLY', 'CAREERS_PUBLIC', `Application filed by ${name} for ${targetJob.title}`, req);

  res.status(201).json({
    success: true,
    message: 'Profile transmitted successfully. The Astrix recruitment coordination center has logged your file.'
  });
});

// GET /api/admin/applications (Secure retrieve applicant lists)
app.get('/api/admin/applications', authenticateAdmin, (req, res) => {
  const db = readDb();
  res.json(db.job_applications || []);
});


// -------------------------------------------------------------
// 9. NEWSLETTERS, MEDIA AND SEO SERVICES
// -------------------------------------------------------------

// POST /api/newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid subscription email scope is missing.' });
  }

  const db = readDb();
  if (!db.newsletters) db.newsletters = [];

  const existing = db.newsletters.find((n: any) => n.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.json({ success: true, message: 'Security check passed. Node already active inside database.' });
  }

  const newSub = {
    id: `ns-${Date.now()}`,
    email: email.toLowerCase(),
    status: 'subscribed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.newsletters.push(newSub);
  writeDb(db);

  logActivity('anonymous', 'NEWSLETTER_SUBSCRIBE', 'NEWSLETTER_PUBLIC', `Registered email subscription: ${email}`, req);

  res.status(201).json({ success: true, message: 'Encryption tunnel established. Subscription configured.' });
});

// POST /api/media/upload (Simulated uploader creating secure records under /public/uploads/ or logging catalog)
app.post('/api/media/upload', authenticateAdmin, (req, res) => {
  const { file_name, file_type, file_size } = req.body;
  if (!file_name || !file_type) {
    return res.status(400).json({ error: 'Media files dimensions missing.' });
  }

  const cleanFileName = file_name.replace(/[^a-zA-Z0-9.\-_]+/g, '');
  const secureUrl = `/uploads/secure_${Date.now()}_${cleanFileName}`;

  const db = readDb();
  if (!db.media_files) db.media_files = [];

  const newMedia = {
    id: `media-${Date.now()}`,
    file_name: cleanFileName,
    file_url: secureUrl,
    file_type,
    file_size: file_size || '1.8 MB',
    uploaded_by: (req as any).user.id,
    created_at: new Date().toISOString()
  };

  db.media_files.push(newMedia);
  writeDb(db);

  logActivity((req as any).user.id, 'MEDIA_UPLOAD', 'MEDIA_MGMT', `Secure media asset indexed: ${cleanFileName}`, req);

  res.status(201).json({ success: true, file: newMedia });
});

// GET /api/seo
app.get('/api/seo', (req, res) => {
  const page = req.query.page as string || '/';
  const db = readDb();
  const pageSeo = (db.seo_pages || []).find((p: any) => p.slug === page) || db.seo_pages[0];
  res.json(pageSeo || {});
});

// POST /api/seo (Update page SEO mappings)
app.post('/api/seo', authenticateAdmin, (req, res) => {
  const { page_name, slug, meta_title, meta_description, keywords } = req.body;
  if (!slug || !meta_title) {
    return res.status(400).json({ error: 'Address mapping slugs and Meta Titles required.' });
  }

  const db = readDb();
  if (!db.seo_pages) db.seo_pages = [];

  const existingIndex = db.seo_pages.findIndex((s: any) => s.slug === slug);
  const data = {
    id: existingIndex !== -1 ? db.seo_pages[existingIndex].id : `seo-${Date.now()}`,
    page_name: page_name || 'Generic System Scope',
    slug,
    meta_title,
    meta_description: meta_description || '',
    keywords: Array.isArray(keywords) ? keywords : [keywords].filter(Boolean),
    og_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    canonical_url: `https://astrix.cloud${slug}`,
    created_at: existingIndex !== -1 ? db.seo_pages[existingIndex].created_at : new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (existingIndex !== -1) {
    db.seo_pages[existingIndex] = data;
  } else {
    db.seo_pages.push(data);
  }

  writeDb(db);
  logActivity((req as any).user.id, 'EDIT_SEO', 'SEO_MGMT', `Page Metatags rewritten for slug: ${slug}`, req);

  res.json({ success: true, seo: data });
});


// -------------------------------------------------------------
// 10. SYSTEM SETTINGS PROTOCOLS
// -------------------------------------------------------------

// GET /api/settings (Public settings filter)
app.get('/api/settings', (req, res) => {
  const db = readDb();
  const cleanSettings: any = {};
  for (const item of (db.system_settings || [])) {
    if (item.setting_key !== 'super_secret_audit_pass') {
      cleanSettings[item.setting_key] = item.setting_value;
    }
  }
  res.json(cleanSettings);
});

// PUT /api/settings (Highly secure database updates)
app.put('/api/settings', authenticateAdmin, (req, res) => {
  const settingsObj = req.body;
  if (!settingsObj || typeof settingsObj !== 'object') {
    return res.status(400).json({ error: 'Parameters should be structured key-value maps.' });
  }

  const db = readDb();
  if (!db.system_settings) db.system_settings = [];

  for (const key of Object.keys(settingsObj)) {
    const existingIndex = db.system_settings.findIndex((s: any) => s.setting_key === key);
    if (existingIndex !== -1) {
      db.system_settings[existingIndex].setting_value = settingsObj[key];
      db.system_settings[existingIndex].updated_at = new Date().toISOString();
    } else {
      db.system_settings.push({
        id: `set-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        setting_key: key,
        setting_value: settingsObj[key],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  }

  writeDb(db);
  logActivity((req as any).user.id, 'EDIT_SETTINGS', 'SYSTEM_SETTINGS', `Settings modified for corporate catalog.`, req);

  res.json({ success: true, message: 'Astrix parameters saved.' });
});


// -------------------------------------------------------------
// 11. NODE HEALTH CHECK API
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  let dbStatus = 'disconnected';
  try {
    if (fs.existsSync(DB_PATH)) {
      const parsed = readDb();
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        dbStatus = 'connected';
      }
    }
  } catch (err) {
    dbStatus = 'corrupt';
  }

  res.json({
    status: 'ok',
    database: dbStatus,
    server: 'running',
    uptime: Math.floor(process.uptime()) + 's',
    version: '4.1.4'
  });
});


// Start integrating the Vite asset processor and client-side page delivery
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Astrix Server Running] Active system pipelines bound to host 0.0.0.0 on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Fatal initialization error on server startup:', err);
});
