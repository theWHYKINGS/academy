/*
 * enhance.js — progressive enhancements layered on top of the Claude Design
 * source (which is regenerated on every deploy, so we enhance at runtime):
 *   1. Build the contact section — the design source has no <form> at all,
 *      only a footer with dead "#kontakt" CTAs.
 *   2. Submit it (Web3Forms inbox delivery, mailto: fallback on failure).
 *   3. Turn the footer's e-mail/phone pseudo-links into real mailto:/tel: links.
 *
 * The deploy pipeline re-injects <script src="enhance.js"> into index.html
 * after each pull (scripts/inject_enhance.py), so this survives design updates.
 */
(function () {
  'use strict';

  // ==== Config ====
  var CONTACT_EMAIL = 'info@thewhykings.com';
  // web3forms.com access key (public form-id) — same inbox as thewhykings.com;
  // the subject line marks submissions as Academy. Empty => mailto fallback.
  var WEB3FORMS_KEY = '86e85b45-d5c0-425c-ad02-0277510fd4b6';
  var SUBJECT = 'Neue Infocall-Anfrage — Academy';

  var COURSES = [
    'Beidhändig Führen',
    'Leadership Essentials',
    'Product Leadership',
    'Noch unentschlossen / allgemeine Beratung'
  ];

  var done = { section: false, footer: false };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---- Styles (scoped to the injected section) ----
  function injectStyles() {
    if (document.getElementById('wk-contact-styles')) return;
    var css = [
      '#kontakt{padding:76px 64px 84px;background:var(--sage-50,#f1f5f2)}',
      '#kontakt .wk-wrap{max-width:1140px;margin:0 auto}',
      '#kontakt h2{font-family:var(--font-display),sans-serif;font-weight:700;font-size:36px;',
      '  letter-spacing:-.01em;text-transform:uppercase;color:var(--color-fg,#181818);margin:0 0 8px}',
      '#kontakt .wk-rule{width:56px;height:3px;background:var(--sage-400,#81a28d);margin:0 0 24px}',
      '#kontakt .wk-lead{font-size:16px;line-height:1.65;color:var(--color-fg-muted,#66665f);max-width:620px;margin:0 0 34px}',
      '#kontakt .wk-card{background:#fff;border:1px solid var(--color-border,#dededc);',
      '  border-radius:var(--radius-lg,14px);padding:34px 36px;max-width:760px}',
      '#kontakt .wk-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 20px}',
      '#kontakt .wk-full{grid-column:1/-1}',
      '#kontakt label{display:block;font-size:13px;font-weight:600;letter-spacing:.02em;',
      '  color:var(--color-fg,#181818);margin:0 0 7px}',
      '#kontakt input,#kontakt select,#kontakt textarea{width:100%;box-sizing:border-box;',
      '  font-family:var(--font-body),sans-serif;font-size:15px;color:var(--color-fg,#181818);',
      '  background:var(--neutral-50,#f6f6f5);border:1px solid var(--color-border,#dededc);',
      '  border-radius:var(--radius-md,8px);padding:12px 14px;transition:border-color .15s,background .15s}',
      '#kontakt input:focus,#kontakt select:focus,#kontakt textarea:focus{outline:none;',
      '  border-color:var(--sage-500,#6b8c78);background:#fff}',
      '#kontakt textarea{min-height:128px;resize:vertical}',
      '#kontakt .wk-consent{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;',
      '  line-height:1.55;color:var(--color-fg-muted,#66665f)}',
      '#kontakt .wk-consent input{width:16px;height:16px;flex:0 0 auto;margin-top:2px;padding:0}',
      '#kontakt .wk-consent a{color:var(--sage-600,#577262);text-decoration:underline}',
      '#kontakt button{font-family:var(--font-body),sans-serif;font-weight:600;font-size:15px;',
      '  color:#fff;background:var(--sage-500,#6b8c78);border:none;border-radius:var(--radius-md,8px);',
      '  padding:14px 28px;cursor:pointer;transition:background .15s}',
      '#kontakt button:hover:not(:disabled){background:var(--sage-600,#577262)}',
      '#kontakt button:disabled{opacity:.6;cursor:default}',
      '#kontakt .wk-hp{position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden}',
      '#kontakt .wk-err{color:#b23b3b;font-size:13.5px;margin:10px 0 0;min-height:1px}',
      '#kontakt .wk-thanks{background:var(--sage-100,#dde7e1);border:1px solid var(--sage-300,#a3bcac);',
      '  border-radius:var(--radius-lg,14px);padding:28px 30px;font-size:16px;line-height:1.6;max-width:760px}',
      '@media (max-width:720px){#kontakt{padding:56px 22px 62px}#kontakt h2{font-size:28px}',
      '  #kontakt .wk-card{padding:26px 22px}#kontakt .wk-grid{grid-template-columns:1fr}}'
    ].join('');
    var el = document.createElement('style');
    el.id = 'wk-contact-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  // ---- Contact section ----
  function buildSection() {
    if (done.section || document.getElementById('kontakt-form')) return;
    var footer = document.querySelector('footer');
    if (!footer) return;

    // The design source puts id="kontakt" on the footer, so every "Infocall"
    // CTA scrolls past the form. Move the anchor onto our section.
    if (footer.id === 'kontakt') footer.id = 'footer';

    injectStyles();

    var opts = COURSES.map(function (c) {
      return '<option value="' + esc(c) + '">' + esc(c) + '</option>';
    }).join('');

    var sec = document.createElement('section');
    sec.id = 'kontakt';
    sec.setAttribute('data-screen-label', 'Kontakt');
    sec.innerHTML =
      '<div class="wk-wrap">' +
        '<h2>Kostenlosen Infocall buchen</h2>' +
        '<div class="wk-rule"></div>' +
        '<p class="wk-lead">Erzähl uns kurz, worum es geht — wir melden uns mit einem ' +
          'Terminvorschlag für ein unverbindliches Gespräch. Kein Verkaufsgespräch, ' +
          'sondern eine ehrliche Einschätzung, ob und welches Training zu deiner Situation passt.</p>' +
        '<form id="kontakt-form" class="wk-card" novalidate>' +
          '<div class="wk-grid">' +
            '<div><label for="wk-name">Name *</label>' +
              '<input id="wk-name" name="name" type="text" autocomplete="name" required></div>' +
            '<div><label for="wk-email">E-Mail *</label>' +
              '<input id="wk-email" name="email" type="email" autocomplete="email" required></div>' +
            '<div><label for="wk-company">Unternehmen</label>' +
              '<input id="wk-company" name="company" type="text" autocomplete="organization"></div>' +
            '<div><label for="wk-course">Interesse an</label>' +
              '<select id="wk-course" name="course">' + opts + '</select></div>' +
            '<div class="wk-full"><label for="wk-message">Nachricht</label>' +
              '<textarea id="wk-message" name="message" ' +
              'placeholder="Worum geht es? Wie viele Führungskräfte? Zeitlicher Rahmen?"></textarea></div>' +
            '<div class="wk-full wk-consent">' +
              '<input id="wk-consent" type="checkbox" required>' +
              '<label for="wk-consent" style="font-weight:400;margin:0">Ich bin damit einverstanden, ' +
                'dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. ' +
                'Details in der <a href="legal/Datenschutz.html">Datenschutzerklärung</a>.</label></div>' +
            '<div class="wk-hp"><label>Bitte leer lassen' +
              '<input type="text" name="botcheck" tabindex="-1" autocomplete="off"></label></div>' +
            '<div class="wk-full"><button type="submit">Infocall anfragen</button>' +
              '<p class="wk-err" role="alert"></p></div>' +
          '</div>' +
        '</form>' +
      '</div>';

    footer.parentNode.insertBefore(sec, footer);
    wireForm(sec.querySelector('form'));
    done.section = true;
  }

  function wireForm(form) {
    var err = form.querySelector('.wk-err');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.textContent = '';

      var v = {
        name: form.querySelector('#wk-name').value.trim(),
        email: form.querySelector('#wk-email').value.trim(),
        company: form.querySelector('#wk-company').value.trim(),
        course: form.querySelector('#wk-course').value,
        message: form.querySelector('#wk-message').value.trim()
      };

      if (!v.name) { err.textContent = 'Bitte gib deinen Namen an.'; return; }
      if (!v.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) {
        err.textContent = 'Bitte gib eine gültige E-Mail-Adresse an.'; return;
      }
      if (!form.querySelector('#wk-consent').checked) {
        err.textContent = 'Bitte bestätige die Verarbeitung deiner Angaben.'; return;
      }
      if (form.querySelector('[name=botcheck]').value) return;   // honeypot

      var btn = form.querySelector('button');
      var restore = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Wird gesendet…';

      if (!WEB3FORMS_KEY) { mailtoFallback(v); reset(btn, restore); return; }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: SUBJECT,
          from_name: v.name || 'Academy-Kontakt',
          name: v.name,
          email: v.email,
          Unternehmen: v.company || '—',
          Interesse: v.course,
          message: v.message || '(keine Nachricht)'
        })
      }).then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.success) showThanks(form, v);
          else { reset(btn, restore); mailtoFallback(v); }
        })
        .catch(function () { reset(btn, restore); mailtoFallback(v); });
    });
  }

  function reset(btn, label) { btn.disabled = false; btn.textContent = label; }

  function mailtoFallback(v) {
    var body = 'Name: ' + v.name + '\nE-Mail: ' + v.email +
      '\nUnternehmen: ' + (v.company || '—') + '\nInteresse: ' + v.course +
      '\n\n' + v.message;
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(SUBJECT) + '&body=' + encodeURIComponent(body);
  }

  function showThanks(form, v) {
    var box = document.createElement('div');
    box.className = 'wk-thanks';
    box.setAttribute('role', 'status');
    box.innerHTML = '<strong>Danke' + (v.name ? ', ' + esc(v.name.split(' ')[0]) : '') +
      '!</strong><br>Deine Anfrage ist eingegangen — wir melden uns zeitnah mit ' +
      'einem Terminvorschlag für deinen Infocall.';
    if (form.parentNode) form.parentNode.replaceChild(box, form);
  }

  // ---- Footer: dead "#kontakt" links on contact details -> real links ----
  function fixFooterLinks() {
    if (done.footer) return;
    var footer = document.querySelector('footer');
    if (!footer) return;
    footer.querySelectorAll('a[href="#kontakt"]').forEach(function (a) {
      var t = (a.textContent || '').trim();
      var mail = t.match(/[\w.+-]+@[\w.-]+\.\w+/);
      var tel = t.match(/^\+?[\d\s()/-]{7,}$/);
      if (mail) a.href = 'mailto:' + mail[0];
      else if (tel) a.href = 'tel:' + t.replace(/[^\d+]/g, '');
    });
    done.footer = true;
  }

  function run() { buildSection(); fixFooterLinks(); }

  // The page renders client-side, so poll until the footer exists, then wire up.
  var tries = 0;
  var iv = setInterval(function () {
    run();
    if ((done.section && done.footer) || ++tries > 60) clearInterval(iv);
  }, 250);
  window.addEventListener('load', run);
})();
