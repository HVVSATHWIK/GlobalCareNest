# 🌍 Global CareNest

**"Revolutionizing healthcare, one connection at a time."**

**Global CareNest** is not just a project—it’s a **mission** to redefine healthcare accessibility and inclusivity for underserved communities around the globe. By harnessing cutting-edge technologies, we aim to bridge the vast gaps in healthcare systems and empower individuals with the tools they deserve.

---

## 🔥 The Vision
Imagine a world where healthcare resources are no longer bound by location, language, or privilege—a world where technology becomes the great equalizer, ensuring everyone has the **right to care**. **Global CareNest** embodies this dream, taking bold strides toward making equitable healthcare a reality.

---

## ✨ Features That Transform Lives
- **Responsive Design Meets Accessibility**  
  A visually stunning interface, powered by **Tailwind CSS** and **TypeScript**, with dynamic animations that engage and guide users intuitively.

- **AI-Powered Diagnosis (Agentic)**  
  Real-time, AI-driven initial health assessments using **Gemini 2.5 Flash** (via `gemini-1.5-flash`), featuring markdown-formatted results and empathetic, structured responses.

- **Global Inclusivity**  
  From multi-language support to accessibility features like voice commands, we’re building for everyone, everywhere.

- **Seamless Collaboration**  
  A platform designed for healthcare providers, caregivers, and patients to communicate, share, and thrive together.

---

## 🚀 Technology That Drives Us
- **Frontend**: TypeScript, Tailwind CSS, Vite
- **AI Core**: Google Gemini API (@google/generative-ai)
- **Version Control**: GitHub

---

## 🧰 Local Development (Quick)
- Copy `.env.example` → `.env.local` and fill in your Firebase values.

### Netlify Functions (Gemini)
- Gemini runs server-side via a Netlify Function at `/api/gemini` (redirects to `/.netlify/functions/gemini`).
- Set `GEMINI_API_KEY` in Netlify → Site settings → Environment variables.
- Set `FIREBASE_SERVICE_ACCOUNT` (stringified JSON service account) in Netlify so the function can verify Firebase ID tokens.

The frontend includes `Authorization: Bearer <Firebase ID token>` automatically after login.

---

## 🤟 ASL (MVP) – Real Animation Clips

The `/consultation` page supports an MVP pipeline:

Doctor text → Gemini **intent** → ASL **sign tokens** → **3D playback**

### Drop-in sign assets

- Put sign clips under `public/asl/signs/` using the token filename convention:
  - `public/asl/signs/PAIN.glb`
  - `public/asl/signs/MEDICINE.glb`
  - etc.
- The lexicon is defined in `src/asl/lexicon.ts`.
- If **all** required `.glb` files exist for the generated sign sequence, the app will auto-switch to the real clip player; otherwise it falls back to the procedural avatar.

### Current GLB expectation (MVP)

For the easiest demo build: each sign `.glb` should contain:

- A visible, rigged avatar model (skinned mesh)
- One animation clip (the player will use the named clip from the lexicon if provided, otherwise the first clip)

This avoids retargeting during the hackathon. Later, you can move to a single base avatar + separate animation clips (requires consistent skeleton + retarget/blending).

### Recommended first 10 signs

Start with these tokens (already in the grammar/lexicon):

`PAIN`, `MEDICINE`, `EAT`, `AFTER`, `DOCTOR`, `FEVER`, `EMERGENCY`, `WHERE`, `YOU`, `TAKE`

---

## 📞 WebRTC Call (MVP)

- Media (audio/video): WebRTC peer-to-peer (DTLS-SRTP)
- Signaling: Firestore documents under `webrtcRooms/{roomId}` with ICE candidates in subcollections
- ASL sync: WebRTC DataChannel messages (sign tokens) so both sides render the avatar locally

Important: Firestore is only used for signaling metadata, not to relay media. For anything beyond a hackathon MVP, add strict Firestore security rules so only the two room participants can read/write the room + candidates.

## 🔐 Security Notes
- Do not commit `.env` / `.env.*` (they are gitignored).
- Do not commit `dist/` (build output). If it was ever committed, remove it from git history and rotate leaked keys.

---

## 🛠 Challenges We Conquered
- **Scalability Without Compromise**  
  Designing a robust system to handle high traffic while maintaining a seamless user experience.

- **Balancing Accessibility and Performance**  
  Crafting a platform that remains lightweight yet feature-rich for users of all backgrounds.

- **Unified Vision Across Teams**  
  Coordinating diverse development contributions to ensure a cohesive, high-quality product.

---

## 🤝 Meet the Architects
This groundbreaking project stands on the shoulders of collaborative genius:
- [ROHIT SOMIREDDI](https://github.com/ROHITSOMIREDDI)  
- [HARUTO-09](https://github.com/HARUTO-09)  
- [HVV SATHWIK](https://github.com/HVVSATHWIK)  

Together, we are committed to creating solutions that transcend boundaries and redefine possibilities.

---

## 🌟 Future Plans
- **Multi-Agent Systems**: Expanding our Agentic AI to handle complex tasks like appointment scheduling and medication reminders.
- **Global Rollout**: Adapting the platform to meet international healthcare standards.
- **Advanced Accessibility**: Features like gesture recognition and interactive animations to engage diverse audiences.

---

## 📣 Join Our Mission
This is more than a project—it’s a **responsibility**. If you share our vision of equitable healthcare, connect with us to explore possibilities, collaborate, or support our cause.

**About Me**  
I am **HVV SATHWIK**, a driven AI undergraduate with expertise in artificial intelligence, machine learning, and web development. My focus is on crafting innovative solutions to solve real-world challenges. Explore more of my work at [GitHub](https://github.com/HVVSATHWIK).

---

## 🎥 Visual Impact: UI Animations (Planned)
The platform will feature interactive animations to enhance user engagement:
- Real-time globe visualizations for tracking healthcare resources globally.

Stay tuned for our live demos!

---

**"Global CareNest is not just an app; it's a movement. Let’s rewrite the narrative of healthcare together."**
