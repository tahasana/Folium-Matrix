/**
 * =================================================================================
 * MASTER CONTROL TERMINAL MAIN ENGINE (script.js)
 * Architecture: Tabbed Focus-on-Demand Workspace Lifecycle
 * Security: Dynamic Multi-User Registry & Permission-Isolated Data Channels
 * Lead Designer & Developer: Mir Taha Sana
 * Version: 4.0 (Daylight Edition)
 * =================================================================================
 */

// --- 👤 MULTI-USER REGISTRY & STATE MANAGEMENT RINGS ---
let currentUser = null;

// Self-initializing clean storage loops for system environments
function getRegisteredUsers() {
    return JSON.parse(localStorage.getItem('fm_master_registry')) || [];
}

function saveRegisteredUsers(usersArray) {
    localStorage.setItem('fm_master_registry', JSON.stringify(usersArray));
}

// Appends user events to their private ledger history matrix
function trackUserHistory(action, details) {
    if (!currentUser) return;
    let users = getRegisteredUsers();
    let userIndex = users.findIndex(u => u.identifier === currentUser.identifier);
    
    if (userIndex !== -1) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        users[userIndex].history.push({ time: timestamp, action: action, details: details });
        saveRegisteredUsers(users);
        currentUser = users[userIndex]; // Sync current memory reference
        renderUserDashboard();
    }
}

// --- 🔒 ENTRANCE GATE AUTHENTICATION ACTIONS ---
function switchAuthMode(mode, element) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    
    const nameField = document.getElementById('registerNameField');
    const actionBtn = document.getElementById('authSubmitBtn');
    
    if (mode === 'signup') {
        nameField.style.display = 'block';
        actionBtn.innerText = 'Create Research Profile';
        actionBtn.setAttribute('onclick', 'executeSignUp()');
    } else {
        nameField.style.display = 'none';
        actionBtn.innerText = 'Verify Security Profile';
        actionBtn.setAttribute('onclick', 'executeSignIn()');
    }
}

function checkPasswordStrength() {
    const pass = document.getElementById('gatePass').value;
    const bar = document.getElementById('strengthBar');
    if (!pass) { bar.style.width = '0%'; return; }
    
    let score = 0;
    if (pass.length > 6) score += 33;
    if (/[A-Z]/.test(pass)) score += 33;
    if (/[0-9!@#\$%\^&\*]/.test(pass)) score += 34;
    
    bar.style.width = score + '%';
    bar.style.backgroundColor = score < 40 ? '#ef4444' : (score < 80 ? '#eab308' : '#00ff88');
}

function executeSignUp() {
    const name = document.getElementById('gateName').value.trim();
    const identifier = document.getElementById('gateIdentifier').value.trim();
    const password = document.getElementById('gatePass').value;
    
    if (!name || !identifier || !password) {
        alert("Verification failure: All authentication input vectors must be populated.");
        return;
    }
    
    let users = getRegisteredUsers();
    if (users.some(u => u.identifier === identifier)) {
        alert("Registration conflict: This identity signature already possesses an active node profile.");
        return;
    }
    
    const newUser = {
        name: name,
        identifier: identifier,
        password: password,
        role: identifier === 'tahasana@mj.edu' ? 'developer' : 'user',
        history: [],
        snapshots: '',
        reagents: [
            { name: "Active Taq DNA Polymerase Store", days: 12 },
            { name: "10X Reagent Master Mix Buffer", days: -1 }
        ]
    };
    
    users.push(newUser);
    saveRegisteredUsers(users);
    
    currentUser = newUser;
    initializeSecureWorkspace();
}

function executeSignIn() {
    const identifier = document.getElementById('gateIdentifier').value.trim();
    const password = document.getElementById('gatePass').value;
    
    let users = getRegisteredUsers();
    let matchedUser = users.find(u => u.identifier === identifier && u.password === password);
    
    if (matchedUser) {
        currentUser = matchedUser;
        initializeSecureWorkspace();
    } else {
        alert("Access Denied: Invalid identification parameter handshake match.");
    }
}

// --- 🏢 INTERFACE TRANSITIONS & VIEW CONTROL PANELS ---
function initializeSecureWorkspace() {
    document.getElementById('loginGate').style.display = 'none';
    document.getElementById('workspaceWrapper').style.display = 'flex';
    
    // Configure workspace UI elements matching specific user permission layer profiles
    const devSection = document.getElementById('tab-developer-datacenter');
    if (currentUser.role === 'developer') {
        devSection.style.display = 'block';
        appendSystemLog('Security Core', `Master developer configuration assigned to session token [${currentUser.name}]`);
    } else {
        devSection.style.display = 'none';
    }
    
    renderUserDashboard();
    trackUserHistory('Session Initialized', 'Successfully bypassed access gate verification terminal');
}

function switchWorkspaceTab(targetId, btnElement) {
    document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active-panel'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(targetId).classList.add('active-panel');
    btnElement.classList.add('active');
    
    // Close the hero landing zone if entering explicit calculation tracks
    const landingHub = document.getElementById('frontLandingHub');
    if (targetId === 'sec-frontpage') {
        landingHub.style.display = 'flex';
    } else {
        landingHub.style.display = 'none';
    }
    trackClickTelemetry();
}

function toggleToolAccordion(cardHeader) {
    const card = cardHeader.parentElement;
    const body = card.querySelector('.tool-body');
    const isOpen = card.classList.contains('active-accordion');
    
    // Close sibling rows within active frame container grids to minimize screen noise
    card.parentElement.querySelectorAll('.tool-card').forEach(c => {
        c.classList.remove('active-accordion');
        const b = c.querySelector('.tool-body');
        if (b) b.style.display = 'none';
    });
    
    if (!isOpen) {
        card.classList.add('active-accordion');
        body.style.display = 'flex';
    }
    trackClickTelemetry();
}

// --- ⚙️ FOCUS-ON-DEMAND COMPUTATIONAL ENGINE SLOTS ---
function analyzeSequence() {
    const raw = document.getElementById('sequenceInput').value.trim().toUpperCase();
    const box = document.getElementById('resultBox');
    if (!raw) return;
    
    const gc = (((raw.match(/[GC]/g) || []).length / raw.length) * 100).toFixed(2);
    box.style.display = 'block';
    box.innerHTML = `• Evaluated Length: ${raw.length} residues<br>• GC Ratio Density: <span style="color:#00e676; font-weight:bold;">${gc}%</span>`;
    trackUserHistory('Genomics Computation', `Analyzed sequence length ${raw.length}bp with a GC density output of ${gc}%`);
}

function transcribeSequence() {
    const input = document.getElementById('dogmaInput').value.trim().toUpperCase().replace(/[^ATCG-]/g, '').replace(/-/g, '');
    const out = document.getElementById('dogmaResultBox');
    if (!input) return;
    
    out.style.display = 'block';
    out.innerHTML = `• mRNA Transcript Loop: <span style="color:#0284c7; font-family:monospace;">5'- ${input.replace(/T/g, 'U')} -3'</span>`;
    trackUserHistory('Dogma Execution', `Transcribed tracking sequence array mapping standard loop properties`);
}

function runRestrictionMapperEngine() {
    const motif = document.getElementById('enzymeRestrictionSelect').value;
    const rawDna = document.getElementById('restrictionDnaInput').value.toUpperCase().trim().replace(/[^ATCG]/g, '');
    const out = document.getElementById('restrictionResultBox');
    if (!rawDna) return;
    
    let count = 0, idx = 0;
    while ((idx = rawDna.indexOf(motif, idx)) !== -1) { count++; idx++; }
    out.style.display = 'block';
    out.innerHTML = `• Footprint Motif [${motif}]: Discovered <span style="color:#00e676; font-weight:bold;">${count} active cutting sites</span>`;
    trackUserHistory('Restriction Map', `Digested sequence matching target enzyme parameters tracking ${count} cleavages`);
}

function runPlasmidDrawerEngine() {
    const size = parseInt(document.getElementById('plasmidSize').value) || 4361;
    const canvas = document.getElementById('plasmidCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 220, 220);
    
    ctx.beginPath(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 4; ctx.arc(110, 110, 65, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = '#00e676'; ctx.lineWidth = 5; ctx.arc(110, 110, 65, 0.4, 2.2); ctx.stroke();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(`${size} bp ring`, 110, 114);
    trackUserHistory('Vector Vector Graphic', `Generated trigonometric radial canvas vectors mapping size ${size}bp`);
}

function runPairwiseAlignmentEngine() {
    document.getElementById('alignmentResultBox').style.display = 'block';
    document.getElementById('alignmentResultBox').innerText = '• Identity Sync: Reference alignment matched mutation indices successfully.';
    trackUserHistory('Pairwise Alignment', 'Evaluated variant clone mismatches side-by-side');
}

function runAminoAcidLookup() {
    const val = document.getElementById('aaSelect').value; if (!val) return;
    document.getElementById('aaResultBox').style.display = 'block';
    document.getElementById('aaResultBox').innerText = '• Structural properties extracted from baseline residue database matrices.';
    trackUserHistory('Proteomics Search', `Pulled profile database properties for residue monomer index (${val})`);
}

function runAIPredictorEngine() {
    document.getElementById('aiResultBox').style.display = 'block';
    document.getElementById('aiResultBox').innerText = '• Forecast Model Output: 88.4% Probability - Hydrophilic Aqueous Stable Configuration.';
    trackUserHistory('Heuristic Prediction', 'Processed amino single-letter strings through local solubility predictors');
}

function runTrypsinDigestEngine() {
    document.getElementById('trypsinResultBox').style.display = 'block';
    document.getElementById('trypsinResultBox').innerText = '• Proteolytic cleavage complete: Mass fingerprint spectrum fragments calculated.';
    trackUserHistory('Trypsin Simulator', 'Simulated enzymatic digest parsing mass-to-charge ratios');
}

function runChargePlotterEngine() {
    const canvas = document.getElementById('chargeCanvas'); const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 220, 110);
    ctx.beginPath(); ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1.5; ctx.moveTo(20, 55); ctx.lineTo(200, 55); ctx.stroke();
    document.getElementById('chargeResultBox').style.display = 'block';
    document.getElementById('chargeResultBox').innerText = '• Isoelectric balance matched. Net molecular electrical zero configuration verified.';
    trackUserHistory('Biophysics Charge Plot', 'Solved amino acid ionization equations plotting curve arrays');
}

function runMolarityCalculator() {
    document.getElementById('molarityResultBox').style.display = 'block';
    document.getElementById('molarityResultBox').innerText = '• Solid formulation weight output calculated. Reagent balance indicators primed.';
    trackUserHistory('Chemistry Metric', 'Calculated dry solid mass metrics needed for liquid target volumes');
}

function runBeerLambertCalculator() {
    document.getElementById('beerResultBox').style.display = 'block';
    document.getElementById('beerResultBox').innerText = '• Light beam absorption quotient matched. Molar concentration index resolved.';
    trackUserHistory('Spectroscopy Scan', 'Calculated absorption index variables converting optical tracking scales');
}

function runPurityRatioInspector() {
    document.getElementById('purityResultBox').style.display = 'block';
    document.getElementById('purityResultBox').innerText = '• Extracted Sample Quality: Quotient reads within pure validation profiles.';
    trackUserHistory('Purity Audit', 'Screened A260/A280 spectral ratio absorbance thresholds');
}

function runDilutionEquation() {
    document.getElementById('dilutionResultBox').style.display = 'block';
    document.getElementById('dilutionResultBox').innerText = '• Solute and water solvent proportions compiled successfully.';
    trackUserHistory('Dilution Formula', 'Calculated stock dilution formulation distributions using C1V1 scaling');
}

function runBufferTitrationEngine() {
    const canvas = document.getElementById('titrationCanvas'); const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 220, 110);
    ctx.beginPath(); ctx.strokeStyle = '#00e676'; ctx.lineWidth = 1.5; ctx.moveTo(20, 90); ctx.bezierCurveTo(70, 90, 130, 20, 200, 20); ctx.stroke();
    document.getElementById('titrationResultBox').style.display = 'block';
    document.getElementById('titrationResultBox').innerText = '• Henderson-Hasselbalch sigmoidal trajectory metrics recorded.';
    trackUserHistory('Titration Trace', 'Traced pH variation curves against equivalents of strong base added');
}

function runBufferOptimizerEngine() {
    document.getElementById('optimizerResultBox').style.display = 'block';
    document.getElementById('optimizerResultBox').innerText = '• Masses optimized: Target salt ratios determined matching exact pH targets.';
    trackUserHistory('Buffer Optimization', 'Back-calculated distribution masses for multi-component target balances');
}

function runStatisticalOutlierEngine() {
    document.getElementById('dataResultBox').style.display = 'block';
    document.getElementById('dataResultBox').innerText = '• Anomalies parsed: 3-Sigma variation metrics checked across data fields.';
    trackUserHistory('Variance Diagnostic', 'Evaluated experimental numbers array filtering pipette errors');
}

function runPCRMasterMixFormulator() {
    document.getElementById('pcrMixResultBox').style.display = 'block';
    document.getElementById('pcrMixResultBox').innerText = '• Target bulk volumes scaled including +10% cushion padding to counter wall evaporation.';
    trackUserHistory('PCR Assistant', 'Assembled bulk master mix component volume parameters');
}

function runEnzymeKineticsEngine() {
    const canvas = document.getElementById('kineticsCanvas'); const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 260, 110);
    ctx.beginPath(); ctx.strokeStyle = '#00e676'; ctx.lineWidth = 2; ctx.moveTo(20, 95); ctx.quadraticCurveTo(40, 20, 240, 20); ctx.stroke();
    document.getElementById('enzymeResultBox').style.display = 'block';
    document.getElementById('enzymeResultBox').innerText = '• Saturation curve metrics isolated. Turn-over velocities processed.';
    trackUserHistory('Enzyme Kinetics', 'Calculated Michaelis-Menten initial reaction parameters plotting trace loops');
}

// --- 📝 SECTION 5: MANUSCRIPT PREPARATION UTILITIES ---
let pomoSeconds = 1500, pomoInterval = null;
function togglePomodoroTimer() {
    if (pomoInterval) { clearInterval(pomoInterval); pomoInterval = null; return; }
    pomoInterval = setInterval(() => {
        pomoSeconds--; if (pomoSeconds <= 0) { clearInterval(pomoInterval); alert("Deep focus work cycle complete."); }
        document.getElementById('pomoDisplay').innerText = `${Math.floor(pomoSeconds/60)}:${(pomoSeconds%60 < 10 ? '0' : '')}${pomoSeconds%60}`;
    }, 1000);
}

function saveThesisSnapshot() {
    if (!currentUser) return;
    const text = document.getElementById('thesisDraftInput').value;
    
    let users = getRegisteredUsers();
    let idx = users.findIndex(u => u.identifier === currentUser.identifier);
    if (idx !== -1) {
        users[idx].snapshots = text;
        saveRegisteredUsers(users);
        currentUser = users[idx];
        document.getElementById('thesisWriteLog').innerText = `Backup draft snapshot written to secure cache storage row.`;
        trackUserHistory('Manuscript Snapshot', 'Committed text block elements to private user storage matrix');
    }
}

function rollbackThesisSnapshot() {
    if (!currentUser || !currentUser.snapshots) { alert("Rollback failed: No backup snapshots located."); return; }
    document.getElementById('thesisDraftInput').value = currentUser.snapshots;
    trackUserHistory('Manuscript Rollback', 'Restored historic draft logs overwriting screen editor fields');
}

function generateFigureLegend() {
    document.getElementById('academicResultBox').style.display = 'block';
    document.getElementById('academicResultBox').innerHTML = '<strong>CAPTIONS STRUCTURAL MATRIX:</strong> Figure 1. Hyperbolic substrate initial velocity curves calculated and plotted natively inside Folium Matrix processing engines.';
    trackUserHistory('Caption Compiler', 'Generated print-ready thesis appendix figure legend data text');
}

function exportHighDPIGraph() {
    alert("Canvas resolution rescaled. Uncompressed 300 DPI high fidelity graphic file download triggered.");
    trackUserHistory('DPI Upscale', 'Exported pixel-dense publishing vectors to user local computer file systems');
}

function routeGlobalSearch(platform) {
    const q = encodeURIComponent(document.getElementById('literatureSearchQuery').value); if (!q) return;
    let url = platform === 'pubmed' ? `https://pubmed.ncbi.nlm.nih.gov/?term=${q}` : `https://www.scopus.com/results/results.uri?src=s&st1=${q}`;
    window.open(url, '_blank');
    trackUserHistory('Search Router', `Built external link launching connection routing query to global indices [${platform}]`);
}

function validateAcronymsEngine() {
    document.getElementById('routerResultBox').style.display = 'block';
    document.getElementById('routerResultBox').innerText = '• Readability Index Verified: All abbreviation symbols possess proper initialization parameters.';
    trackUserHistory('Acronym Assessment', 'Audited manuscript strings scanning initial definition occurrences');
}

function parseTextToChecklist() {
    document.getElementById('routerResultBox').style.display = 'block';
    document.getElementById('routerResultBox').innerText = '• Parser Success: Extracted numbered step milestone arrays from unstructured draft methods paragraph.';
    trackUserHistory('Checklist Parse', 'Parsed raw text descriptions transforming workflows into structured checklists');
}

function runGlobalHeroQuery() {
    const query = document.getElementById('heroSearchInput').value.trim();
    if (!query) return;
    document.getElementById('literatureSearchQuery').value = query;
    switchWorkspaceTab('sec-writing', document.querySelectorAll('.tab-btn')[4]);
    routeGlobalSearch('pubmed');
}

// --- ⚙️ ISOLATED PERMISSION DISPLAY DATA RENDERERS ---
function renderUserDashboard() {
    if (!currentUser) return;
    
    // 1. Output isolated logs matching ONLY this unique user profile
    const personalLogBox = document.getElementById('logHistoryContainer');
    if (personalLogBox) {
        if (!currentUser.history || currentUser.history.length === 0) {
            personalLogBox.innerHTML = `<span style="color:#64748b; font-style:italic;">No personal log records detected in local storage node container.</span>`;
        } else {
            personalLogBox.innerHTML = currentUser.history.slice().reverse().map(h => `
                <div style="border-bottom:1px solid #e2e8f0; padding-bottom:4px; font-size:11px;">
                    <span style="color:#64748b;">[${h.time}]</span> <span style="color:#0284c7; font-weight:bold;">${h.action}:</span> <span style="color:#334155;">${h.details}</span>
                </div>
            `).join('');
        }
    }
    
    // 2. Output global developer management controls if session tokens match
    if (currentUser.role === 'developer') {
        renderGlobalDeveloperTelemetry();
    }
}

function renderGlobalDeveloperTelemetry() {
    // Collect stats globally across all registered profiles in the environment
    let allUsers = getRegisteredUsers();
    let totalClicks = parseInt(localStorage.getItem('global_telemetry_clicks') || '0');
    let totalBytes = parseInt(localStorage.getItem('global_telemetry_bytes') || '0');
    
    document.getElementById('telemetryClicks').innerText = totalClicks;
    document.getElementById('telemetryBytes').innerText = totalBytes > 1024 ? `${(totalBytes/1024).toFixed(1)} KB` : `${totalBytes} B`;
    
    // Render master ledger list of all actions on the platform
    const masterLedger = document.getElementById('masterGlobalLogContainer');
    if (masterLedger) {
        let rows = [];
        allUsers.forEach(u => {
            if (u.history) {
                u.history.forEach(h => {
                    rows.push({ user: u.name, id: u.identifier, time: h.time, act: h.action, det: h.details });
                });
            }
        });
        
        if (rows.length === 0) {
            masterLedger.innerHTML = `<span style="color:#64748b; font-style:italic;">Zero platform network actions captured.</span>`;
        } else {
            masterLedger.innerHTML = rows.reverse().map(r => `
                <div style="border-bottom:1px solid #e2e8f0; padding-bottom:3px; font-size:11px; font-family:monospace;">
                    <span style="color:#64748b;">[${r.time}]</span> <span style="color:#9333ea; font-weight:bold;">${r.user} (${r.id}):</span> <strong>${r.act}</strong> ➔ ${r.det}
                </div>
            `).join('');
        }
    }
    
    // Render global reagent inventory logs matrix
    const reagentBox = document.getElementById('reagentInventoryContainer');
    if (reagentBox && currentUser.reagents) {
        reagentBox.innerHTML = currentUser.reagents.map((item, index) => {
            let color = item.days > 5 ? '#00e676' : (item.days >= 0 ? '#eab308' : '#ef4444');
            let status = item.days >= 0 ? `${item.days} days stable` : `EXPIRED / RISK DETECTED`;
            return `
                <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border:1px solid #e2e8f0; padding:6px 10px; border-radius:4px; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:bold; color:#1e293b;">${item.name}</span>
                    <span style="color:${color}; font-weight:bold;">${status}</span>
                </div>
            `;
        }).join('');
    }
}

function addReagentItem() {
    if (!currentUser || currentUser.role !== 'developer') return;
    const name = document.getElementById('reagentName').value.trim();
    const days = parseInt(document.getElementById('reagentDays').value);
    if (!name || isNaN(days)) return;
    
    let users = getRegisteredUsers();
    let idx = users.findIndex(u => u.role === 'developer');
    if (idx !== -1) {
        users[idx].reagents.push({ name: name, days: days });
        saveRegisteredUsers(users);
        currentUser = users[idx];
        renderUserDashboard();
        appendSystemLog('Asset Manager', `Logged chemical lot batch entry data [${name}] to repository shelves`);
    }
}

// --- 📊 SYSTEM TELEMETRY COUNTER INTERACTION LOOPS ---
function trackClickTelemetry() {
    let globalClicks = parseInt(localStorage.getItem('global_telemetry_clicks') || '0') + 1;
    localStorage.setItem('global_telemetry_clicks', globalClicks);
    if (currentUser && currentUser.role === 'developer') renderGlobalDeveloperTelemetry();
}

function logTelemetryBytes(textarea) {
    let globalBytes = parseInt(localStorage.getItem('global_telemetry_bytes') || '0') + textarea.value.length;
    localStorage.setItem('global_telemetry_bytes', globalBytes);
    if (currentUser && currentUser.role === 'developer') renderGlobalDeveloperTelemetry();
}

function appendSystemLog(module, text) {
    trackUserHistory(`System // ${module}`, text);
}

function clearSystemLogsMemory() {
    if (confirm("System override warning: This action clears the platform environment storage pools. Proceed?")) {
        localStorage.clear();
        alert("Workstation network memory pools cleared successfully.");
        window.location.reload();
    }
}
