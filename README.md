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

## Faqet

| Faqja | Adresa | Përmbajtja |
|---|---|---|
| Kryefaqja | `#/` | Logo, përshkrim, shërbimet, butonat “Fillo mësimin / Bëj provim”, kategoritë, kontakt |
| Leksionet | `#/leksione` | 7 kapituj: objektiva, teori me figura, video, shembuj, test |
| Teste për kapitull | `#/teste` | Test për çdo kapitull + shpjegimi i gabimeve |
| Provimi | `#/provimi` | Simulim sipas kategorisë (A, B, C, D): kohëmatës, kufi gabimesh, Kalon / Nuk kalon, rishikim, përsëritje |
| Autoshkollat | `#/autoshkollat` | Hartë (Leaflet/OpenStreetMap), kërkim, profil, rruga në Google Maps |
| Hyr / Regjistrohu | `#/hyr`, `#/regjistrohu` | Llogari nxënësi |
| Profili im | `#/profili` | Leksione, teste, provime, pyetjet e gabuara, statistika, “Vazhdo mësimin” |
| Paneli Admin | `#/admin` | Leksione, pyetje, parametrat e provimit, nxënësit, statistika, autoshkollat, kryefaqja, eksport/import |

Mësimet dhe testet hapen pa regjistrim; llogaria duhet vetëm për të ruajtur rezultatet dhe përparimin.

## Struktura
```
index.html
assets/css/style.css     – dizajni (responsive: kompjuter, tablet, telefon)
assets/js/data.js        – përmbajtja fillestare (kapituj, pyetje, kategori, autoshkolla)
assets/js/signs.js       – sinjalet rrugore si SVG
assets/js/store.js       – ruajtja e të dhënave dhe llogaritë
assets/js/views.js       – faqet publike, testi/provimi, profili
assets/js/admin.js       – paneli i administratorit
assets/js/app.js         – navigimi
docs/plani-vizual.png    – plani i faqes
```

## Për t’u kontrolluar para publikimit
- [ ] Pyetjet: zëvendëso/plotëso me pyetësorin zyrtar të DPSHTRR-së (pyetjet aktuale janë shembuj).
- [ ] Parametrat e provimit për çdo kategori (nr. pyetjesh, gabime të lejuara, koha) – aktualisht 40 / 4 / 40 min, për t’u konfirmuar.
- [ ] Adresa e saktë dhe koordinatat e Autoshkolla Ndoj.
- [ ] Listimet e autoshkollave të tjera: mblidhen dhe verifikohen (Alfa/Beta janë shembuj).
- [ ] Videot e leksioneve (lidhje YouTube nga Paneli Admin).

## Faza 2 – publikimi online
- Backend (p.sh. Supabase): llogari të sigurta, të dhëna të përbashkëta për të gjithë nxënësit, admin i mbrojtur.
- Hostim + domain `autoshkollandoj.com`.
- PWA: instalim në ekranin e telefonit.
