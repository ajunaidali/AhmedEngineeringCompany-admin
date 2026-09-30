"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  FolderKanban,
  Globe2,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Plus,
  Search,
  Settings2,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

type Project = {
  name: string;
  location: string;
  status: "In progress" | "Completed";
  image: string;
};

type Inquiry = {
  name: string;
  service: string;
  received: string;
  status: "New" | "In review" | "Replied";
  initials: string;
  color: string;
};

const navigation = [
  {
    heading: "WORKSPACE",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Pages", icon: FileText },
      { label: "Projects", icon: FolderKanban },
      { label: "Services", icon: Building2 },
    ],
  },
  {
    heading: "COMMUNICATION",
    items: [
      { label: "Inquiries", icon: MessageSquareText, count: "4" },
      { label: "Media library", icon: ImageIcon },
      { label: "FAQs", icon: CircleHelp },
    ],
  },
  {
    heading: "PREFERENCES",
    items: [{ label: "Site settings", icon: Settings2 }],
  },
];

const initialProjects: Project[] = [
  {
    name: "Domed Mosque",
    location: "Shahwilayat, Karachi",
    status: "Completed",
    image:
      "https://ahmedengineeringcompany.vercel.app/images/mosque/hero-mosque-dome.webp",
  },
  {
    name: "Ahsanabad Residence",
    location: "Ahsanabad, Karachi",
    status: "In progress",
    image: "https://ahmedengineeringcompany.vercel.app/images/about-1.webp",
  },
  {
    name: "Commercial Office Fit-out",
    location: "Gulshan-e-Iqbal, Karachi",
    status: "Completed",
    image: "https://ahmedengineeringcompany.vercel.app/images/office2.webp",
  },
];

const inquiries: Inquiry[] = [
  {
    name: "Ahsan Raza",
    service: "Residential construction",
    received: "12 min ago",
    status: "New",
    initials: "AR",
    color: "sage",
  },
  {
    name: "Mariam Khan",
    service: "Architecture design",
    received: "1 hour ago",
    status: "New",
    initials: "MK",
    color: "rose",
  },
  {
    name: "Bilal Ahmed",
    service: "Civil engineering",
    received: "Yesterday",
    status: "In review",
    initials: "BA",
    color: "gold",
  },
];

const sectionRecords: Record<string, string[]> = {
  Pages: ["Home", "About us", "Projects", "Services", "Contact"],
  Projects: initialProjects.map((project) => project.name),
  Services: [
    "Residential construction",
    "Commercial construction",
    "Architecture design",
    "Civil engineering consultancy",
    "Interior design",
  ],
  Inquiries: inquiries.map((inquiry) => inquiry.name),
  "Media library": [
    "mosque-dome.webp",
    "foundation-base.webp",
    "about-main.webp",
    "office-interior.webp",
  ],
  FAQs: [
    "What services do you offer?",
    "Which areas do you serve?",
    "How can I request a quote?",
  ],
  "Site settings": ["Company profile", "Contact details", "Social links", "SEO defaults"],
};

function StatusPill({ status }: { status: string }) {
  return <span className={`status-pill status-${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [projectList, setProjectList] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredInquiries = inquiries.filter((inquiry) =>
    `${inquiry.name} ${inquiry.service}`.toLowerCase().includes(search.toLowerCase()),
  );
  const records = activeSection === "Projects"
    ? projectList.map((project) => project.name)
    : sectionRecords[activeSection] ?? [];
  const sectionItems = records.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    if (!name || !location) return;
    setProjectList((projects) => [
      { name, location, status: "In progress", image: "" },
      ...projects,
    ]);
    setShowProjectForm(false);
    event.currentTarget.reset();
  }

  return (
    <div className="admin-shell">
      {mobileMenuOpen && (
        <button
          aria-label="Close navigation"
          className="sidebar-scrim"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <a className="brand-lockup" href="#overview" onClick={() => {
          setActiveSection("Overview");
          setMobileMenuOpen(false);
        }}>
          <span className="brand-mark"><Building2 size={19} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>AEC</strong><small>ADMIN STUDIO</small></span>
        </a>

        <a className="site-switcher" href="https://ahmedengineeringcompany.vercel.app/" target="_blank" rel="noreferrer">
          <span className="site-switcher-icon"><Globe2 size={16} /></span>
          <span><strong>Ahmed Engineering</strong><small>ahmedengineeringcompany.com</small></span>
          <ChevronDown size={15} />
        </a>

        <nav className="side-nav" aria-label="Admin navigation">
          {navigation.map((group) => (
            <div className="nav-group" key={group.heading}>
              <p className="nav-heading">{group.heading}</p>
              {group.items.map(({ label, icon: Icon, count }) => (
                <button
                  className={`nav-link ${activeSection === label ? "nav-link-active" : ""}`}
                  key={label}
                  onClick={() => {
                    setActiveSection(label);
                    setSearch("");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{label}</span>
                  {count && <span className="nav-count">{count}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="publish-card">
            <span className="publish-dot" />
            <div><strong>Public website</strong><small>CMS connection not set up</small></div>
            <span className="live-check"><Check size={12} /></span>
          </div>
          <button className="profile-row">
            <span className="profile-avatar">SS</span>
            <span className="profile-copy"><strong>Shakeel Shaikh</strong><small>Administrator</small></span>
            <ChevronDown size={15} />
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileMenuOpen(true)}><Menu size={19} /></button>
          <div className="breadcrumbs"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{activeSection}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={16} />
              <input aria-label="Search this page" placeholder="Search anything..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <kbd>⌘ K</kbd>
            </label>
            <span className="topbar-divider" />
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <a className="view-site-button" href="https://ahmedengineeringcompany.vercel.app/" target="_blank" rel="noreferrer"><Globe2 size={15} /><span>View website</span><ArrowUpRight size={14} /></a>
          </div>
        </header>

        <div className="content-area">
          <div className="prototype-notice"><span className="notice-spark">✳</span><span><strong>Preview workspace</strong> · Changes here are local demo data and aren’t published to the live website yet.</span><button aria-label="Dismiss notice" onClick={(event) => event.currentTarget.parentElement?.remove()}><X size={15} /></button></div>

          {activeSection === "Overview" ? (
            <>
              <section className="welcome-row">
                <div>
                  <p className="eyebrow">WEDNESDAY, SEPTEMBER 30, 2026</p>
                  <h1>Good morning, Shakeel <span>✳</span></h1>
                  <p className="welcome-subtitle">Here&apos;s what&apos;s happening with your website today.</p>
                </div>
                <button className="primary-button" onClick={() => setShowProjectForm(true)}><Plus size={17} /> Add project</button>
              </section>

              <section className="metrics-grid" aria-label="Website metrics">
                <article className="metric-card metric-green">
                  <div className="metric-top"><span>Published projects</span><span className="metric-icon"><FolderKanban size={17} /></span></div>
                  <div className="metric-value">24</div>
                  <div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14} /> 2 this month</span><span>across your portfolio</span></div>
                  <div className="metric-sparkline spark-green"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                </article>
                <article className="metric-card">
                  <div className="metric-top"><span>Active services</span><span className="metric-icon icon-slate"><Building2 size={17} /></span></div>
                  <div className="metric-value">12</div>
                  <div className="metric-foot"><span className="foot-quiet">Across 4 categories</span></div>
                  <div className="metric-sparkline spark-olive"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                </article>
                <article className="metric-card">
                  <div className="metric-top"><span>New inquiries</span><span className="metric-icon icon-amber"><MessageSquareText size={17} /></span></div>
                  <div className="metric-value">04 <span className="metric-period">this week</span></div>
                  <div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14} /> 2 new today</span><span>needs a response</span></div>
                  <div className="metric-sparkline spark-amber"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                </article>
                <article className="metric-card">
                  <div className="metric-top"><span>Pages published</span><span className="metric-icon icon-lilac"><FileText size={17} /></span></div>
                  <div className="metric-value">08 <span className="metric-period">of 10</span></div>
                  <div className="progress-track"><span /></div>
                  <div className="metric-foot"><span className="foot-quiet">2 pages are still drafts</span></div>
                </article>
              </section>

              <section className="dashboard-columns">
                <div className="surface-card inquiry-card">
                  <div className="card-heading">
                    <div><p className="eyebrow">INBOX</p><h2>Recent inquiries <span className="heading-count">4</span></h2></div>
                    <button className="text-action" onClick={() => setActiveSection("Inquiries")}>View all <ArrowUpRight size={14} /></button>
                  </div>
                  <div className="inquiry-table-head"><span>CONTACT</span><span>SERVICE</span><span>RECEIVED</span><span>STATUS</span></div>
                  <div className="inquiry-list">
                    {filteredInquiries.slice(0, 3).map((inquiry) => (
                      <div className="inquiry-row" key={inquiry.name}>
                        <div className="contact-cell"><span className={`contact-avatar avatar-${inquiry.color}`}>{inquiry.initials}</span><strong>{inquiry.name}</strong></div>
                        <span className="service-cell">{inquiry.service}</span>
                        <span className="received-cell">{inquiry.received}</span>
                        <StatusPill status={inquiry.status} />
                      </div>
                    ))}
                    {filteredInquiries.length === 0 && <p className="empty-search">No inquiries match that search.</p>}
                  </div>
                  <button className="inquiry-footer" onClick={() => setActiveSection("Inquiries")}>Open inquiry inbox <ArrowUpRight size={14} /></button>
                </div>

                <div className="surface-card activity-card">
                  <div className="card-heading">
                    <div><p className="eyebrow">YOUR WEBSITE</p><h2>Quick overview</h2></div>
                    <button className="icon-button subtle-button" aria-label="Website overview options"><Settings2 size={16} /></button>
                  </div>
                  <a href="https://ahmedengineeringcompany.vercel.app/" className="website-preview" target="_blank" rel="noreferrer">
                    <Image src="https://ahmedengineeringcompany.vercel.app/images/mosque/hero-mosque-dome.webp" alt="Featured mosque dome project" fill sizes="(max-width: 700px) 100vw, 420px" priority />
                    <span className="preview-overlay"><span className="preview-live"><i /> LIVE SITE</span><ArrowUpRight size={17} /></span>
                  </a>
                  <div className="site-summary"><div><strong>Ahmed Engineering Company</strong><span>Construction · Karachi, Pakistan</span></div><span className="site-score"><ArrowDownRight size={14} /> 2 drafts</span></div>
                  <div className="activity-divider" />
                  <div className="activity-heading"><span>RECENT ACTIVITY</span><button className="text-action" onClick={() => setActiveSection("Pages")}>See pages</button></div>
                  <div className="activity-entry"><span className="activity-icon activity-page"><FileText size={14} /></span><span><strong>Home page</strong><small>Last updated by you</small></span><time>2h ago</time></div>
                  <div className="activity-entry"><span className="activity-icon activity-project"><FolderKanban size={14} /></span><span><strong>Domed Mosque</strong><small>Project · Published</small></span><time>Yesterday</time></div>
                </div>
              </section>

              <section className="surface-card projects-card">
                <div className="card-heading project-card-heading">
                  <div><p className="eyebrow">PORTFOLIO</p><h2>Recent projects <span className="heading-count">24 total</span></h2></div>
                  <div className="project-heading-actions"><button className="text-action" onClick={() => setActiveSection("Projects")}>All projects <ArrowUpRight size={14} /></button><button className="small-add-button" onClick={() => setShowProjectForm(true)} aria-label="Add project"><Plus size={17} /></button></div>
                </div>
                <div className="project-grid">
                  {projectList.slice(0, 3).map((project, index) => (
                    <article className="project-item" key={`${project.name}-${index}`}>
                      <div className="project-image">{project.image ? <Image src={project.image} alt="" fill sizes="(max-width: 700px) 50vw, 280px" /> : <Building2 size={28} />}</div>
                      <div className="project-info"><div><strong>{project.name}</strong><span>{project.location}</span></div><StatusPill status={project.status} /></div>
                    </article>
                  ))}
                </div>
              </section>
              <footer className="page-footer"><span>Ahmed Engineering Company <i>·</i> Admin Studio</span><span>Preview workspace <i>·</i> v0.1</span></footer>
            </>
          ) : (
            <section className="management-view">
              <div className="management-heading">
                <div><p className="eyebrow">WEBSITE MANAGEMENT</p><h1>{activeSection}</h1><p className="welcome-subtitle">Manage your {activeSection.toLowerCase()} content.</p></div>
                {activeSection === "Projects" && <button className="primary-button" onClick={() => setShowProjectForm(true)}><Plus size={17} /> Add project</button>}
              </div>
              <div className="surface-card management-card">
                <div className="management-toolbar"><div><strong>{sectionItems.length} items</strong><span> · Preview data</span></div><label className="list-search"><Search size={15} /><input aria-label={`Search ${activeSection}`} placeholder={`Search ${activeSection.toLowerCase()}...`} value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
                <div className="management-list">
                  {sectionItems.map((item, index) => (
                    <div className="management-row" key={item}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><span className="management-item-icon">{activeSection === "Projects" ? <FolderKanban size={17} /> : activeSection === "Media library" ? <ImageIcon size={17} /> : activeSection === "Inquiries" ? <MessageSquareText size={17} /> : <FileText size={17} />}</span><strong>{item}</strong><span className="management-row-status"><StatusPill status={index === 0 ? "Published" : activeSection === "Inquiries" ? "New" : "Published"} /></span><button className="row-edit-button" onClick={() => activeSection === "Projects" && setShowProjectForm(true)}>{activeSection === "Projects" ? "Edit" : "Open"}<ArrowUpRight size={14} /></button></div>
                  ))}
                  {sectionItems.length === 0 && <p className="empty-search">Nothing found. Try another search.</p>}
                </div>
              </div>
              <div className="connection-note"><span className="notice-spark">✳</span><span>These are preview records. Connect a CMS and secure database to save and publish real website changes.</span></div>
            </section>
          )}
        </div>
      </main>

      {showProjectForm && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowProjectForm(false)}>
          <form className="project-modal" onSubmit={addProject}>
            <div className="modal-heading"><div><p className="eyebrow">PORTFOLIO</p><h2>New project</h2></div><button type="button" className="icon-button" aria-label="Close dialog" onClick={() => setShowProjectForm(false)}><X size={18} /></button></div>
            <label>Project name<input name="name" placeholder="e.g. Gulshan Residence" required autoFocus /></label>
            <label>Location<input name="location" placeholder="City or area" required /></label>
            <div className="modal-foot"><span>Saved in this preview only</span><button className="primary-button" type="submit"><Plus size={16} /> Create project</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
