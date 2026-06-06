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
