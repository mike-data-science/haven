# 🔒 Haven — Security Audit Report

**Date:** August 5, 2026  
**Scope:** Full codebase review of `haven` Next.js application

---

## Executive Summary

The application has a solid authentication foundation via Clerk, and uses Prisma (which prevents SQL injection by design). However, there are **several critical and high-severity gaps** that should be addressed before production deployment.

| Severity | Count |
|----------|-------|
| 🔴 Critical | 3 |
| 🟠 High | 5 |
| 🟡 Medium | 4 |
| 🔵 Low | 3 |

---

## 🔴 Critical Issues

### 1. Middleware File Named Incorrectly — Auth Bypass Risk

**File:** [proxy.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/proxy.ts)

The Clerk middleware is in `proxy.ts` instead of the required `middleware.ts` at the project root. **Next.js only recognizes `middleware.ts` (or `middleware.js`).** This means your route protection matcher is likely **never executing**, leaving `/dashboard`, `/profile`, `/settings`, `/favorites`, `/agent`, `/agency` routes unprotected.

> [!CAUTION]
> If this file is not being imported as `middleware.ts`, **all your protected routes are publicly accessible without authentication.**

**Fix:** Rename `proxy.ts` → `middleware.ts`

---

### 2. No Security Headers (CSP, XSS, Clickjacking, HSTS)

**File:** [next.config.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/next.config.ts)

Your `next.config.ts` sets **zero security headers**. The following are completely missing:

| Header | Purpose | Status |
|--------|---------|--------|
| `Content-Security-Policy` | Prevents XSS, code injection | ❌ Missing |
| `X-Frame-Options` | Prevents clickjacking | ❌ Missing |
| `X-Content-Type-Options` | Prevents MIME sniffing | ❌ Missing |
| `Strict-Transport-Security` | Forces HTTPS | ❌ Missing |
| `Referrer-Policy` | Controls referrer leakage | ❌ Missing |
| `Permissions-Policy` | Restricts browser APIs | ❌ Missing |
| `X-XSS-Protection` | Legacy XSS filter | ❌ Missing |

> [!CAUTION]
> Without CSP, an attacker who finds any injection point can load arbitrary scripts. Without `X-Frame-Options`, your site can be embedded in iframes for clickjacking attacks.

---

### 3. File Upload — No File Type Validation, No Size Limit

**File:** [route.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/app/api/upload/route.ts) (lines 51-61)

```typescript
// Current code — trusts user-provided extension blindly
const extension = file.name.split('.').pop() || 'jpg';
const filename = `${crypto.randomUUID()}.${extension}`;
```

Problems:
- **No MIME type validation** — a user could upload `.exe`, `.php`, `.html`, `.svg` (SVG can contain XSS) files
- **No file size limit** — allows unlimited file sizes, enabling denial-of-service
- **No magic byte checking** — extension alone is unreliable
- **Files served from `/public`** — uploaded files are directly served by Next.js as static assets

> [!CAUTION]
> An attacker could upload a malicious `.html` or `.svg` file containing JavaScript that executes in your domain's context, stealing cookies and session data.

---

## 🟠 High Severity Issues

### 4. No CSRF Protection on Any API Route

**Affected:** All `POST`, `PUT`, `DELETE` endpoints in [apiCrud.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiCrud.ts)

None of your API routes implement CSRF token validation. While Clerk session cookies provide some protection, any state-changing operation (create, update, delete properties/users/etc.) is vulnerable to cross-site request forgery if an attacker crafts a form on an external site.

---

### 5. No Input Validation / Sanitization Library

**Affected:** [apiCrud.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiCrud.ts), [apiEntities.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiEntities.ts)

There is **no schema validation** (e.g., Zod, Joi, Yup) on any API input. The `buildData` functions accept raw body data with only basic type coercion (`numberValue`, `booleanValue`). This means:

- No max-length enforcement on text fields (DoS via extremely long strings)
- No format validation on emails, phone numbers, URLs
- No content sanitization against stored XSS
- The `body.status` in [apiEntities.ts:28](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiEntities.ts#L28) is cast directly as `PropertyStatus` without validation

---

### 6. Admin Route — `/admin` Not Protected by Middleware

**File:** [proxy.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/proxy.ts) (lines 3-10)

Even if the middleware were properly named, the `/admin(.*)` path is **not in the protected routes list**:

```typescript
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/favorites(.*)',
  '/agent(.*)',
  '/agency(.*)'
  // ❌ '/admin(.*)' is MISSING
]);
```

The admin pages use `requireRole` in API handlers, but the admin **page** itself (`/admin`) could render for unauthenticated users before any data fetch fails.

---

### 7. No Rate Limiting on Any Endpoint

**Affected:** All API routes

There is zero rate limiting on:
- Login/auth flows
- File upload endpoint
- Data creation (properties, inquiries, reviews)
- Admin endpoints

An attacker can spam your API with thousands of requests per second, filling your database or exhausting server resources.

---

### 8. User Role Escalation Risk via API

**File:** [apiEntities.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiEntities.ts) (lines 185-197)

```typescript
export const userHandlers = createCrudHandlers({
  modelName: "user",
  buildData: (body) =>
    pickDefined({
      role: body.role, // ⚠️ Accepts role from request body
    }),
});
```

The user update endpoint accepts `role` from the request body. While the CRUD handler requires `ADMIN` role by default, if any misconfiguration occurs, a user could escalate their own role to `ADMIN`.

---

## 🟡 Medium Severity Issues

### 9. No Audit Logging

There are no audit logs for admin actions (user modifications, role changes, property approvals). The `PropertyModerationHistory` model is a good start for property status changes, but there's nothing for:
- User role changes
- User deletions
- Bulk operations
- Login events
- Failed authentication attempts

---

### 10. Error Messages Leak Implementation Details

**File:** [apiCrud.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiCrud.ts) (lines 86-91)

```typescript
return NextResponse.json(
  { error: `Failed to load ${entityName}.`, detail: getErrorMessage(error) },
  { status: 500 }
);
```

Error responses include `detail: getErrorMessage(error)` which exposes internal error messages (potentially stack traces, database errors, ORM details) to the client.

---

### 11. Password Field in Admin Entity Definition

**File:** [admin.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/admin.ts) (line 90)

```typescript
{ name: "password", label: "Password", type: "text", placeholder: "••••••••" },
```

The user entity has a `password` field defined as `type: "text"` (not even `type: "password"`). Since you use Clerk for auth, this field should not exist at all — it implies password handling outside of Clerk.

---

### 12. Sensitive Data in Vercel Deployment Logs

**File:** [route.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/app/api/upload/route.ts#L81)  
**File:** [route.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/app/api/admin/properties/queue/route.ts#L45)

`console.error` calls in production can leak sensitive data to Vercel logs.

---

## 🔵 Low Severity Issues

### 13. `.env.local` Contains Real API Keys

**File:** [.env.local](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/.env.local)

While `.env*` is in `.gitignore` (good), the file contains real Clerk test keys. Make sure these are **rotated if ever committed to git** and that production keys are stored only in Vercel environment variables.

---

### 14. Cascade Deletion Not Transactional

**File:** [apiEntities.ts](file:///c:/Users/Mike/Desktop/JavaScript/Next/haven/lib/apiEntities.ts) (lines 198-217)

The `beforeDelete` function for users runs many sequential delete queries without a `prisma.$transaction()`. If any step fails, you'll have partial data deletion — an inconsistent state.

---

### 15. No `rel="noopener"` on Some External Links

Minor issue — some external links are missing `rel="noopener noreferrer"` although the `ContactAgentModal` handles this correctly.

---

## ✅ What's Already Good

| Area | Status |
|------|--------|
| SQL Injection | ✅ Protected — Prisma ORM parameterizes all queries |
| XSS via React | ✅ Protected — React escapes all rendered content by default |
| No `dangerouslySetInnerHTML` | ✅ Not used anywhere |
| No `eval()` | ✅ Not used anywhere |
| Authentication | ✅ Clerk handles auth properly |
| Role-based access on API | ✅ `requireRole()` used on all CRUD handlers |
| Ownership checks | ✅ `ownershipField` prevents users from accessing others' data |
| Env files gitignored | ✅ `.env*` is in `.gitignore` |
| UUID filenames for uploads | ✅ Prevents filename guessing |

---

## Recommended Fix Priority

| Priority | Issue | Effort |
|----------|-------|--------|
| 1 | Rename `proxy.ts` → `middleware.ts` | 5 min |
| 2 | Add `/admin(.*)` to protected routes | 5 min |
| 3 | Add security headers in `next.config.ts` | 30 min |
| 4 | Add file type validation + size limits to upload | 30 min |
| 5 | Add input validation with Zod on all API routes | 2-3 hrs |
| 6 | Remove `password` field from admin entity | 5 min |
| 7 | Strip `detail` from production error responses | 15 min |
| 8 | Add rate limiting (e.g., Vercel KV or upstash) | 1-2 hrs |
| 9 | Add CSRF tokens to state-changing endpoints | 1-2 hrs |
| 10 | Add audit logging for admin actions | 2-3 hrs |
| 11 | Wrap cascade deletions in transactions | 30 min |
