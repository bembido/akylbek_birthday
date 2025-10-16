# Ақылбектің туған күні — сайтты Vercel арқылы жариялау

Бұл папкада статикалық сайт бар (`index.html`, `style.css`, `script.js`, суреттер және музыка файлдары). Vercel-ге жариялау үшін екі ыңғайлы тәсіл бар: GitHub арқылы немесе Vercel CLI арқылы.

## 1) GitHub арқылы жариялау (ең оңай)

1. GitHub-та жаңа репозиторий жасаңыз.
2. Осы папканы Git репозиторийге айналдырып, GitHub-қа жүктеңіз:
   - Файлдар: `index.html`, `style.css`, `script.js`, `birthday_image.jpg` және егер бар болса `birthday-music.mp3`.
3. https://vercel.com сайтына кіріп, аккаунт жасаңыз (немесе кіріңіз).
4. “Add New…” → “Project” → “Import Git Repository” дегенді таңдаңыз.
5. Жаңа жүктеген GitHub репозиторийіңізді таңдаңыз.
6. Framework Preset: “Other” немесе “Static Site” болып қалсын, Build Command бос, Output Directory — `.` (әдепкі).
7. Deploy басыңыз — бірнеше секундтан кейін live-сілтеме аласыз.

Ескерту: Бас бет `index.html` болуы керек (жасалды).

## 2) Vercel CLI арқылы (жергілікті компьютерден)

Талаптар: Node.js орнатылған болуы тиіс. Windows PowerShell-де төмендегі қадамдарды орындаңыз.

1. Vercel CLI орнату:
   ```powershell
   npm i -g vercel
   ```
2. Папкаға өтіңіз:
   ```powershell
   cd "c:\\Users\\Admin\\Desktop\\akylbek_birthday"
   ```
3. Бірінші рет баптау және жариялау:
   ```powershell
   vercel
   ```
   - Сұрақтарға жауап беріңіз: “Set up and deploy? Yes” → Scope таңдаңыз → “Link to existing project? No” → “What’s your project’s name?” — қалауыңызша → “Which directory?” — `.` → “Want to overwrite settings?” — No.
4. Қайта жариялау (жылдам):
   ```powershell
   vercel --prod
   ```

## Маңызды файлдар
- `index.html` — кіру нүктесі (Vercel бұл файлды автоматты түрде береді)
- `style.css`, `script.js` — стиль және логика
- `birthday_image.jpg` — сурет
- `birthday-music.mp3` — егер музыка пайдаланылса, осы файлды да қосыңыз

## Google Sheets формасы туралы
Сайттағы RSVP формасы Google Apps Script веб-хукина (`scriptURL`) POST жібереді. Vercel жақта ешқандай backend қажет емес. Қате болса, Apps Script URL-ін тексеріңіз және рұқсаттарын дұрыс баптаңыз (Anyone with the link → Allow anonymous).

## Қауіпсіздік және құжаттар
- Музыка файлы (MP3) авторлық құқыққа сай екеніне көз жеткізіңіз.
- Жарияланғаннан кейін берілген домен арқылы сайтқа кіріп, таймер, форма және музыка дұрыс жұмысын тексеріңіз.

Сәтті жариялау! 🎉