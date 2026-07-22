/* @ds-bundle: {"format":3,"namespace":"TheWHYKINGSDesignSystem_57a775","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"7c63bfe7a263","components/core/Badge.jsx":"c77ec9410dbf","components/core/Button.jsx":"5cb5a3eaa8aa","components/core/Card.jsx":"0e8262bb09bb","components/core/Input.jsx":"86294f411d54","components/core/Switch.jsx":"ae731e69e0b5","ui_kits/website/Approach.jsx":"39f4e4c4c6b8","ui_kits/website/Contact.jsx":"a3cf53097149","ui_kits/website/Hero.jsx":"67f9e331a9c0","ui_kits/website/Services.jsx":"69d61820ef65","ui_kits/website/SiteFooter.jsx":"180764dc155a","ui_kits/website/SiteHeader.jsx":"337c37a68b82","ui_kits/website/Work.jsx":"6566bbc62ae5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheWHYKINGSDesignSystem_57a775 = window.TheWHYKINGSDesignSystem_57a775 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * theWHYKINGS Avatar — image or initials, sage fallback.
 */
function Avatar({
  src,
  name = '',
  size = 40,
  square = false,
  style = {},
  ...props
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join('');
  const base = {
    width: size,
    height: size,
    borderRadius: square ? 'var(--radius-md)' : 'var(--radius-pill)',
    background: 'var(--sage-400)',
    color: '#fff',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: size * 0.4,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flex: 'none',
    letterSpacing: '0.02em',
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * theWHYKINGS Badge / status pill.
 * tones: neutral, sage, gold, success, danger, info.
 */
function Badge({
  children,
  tone = 'neutral',
  solid = false,
  style = {},
  ...props
}) {
  const tones = {
    neutral: {
      soft: 'var(--neutral-100)',
      fg: 'var(--neutral-600)',
      solid: 'var(--neutral-800)'
    },
    sage: {
      soft: 'var(--sage-50)',
      fg: 'var(--sage-700)',
      solid: 'var(--sage-400)'
    },
    gold: {
      soft: 'var(--gold-50)',
      fg: 'var(--gold-700)',
      solid: 'var(--gold-400)'
    },
    success: {
      soft: 'var(--sage-50)',
      fg: 'var(--sage-700)',
      solid: 'var(--sage-500)'
    },
    danger: {
      soft: 'var(--terracotta-100)',
      fg: 'var(--terracotta-700)',
      solid: 'var(--terracotta-500)'
    },
    info: {
      soft: 'var(--slate-100)',
      fg: 'var(--slate-700)',
      solid: 'var(--slate-500)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1,
    padding: '5px 10px',
    borderRadius: 'var(--radius-pill)',
    background: solid ? t.solid : t.soft,
    color: solid ? tone === 'gold' ? 'var(--neutral-900)' : '#fff' : t.fg,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * theWHYKINGS Button — geometric, confident, quiet motion.
 * Variants: primary (sage), gold, secondary (outline), ghost, dark.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...props
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 14,
      height: 36
    },
    md: {
      padding: '11px 22px',
      fontSize: 15,
      height: 44
    },
    lg: {
      padding: '15px 30px',
      fontSize: 16,
      height: 54
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-accent)',
      color: 'var(--color-fg-on-accent)',
      border: '1px solid var(--color-accent)'
    },
    gold: {
      background: 'var(--color-gold)',
      color: 'var(--neutral-900)',
      border: '1px solid var(--color-gold)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-fg)',
      border: '1px solid var(--color-border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-fg)',
      border: '1px solid transparent'
    },
    dark: {
      background: 'var(--neutral-800)',
      color: 'var(--color-fg-on-dark)',
      border: '1px solid var(--neutral-800)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.01em',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'background var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const hoverFor = {
    primary: 'var(--color-accent-hover)',
    gold: 'var(--color-gold-hover)',
    dark: 'var(--neutral-700)'
  };
  const onEnter = e => {
    if (disabled) return;
    if (hoverFor[variant]) e.currentTarget.style.background = hoverFor[variant];else if (variant === 'secondary' || variant === 'ghost') e.currentTarget.style.background = 'var(--color-bg-sunken)';
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = variants[variant].background;
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(0)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: base,
    disabled: disabled,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, props), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * theWHYKINGS Card — soft, low-shadow surface.
 * variants: elevated (shadow), outline (border), accent (sage top rule).
 */
function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  style = {},
  ...props
}) {
  const pads = {
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  const variants = {
    elevated: {
      background: 'var(--surface-card)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)'
    },
    outline: {
      background: 'var(--surface-card)',
      border: '1px solid var(--color-border)',
      boxShadow: 'none'
    },
    accent: {
      background: 'var(--surface-card)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      borderTop: '3px solid var(--color-accent)'
    },
    soft: {
      background: 'var(--surface-card-alt)',
      border: '1px solid var(--sage-100)',
      boxShadow: 'none'
    }
  };
  const base = {
    borderRadius: 'var(--radius-lg)',
    padding: pads[padding],
    transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
    cursor: interactive ? 'pointer' : 'default',
    ...variants[variant],
    ...style
  };
  const onEnter = e => {
    if (!interactive) return;
    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const onLeave = e => {
    if (!interactive) return;
    e.currentTarget.style.boxShadow = variants[variant].boxShadow;
    e.currentTarget.style.transform = 'translateY(0)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * theWHYKINGS text input with optional label, hint and error.
 */
function Input({
  label,
  hint,
  error,
  id,
  type = 'text',
  style = {},
  ...props
}) {
  const inputId = id || `twk-in-${Math.random().toString(36).slice(2, 8)}`;
  const [focus, setFocus] = React.useState(false);
  const wrap = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontFamily: 'var(--font-body)'
  };
  const lbl = {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-fg)'
  };
  const field = {
    height: 44,
    padding: '0 14px',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
    color: 'var(--color-fg)',
    background: 'var(--color-bg)',
    border: `1px solid ${error ? 'var(--color-danger)' : focus ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: focus && !error ? '0 0 0 3px var(--sage-100)' : error ? '0 0 0 3px var(--terracotta-100)' : 'none',
    transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    ...style
  };
  const help = {
    fontSize: 13,
    color: error ? 'var(--color-danger)' : 'var(--color-fg-muted)'
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: wrap
  }, label && /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    style: field,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, props)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: help
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * theWHYKINGS Switch — toggle with sage "on" state.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style = {},
  ...props
}) {
  const track = {
    width: 44,
    height: 26,
    borderRadius: 'var(--radius-pill)',
    background: checked ? 'var(--color-accent)' : 'var(--neutral-300)',
    position: 'relative',
    transition: 'background var(--dur-base) var(--ease-standard)',
    flex: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1
  };
  const knob = {
    position: 'absolute',
    top: 3,
    left: checked ? 21 : 3,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#fff',
    boxShadow: 'var(--shadow-xs)',
    transition: 'left var(--dur-base) var(--ease-out)'
  };
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--color-fg)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style
  };
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: wrap
  }, props), /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": checked,
    tabIndex: disabled ? -1 : 0,
    style: track,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: knob
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Approach.jsx
try { (() => {
function Approach() {
  const rings = [{
    k: 'WHY',
    t: 'Purpose',
    d: 'The belief that drives everything. We start at the core.',
    c: 'var(--color-gold)'
  }, {
    k: 'HOW',
    t: 'Strategy',
    d: 'The distinctive way you deliver on that belief.',
    c: 'var(--color-accent)'
  }, {
    k: 'WHAT',
    t: 'Expression',
    d: 'The brand, products and experiences people meet.',
    c: 'var(--twk-slate)'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "approach",
    style: {
      padding: '96px 40px',
      background: 'var(--color-bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-overline"
  }, "Our approach"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(2rem,3.4vw,2.8rem)',
      maxWidth: 640,
      marginTop: 10
    }
  }, "From the inside out"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-lead)',
      color: 'var(--color-fg-muted)',
      maxWidth: 560,
      marginBottom: 48
    }
  }, "Great brands aren't built on what they sell. They're built on why they exist. We work outward from that center."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, rings.map((r, i) => /*#__PURE__*/React.createElement(Card, {
    key: r.k,
    variant: "elevated",
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      border: `3px solid ${r.c}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13,
      color: r.c
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '0.04em',
      color: 'var(--color-fg)'
    }
  }, r.k)), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 6px'
    }
  }, r.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--color-fg-muted)',
      fontSize: 15
    }
  }, r.d))))));
}
window.Approach = Approach;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Approach.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const submit = e => {
    e.preventDefault();
    setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: '96px 40px',
      background: 'var(--color-bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-md)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "twk-overline"
  }, "Start the conversation"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(2rem,3.4vw,2.8rem)',
      marginTop: 10
    }
  }, "Find your why"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-lead)',
      color: 'var(--color-fg-muted)'
    }
  }, "Tell us where you're headed. We'll come back within two working days with a way in."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/helm-gold.png",
    alt: "",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--color-fg-muted)'
    }
  }, "hello@thewhykings.com", /*#__PURE__*/React.createElement("br", null), "Hamburg \xB7 Remote worldwide"))), /*#__PURE__*/React.createElement(Card, {
    variant: "elevated",
    padding: "lg"
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '28px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--color-accent)'
    }
  }, "Thank you, ", form.name || 'friend', "."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--color-fg-muted)',
      marginTop: 8,
      marginBottom: 20
    }
  }, "Your message is on its way. We'll be in touch shortly."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setForm({
        name: '',
        email: '',
        message: ''
      });
    }
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    value: form.name,
    onChange: set('name'),
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    value: form.email,
    onChange: set('email'),
    placeholder: "you@company.com",
    required: true
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--color-fg)'
    }
  }, "What's on your mind?"), /*#__PURE__*/React.createElement("textarea", {
    value: form.message,
    onChange: set('message'),
    rows: 4,
    placeholder: "A few lines about your brand\u2026",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      padding: 12,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--color-border-strong)',
      resize: 'vertical',
      color: 'var(--color-fg)'
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    type: "submit",
    fullWidth: true,
    size: "lg"
  }, "Send message")))));
}
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onNav
}) {
  const wrap = {
    position: 'relative',
    padding: '110px 40px 96px',
    background: 'var(--neutral-800)',
    color: 'var(--color-fg-on-dark)',
    overflow: 'hidden'
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: wrap
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/helm-gold.png",
    alt: "",
    style: {
      position: 'absolute',
      right: -60,
      top: 40,
      width: 460,
      opacity: 0.10,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-lg)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-overline",
    style: {
      color: 'var(--color-gold)'
    }
  }, "Brand & purpose consultancy"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(2.6rem, 5.4vw, 4.6rem)',
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      color: '#fff',
      maxWidth: 880,
      margin: '14px 0 22px'
    }
  }, "Lead with the", /*#__PURE__*/React.createElement("br", null), "reason you exist"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-lead)',
      color: 'rgba(255,255,255,0.78)',
      maxWidth: 560,
      marginBottom: 34
    }
  }, "We help ambitious teams find their why, sharpen their brand, and turn purpose into the way they work \u2014 every day."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    onClick: () => onNav('contact'),
    iconRight: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\u2192")
  }, "Book a session"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('approach'),
    style: {
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.3)'
    }
  }, "See our approach")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      marginTop: 64,
      flexWrap: 'wrap'
    }
  }, [['120+', 'brands repositioned'], ['15 yrs', 'of purpose work'], ['9/10', 'clients return']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 34,
      color: 'var(--color-gold)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.6)',
      marginTop: 2
    }
  }, l))))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
function Services() {
  const items = [{
    t: 'Purpose Discovery',
    d: 'Workshops and research to uncover the why at the heart of your organization.',
    tag: 'Workshop'
  }, {
    t: 'Brand Strategy',
    d: 'Positioning, narrative and architecture that make your purpose unmistakable.',
    tag: 'Strategy'
  }, {
    t: 'Naming & Identity',
    d: 'Names, verbal identity and design systems built to last.',
    tag: 'Creative'
  }, {
    t: 'Culture Activation',
    d: 'Turning purpose into rituals, behaviours and decisions teams actually live by.',
    tag: 'Culture'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: '96px 40px',
      background: 'var(--color-bg-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "twk-overline"
  }, "What we do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(2rem,3.4vw,2.8rem)',
      marginTop: 10,
      marginBottom: 0
    }
  }, "Services")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Download capabilities \u2193")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 20
    }
  }, items.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.t,
    variant: "accent",
    padding: "lg",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "sage"
  }, s.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-gold)',
      fontSize: 22
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24,
      marginBottom: 8
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--color-fg-muted)'
    }
  }, s.d))))));
}
window.Services = Services;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteFooter.jsx
try { (() => {
function SiteFooter() {
  const cols = [['Company', ['About', 'Approach', 'Careers', 'Journal']], ['Services', ['Purpose Discovery', 'Brand Strategy', 'Naming', 'Culture']], ['Connect', ['LinkedIn', 'Instagram', 'Newsletter', 'Contact']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--neutral-900)',
      color: 'rgba(255,255,255,0.7)',
      padding: '64px 40px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/wordmark-gold.png",
    alt: "theWHYKINGS",
    style: {
      height: 64,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      maxWidth: 240,
      margin: 0
    }
  }, "A brand & purpose consultancy. We help teams lead with the reason they exist.")), cols.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--color-gold)',
      marginBottom: 14
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 14
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '40px auto 0',
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: 13,
      color: 'rgba(255,255,255,0.5)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 theWHYKINGS. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "Imprint \xB7 Privacy")));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteHeader.jsx
try { (() => {
function SiteHeader({
  onNav,
  menuOpen,
  setMenuOpen
}) {
  const links = ['Approach', 'Services', 'Work', 'Contact'];
  const wrap = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 40px',
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--color-border)'
  };
  return /*#__PURE__*/React.createElement("header", {
    style: wrap
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onNav('top');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/helm-green.png",
    alt: "theWHYKINGS",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: 'var(--color-fg)'
    }
  }, "theWHYKINGS")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    },
    className: "twk-desktop-nav"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: `#${l.toLowerCase()}`,
    onClick: e => {
      e.preventDefault();
      onNav(l.toLowerCase());
    },
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--color-fg)'
    }
  }, l)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNav('contact')
  }, "Find your why")));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Work.jsx
try { (() => {
function Work() {
  const cases = [{
    c: 'var(--sage-400)',
    client: 'Nordlys',
    sector: 'Renewables',
    result: 'Repositioned around "energy with a conscience" — 38% lift in qualified leads.'
  }, {
    c: 'var(--gold-400)',
    client: 'Halden & Co',
    sector: 'Finance',
    result: 'A purpose platform that unified 4 acquired brands under one why.'
  }, {
    c: 'var(--twk-terracotta)',
    client: 'Mira Health',
    sector: 'Healthcare',
    result: 'Naming + identity for a category-defining preventive care brand.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      padding: '96px 40px',
      background: 'var(--neutral-800)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-overline",
    style: {
      color: 'var(--color-gold)'
    }
  }, "Selected work"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(2rem,3.4vw,2.8rem)',
      color: '#fff',
      marginTop: 10,
      marginBottom: 40
    }
  }, "Brands that found their why"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, cases.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.client,
    style: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--neutral-700)',
      border: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      background: c.c,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 26,
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '0.02em'
    }
  }, c.client)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--color-gold)',
      marginBottom: 8
    }
  }, c.sector), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgba(255,255,255,0.74)',
      fontSize: 15
    }
  }, c.result)))))));
}
window.Work = Work;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Work.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
