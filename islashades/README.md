# Isla Shades — islashadespr.com

The Isla Shades website, built from the Figma Make file
[Isla Shades Wireframes](https://www.figma.com/make/FWXiZM0jBWJpPKXXVnxtnw/Isla-Shades-Wireframes).

| Piece | What it uses |
| --- | --- |
| Site | React + Vite + Tailwind (the code Figma Make generated) |
| Hosting | [Netlify](https://www.netlify.com) (free tier), configured by `../netlify.toml` |
| CMS | [Decap CMS](https://decapcms.org) at `islashadespr.com/admin`, sign in with GitHub |
| Booking form | Netlify Forms (submissions are emailed to you) |
| Domain | `islashadespr.com`, pointed at Netlify |

## How editing works

All text, images and projects live in `content/` as JSON files:

```
content/
  site.json            Settings → Contact & business details
  pages/home.json      Pages → Home
  pages/about.json     Pages → About
  pages/services.json  Pages → Services & Booking
  projects/*.json      Projects (one file per project; file name = URL)
```

When you save in the CMS, it commits the change to GitHub, and Netlify rebuilds
and publishes the site in about a minute. Uploaded images go to
`public/uploads/` and are resized automatically by Netlify's image CDN.

## Launch checklist (one-time setup)

### 1. Put the code on the `main` branch

The CMS saves to `main`, and Netlify publishes `main`. Merge this branch into
`main` (open a pull request on GitHub and merge it). If the repository has no
`main` branch yet, create it from this branch.

### 2. Create the Netlify site

1. Sign in at <https://app.netlify.com> (use "Sign up with GitHub").
2. **Add new site → Import an existing project → GitHub →** `apioveloz/moonflower`.
3. Branch to deploy: `main`. Leave the build settings alone; `netlify.toml`
   already sets the base directory (`islashades`), build command and publish
   folder.
4. Click **Deploy**. You'll get a temporary address like
   `something.netlify.app`. Check that the site looks right there.

### 3. Connect islashadespr.com

1. In Netlify: **Domain management → Add a domain →** `islashadespr.com`.
2. Point the domain at Netlify. At the company where you bought the domain,
   either:
   - **Recommended:** choose "Use Netlify DNS" in Netlify and replace the
     domain's nameservers with the four Netlify shows you, **or**
   - keep your current DNS and add these records:

     | Type | Name | Value |
     | --- | --- | --- |
     | A | `@` | `75.2.60.5` |
     | CNAME | `www` | `<your-site>.netlify.app` |

   If you already use email on this domain, keep your existing MX records.
3. DNS can take a few minutes to a few hours. Netlify then issues the HTTPS
   certificate automatically (**Domain management → HTTPS**).

### 4. Turn on the CMS login

Decap uses GitHub accounts, so anyone who edits the site needs a GitHub
account with write access to the repository.

1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Application name: `Isla Shades CMS`
   - Homepage URL: `https://islashadespr.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Generate a client secret and copy the Client ID and secret.
3. In Netlify: **Site configuration → Access & security → OAuth →
   Install provider → GitHub**, and paste them in.
4. Go to <https://islashadespr.com/admin/> and click **Login with GitHub**.

To add another editor, invite their GitHub account as a collaborator on the
repository (**GitHub → Settings → Collaborators**).

### 5. Turn on the booking form

1. In Netlify: **Forms → Enable form detection**, then redeploy once
   (**Deploys → Trigger deploy**).
2. **Forms → Form notifications → Add notification → Email** and enter the
   address that should receive consultation requests.
3. Submit a test request from `/services#book`.

### 6. Fill in your details

In the CMS:

- **Settings → Contact & business details:** phone, WhatsApp, email. Empty
  fields are hidden on the site, so nothing placeholder-ish shows meanwhile.
- **Pages → About → Founder photo:** upload Cristina's portrait. Until then the
  page shows her initials. (The photo in the Figma Make file isn't included in
  its export, so it needs uploading again.)
- **Projects:** the seven projects and all page photos currently use the
  Unsplash stock images from the wireframes. Replace them with your own work
  as you have it.

## Working on the code

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run typecheck
```

To use the CMS locally without signing in, run `npm run cms` in one terminal
and `npm run dev` in another, then open <http://localhost:5173/admin/>. Saves
write straight to the files in `content/`.

### Fonts

The design calls for Futura PT (Adobe Fonts). The site uses Jost, a free
look-alike from Google Fonts. To switch to the real thing, create an Adobe
Fonts web project for `islashadespr.com` and add its CSS link in
`src/styles/fonts.css`.
