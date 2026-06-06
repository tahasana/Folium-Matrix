// --- TOOL #1 ENGINE ---
function analyzeSequence() {
    const rawInput = document.getElementById('sequenceInput').value.trim().toUpperCase();
    const resultBox = document.getElementById('resultBox');
    
    if (!rawInput) {
        alert("Please enter a sequence matrix first.");
        return;
    }

    const totalLength = rawInput.length;
    const gcCount = (rawInput.match(/[GC]/g) || []).length;
    const gcPercentage = ((gcCount / totalLength) * 100).toFixed(2);

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <strong style="color: #00ff88;">ANALYSIS LOG MATRICES:</strong><br>
        -----------------------------------<br>
        • Total Sequence Length: ${totalLength} residues<br>
        • Total G/C Nucleotides: ${gcCount}<br>
        • Calculated GC Content: <span style="color: #00ff88; font-weight: bold;">${gcPercentage}%</span>
    `;
}

// --- TOOL #2 ENGINE ---
function transcribeSequence() {
    const input = document.getElementById('dogmaInput').value.trim().toUpperCase().replace(/[^ATCG-]/g, '').replace(/-/g, '');
    const outBox = document.getElementById('dogmaResultBox');
    
    if (!input) {
        alert("Please provide valid coding DNA template strands (A, T, C, G).");
        return;
    }
    
    // 1. Transcription Phase: Convert DNA Thymin (T) into RNA Uracil (U)
    const mrna = input.replace(/T/g, 'U');
    
    // 2. Translation Phase Matrix Dictionary
    const codonWheel = {
        'AUG':'Methionine (Start)','UUU':'Phenylalanine','UUC':'Phenylalanine','UUA':'Leucine','UUG':'Leucine',
        'UCU':'Serine','UCC':'Serine','UCA':'Serine','UCG':'Serine','UAU':'Tyrosine','UAC':'Tyrosine',
        'UGU':'Cysteine','UGC':'Cysteine','UGG':'Tryptophan','CUU':'Leucine','CUC':'Leucine','CUA':'Leucine',
        'CUG':'Leucine','CCU':'Proline','CCC':'Proline','CCA':'Proline','CCG':'Proline','CAU':'Histidine',
        'CAC':'Histidine','CAA':'Glutamine','CAG':'Glutamine','CGU':'Arginine','CGC':'Arginine','CGA':'Arginine',
        'CGG':'Arginine','AUU':'Isoleucine','AUC':'Isoleucine','AUA':'Isoleucine','ACU':'Threonine',
        'ACC':'Threonine','ACA':'Threonine','ACG':'Threonine','AAU':'Asparagine','AAC':'Asparagine',
        'AAA':'Lysine','AAG':'Lysine','AGU':'Serine','AGC':'Serine','AGA':'Arginine','AGG':'Arginine',
        'GUU':'Valine','GUC':'Valine','GUA':'Valine','GUG':'Valine','GCU':'Alanine','GCC':'Alanine',
        'GCA':'Alanine','GCG':'Alanine','GAU':'Aspartic Acid','GAC':'Aspartic Acid','GAA':'Glutamic Acid',
        'GAG':'Glutamic Acid','GGU':'Glycine','GGC':'Glycine','GGA':'Glycine','GGG':'Glycine'
    };

    let proteinChain = [];
    
    // Scan strings in clusters of 3 elements (Codons)
    for (let i = 0; i < mrna.length - 2; i += 3) {
        let codon = mrna.substring(i, i + 3);
        let aminoAcid = codonWheel[codon] || '[Stop Codon Identified]';
        proteinChain.push(aminoAcid);
        if (aminoAcid === '[Stop Codon Identified]') break;
    }

    outBox.style.display = "block";
    outBox.innerHTML = `
        <strong style="color: #00ff88;">TRANSCRIPTION & TRANSLATION LOGS:</strong><br>
        -----------------------------------<br>
        • Synthesized mRNA Strand: <br><span style="color: #06b6d4;">5'- ${mrna} -3'</span><br><br>
        • Decoded Peptide Chain: <br><span style="color: #00ff88;">${proteinChain.join(' ➔ ')}</span>
    `;
}
