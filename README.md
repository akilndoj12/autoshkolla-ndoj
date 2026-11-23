# Autoshkolla Ndoj – Platforma online

Platformë për mësimin e teorisë, testimin e njohurive dhe informacionin mbi autoshkollat në Shqipëri.
Krijuar nga **Autoshkolla Ndoj** – www.autoshkollandoj.com – 068 20 81 109.

> **Statusi:** prototip privat (faza 1). Të dhënat ruhen në shfletues (localStorage).
> Para publikimit online lidhet me një bazë të dhënash në server (faza 2).

## Si ta hap në kompjuter

1. Shkarko repo-n (Code → Download ZIP) ose `git clone`.
2. Në dosjen e projektit nis një server lokal:
   ```bash
   python -m http.server 8000
   ```
3. Hap `http://localhost:8000` në shfletues.

(Mund ta hapësh edhe duke klikuar dy herë `index.html`, por harta punon më mirë me server.)

### Hyrja si administrator (vetëm për prototipin)
- Email: `admin@autoshkollandoj.com`
- Fjalëkalimi: `Ndoj2026!`

⚠️ Këto kredenciale janë vetëm për testim lokal. Para publikimit zëvendësohen me llogari të vërteta në server.

## Pyetjet zyrtare
Pyetjet dhe figurat janë nxjerrë nga **Manuali i DPSHTRR për kontrollin e njohurive teorike – kat. A1, A2, B1, B (Qershor 2019)**:
- 25 tema, 626 grupe pyetjesh, **3 663 fjali Saktë/Gabim** me përgjigjet zyrtare, **490 figura**.
- `assets/manual/manual.json` – temat, fjalitë dhe përgjigjet.
- `assets/manual/fig/tNN.json` – figurat e secilës temë (ngarkohen vetëm kur duhen).
- Provimi: 40 pyetje (2 nga çdo temë 1–15, 1 nga çdo temë 16–25), 40 minuta, maks. 4 gabime – sipas manualit.

## Faqet

| Faqja | Adresa | Përmbajtja |
|---|---|---|
| Kryefaqja | `#/` | Logo, përshkrim, shërbimet, butonat “Fillo mësimin / Bëj provim”, kategoritë, kontakt |
| Leksionet | `#/leksione` | 25 temat e manualit: figurat dhe fjalitë zyrtare me përgjigje (me opsion “fshih përgjigjet”), shpjegime, video |
| Teste për temë | `#/teste` | Test me 20 pyetje ose të gjitha pyetjet e temës + rishikimi i gabimeve |
| Provimi | `#/provimi` | Simulim sipas kategorisë (A1, A2, B1, B): kohëmatës, kufi gabimesh, Kalon / Nuk kalon, rishikim, përsëritje |
| Autoshkollat | `#/autoshkollat` | Hartë (Leaflet/OpenStreetMap), kërkim, profil, rruga në Google Maps |
| Hyr / Regjistrohu | `#/hyr`, `#/regjistrohu` | Llogari nxënësi |
| Profili im | `#/profili` | Leksione, teste, provime, pyetjet e gabuara, statistika, “Vazhdo mësimin” |
| Paneli Admin | `#/admin` | Leksione, pyetje, parametrat e provimit, nxënësit, statistika, autoshkollat, kryefaqja, eksport/import |

Mësimet dhe testet hapen pa regjistrim; llogaria duhet vetëm për të ruajtur rezultatet dhe përparimin.

## Struktura
```
index.html
assets/css/style.css     – dizajni (responsive: kompjuter, tablet, telefon)
assets/js/data.js        – përmbajtja fillestare (kategori, shpjegime shtesë, autoshkolla)
assets/js/manual.js      – ngarkimi i manualit zyrtar dhe figurave
assets/manual/           – pyetjet dhe figurat e manualit DPSHTRR
assets/js/signs.js       – sinjalet rrugore si SVG
assets/js/store.js       – ruajtja e të dhënave dhe llogaritë
assets/js/views.js       – faqet publike, testi/provimi, profili
assets/js/admin.js       – paneli i administratorit
assets/js/app.js         – navigimi
docs/plani-vizual.png    – plani i faqes
```

## Për t’u kontrolluar para publikimit
- [x] Pyetjet zyrtare të manualit DPSHTRR (2019) për A1, A2, B1, B.
- [ ] Kontrollo nëse DPSHTRR ka botuar version më të ri të manualit.
- [ ] Manualet për kategoritë C dhe D (nëse do të shtohen).
- [ ] Adresa e saktë dhe koordinatat e Autoshkolla Ndoj.
- [ ] Listimet e autoshkollave të tjera: mblidhen dhe verifikohen (Alfa/Beta janë shembuj).
- [ ] Videot e leksioneve (lidhje YouTube nga Paneli Admin).

## Faza 2 – publikimi online
- Backend (p.sh. Supabase): llogari të sigurta, të dhëna të përbashkëta për të gjithë nxënësit, admin i mbrojtur.
- Hostim + domain `autoshkollandoj.com`.
- PWA: instalim në ekranin e telefonit.
