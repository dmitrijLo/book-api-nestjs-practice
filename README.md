# 📚 NestJS Books API (Learning Project)

Eine RESTful API zur Verwaltung von Büchern, entwickelt mit dem **Nest.js** Framework.

Dieses Projekt dient primär Übungszwecken, um moderne Backend-Architektur, **Test-Driven Development (TDD)** und Best Practices in Nest.js (Pipes, DTOs, TypeORM) zu demonstrieren.

## 🚀 Features

- **CRUD Operationen:** Erstellen, Lesen, Aktualisieren und Löschen von Büchern.
- **Validierung:** Strikte Input-Validierung mittels `ValidationPipe` und `class-validator` (Whitelisting aktiv).
- **Datenbank:** SQLite (via TypeORM) für einfache Einrichtung und Tests ohne externe Abhängigkeiten.
- **Error Handling:** Saubere HTTP-Exceptions (400 Bad Request, 404 Not Found, etc.).
- **Security:** Schutz vor Mass Assignment durch striktes DTO-Whitelisting.

## 🛠 Tech Stack

- [NestJS](https://nestjs.com/) - Framework
- [TypeScript](https://www.typescriptlang.org/) - Language
- [TypeORM](https://typeorm.io/) - ORM
- [SQLite](https://www.sqlite.org/index.html) - Database
- [Jest](https://jestjs.io/) & [Supertest](https://github.com/visionmedia/supertest) - Testing

---

## 🧪 Testing & TDD Approach

Dieses Projekt wurde mit einem **TDD-First Ansatz (Test Driven Development)** entwickelt. Das bedeutet, dass die Tests (insbesondere Integrationstests) geschrieben wurden, _bevor_ die eigentliche Business-Logik implementiert wurde.

Das Ziel war eine hohe Code-Qualität und Sicherheit bei Refactorings.

### Test-Struktur

- **E2E / Integration Tests:** Zu finden im Ordner `/test/books.e2e-spec.ts`.
  - Hier liegt der Fokus des Projekts. Es werden echte HTTP-Requests gegen eine In-Memory Datenbank gefahren.

# Installation & Setup

```bash
git clone [https://github.com/DEIN-USER/books-api-practice.git](https://github.com/DEIN-USER/books-api.git)

cd books-api-practice

# Abhängigkeiten installieren
npm install

# Anwendung starten (Development Mode)
# Der Server läuft standardmäßig auf http://localhost:3000.
npm run start:dev
```

### Tests ausführen

Um die Test-Suite zu starten:

```bash
npm run test:e2e
```

# API Endpoints

| Methode | Pfad       | Beschreibung                        |
| ------- | ---------- | ----------------------------------- |
| GET     | /books     | Liste aller Bücher abrufen          |
| GET     | /books/:id | Ein spezifisches Buch abrufen       |
| POST    | /books     | Neues Buch anlegen (benötigt Body)  |
| PUT     | /books/:id | Buch aktualisieren (Partial Update) |
| DELETE  | /books/:id | Buch löschen                        |
