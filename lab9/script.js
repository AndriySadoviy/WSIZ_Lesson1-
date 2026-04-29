const initialState = {
    score: 0,
    clickPower: 1,
    passiveIncome: 0,
    clickUpgradeLevel: 0,
    passiveUpgradeLevel: 0,
    lastLogin: Date.now()
};

let gameState = { ...initialState };

const scoreEl = document.getElementById('score');
const ppsEl = document.getElementById('pps');
const clickPowerEl = document.getElementById('click-power');
const clickCostEl = document.getElementById('click-cost');
const passiveCostEl = document.getElementById('passive-cost');
const clickBtn = document.getElementById('click-button');
const buyClickBtn = document.getElementById('buy-click-upgrade');
const buyPassiveBtn = document.getElementById('buy-passive-upgrade');
const resetBtn = document.getElementById('reset-button');


function updateUI() {
    scoreEl.innerText = Math.floor(gameState.score);
    ppsEl.innerText = gameState.passiveIncome;
    clickPowerEl.innerText = gameState.clickPower;
    
    const nextClickCost = Math.floor(10 * Math.pow(1.5, gameState.clickUpgradeLevel));
    const nextPassiveCost = Math.floor(50 * Math.pow(1.5, gameState.passiveUpgradeLevel));
    
    clickCostEl.innerText = nextClickCost;
    passiveCostEl.innerText = nextPassiveCost;
    
    buyClickBtn.disabled = gameState.score < nextClickCost;
    buyPassiveBtn.disabled = gameState.score < nextPassiveCost;
}

function loadGame() {
    const saved = localStorage.getItem('clickerSave');
    if (saved) {
        gameState = JSON.parse(saved);
    }
}

function saveGame() {
    gameState.lastLogin = Date.now();
    localStorage.setItem('clickerSave', JSON.stringify(gameState));
}

resetBtn.onclick = function(e) {
    e.preventDefault(); 
    if (confirm("RESET EVERYTHING")) {
        localStorage.clear(); 
        gameState = { ...initialState }; 
        updateUI(); 
        console.log("Gra została zresetowana.");
        location.reload(); 
    }
};

clickBtn.onclick = () => {
    gameState.score += gameState.clickPower;
    updateUI();
    saveGame();
};

buyClickBtn.onclick = () => {
    const cost = Math.floor(10 * Math.pow(1.5, gameState.clickUpgradeLevel));
    if (gameState.score >= cost) {
        gameState.score -= cost;
        gameState.clickPower += 1;
        gameState.clickUpgradeLevel += 1;
        updateUI();
        saveGame();
    }
};

buyPassiveBtn.onclick = () => {
    const cost = Math.floor(50 * Math.pow(1.5, gameState.passiveUpgradeLevel));
    if (gameState.score >= cost) {
        gameState.score -= cost;
        gameState.passiveIncome += 1;
        gameState.passiveUpgradeLevel += 1;
        updateUI();
        saveGame();
    }
};

function init() {
    loadGame(); 
    updateUI();
    setInterval(() => {
        if (gameState.passiveIncome > 0) {
            gameState.score += gameState.passiveIncome;
            updateUI();
            saveGame();
        }
    }, 1000);
}

init();