// --- TOOL #1 ENGINE ---
function analyzeSequence() {
    const rawInput = document.getElementById('sequenceInput').value.trim().toUpperCase();
    const resultBox = document.getElementById('resultBox');
    if (!rawInput) { alert("Please enter a sequence matrix first."); return; }
    const totalLength = rawInput.length;
    const gcCount = (rawInput.match(/[GC]/g) || []).length;
    const gcPercentage = ((gcCount / totalLength) * 100).toFixed(2);
    resultBox.style.display = "block";
    resultBox.innerHTML = `<strong style="color: #00ff88;">ANALYSIS LOG MATRICES:</strong><br>-----------------------------------<br>• Total Sequence Length: ${totalLength} residues<br>• Total G/C Nucleotides: ${gcCount}<br>• Calculated GC Content: <span style="color: #00ff88; font-weight: bold;">${gcPercentage}%</span>`;
}

// --- TOOL #2 ENGINE ---
function transcribeSequence() {
    const input = document.getElementById('dogmaInput').value.trim().toUpperCase().replace(/[^ATCG-]/g, '').replace(/-/g, '');
    const outBox = document.getElementById('dogmaResultBox');
    if (!input) { alert("Please provide valid coding DNA template strands (A, T, C, G)."); return; }
    const mrna = input.replace(/T/g, 'U');
    const codonWheel = {
        'AUG':'Methionine (Start)','UUU':'Phenylalanine','UUC':'Phenylalanine','UUA':'Leucine','UUG':'Leucine','UCU':'Serine','UCC':'Serine','UCA':'Serine','UCG':'Serine','UAU':'Tyrosine','UAC':'Tyrosine','UGU':'Cysteine','UGC':'Cysteine','UGG':'Tryptophan','CUU':'Leucine','CUC':'Leucine','CUA':'Leucine','CUG':'Leucine','CCU':'Proline','CCC':'Proline','CCA':'Proline','CCG':'Proline','CAU':'His','CAC':'His','CAA':'Gln','CAG':'Gln','CGU':'Arg','CGC':'Arg','CGA':'Arg','CGG':'Arg','AUU':'Ile','AUC':'Ile','AUA':'Ile','ACU':'Thr','ACC':'Thr','ACA':'Thr','ACG':'Thr','AAU':'Asn','AAC':'Asn','AAA':'Lys','AAG':'Lys','AGU':'Ser','AGC':'Ser','AGA':'Arg','AGG':'Arg','GUU':'Val','GUC':'Val','GUA':'Val','GUG':'Val','GCU':'Ala','GCC':'Ala','GCA':'Ala','GCG':'Ala','GAU':'Asp','GAC':'Asp','GAA':'Glu','GAG':'Glu','GGU':'Gly','GGC':'Glycine','GGA':'Glycine','GGG':'Glycine'
    };
    let proteinChain = [];
    for (let i = 0; i < mrna.length - 2; i += 3) {
        let codon = mrna.substring(i, i + 3);
        let aminoAcid = codonWheel[codon] || '[Stop Codon Identified]';
        proteinChain.push(aminoAcid);
        if (aminoAcid === '[Stop Codon Identified]') break;
    }
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">TRANSCRIPTION & TRANSLATION LOGS:</strong><br>-----------------------------------<br>• Synthesized mRNA Strand: <br><span style="color: #06b6d4;">5'- ${mrna} -3'</span><br><br>• Decoded Peptide Chain: <br><span style="color: #00ff88;">${proteinChain.join(' ➔ ')}</span>`;
}

// --- TOOL #3 ENGINE ---
const aaDatabase = {
    'A': { name: "Alanine", mass: "89.10", pI: "6.00", sidechain: "Aliphatic Nonpolar Hydrophobic" },
    'R': { name: "Arginine", mass: "174.20", pI: "10.76", sidechain: "Positively Charged Basic Hydrophilic" },
    'C': { name: "Cysteine", mass: "121.16", pI: "5.07", sidechain: "Reactive Structural Sulfhydryl Thiol" },
    'D': { name: "Aspartic Acid", mass: "133.10", pI: "2.77", sidechain: "Negatively Charged Carboxyl Acidic" },
    'G': { name: "Glycine", mass: "75.07", pI: "5.97", sidechain: "Minimalist Achiral Conformational Flex" },
    'H': { name: "Histidine", mass: "155.16", pI: "7.59", sidechain: "Aromatic Imidazole Catalytic Ring" },
    'K': { name: "Lysine", mass: "146.19", pI: "9.74", sidechain: "Charged Butylammonium Basic Group" },
    'W': { name: "Tryptophan", mass: "204.23", pI: "5.89", sidechain: "Indole Outer Electronic UV Fluorescent Ring" }
};
function runAminoAcidLookup() {
    const selection = document.getElementById('aaSelect').value;
    const outBox = document.getElementById('aaResultBox');
    if (!selection) { outBox.style.display = "none"; return; }
    const data = aaDatabase[selection];
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">RESIDUE CHEMICAL PROFILE:</strong><br>-----------------------------------<br>• Nomenclature: <span style="color: #06b6d4;">${data.name} (${selection})</span><br>• Sidechain Property: ${data.sidechain}<br>• Monoisotopic Mass: ${data.mass} g/mol<br>• Isoelectric Point (pI): <span style="color: #00ff88; font-weight: bold;">${data.pI}</span>`;
}

// --- TOOL #4 ENGINE ---
const elementDatabase = {
    'C': { mass: "12.011", electro: "2.55", bond: "C-C: 348 kJ/mol", note: "Backbone structural infrastructure scaffolding node." },
    'H': { mass: "1.008", electro: "2.20", bond: "H-H: 436 kJ/mol", note: "Solvation matrix proton gradient active element." },
    'N': { mass: "14.007", electro: "3.04", bond: "C-N: 305 kJ/mol", note: "Amide resonance structural planar link generator." },
    'O': { mass: "15.999", electro: "3.44", bond: "C=O: 743 kJ/mol", note: "High coordinating dipoles hydrogen bonding acceptor." },
    'P': { mass: "30.974", electro: "2.19", bond: "P-O: 335 kJ/mol", note: "High-energy phosphoanhydride kinetic structural bridge." }
};
function runElementLookup() {
    const selection = document.getElementById('elementSelect').value;
    const outBox = document.getElementById('elementResultBox');
    if (!selection) { outBox.style.display = "none"; return; }
    const data = elementDatabase[selection];
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">ATOMIC PROFILE MATRIX:</strong><br>-----------------------------------<br>• Element Block: <span style="color: #06b6d4;">${selection}</span><br>• Atomic Mass weight: ${data.mass} g/mol<br>• Electronegativity Scale: ${data.electro}<br>• Base Bonding Enthalpy: ${data.bond}<br>• <small style="color: #94a3b8;">Biological Role: ${data.note}</small>`;
}

// --- TOOL #5 ENGINE ---
function runStatisticalOutlierEngine() {
    const rawData = document.getElementById('dataInput').value;
    const outBox = document.getElementById('dataResultBox');
    const dataArr = rawData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (dataArr.length < 3) { alert("Sample size insufficient. Please enter at least 3 numeric values."); return; }
    const mean = dataArr.reduce((a, b) => a + b, 0) / dataArr.length;
    const variance = dataArr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (dataArr.length - 1);
    const stdev = Math.sqrt(variance);
    const upperLimit = mean + (3 * stdev);
    const lowerLimit = mean - (3 * stdev);
    const outliers = dataArr.filter(x => x > upperLimit || x < lowerLimit);
    outBox.style.display = "block";
    let outlierReport = outliers.length > 0 ? `<span style="color: #ef4444; font-weight: bold;">⚠️ Outliers Flagged Beyond 3-Sigma Limits: [ ${outliers.join(', ')} ]</span>` : `<span style="color: #00ff88; font-weight: bold;">✅ Dataset Stable: Zero experimental outliers caught.</span>`;
    outBox.innerHTML = `<strong style="color: #00ff88;">STATISTICAL VARIANCE REPORT:</strong><br>-----------------------------------<br>• Population Count (N): ${dataArr.length} samples<br>• Mean Group Average (μ): ${mean.toFixed(4)}<br>• Standard Deviation (σ): ${stdev.toFixed(4)}<br><br>• Diagnostics Metric: ${outlierReport}`;
}

// --- TOOL #6 ENGINE ---
function runAIPredictorEngine() {
    const input = document.getElementById('aiPeptideInput').value.toUpperCase().trim().replace(/[^ACDEFGHIKLMNPQRSTVWY]/g, '');
    const outBox = document.getElementById('aiResultBox');
    if (!input) { alert("Please paste amino acid single-letter residues first."); return; }
    const hydroCount = (input.match(/[IVLFMACYW]/g) || []).length;
    const percentage = ((hydroCount / input.length) * 100).toFixed(1);
    const solubility = percentage > 45 ? "Low Fluidity Layer (Organic Co-Solvent Carriers Required)" : "High Fluidity Layer (Aqueous Solution Stable)";
    const routing = percentage > 45 ? "Reverse-Phase Lipophilic Matrix (C18 HPLC Parsing Lines)" : "Ion-Exchange Chromatography (IEX Gradient Lines)";
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">🧠 HEURISTIC AI FORECAST RADAR:</strong><br>-----------------------------------<br>• Target Sequence: <span style="color: #06b6d4; font-family: monospace;">${input}</span><br>• Hydrophobic Bulk Density: ${percentage}%<br><br>• Predicted Physical Profile: <br><span style="color: #e2e8f0;">${solubility}</span><br><br>• Recommended Purification Route: <br><span style="color: #00ff88; font-weight: bold;">${routing}</span>`;
}

// --- TOOL #7 ENGINE ---
function runMolarityCalculator() {
    const mw = parseFloat(document.getElementById('molInputMW').value);
    const molarity = parseFloat(document.getElementById('molInputMolarity').value);
    const volume = parseFloat(document.getElementById('molInputVolume').value);
    const outBox = document.getElementById('molarityResultBox');
    if (isNaN(mw) || isNaN(molarity) || isNaN(volume) || mw <= 0 || molarity <= 0 || volume <= 0) { alert("Please provide accurate, positive numbers for all solution metrics."); return; }
    const targetMass = molarity * (volume / 1000) * mw;
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">MASS CALCULATION METRICS:</strong><br>-----------------------------------<br>• Target Parameters: <span style="color: #06b6d4;">${molarity} M</span> in <span style="color: #06b6d4;">${volume} mL</span><br>• Solid Formula Weight: ${mw} g/mol<br><br>• Required Measure Target: <span style="color: #00ff88; font-weight: bold; font-size: 16px;">${targetMass.toFixed(4)} grams</span> of dry reagent powder.`;
}

// --- TOOL #8 ENGINE ---
function runBeerLambertCalculator() {
    const absorbance = parseFloat(document.getElementById('beerAbsorbance').value);
    const extinction = parseFloat(document.getElementById('beerExtinction').value);
    const pathLength = parseFloat(document.getElementById('beerPathLength').value);
    const outBox = document.getElementById('beerResultBox');
    if (isNaN(absorbance) || isNaN(extinction) || isNaN(pathLength) || absorbance <= 0 || extinction <= 0 || pathLength <= 0) { alert("Please enter valid positive numbers across all spectrophotometer scales."); return; }
    const molarConcentration = absorbance / (extinction * pathLength);
    const microMolar = molarConcentration * 1000000;
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">SPECTROSCOPY SCAN SPECTRUM LOGS:</strong><br>-----------------------------------<br>• Total Absorbed Light (A): ${absorbance}<br>• Extinction Coeff (ε): ${extinction} M⁻¹cm⁻¹<br><br>• Calculated Concentration Result: <br><span style="color: #00ff88; font-weight: bold; font-size: 16px;">${microMolar.toFixed(3)} μM</span> (Micromolar concentration)`;
}

// --- TOOL #9 ENGINE ---
function runPurityRatioInspector() {
    const a260 = parseFloat(document.getElementById('purityA260').value);
    const a280 = parseFloat(document.getElementById('purityA280').value);
    const outBox = document.getElementById('purityResultBox');
    if (isNaN(a260) || isNaN(a280) || a260 <= 0 || a280 <= 0) { alert("Please input accurate, positive optical density readings."); return; }
    const ratio = a260 / a280;
    let qualityDiagnostic = "";
    if (ratio >= 1.75 && ratio <= 1.85) { qualityDiagnostic = `<span style="color: #00ff88; font-weight: bold;">Pure DNA Extract Cleared.</span>`; } 
    else if (ratio >= 1.95 && ratio <= 2.05) { qualityDiagnostic = `<span style="color: #00ff88; font-weight: bold;">Pure RNA Extract Cleared.</span>`; } 
    else if (ratio > 1.85 && ratio < 1.95) { qualityDiagnostic = `<span style="color: #06b6d4; font-weight: bold;">Mixed Nucleic Extraction (DNA/RNA Equilibrium)</span>`; } 
    else { qualityDiagnostic = `<span style="color: #ef4444; font-weight: bold;">⚠️ Contamination Detected: Impure sample matrix. Protein or organic residue detected.</span>`; }
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">SPECTRAL PURITY ANALYSIS REPORT:</strong><br>-----------------------------------<br>• Absorbance Ratio Metrics (A₂₆₀ / A₂₈₀): <span style="color: #06b6d4; font-weight: bold;">${ratio.toFixed(3)}</span><br><br>• Quality Assurance Diagnostics:<br>${qualityDiagnostic}`;
}

// --- TOOL #10 ENGINE ---
function runDilutionEquation() {
    const c1 = parseFloat(document.getElementById('dilutionC1').value);
    const c2 = parseFloat(document.getElementById('dilutionC2').value);
    const v2 = parseFloat(document.getElementById('dilutionV2').value);
    const outBox = document.getElementById('dilutionResultBox');
    if (isNaN(c1) || isNaN(c2) || isNaN(v2) || c1 <= 0 || c2 <= 0 || v2 <= 0) { alert("Please enter positive, non-zero values for all dilution blocks."); return; }
    if (c2 > c1) { alert("Target working concentration (C2) cannot exceed initial stock strength (C1)."); return; }
    const v1 = (c2 * v2) / c1;
    const solventNeeded = v2 - v1;
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">VOLUMETRIC DILUTION MIX RECIPE:</strong><br>-----------------------------------<br>• Target: Make <span style="color: #06b6d4;">${v2} mL</span> of <span style="color: #06b6d4;">${c2}X strength solution</span><br>• From a concentrated stock strength of: ${c1}X<br>-----------<br>• Concentrated Stock Aliquot to pipe ($V_1$): <span style="color: #00ff88; font-weight: bold;">${v1.toFixed(2)} mL</span><br>• Water / Buffer Solvent to add: <span style="color: #06b6d4; font-weight: bold;">${solventNeeded.toFixed(2)} mL</span>`;
}

// --- TOOL #11 ENGINE ---
function runPCRMasterMixFormulator() {
    const tubes = parseInt(document.getElementById('pcrTubesCount').value);
    const outBox = document.getElementById('pcrMixResultBox');
    if (isNaN(tubes) || tubes <= 0) { alert("Please provide a valid number of reaction tubes."); return; }
    const baselineReagents = [
        { name: "Molecular Grade H₂O", unitVol: 12.5 }, { name: "10X Taq Buffer Matrix", unitVol: 2.5 },
        { name: "Forward Primer (10 μM)", unitVol: 1.0 }, { name: "Reverse Primer (10 μM)", unitVol: 1.0 },
        { name: "dNTPs Mix Core (10 mM)", unitVol: 0.5 }, { name: "Active Taq DNA Polymerase", unitVol: 0.25 },
        { name: "Template Extraction DNA", unitVol: 7.25 }
    ];
    const scaleMultiplier = tubes * 1.1; let listRows = "";
    baselineReagents.forEach(r => { const totalVol = r.unitVol * scaleMultiplier; listRows += `• ${r.name}: <span style="color: #06b6d4;">${r.unitVol} μL</span> ➔ <span style="color: #00ff88; font-weight: bold;">${totalVol.toFixed(2)} μL</span> bulk<br>`; });
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">PCR BULK RECIPE FORMULATION:</strong><br>• Reaction Count: ${tubes} tubes (+10% wall-loss safety padding applied)<br>-----------------------------------<br>${listRows}`;
}

// --- TOOL #12 ENGINE ---
function runEnzymeKineticsEngine() {
    const vmax = parseFloat(document.getElementById('enzymeVmax').value);
    const km = parseFloat(document.getElementById('enzymeKm').value);
    const substrate = parseFloat(document.getElementById('enzymeSubstrate').value);
    const outBox = document.getElementById('enzymeResultBox');
    if (isNaN(vmax) || isNaN(km) || isNaN(substrate) || vmax <= 0 || km <= 0 || substrate <= 0) { alert("Please provide positive numerical dimensions for all velocity indexes."); return; }
    const initialVelocity = (vmax * substrate) / (km + substrate);
    const canvas = document.getElementById('kineticsCanvas'); const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height);
    const leftMargin = 25, bottomMargin = 135, graphWidth = 260, graphHeight = 115;
    ctx.beginPath(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1; ctx.moveTo(leftMargin, 10); ctx.lineTo(leftMargin, bottomMargin); ctx.lineTo(leftMargin + graphWidth, bottomMargin); ctx.stroke();
    const maxScanSubstrateRange = Math.max(substrate * 2, km * 4, 10);
    ctx.beginPath(); ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 2;
    for (let x = leftMargin; x <= leftMargin + graphWidth; x++) {
        let currentScanS = ((x - leftMargin) / graphWidth) * maxScanSubstrateRange;
        let calculatedV = (vmax * currentScanS) / (km + currentScanS);
        let y = bottomMargin - (calculatedV / vmax) * graphHeight;
        if (x === leftMargin) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const dotX = leftMargin + (substrate / maxScanSubstrateRange) * graphWidth; const dotY = bottomMargin - (initialVelocity / vmax) * graphHeight;
    if (dotX <= leftMargin + graphWidth && dotY >= 10) { ctx.beginPath(); ctx.fillStyle = '#06b6d4'; ctx.arc(dotX, dotY, 4, 0, 2 * Math.PI); ctx.fill(); }
    outBox.style.display = "block";
    outBox.innerHTML = `<strong style="color: #00ff88;">SATURATION VELOCITY METRICS:</strong><br>-----------------------------------<br>• Constant Load Substrate [S]: ${substrate} mM<br>• Yield Initial Velocity ($v_0$): <span style="color: #00ff88; font-weight: bold; font-size: 16px;">${initialVelocity.toFixed(4)} μmol/min</span><br><br>• <small style="color: #94a3b8;">Saturation Scale: ${((initialVelocity / vmax) * 100).toFixed(1)}% of Vmax potential reached.</small>`;
}

// --- TOOL #13 ENGINE ---
function runBufferTitrationEngine() {
    const pKa = parseFloat(document.getElementById('titrationBuffer').value);
    const baseEquiv = parseFloat(document.getElementById('titrationBase').value);
    const outBox = document.getElementById('titrationResultBox');

    if (isNaN(baseEquiv) || baseEquiv <= 0 || baseEquiv >= 1) {
        alert("Please enter a base equivalent value strictly between 0.01 and 0.99.");
        return;
    }

    // Solve pH via Henderson-Hasselbalch equation
    const pH = pKa + Math.log10(baseEquiv / (1 - baseEquiv));

    // Render Canvas Titration Sigmoid Curve lines
    const canvas = document.getElementById('titrationCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const leftMargin = 25, bottomMargin = 135, graphWidth = 260, graphHeight = 115;

    // Draw axis lines
    ctx.beginPath();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.moveTo(leftMargin, 10);
    ctx.lineTo(leftMargin, bottomMargin);
    ctx.lineTo(leftMargin + graphWidth, bottomMargin);
    ctx.stroke();

    // Plot full mathematical trajectory curve loop
    ctx.beginPath();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;

    for (let x = leftMargin; x <= leftMargin + graphWidth; x++) {
        let pct = (x - leftMargin) / graphWidth;
        if (pct < 0.01) pct = 0.01;
        if (pct > 0.99) pct = 0.99;
        
        let currentPH = pKa + Math.log10(pct / (1 - pct));
        // Map pH metrics scale (0 to 14) onto the graph layout grid height
        let y = bottomMargin - (currentPH / 14) * graphHeight;

        if (x === leftMargin) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Plot real-time configuration dot tracking intersection node
    const dotX = leftMargin + baseEquiv * graphWidth;
    const dotY = bottomMargin - (pH / 14) * graphHeight;

    ctx.beginPath();
    ctx.fillStyle = '#06b6d4';
    ctx.arc(dotX, dotY, 4, 0, 2 * Math.PI);
    ctx.fill();

    outBox.style.display = "block";
    outBox.innerHTML = `
        <strong style="color: #00ff88;">EQUILIBRIUM TITRATION MATRIX REPORT:</strong><br>
        -----------------------------------<br>
        • System settings: pKa reference value = ${pKa}<br>
        • Base Load ratio: ${baseEquiv} equivalents added<br><br>
        • Calculated Solution State: <span style="color: #00ff88; font-weight: bold; font-size: 16px;">pH = ${pH.toFixed(2)}</span>
    `;
}
