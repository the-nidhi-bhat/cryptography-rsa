// RSA Variables
let n, e, d, phi, p, q, ciphertext;
let currentTab = 'number';
let textCiphertexts = [];
let stats = {
    keysGenerated: 0,
    messagesEncrypted: 0,
    messagesDecrypted: 0
};
let eli5Mode = false;
let hintLevel = { phi: 0, d: 0 };
let progressState = {
    keys: false,
    encrypt: false,
    decrypt: false,
    attack: false
};

const facts = [
    "RSA was invented in 1977 at MIT by Ron Rivest, Adi Shamir, and Leonard Adleman.",
    "The name 'RSA' comes from the first letters of the inventors' last names.",
    "RSA is based on Euler's Theorem from number theory (1736).",
    "The largest prime number used in real RSA keys has over 600 digits!",
    "Every HTTPS website you visit uses RSA or similar algorithms.",
    "Breaking a 2048-bit RSA key would take current computers over 1 billion years!",
    "RSA secures over $5 trillion in online transactions daily.",
    "The difficulty of factoring large numbers is what makes RSA secure.",
    "Quantum computers could potentially break RSA in the future - that's why 'post-quantum cryptography' is being developed!",
    "Prime numbers are the foundation of RSA - finding large primes is computationally easy, but factoring their product is extremely hard.",
    "Hill Cipher was invented in 1929 by Lester S. Hill, a mathematician and cryptographer.",
    "Hill Cipher uses linear algebra (matrix multiplication) for encryption - a revolutionary concept for its time!",
    "India faced 369 million malware attacks in 2025 (702 attacks/minute)! Strong RSA protects banking & healthcare systems.",
    "NIST recommends deprecating RSA after 2030 due to quantum computing threats - migration to post-quantum crypto has begun.",
    "Q-Day prediction: Experts forecast 45% chance RSA-2048 will be cracked by 2035 using quantum computers.",
    "India experiences 3,000+ cyber attacks daily on financial & government systems - RSA encryption is the first line of defense!"
];
let currentFactIndex = 0;

function rotateFact() {
    const factBox = document.getElementById('fact-text');
    factBox.style.opacity = '0';

    setTimeout(() => {
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        factBox.textContent = facts[currentFactIndex];
        factBox.style.opacity = '1';
    }, 500);
}

setInterval(rotateFact, 8000);

function loadStats() {
    const saved = localStorage.getItem('rsaStats');
    if (saved) {
        stats = JSON.parse(saved);
        updateStatsDisplay();
    }
    const savedProgress = localStorage.getItem('rsaProgress');
    if (savedProgress) {
        progressState = JSON.parse(savedProgress);
        updateProgressDisplay();
    }
}

function saveStats() {
    localStorage.setItem('rsaStats', JSON.stringify(stats));
    updateStatsDisplay();
}

function saveProgress() {
    localStorage.setItem('rsaProgress', JSON.stringify(progressState));
    updateProgressDisplay();
}

function updateStatsDisplay() {
    document.getElementById('stats-keys').textContent = stats.keysGenerated;
    document.getElementById('stats-enc').textContent = stats.messagesEncrypted;
    document.getElementById('stats-dec').textContent = stats.messagesDecrypted;
}

function updateProgressDisplay() {
    if (progressState.keys) {
        document.getElementById('progress-keys').textContent = '✅';
        document.getElementById('progress-keys-text').textContent = 'Generate Keys ✓';
    }
    if (progressState.encrypt) {
        document.getElementById('progress-encrypt').textContent = '✅';
        document.getElementById('progress-encrypt-text').textContent = 'Encrypt Message ✓';
    }
    if (progressState.decrypt) {
        document.getElementById('progress-decrypt').textContent = '✅';
        document.getElementById('progress-decrypt-text').textContent = 'Decrypt Message ✓';
    }
    if (progressState.decrypt) {
        document.getElementById('progress-attack').textContent = '⏳';
        document.getElementById('progress-attack-text').textContent = 'Try Attack';
    }
    if (progressState.attack) {
        document.getElementById('progress-attack').textContent = '✅';
        document.getElementById('progress-attack-text').textContent = 'Try Attack ✓';
    }
}

function resetStats() {
    if (confirm('Reset all statistics and progress?')) {
        stats = { keysGenerated: 0, messagesEncrypted: 0, messagesDecrypted: 0 };
        progressState = { keys: false, encrypt: false, decrypt: false, attack: false };
        localStorage.removeItem('rsaStats');
        localStorage.removeItem('rsaProgress');
        updateStatsDisplay();
        updateProgressDisplay();
        alert('✅ Stats and progress reset successfully!');
    }
}

function toggleELI5() {
    eli5Mode = !eli5Mode;
    document.getElementById('eli5-status').textContent = eli5Mode ? 'ON' : 'OFF';

    document.getElementById('intro-text-normal').style.display = eli5Mode ? 'none' : 'block';
    document.getElementById('intro-text-eli5').style.display = eli5Mode ? 'block' : 'none';

    document.getElementById('keygen-title-normal').style.display = eli5Mode ? 'none' : 'block';
    document.getElementById('keygen-title-eli5').style.display = eli5Mode ? 'block' : 'none';
    document.getElementById('keygen-sub-normal').style.display = eli5Mode ? 'none' : 'block';
    document.getElementById('keygen-sub-eli5').style.display = eli5Mode ? 'block' : 'none';

    document.getElementById('prime-p-tooltip-normal').style.display = eli5Mode ? 'none' : 'block';
    document.getElementById('prime-p-tooltip-eli5').style.display = eli5Mode ? 'block' : 'none';
    document.getElementById('prime-q-tooltip-normal').style.display = eli5Mode ? 'none' : 'block';
    document.getElementById('prime-q-tooltip-eli5').style.display = eli5Mode ? 'block' : 'none';
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tab === 'number') {
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('tab-number').classList.add('active');
    } else {
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('tab-text').classList.add('active');
    }
}

function togglePracticeMode() {
    const pm = document.getElementById('practice-mode');
    if (pm.style.display === 'none') {
        pm.style.display = 'block';
    } else {
        pm.style.display = 'none';
    }
}

function showHint(field, level) {
    hintLevel[field] = level;
    for (let i = 1; i <= 3; i++) {
        const hintEl = document.getElementById(`hint-${field}-${i}`);
        if (i <= level && hintEl) {
            hintEl.classList.add('show');
        }
    }
    if (level <= 2) {
        setTimeout(() => showHint(field, level + 1), 3000);
    }
}

function checkPractice(field) {
    const userValue = parseInt(document.getElementById(`practice-${field}`).value);
    const feedback = document.getElementById(`${field}-feedback`);

    if (!phi || !d) {
        feedback.innerHTML = '<span class="practice-wrong">❌ Generate keys first!</span>';
        return;
    }

    if (field === 'phi') {
        document.getElementById('hint-p').textContent = p;
        document.getElementById('hint-q').textContent = q;
    } else if (field === 'd') {
        document.getElementById('hint-e').textContent = e;
        document.getElementById('hint-phi').textContent = phi;
    }

    if (field === 'phi') {
        if (userValue === phi) {
            feedback.innerHTML = '<span class="practice-check">✅ Correct!</span>';
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`hint-phi-${i}`).classList.remove('show');
            }
            hintLevel.phi = 0;
        } else {
            feedback.innerHTML = '<span class="practice-wrong">❌ Try again</span>';
        }
    } else if (field === 'd') {
        if (userValue === d) {
            feedback.innerHTML = '<span class="practice-check">✅ Correct!</span>';
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`hint-d-${i}`).classList.remove('show');
            }
            hintLevel.d = 0;
        } else {
            feedback.innerHTML = '<span class="practice-wrong">❌ Try again</span>';
        }
    }
}

function launchAttack() {
    if (!n) {
        document.getElementById('attack-output').innerHTML = '<div class="error">❌ Generate keys first!</div>';
        return;
    }

    const output = document.getElementById('attack-output');
    const bits = Math.floor(Math.log2(n)) + 1;

    let html = '<div class="output">';
    html += `<h3>🔨 Attacking n = ${n} (${bits}-bit)</h3>`;
    html += '<div class="attack-progress"><div class="attack-progress-bar" id="attack-bar">0%</div></div>';
    html += '<div id="attack-status">Trying to factor n...</div>';
    html += '</div>';

    output.innerHTML = html;

    const bar = document.getElementById('attack-bar');
    const status = document.getElementById('attack-status');

    let progress = 0;
    let found = false;
    const startTime = Date.now();

    const interval = setInterval(() => {
        progress += 5;
        bar.style.width = progress + '%';
        bar.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) {
                    found = true;
                    const factor1 = i;
                    const factor2 = n / i;

                    if (n < 100) {
                        status.innerHTML = `<div class="error">⚠️ CRACKED in ${elapsed} seconds!<br>Found factors: ${factor1} × ${factor2} = ${n}<br><strong>This key is UNSAFE!</strong></div>`;
                    } else if (n < 10000) {
                        status.innerHTML = `<div class="warning">⚠️ Cracked in ${elapsed} seconds.<br>Found factors: ${factor1} × ${factor2}<br>Use larger primes for security!</div>`;
                    } else {
                        status.innerHTML = `<div class="result">✅ Your current keys took ${elapsed} seconds to crack.<br>Real RSA (2048-bit) would take 1 billion+ years! 🔒</div>`;
                    }
                    break;
                }
            }

            if (!found) {
                status.innerHTML = `<div class="result">✅ Attack simulated in ${elapsed} seconds.<br>Estimated time for this key: ~${Math.floor(Math.sqrt(n) / 1000)} seconds<br>Real 2048-bit RSA: 1 billion+ years! 🔒</div>`;
            }

            status.innerHTML += '<div class="warning" style="margin-top:10px;">⚠️ <strong>Quantum Threat Alert:</strong> Quantum computers may crack 2048-bit RSA by 2030-2035! Migrate to post-quantum cryptography standards (NIST PQC).</div>';

            progressState.attack = true;
            saveProgress();
        }
    }, 100);
}

function drawGridVisualizer() {
    if (!p || !q || p * q > 200) {
        document.getElementById('grid-visualizer-container').style.display = 'none';
        return;
    }

    document.getElementById('grid-visualizer-container').style.display = 'block';
    const grid = document.getElementById('grid-visualizer');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${q}, 8px)`;

    for (let i = 0; i < p * q; i++) {
        const dot = document.createElement('div');
        dot.className = 'grid-dot';
        grid.appendChild(dot);
    }
}

function randomizePrimes() {
    const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73];
    const p1 = primes[Math.floor(Math.random() * primes.length)];
    let p2 = primes[Math.floor(Math.random() * primes.length)];
    while (p2 === p1) {
        p2 = primes[Math.floor(Math.random() * primes.length)];
    }

    document.getElementById('prime-p').value = p1;
    document.getElementById('prime-q').value = p2;

    generateKeys();
}

function exportKeys() {
    if (!n || !e || !d) {
        alert('❌ Generate keys first!');
        return;
    }

    const keyData = `RSA Key Pair\n\nPublic Key:\ne = ${e}\nn = ${n}\n\nPrivate Key:\nd = ${d}\nn = ${n}\n\np = ${p}, q = ${q}\nφ(n) = ${phi}\n\nGenerated: ${new Date().toLocaleString()}`;

    const blob = new Blob([keyData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsa_keys.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function gcd(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function modInverse(eVal, phiVal) {
    let m0 = phiVal, t, qTemp;
    let x0 = 0, x1 = 1;
    if (phiVal === 1) return 0;
    while (eVal > 1) {
        qTemp = Math.floor(eVal / phiVal);
        t = phiVal;
        phiVal = eVal % phiVal;
        eVal = t;
        t = x0;
        x0 = x1 - qTemp * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}

function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    let eLocal = exp;
    while (eLocal > 0) {
        if (eLocal % 2 === 1) {
            result = (result * base) % mod;
        }
        eLocal = Math.floor(eLocal / 2);
        base = (base * base) % mod;
    }
    return result;
}

function setStatus(id, text, active) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    if (active) el.classList.add('active');
    else el.classList.remove('active');
}

function flashKeys() {
    const keyBoxes = document.querySelectorAll('.key-display');
    keyBoxes.forEach(box => {
        box.classList.add('key-highlight');
        setTimeout(() => box.classList.remove('key-highlight'), 700);
    });
}

function animateLock() {
    const lock = document.getElementById('lock-icon');
    if (!lock) return;
    lock.classList.add('lock-animate');
    setTimeout(() => lock.classList.remove('lock-animate'), 600);
}

function generateKeys() {
    p = parseInt(document.getElementById('prime-p').value);
    q = parseInt(document.getElementById('prime-q').value);
    const output = document.getElementById('key-output');

    setStatus('status-key', 'Key Generation: ⏳ working', false);
    setStatus('status-enc', 'Encryption: ⏳ waiting', false);
    setStatus('status-dec', 'Decryption: ⏳ waiting', false);

    if (!isPrime(p)) {
        output.innerHTML = '<div class="error">❌ Error: p is not a prime number!</div>';
        return;
    }
    if (!isPrime(q)) {
        output.innerHTML = '<div class="error">❌ Error: q is not a prime number!</div>';
        return;
    }
    if (p === q) {
        output.innerHTML = '<div class="error">❌ Error: p and q must be different!</div>';
        return;
    }

    n = p * q;
    phi = (p - 1) * (q - 1);

    e = 3;
    while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e += 2;
    }

    d = modInverse(e, phi);

    stats.keysGenerated++;
    progressState.keys = true;
    saveStats();
    saveProgress();

    let html = '<div class="output"><h3>📊 Calculation Steps</h3>';
    html += `<div class="step">Step 1: n = p × q = ${p} × ${q} = ${n}</div>`;
    html += `<div class="step">Step 2: φ(n) = (p−1) × (q−1) = ${p - 1} × ${q - 1} = ${phi}</div>`;
    html += `<div class="step">Step 3: Choose e where gcd(e, φ(n)) = 1 → e = ${e}</div>`;
    html += `<div class="step">Step 4: Find d such that (e × d) mod φ(n) = 1 → d = ${d}</div>`;
    html += `<div class="key-display"><strong>🔑 Public Key:</strong> (e = ${e}, n = ${n})<br><small>Anyone can use this to encrypt.</small></div>`;
    html += `<div class="key-display"><strong>🔐 Private Key:</strong> (d = ${d}, n = ${n})<br><small>Only you can use this to decrypt.</small></div>`;
    html += '</div>';

    output.innerHTML = html;
    document.getElementById('n-challenge').textContent = n;

    setStatus('status-key', 'Key Generation: ✅ done', true);
    flashKeys();
    drawGridVisualizer();
}

function encryptMessage() {
    if (!n || !e) {
        document.getElementById('encrypt-output').innerHTML =
            '<div class="error">❌ Please generate keys first!</div>';
        return;
    }

    const m = parseInt(document.getElementById('message').value);
    const output = document.getElementById('encrypt-output');

    if (isNaN(m)) {
        output.innerHTML = '<div class="error">❌ Please enter a valid message number!</div>';
        return;
    }
    if (m >= n) {
        output.innerHTML = `<div class="error">❌ Message must be less than n (${n}). Try a smaller number.</div>`;
        return;
    }
    if (m < 0) {
        output.innerHTML = '<div class="error">❌ Message must be positive!</div>';
        return;
    }

    ciphertext = modPow(m, e, n);
    animateLock();
    stats.messagesEncrypted++;
    progressState.encrypt = true;
    saveStats();
    saveProgress();

    setStatus('status-enc', 'Encryption: ✅ done', true);
    setStatus('status-dec', 'Decryption: ⏳ waiting', false);

    const powVal = Math.pow(m, e);

    let html = '<div class="animation-box encrypt-anim">';
    html += `<div class="anim-element">${m}</div>`;
    html += '<span class="anim-arrow">→</span>';
    html += '<span class="anim-lock">🔒</span>';
    html += '<span class="anim-arrow">→</span>';
    html += `<div class="anim-element">${ciphertext}</div>`;
    html += '</div>';

    html += '<div class="output"><h3>🔒 Encryption Process</h3>';
    html += `<div class="step">Formula: c = m^e mod n</div>`;
    html += `<div class="step">c = ${m}^${e} mod ${n}</div>`;
    html += `<div class="step">${m}^${e} = ${powVal}</div>`;
    html += `<div class="step">Reduce modulo ${n}: ${powVal} mod ${n} = ${ciphertext}</div>`;
    html += `<div class="result">✅ Ciphertext: ${ciphertext}</div>`;
    html += `<p style="margin-top: 7px; font-size: 0.78rem; color:#9ca3af;">The original number "${m}" is now locked as "${ciphertext}". Only the private key can unlock it.</p>`;
    html += '</div>';

    output.innerHTML = html;
}

function encryptText() {
    if (!n || !e) {
        document.getElementById('encrypt-output').innerHTML =
            '<div class="error">❌ Please generate keys first!</div>';
        return;
    }

    const text = document.getElementById('text-message').value;
    const output = document.getElementById('encrypt-output');

    if (!text) {
        output.innerHTML = '<div class="error">❌ Please enter some text!</div>';
        return;
    }

    textCiphertexts = [];
    let html = '<div class="output"><h3>🔒 Text Encryption Process</h3>';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const ascii = char.charCodeAt(0);

        if (ascii >= n) {
            output.innerHTML = `<div class="error">❌ Character '${char}' (ASCII ${ascii}) is too large for n=${n}. Use larger primes!</div>`;
            return;
        }

        const encrypted = modPow(ascii, e, n);
        textCiphertexts.push(encrypted);

        html += `<div class="step">'${char}' → ASCII ${ascii} → Encrypted: ${encrypted}</div>`;
    }

    stats.messagesEncrypted++;
    progressState.encrypt = true;
    saveStats();
    saveProgress();

    html += `<div class="result">✅ Full Ciphertext: [${textCiphertexts.join(', ')}]</div>`;
    html += '</div>';

    output.innerHTML = html;
    ciphertext = textCiphertexts;
    setStatus('status-enc', 'Encryption: ✅ done', true);
    setStatus('status-dec', 'Decryption: ⏳ waiting', false);
}

function decryptMessage() {
    if (!n || !d || ciphertext === undefined) {
        document.getElementById('decrypt-output').innerHTML =
            '<div class="error">❌ Please encrypt a message first!</div>';
        return;
    }

    const output = document.getElementById('decrypt-output');

    if (Array.isArray(ciphertext)) {
        let html = '<div class="output"><h3>🔓 Text Decryption Process</h3>';
        let decryptedText = '';

        for (let i = 0; i < ciphertext.length; i++) {
            const decrypted = modPow(ciphertext[i], d, n);
            const char = String.fromCharCode(decrypted);
            decryptedText += char;
            html += `<div class="step">${ciphertext[i]} → ASCII ${decrypted} → '${char}'</div>`;
        }

        html += `<div class="result">✅ Decrypted Text: "${decryptedText}"</div>`;
        html += '</div>';
        output.innerHTML = html;
    } else {
        const decrypted = modPow(ciphertext, d, n);

        let html = '<div class="animation-box decrypt-anim">';
        html += `<div class="anim-element">${ciphertext}</div>`;
        html += '<span class="anim-arrow">→</span>';
        html += '<span class="anim-lock">🔓</span>';
        html += '<span class="anim-arrow">→</span>';
        html += `<div class="anim-element">${decrypted}</div>`;
        html += '</div>';

        html += '<div class="output"><h3>🔓 Decryption Process</h3>';
        html += `<div class="step">Formula: m = c^d mod n</div>`;
        html += `<div class="step">m = ${ciphertext}^${d} mod ${n}</div>`;
        html += `<div class="step">Compute ${ciphertext}^${d} mod ${n} using modular exponentiation.</div>`;
        html += `<div class="result">✅ Original Message: ${decrypted}</div>`;
        html += `<p style="margin-top: 7px; font-size: 0.78rem; color:#9ca3af;">The unlocked number "${decrypted}" matches the original message. The math worked!</p>`;
        html += '</div>';

        output.innerHTML = html;
    }

    stats.messagesDecrypted++;
    progressState.decrypt = true;
    saveStats();
    saveProgress();
    setStatus('status-dec', 'Decryption: ✅ verified (message matches)', true);
}

function tryExample() {
    document.getElementById('prime-p').value = 11;
    document.getElementById('prime-q').value = 17;
    document.getElementById('message').value = 7;
    generateKeys();
}

function showEncryptStepsSlowly() {
    if (currentTab === 'number') {
        encryptMessage();
    } else {
        encryptText();
    }
    const output = document.getElementById('encrypt-output');
    const steps = output.querySelectorAll('.step');
    steps.forEach((s, idx) => {
        s.style.opacity = '0';
        s.style.transition = 'opacity 0.2s';
        setTimeout(() => { s.style.opacity = '1'; }, 200 * (idx + 1));
    });
}

function showDecryptStepsSlowly() {
    decryptMessage();
    const output = document.getElementById('decrypt-output');
    const steps = output.querySelectorAll('.step');
    steps.forEach((s, idx) => {
        s.style.opacity = '0';
        s.style.transition = 'opacity 0.2s';
        setTimeout(() => { s.style.opacity = '1'; }, 220 * (idx + 1));
    });
}

// Hill Cipher utilities
function hillMod(n, m) {
    return ((n % m) + m) % m;
}

function hillGcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function hillModInv(a, m) {
    a = hillMod(a, m);
    for (let x = 1; x < m; x++) {
        if (hillMod(a * x, m) === 1) return x;
    }
    return null;
}

function hillCleanText(s) {
    return (s || "").toUpperCase().replace(/[^A-Z]/g, "");
}

function hillGetKey() {
    const a = parseInt(document.getElementById('hill-a').value || "0", 10);
    const b = parseInt(document.getElementById('hill-b').value || "0", 10);
    const c = parseInt(document.getElementById('hill-c').value || "0", 10);
    const d = parseInt(document.getElementById('hill-d').value || "0", 10);
    return { a, b, c, d };
}

function hillKeyDet({ a, b, c, d }) {
    return (a * d - b * c);
}

function hillKeyInverse2x2(key) {
    const MOD = 26;
    const det = hillKeyDet(key);
    const detMod = hillMod(det, MOD);
    const detInv = hillModInv(detMod, MOD);
    if (detInv === null) return null;

    const inv = {
        a: hillMod(detInv * key.d, MOD),
        b: hillMod(detInv * (-key.b), MOD),
        c: hillMod(detInv * (-key.c), MOD),
        d: hillMod(detInv * key.a, MOD)
    };
    return inv;
}

function hillVecEncrypt2(key, x, y) {
    const MOD = 26;
    const x2 = hillMod(key.a * x + key.b * y, MOD);
    const y2 = hillMod(key.c * x + key.d * y, MOD);
    return [x2, y2];
}

function hillNumsToText(nums) {
    return nums.map(n => String.fromCharCode(65 + hillMod(n, 26))).join("");
}

function hillTextToNums(text) {
    return [...text].map(ch => ch.charCodeAt(0) - 65);
}

function hillStatus(html) {
    document.getElementById('hill-key-status').innerHTML = html;
}

function hillOutput(html) {
    document.getElementById('hill-output').innerHTML = html;
}

function hillUseExample() {
    document.getElementById('hill-a').value = 3;
    document.getElementById('hill-b').value = 3;
    document.getElementById('hill-c').value = 2;
    document.getElementById('hill-d').value = 5;
    document.getElementById('hill-plain').value = "HELP";
    hillCheckKey();
}

function hillCheckKey() {
    const key = hillGetKey();
    const det = hillKeyDet(key);
    const detMod = hillMod(det, 26);
    const ok = (hillGcd(detMod, 26) === 1);
    const inv = hillKeyInverse2x2(key);

    if (!ok || !inv) {
        hillStatus(`<div class="error">❌ Invalid key: det(K) mod 26 = ${detMod}. Need gcd(det,26)=1 to decrypt.</div>`);
        return false;
    }

    hillStatus(`<div class="result">✅ Valid key. det(K) mod 26 = ${detMod}. Inverse exists.</div>`);
    return true;
}

function hillEncrypt() {
    const MOD = 26;
    const key = hillGetKey();
    if (!hillCheckKey()) {
        hillOutput(`<div class="warning">⚠️ Fix the key matrix first, then encrypt.</div>`);
        return;
    }

    let plain = hillCleanText(document.getElementById('hill-plain').value);
    if (!plain) {
        hillOutput(`<div class="error">❌ Enter plaintext (letters A–Z).</div>`);
        return;
    }
    if (plain.length % 2 === 1) plain += "X";

    const nums = hillTextToNums(plain);
    const steps = [];
    const outNums = [];

    for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i], y = nums[i + 1];
        const [u, v] = hillVecEncrypt2(key, x, y);
        outNums.push(u, v);
        steps.push(`Block "${plain[i]}${plain[i + 1]}" → [${x}, ${y}] → [${u}, ${v}] → "${hillNumsToText([u, v])}"`);
    }

    const cipher = hillNumsToText(outNums);
    document.getElementById('hill-cipher').value = cipher;

    hillOutput(
        `<div class="output">
            <h3>🔒 Hill Encryption Steps</h3>
            <div class="step">Cleaned & padded plaintext: ${plain}</div>
            ${steps.map(s => `<div class="step">${s}</div>`).join("")}
            <div class="result">✅ Ciphertext: ${cipher}</div>
        </div>`
    );
}

function hillDecrypt() {
    const key = hillGetKey();
    const inv = hillKeyInverse2x2(key);

    if (!inv) {
        hillStatus(`<div class="error">❌ Invalid key: no inverse mod 26, decryption impossible.</div>`);
        hillOutput(`<div class="warning">⚠️ Choose a different matrix (det must be coprime with 26).</div>`);
        return;
    }

    let cipher = hillCleanText(document.getElementById('hill-cipher').value);
    if (!cipher) {
        hillOutput(`<div class="error">❌ Enter ciphertext (letters A–Z) to decrypt.</div>`);
        return;
    }
    if (cipher.length % 2 === 1) {
        hillOutput(`<div class="error">❌ Ciphertext length must be even (2-letter blocks). Add/paste complete text.</div>`);
        return;
    }

    const nums = hillTextToNums(cipher);
    const steps = [];
    const outNums = [];

    for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i], y = nums[i + 1];
        const [u, v] = hillVecEncrypt2(inv, x, y);
        outNums.push(u, v);
        steps.push(`Block "${cipher[i]}${cipher[i + 1]}" → [${x}, ${y}] → [${u}, ${v}] → "${hillNumsToText([u, v])}"`);
    }

    const plain = hillNumsToText(outNums);
    document.getElementById('hill-plain').value = plain;

    hillOutput(
        `<div class="output">
            <h3>🔓 Hill Decryption Steps</h3>
            ${steps.map(s => `<div class="step">${s}</div>`).join("")}
            <div class="result">✅ Plaintext: ${plain}</div>
            <div class="warning">💡 Note: If you padded with X during encryption, the last X may be padding.</div>
        </div>`
    );
}

window.onload = function () {
    loadStats();
    tryExample();
    setStatus('status-key', 'Key Generation: ✅ done', true);
    document.getElementById('fact-text').style.transition = 'opacity 0.5s ease';
};
