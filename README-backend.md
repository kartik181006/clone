# Section C: Best Practices & Explanations

## Input Validation
- Always validate email format (regex or library).
- Validate phone numbers (length, digits only).
- Enforce strong password requirements (min length, complexity).

## Password Storage
- Never store plain text passwords.
- Use bcrypt (or argon2) for hashing passwords with a salt.
- Store only the hash in the database (`password_hash`).

## Security Features
- Use HTTPS for all API endpoints.
- Protect against SQL injection by using parameterized queries (as in the code).
- Add fields for email/phone verification, password reset tokens, and expiry.
- Do not expose password hashes in API responses.

## Database Security
- Restrict database user privileges.
- Regularly update dependencies (e.g., bcrypt, mysql2).
- Use environment variables for DB credentials (not hardcoded).

## Common Vulnerabilities
- SQL Injection: Always use parameterized queries.
- XSS/CSRF: Sanitize user input, use CSRF tokens for forms.
- Brute Force: Implement rate limiting on login/signup endpoints.

## Additional Recommendations
- Use JWT or session tokens for authentication after login.
- Log failed login attempts and monitor for abuse.
- Consider adding multi-factor authentication for sensitive apps.

---

**References:**
- [OWASP Top Ten Security Risks](https://owasp.org/www-project-top-ten/)
- [bcrypt documentation](https://www.npmjs.com/package/bcrypt)
- [mysql2 documentation](https://www.npmjs.com/package/mysql2)
