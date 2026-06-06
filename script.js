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
        'AUG':'Methionine (Start)','UUU':'Phenylalanine','UUC':'Phenylalanine','UUA':'Leucine','UUG':'Leucine','UCU':'Serine','UCC':'Serine','UCA':'Serine','UCG':'Serine','UAU':'Tyrosine','UAC':'Tyrosine','UGU':'Cysteine','UGC':'Cysteine','UGG':'Tryptophan','CUU':'Leucine','CUC':'Leucine','CUA':'Leucine','CUG':'Leucine','CCU':'Proline','CCC':'Proline','CCA':'Proline','CCG':'Proline','CAU':'Histidine','CAC':'Histidine','CAA':'Glutamine','CAG':'Glutamine','CGU':'Arginine','CGC':'Arginine','CGA':'Arginine','CGG':'Arginine','AUU':'Isoleucine','AUC':'Isoleucine','AUA':'Isoleucine','ACU':'Threonine','ACC':'Threonine','ACA':'Threonine','ACG':'Threonine','AAU':'Asparagine','AAC':'Asparagine','AAA':'Lysine','AAG':'Lysine','AGU':'Serine','AGC':'Serine','AGA':'Arginine','AGG':'Arginine','GUU':'Valine','GUC':'Valine','GUA':'Valine','GUG':'Valine','GCU':'Alanine','GCC':'Alanine','GCA':'Alanine','GCG':'Alanine','GAU':'Aspartic Acid','GAC':'Aspartic Acid','GAA':'Glutamic Acid','GAG':'Glutamic Acid','GGU':'Glycine','GGC':'Glycine','GGA':'Glycine','GGG':'Glycine'
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

    if (isNaN(mw) || isNaN(molarity) || isNaN(volume) || mw <= 0 || molarity <= 0 || volume <= 0) {
        alert("Please provide accurate, positive numbers for all solution metrics.");
        return;
    }

    // Convert mL to Liters and solve equation: Mass = M * V * MW
    const targetMass = molarity * (volume / 1000) * mw;

    outBox.style.display = "block";
    outBox.innerHTML = `
        <strong style="color: #00ff88;">MASS CALCULATION METRICS:</strong><br>
        -----------------------------------<br>
        • Target Parameters: <span style="color: #06b6d4;">${molarity} M</span> in <span style="color: #06b6d4;">${volume} mL</span><br>
        • Solid Formula Weight: ${mw} g/mol<br><br>
        • Required Measure Target: <span style="color: #00ff88; font-weight: bold; font-size: 16px;">${targetMass.toFixed(4)} grams</span> of dry reagent powder.
    `;
}
