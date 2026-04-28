const exchangeRates = {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 148.50, RWF: 1300,
    CAD: 1.35, AUD: 1.52, CHF: 0.91, CNY: 7.25, INR: 83.50,
    UGX: 3750, CDF: 2800
};

const currencyNames = {
    USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen",
    RWF: "Rwandan Franc", CAD: "Canadian Dollar", AUD: "Australian Dollar",
    CHF: "Swiss Franc", CNY: "Chinese Yuan", INR: "Indian Rupee",
    UGX: "Ugandan Shilling", CDF: "Congolese Franc"
};

const trendData = {
    RWF: [1280, 1290, 1300, 1310, 1305, 1295, 1300],
    EUR: [0.94, 0.93, 0.92, 0.91, 0.92, 0.91, 0.92]
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function filterCurrencies(type) {
    let searchTerm = document.getElementById(`search${type}`).value.toLowerCase();
    let select = document.getElementById(`${type}Currency`);
    let options = select.options;
    for (let i = 0; i < options.length; i++) {
        let text = options[i].text.toLowerCase();
        if (text.includes(searchTerm)) {
            options[i].style.display = '';
        } else {
            options[i].style.display = 'none';
        }
    }
}

function swapCurrencies() {
    let fromSelect = document.getElementById('fromCurrency');
    let toSelect = document.getElementById('toCurrency');
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    performConversion();
}

function saveToHistory(amount, from, to, result, rate) {
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    history.unshift({
        date: new Date().toLocaleString(),
        from: from, to: to, amount: amount, result: result, rate: rate
    });
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
}

function performConversion() {
    let amount = parseFloat(document.getElementById('amountInput').value);
    if (isNaN(amount) || amount <= 0) {
        amount = 0;
        document.getElementById('amountInput').value = 0;
    }
    let fromCurr = document.getElementById('fromCurrency').value;
    let toCurr = document.getElementById('toCurrency').value;
    let amountInUSD = amount / exchangeRates[fromCurr];
    let convertedAmount = amountInUSD * exchangeRates[toCurr];
    let rate = exchangeRates[toCurr] / exchangeRates[fromCurr];
    let resultText = `${convertedAmount.toFixed(2)} ${toCurr}`;
    if (amount > 0) {
        saveToHistory(amount, fromCurr, toCurr, resultText, rate.toFixed(4));
    }
    document.getElementById('resultAmount').innerHTML = `${amount} ${fromCurr} = ${convertedAmount.toFixed(2)} ${toCurr}`;
    document.getElementById('resultRate').innerHTML = `1 ${fromCurr} = ${rate.toFixed(4)} ${toCurr} | 1 ${toCurr} = ${(1/rate).toFixed(4)} ${fromCurr}`;
    document.getElementById('resultTime').innerHTML = `Last updated: ${new Date().toLocaleString()}`;
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    let tbody = document.getElementById('historyList');
    let emptyMsg = document.getElementById('emptyMsg');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (history.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';
    history.forEach(item => {
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = item.date;
        row.insertCell(1).innerHTML = item.from;
        row.insertCell(2).innerHTML = item.to;
        row.insertCell(3).innerHTML = item.amount;
        row.insertCell(4).innerHTML = item.result;
        row.insertCell(5).innerHTML = item.rate;
    });
}

function filterHistory() {
    let filter = document.getElementById('currencyFilter').value;
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    let filtered = filter === 'all' ? history : history.filter(h => h.from === filter || h.to === filter);
    let tbody = document.getElementById('historyList');
    let emptyMsg = document.getElementById('emptyMsg');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (filtered.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';
    filtered.forEach(item => {
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = item.date;
        row.insertCell(1).innerHTML = item.from;
        row.insertCell(2).innerHTML = item.to;
        row.insertCell(3).innerHTML = item.amount;
        row.insertCell(4).innerHTML = item.result;
        row.insertCell(5).innerHTML = item.rate;
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all conversion history?')) {
        localStorage.removeItem('conversionHistory');
        loadHistory();
    }
}

function setDarkMode() {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

function setLightMode() {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
}

function applyTheme() {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
}

function saveDefaultCurrency() {
    let defaultCurrency = document.getElementById('defaultCurrency').value;
    localStorage.setItem('defaultCurrency', defaultCurrency);
    applyDefaultCurrency();
    alert('Default currency saved!');
}

function applyDefaultCurrency() {
    let defaultCurrency = localStorage.getItem('defaultCurrency');
    if (defaultCurrency && document.getElementById('fromCurrency')) {
        document.getElementById('fromCurrency').value = defaultCurrency;
        performConversion();
    }
    if (defaultCurrency && document.getElementById('defaultCurrency')) {
        document.getElementById('defaultCurrency').value = defaultCurrency;
    }
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    let langText = document.getElementById('languageText');
    if (lang === 'en') langText.innerHTML = 'Current: English';
    else if (lang === 'sw') langText.innerHTML = 'Current: Swahili';
    else if (lang === 'rw') langText.innerHTML = 'Current: Kinyarwanda';
}

function applyLanguage() {
    let lang = localStorage.getItem('language') || 'en';
    let langText = document.getElementById('languageText');
    if (!langText) return;
    if (lang === 'en') langText.innerHTML = 'Current: English';
    else if (lang === 'sw') langText.innerHTML = 'Current: Swahili';
    else if (lang === 'rw') langText.innerHTML = 'Current: Kinyarwanda';
}

function filterCurrencyTable() {
    let searchTerm = document.getElementById('searchCurrency').value.toLowerCase();
    let table = document.getElementById('currencyTableBody');
    if (!table) return;
    let rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let text = rows[i].innerText.toLowerCase();
        if (text.includes(searchTerm)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function loadCurrencyTable() {
    let tbody = document.getElementById('currencyTableBody');
    if (!tbody) return;
    const currencies = [
        { country: "United States", currency: "US Dollar", code: "USD", rate: "1.00", trend: "Stable", notes: "Global benchmark" },
        { country: "Eurozone", currency: "Euro", code: "EUR", rate: "0.92", trend: "Slight Up", notes: "Strong regional use" },
        { country: "Japan", currency: "Yen", code: "JPY", rate: "148.50", trend: "Weakening", notes: "Export-driven economy" },
        { country: "United Kingdom", currency: "Pound Sterling", code: "GBP", rate: "0.79", trend: "Fluctuating", notes: "Policy sensitive" },
        { country: "China", currency: "Yuan", code: "CNY", rate: "7.25", trend: "Stable", notes: "Government controlled" },
        { country: "India", currency: "Rupee", code: "INR", rate: "83.50", trend: "Slow Decline", notes: "Emerging market" },
        { country: "Rwanda", currency: "Franc", code: "RWF", rate: "1300", trend: "Stable", notes: "Regional trade" },
        { country: "Canada", currency: "Canadian Dollar", code: "CAD", rate: "1.35", trend: "Slight Up", notes: "Oil-linked economy" },
        { country: "Australia", currency: "Australian Dollar", code: "AUD", rate: "1.52", trend: "Volatile", notes: "Commodity-based" },
        { country: "Uganda", currency: "Shilling", code: "UGX", rate: "3750", trend: "Stable", notes: "East African trade" },
        { country: "Congo", currency: "Franc", code: "CDF", rate: "2800", trend: "Volatile", notes: "Resource dependent" },
        { country: "Switzerland", currency: "Swiss Franc", code: "CHF", rate: "0.91", trend: "Stable", notes: "Safe-haven currency" }
    ];
    tbody.innerHTML = '';
    currencies.forEach(c => {
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = c.country;
        row.insertCell(1).innerHTML = c.currency;
        row.insertCell(2).innerHTML = c.code;
        row.insertCell(3).innerHTML = c.rate;
        row.insertCell(4).innerHTML = c.trend;
        row.insertCell(5).innerHTML = c.notes;
    });
}

function renderTrendTable() {
    let tbody = document.getElementById('trendBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (let i = 0; i < days.length; i++) {
        let rwfRate = trendData.RWF[i];
        let eurRate = trendData.EUR[i];
        let change = '';
        let changeClass = '';
        if (i > 0) {
            let diff = rwfRate - trendData.RWF[i-1];
            if (diff > 0) { change = `▲ +${diff}`; changeClass = 'trend-up'; }
            else if (diff < 0) { change = `▼ ${diff}`; changeClass = 'trend-down'; }
            else { change = '→ 0'; changeClass = 'trend-neutral'; }
        } else { change = '—'; changeClass = 'trend-neutral'; }
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = days[i];
        row.insertCell(1).innerHTML = rwfRate;
        row.insertCell(2).innerHTML = eurRate;
        row.insertCell(3).innerHTML = `<span class="${changeClass}">${change}</span>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    applyDefaultCurrency();
    applyLanguage();
    loadHistory();
    loadCurrencyTable();
    renderTrendTable();
    if (document.getElementById('fromCurrency')) {
        document.getElementById('fromCurrency').addEventListener('change', () => performConversion());
        document.getElementById('toCurrency').addEventListener('change', () => performConversion());
        document.getElementById('amountInput').addEventListener('input', () => performConversion());
        performConversion();
    }
    if (document.getElementById('searchFrom')) {
        document.getElementById('searchFrom').addEventListener('keyup', () => filterCurrencies('from'));
        document.getElementById('searchTo').addEventListener('keyup', () => filterCurrencies('to'));
    }
});

window.performConversion = performConversion;
window.swapCurrencies = swapCurrencies;
window.filterHistory = filterHistory;
window.clearHistory = clearHistory;
window.setDarkMode = setDarkMode;
window.setLightMode = setLightMode;
window.saveDefaultCurrency = saveDefaultCurrency;
window.setLanguage = setLanguage;
window.filterCurrencyTable = filterCurrencyTable;