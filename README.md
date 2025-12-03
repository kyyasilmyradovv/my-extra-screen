# My-Extra-Screen.Com

![Logo](client/public/my-extra-screen-logo.svg)

Ambient display for your extra monitor. Clock, timer, and Pomodoro to keep you focused.

🌐 **[my-extra-screen.com](https://my-extra-screen.com)**

---

## Quick Start

### Backend (FastAPI)

```bash
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` in `api/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
ENVIRONMENT=development
PRODUCTION_DOMAIN=https://abc.com,https://www.abc.com
```

Init DB:

```bash
python init_db.py
```

Run:

```bash
uvicorn main:app --reload
```

### Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

Create `.env` in `client/`:

```env
VITE_API_URL=http://127.0.0.1:8000/
```

---

**Stack:** FastAPI, PostgreSQL, React, Vite, Tailwind, MUI
