document.addEventListener('DOMContentLoaded', () => {
    const btnZarejestruj = document.getElementById('btnZarejestruj');
    const btnWyczysc = document.getElementById('btnWyczysc');
    const komunikaty = document.getElementById('komunikaty');

    btnZarejestruj.addEventListener('click', () => {
        komunikaty.innerHTML = "";
        let bledy = [];

       
        const user = document.getElementById('user').value.trim();
        const email = document.getElementById('email').value.trim();
        const p1 = document.getElementById('pass1').value;
        const p2 = document.getElementById('pass2').value;
        const dataUro = document.getElementById('urodziny').value;
        const reg = document.getElementById('regulamin').checked;
        const plec = document.getElementById('plec').value;
        const wersja = document.querySelector('input[name="wersja"]:checked').value;

       
        if (!user || !email || !p1 || !p2 || !dataUro || !reg) {
            bledy.push("Wypełnij wszystkie pola i zaakceptuj regulamin.");
        }

        if (user && !/^[a-zA-Z0-9]+$/.test(user)) {
            bledy.push("Użytkownik: dopuszczalne tylko litery i cyfry.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            bledy.push("Email: podaj poprawny adres e-mail.");
        }

        if (p1 && (p1.length < 8 || !/\d/.test(p1))) {
            bledy.push("Hasło: minimum 8 znaków, w tym jedna cyfra.");
        }

        if (p1 !== p2) {
            bledy.push("Hasła muszą być identyczne.");
        }

        if (dataUro) {
            const dzis = new Date();
            const ur = new Date(dataUro);
            let wiek = dzis.getFullYear() - ur.getFullYear();
            const m = dzis.getMonth() - ur.getMonth();
            if (m < 0 || (m === 0 && dzis.getDate() < ur.getDate())) {
                wiek--;
            }
            if (wiek < 18) {
                bledy.push("Rejestracja tylko dla osób pełnoletnich.");
            }
        }

        if (bledy.length > 0) {
            komunikaty.innerHTML = `<div class="error"><strong>Popraw błędy:</strong><br>${bledy.join('<br>')}</div>`;
        } else {
            const d = new Date(dataUro);
            const dataFmt = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;

            komunikaty.innerHTML = `
<div class="success">
✨ KONTO UTWORZONE! ✨
---------------------------
Użytkownik: ${user}
Email:      ${email}
Data ur.:   ${dataFmt}
Płeć:       ${plec}
Plan:       ${wersja}
---------------------------
</div>`;
        }
    });

    btnWyczysc.addEventListener('click', () => {
        komunikaty.innerHTML = "";
    });
});