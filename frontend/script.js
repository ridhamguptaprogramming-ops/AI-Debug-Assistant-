async function analyzeCode() {
    const code = document.getElementById('code').value;
    const language = document.getElementById('lang').value;
    
    if (!code.trim()) {
        alert('Please enter some code to analyze!');
        return;
    }
    
    document.getElementById('output').innerHTML = 'Analyzing... 🔄';
    
    try {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language })
        });
        
        const data = await response.json();
        document.getElementById('output').innerHTML = data.result;
        document.getElementById('history').innerHTML = '';
    } catch (error) {
        document.getElementById('output').innerHTML = 'Error connecting to backend. Make sure server is running!';
    }
}

async function getHistory() {
    try {
        const response = await fetch('http://localhost:5000/history');
        const history = await response.json();
        let historyHtml = '## Recent Analysis History\\n\\n';
        
        if (history.length === 0) {
            historyHtml += 'No history yet. Analyze some code first!';
        } else {
            history.slice(-5).reverse().forEach(item => {
                historyHtml += `**${new Date(item.timestamp).toLocaleString()}** (${item.language})\\n`;
                historyHtml += `Code: ${item.code.substring(0, 100)}...\\n\\n`;
            });
        }
        
        document.getElementById('history').innerHTML = historyHtml;
        document.getElementById('output').innerHTML = '';
    } catch (error) {
        document.getElementById('history').innerHTML = 'Error fetching history.';
    }
}

// Enter key to analyze
document.getElementById('code').addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        analyzeCode();
    }
});

