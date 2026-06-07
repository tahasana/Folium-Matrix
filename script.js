/* --- PREMIUM "WARM DAYLIGHT" MINIMALIST DESIGN FRAMEWORK --- */
:root {
    --daylight-bg: radial-gradient(circle at center, #ffffff 0%, #fffbf2 50%, #f3f9f5 100%);
    --text-charcoal: #1e293b;
    --text-slate: #64748b;
    --accent-blue: #2563eb;
    --border-light: #e2e8f0;
    --card-bg: rgba(255, 255, 255, 0.85);
}

* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
body { background: var(--daylight-bg); color: var(--text-charcoal); display: flex; justify-content: center; min-height: 100vh; padding: 20px; }

/* 🔒 Split Panel Entrance Gate Architecture */
.auth-gate-container { width: 100%; max-width: 820px; margin-top: 6vh; display: flex; flex-direction: column; gap: 20px; }
.auth-split-layout { background: var(--card-bg); border: 1px solid var(--border-light); border-radius: 16px; display: grid; grid-template-columns: 45% 55%; backdrop-filter: blur(8px); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.02); }

.auth-form-column { padding: 40px; border-right: 1px solid var(--border-light); display: flex; flex-direction: column; gap: 20px; }
.auth-toggle-headers { display: flex; gap: 15px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px; }
.auth-tab-btn { background: transparent; border: none; font-size: 14px; font-weight: bold; color: var(--text-slate); cursor: pointer; padding-bottom: 4px; }
.auth-tab-btn.active { color: var(--accent-blue); border-bottom: 2px solid var(--accent-blue); }

.auth-fields-stack { display: flex; flex-direction: column; gap: 12px; }
.auth-fields-stack input { width: 100%; padding: 12px; background: #ffffff; border: 1px solid var(--border-light); border-radius: 8px; outline: none; font-size: 13px; color: var(--text-charcoal); }
.auth-fields-stack input:focus { border-color: var(--accent-blue); }

/* Password Strength Indicator Line */
.strength-gauge-wrapper { width: 100%; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; }
.strength-bar { height: 100%; width: 0%; transition: all 0.3s ease; background: #ef4444; }

.auth-info-column { padding: 40px; background: rgba(248, 250, 252, 0.5); display: flex; flex-direction: column; gap: 20px; }
.info-grid-headline { font-size: 11px; font-weight: bold; color: var(--accent-blue); letter-spacing: 1.5px; text-transform: uppercase; }
.capability-preview-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
.capability-node h3 { font-size: 13px; color: var(--text-charcoal); margin-bottom: 3px; }
.capability-node p { font-size: 11px; color: var(--text-slate); line-height: 1.4; }

.auth-footer-notice { text-align: center; font-size: 11px; color: var(--text-slate); padding: 10px; line-height: 1.4; }

/* 🏢 Main Workspace Container Modules */
.master-workspace-wrapper { width: 100%; max-width: 820px; display: flex; flex-direction: column; gap: 25px; }
.sticky-nav-strip { background: var(--card-bg); border: 1px solid var(--border-light); border-radius: 12px; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 15px; z-index: 1000; backdrop-filter: blur(10px); box-shadow: 0 4px 20px rgba(0,0,0,0.01); }
.nav-brand-credit { font-size: 11px; font-weight: bold; color: var(--text-charcoal); letter-spacing: 0.5px; }
.nav-links-cluster { display: flex; gap: 4px; align-items: center; }
.nav-tab-link { background: transparent; border: none; font-size: 12px; font-weight: 600; color: var(--text-slate); padding: 6px 10px; cursor: pointer; border-radius: 6px; }
.nav-tab-link:hover, .nav-tab-link.active { color: var(--text-charcoal); background: #f1f5f9; }
.nav-tab-logout { background: #fef2f2; border: none; font-size: 11px; font-weight: bold; color: #ef4444; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-left: 5px; }

/* 🔍 Central Scite.ai Search Engine Display Bar */
.scite-hero-container { text-align: center; padding: 30px 10px 10px 10px; display: flex; flex-direction: column; gap: 15px; align-items: center; }
.scite-main-title { font-size: 26px; font-weight: 800; color: var(--text-charcoal); letter-spacing: -0.5px; }
.scite-search-card-bar { background: #ffffff; border: 1px solid var(--border-light); width: 100%; max-width: 680px; padding: 10px 14px; border-radius: 30px; display: flex; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
.scite-search-card-bar input { flex: 1; border: none; outline: none; font-size: 14px; color: var(--text-charcoal); padding-left: 8px; }
.scite-action-controls { display: flex; align-items: center; gap: 12px; }
.control-node-txt { font-size: 10px; font-weight: bold; color: var(--text-slate); cursor: pointer; }
.scite-circle-btn { width: 32px; height: 32px; background: var(--accent-blue); border: none; color: white; border-radius: 50%; font-size: 12px; cursor: pointer; display: flex; justify-content: center; align-items: center; }
.scite-sub-trust-caption { font-size: 11px; color: var(--text-slate); font-weight: 500; }

/* ⚙️ Focus-on-Demand Accordion Structure */
.workspace-folder-panel { display: none; width: 100%; }
.workspace-folder-panel.active-panel { display: flex; flex-direction: column; gap: 12px; }
.folder-title-tag { font-size: 11px; font-weight: 700; color: var(--accent-blue); letter-spacing: 1.5px; }

.accordion-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.accordion-card { background: var(--card-bg); border: 1px solid var(--border-light); border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; height: fit-content; transition: border 0.2s; }
.accordion-card:hover { border-color: #cbd5e1; }
.accordion-header { padding: 14px 20px; font-size: 13px; font-weight: bold; color: var(--text-charcoal); cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: rgba(248,250,252,0.6); }
.accordion-body { padding: 20px; display: none; border-top: 1px solid var(--border-light); background: #ffffff; }
.accordion-body p { font-size: 11px; color: var(--text-slate); margin-bottom: 12px; line-height: 1.4; }

textarea, .clean-dropdown, .clean-field-input { width: 100%; padding: 10px; background: #ffffff; border: 1px solid var(--border-light); border-radius: 6px; font-size: 12px; color: var(--text-charcoal); outline: none; margin-bottom: 10px; }
textarea { height: 64px; font-family: monospace; resize: none; }
.clean-dropdown { height: 36px; }

.btn-action-prime { background: var(--text-charcoal); color: white; font-size: 12px; font-weight: bold; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; text-align: center; }
.btn-action-prime:hover { background: #0f172a; }

.result-box { margin-top: 10px; padding: 10px; background: #f8fafc; border-left: 3px solid var(--accent-blue); font-family: monospace; font-size: 11px; color: #334155; line-height: 1.4; }
.canvas-holder { text-align: center; padding: 10px; background: #f8fafc; border-radius: 6px; margin-top: 6px; }
canvas { max-width: 100%; background: #ffffff; border: 1px solid var(--border-light); border-radius: 4px; }

/* 🌐 CSHL Verification Grid Shortcut Elements */
.cshl-link-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 6px; padding: 10px; }
.cshl-node { background: #ffffff; border: 1px solid var(--border-light); border-radius: 6px; padding: 12px 4px; text-align: center; color: var(--text-charcoal); font-size: 11px; font-weight: bold; text-decoration: none; transition: all 0.2s; }
.cshl-node:hover { border-color: var(--accent-blue); background: #f8fafc; color: var(--accent-blue); }

/* Data Center Framework Components */
.history-scroll-box { height: 130px; overflow-y: auto; background: #ffffff; border: 1px solid var(--border-light); padding: 10px; border-radius: 6px; font-family: monospace; font-size: 11px; display: flex; flex-direction: column; gap: 4px; }
.metric-row-strip { font-size: 12px; font-family: monospace; padding: 6px 0; border-bottom: 1px dashed var(--border-light); }

.mainframe-footer-tag { text-align: center; font-size: 11px; color: var(--text-slate); font-weight: 500; padding: 15px 0; border-top: 1px solid var(--border-light); margin-top: 20px; }

@media (max-width: 700px) {
    .auth-split-layout { grid-template-columns: 1fr; }
    .auth-form-column { border-right: none; border-bottom: 1px solid var(--border-light); }
    .sticky-nav-strip { flex-direction: column; gap: 8px; }
    .nav-links-cluster { flex-wrap: wrap; justify-content: center; }
    .accordion-grid { grid-template-columns: 1fr; }
    .accordion-card { grid-column: span 1 !important; }
}
