/* "Which one fits?" finder for client sites (card 221): two or three quick questions, then the business's OWN service
 * that fits, using the business's own rules, plus a "Text us about this" button that opens the customer's text app with
 * their answers written out. No outside facts, nothing stored, nothing sent by the page.
 * Use it where customers don't know what to book: dog trainers (puppy class or private?), cleaners (regular or one-off?),
 * driving schools (single lesson or package?), mowing (one-off or a round?).
 *
 * Embed:  <div class="sfd" data-business="Whipbird Dog Training" data-phone="0400 000 000" data-config="{...escaped JSON...}"></div>
 *         <script src="service-finder.js" defer></script>
 * config: {"title": "Which class fits your dog?",   ("" = no heading, when the section already has one)
 *          "questions": [{"id": "age", "ask": "How old is your dog?", "options": [["pup", "Under 4 months"], ["adult", "Over a year"]]}],
 *          "results": [{"if": {"age": ["pup"]}, "name": "Puppy class", "why": "Small groups for young pups."},
 *                      {"if": {}, "name": "Basic manners class", "why": "Our starting point for most dogs."}],
 *          "ask": "Is this a fit for us?"}
 * Results are checked in order and the first whose every "if" matches wins, so put the specific ones first and end with
 * an "if": {} catch-all. A config with no catch-all shows "Text us and we'll suggest one" when nothing matches.
 */
(function () {
  "use strict";

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function clean(s) { return String(s == null ? "" : s).replace(/\s+/g, " ").trim().slice(0, 160); }

  /* Pure: the questions and results to use. Bad entries are dropped, never half-shown. */
  function parse(cfg) {
    cfg = cfg || {};
    var qs = (cfg.questions || []).filter(function (q) { return q && /^[a-z0-9_-]{1,20}$/i.test(q.id || "") && clean(q.ask); }).slice(0, 4)
      .map(function (q) {
        return { id: q.id, ask: clean(q.ask), options: (q.options || []).filter(function (o) { return o && o.length === 2 && clean(o[0]) && clean(o[1]); })
          .slice(0, 6).map(function (o) { return [clean(o[0]), clean(o[1])]; }) };
      }).filter(function (q) { return q.options.length >= 2; });
    var ids = qs.map(function (q) { return q.id; });
    var rs = (cfg.results || []).filter(function (r) {
      return r && clean(r.name) && r["if"] && typeof r["if"] === "object" && Object.keys(r["if"]).every(function (k) { return ids.indexOf(k) >= 0 && Array.isArray(r["if"][k]); });
    }).map(function (r) { return { when: r["if"], name: clean(r.name), why: clean(r.why) }; });
    return { title: cfg.title === "" ? "" : (clean(cfg.title) || "Which one fits?"), questions: qs, results: rs, ask: clean(cfg.ask) || "Is this the right one for me?" };
  }

  /* Pure: the first result whose every condition holds; null until every question is answered, or when nothing matches */
  function match(p, answers) {
    answers = answers || {};
    if (!p.questions.every(function (q) { return answers[q.id]; })) return null;
    for (var i = 0; i < p.results.length; i++) {
      var w = p.results[i].when;
      if (Object.keys(w).every(function (k) { return w[k].indexOf(answers[k]) >= 0; })) return p.results[i];
    }
    return null;
  }

  /* Pure: the text message with the customer's answers written out */
  function message(business, p, answers, result) {
    var lines = ["Hi " + (clean(business) || "there") + ","];
    p.questions.forEach(function (q) {
      var o = q.options.filter(function (x) { return x[0] === answers[q.id]; })[0];
      if (o) lines.push(q.ask + " " + o[1]);
    });
    lines.push(result ? "Your site suggested: " + result.name + ". " + p.ask : "Which would you suggest?");
    return lines.join("\n");
  }

  function smsHref(phone, text) {
    var n = String(phone || "").replace(/[^\d+]/g, "");
    return n ? "sms:" + n + "?&body=" + encodeURIComponent(text) : "";
  }

  function render(uid, p, phone) {
    if (!p.questions.length || !p.results.length) return "";
    var h = '<div class="sfd-in">' + (p.title ? "<h3>" + esc(p.title) + "</h3>" : "");   /* "title": "" when the page's own heading says it */
    p.questions.forEach(function (q, qi) {
      h += '<fieldset><legend>' + esc(q.ask) + "</legend>" + q.options.map(function (o, oi) {
        var id = "sfd" + uid + "-" + qi + "-" + oi;
        return '<label for="' + id + '"><input type="radio" id="' + id + '" name="sfd' + uid + "-" + esc(q.id) + '" data-q="' + esc(q.id) + '" value="' + esc(o[0]) + '"> ' + esc(o[1]) + "</label>";
      }).join("") + "</fieldset>";
    });
    h += '<div class="sfd-out" aria-live="polite"></div>' +
      (phone ? '<a class="sfd-btn" data-sms="1" href="#" hidden>Text us about this</a><p class="sfd-note" hidden>Opens a text on your phone with your answers written out.</p>' : "") + "</div>";
    return h;
  }

  var CSS = ":where(.sfd){--sfd-accent:#1f5f8b;--sfd-ink:#1b1f23;--sfd-muted:#5a636b;--sfd-line:#d5dade;--sfd-tint:#f3f7fa}" +
    ".sfd{font:16px/1.5 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:var(--sfd-ink);background:#fff;border:1px solid var(--sfd-line);border-radius:12px;padding:20px;max-width:560px;box-sizing:border-box}" +
    ".sfd *{box-sizing:border-box}.sfd h3{margin:0 0 10px;font-size:1.2rem}" +
    ".sfd fieldset{border:0;margin:0 0 12px;padding:0}.sfd legend{font-weight:700;margin-bottom:6px;padding:0}" +
    ".sfd label{display:flex;flex-direction:row;align-items:center;gap:10px;min-height:44px;padding:4px 12px;margin:0 0 6px;border:1px solid var(--sfd-line);border-radius:10px;cursor:pointer;font-weight:400;font-size:16px;background:#fff}" +
    ".sfd label:has(input:checked){border-color:var(--sfd-accent);background:var(--sfd-tint)}" +
    ".sfd input[type=radio]{width:20px;height:20px;min-height:0;margin:0;padding:0;accent-color:var(--sfd-accent);flex:none}" +
    ".sfd .sfd-out:not(:empty){background:var(--sfd-tint);border-left:4px solid var(--sfd-accent);border-radius:0 10px 10px 0;padding:12px 14px;margin:4px 0 12px}" +
    ".sfd .sfd-out b{display:block;font-size:1.1rem}.sfd .sfd-out span{color:var(--sfd-ink)}" +
    ".sfd .sfd-btn{display:inline-flex;align-items:center;font-weight:700;border-radius:8px;padding:10px 16px;min-height:44px;background:var(--sfd-accent);color:#fff;text-decoration:none}" +
    ".sfd .sfd-btn[hidden],.sfd .sfd-note[hidden]{display:none}" +
    ".sfd a:focus-visible,.sfd input:focus-visible{outline:3px solid var(--sfd-accent);outline-offset:2px}" +
    ".sfd .sfd-note{font-size:.85rem;color:var(--sfd-muted);margin:6px 0 0}";

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { parse: parse, match: match, message: message, smsHref: smsHref, render: render };
    return;
  }
  var style = document.createElement("style"); style.textContent = CSS; document.head.appendChild(style);
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".sfd"), function (root, n) {
      var cfg; try { cfg = JSON.parse(root.getAttribute("data-config") || "{}"); } catch (e) { root.textContent = "Finder config error."; return; }
      var business = root.getAttribute("data-business") || "", phone = root.getAttribute("data-phone") || "", p = parse(cfg);
      root.innerHTML = render(n, p, phone);
      root.addEventListener("change", function () {
        var a = {};
        Array.prototype.forEach.call(root.querySelectorAll("input[type=radio]:checked"), function (r) { a[r.getAttribute("data-q")] = r.value; });
        var done = p.questions.every(function (q) { return a[q.id]; }), r = match(p, a), out = root.querySelector(".sfd-out");
        out.innerHTML = !done ? "" : r ? "<b>" + esc(r.name) + "</b>" + (r.why ? "<span>" + esc(r.why) + "</span>" : "") : "<b>Text us and we'll suggest one.</b>";
        var s = root.querySelector("[data-sms]"), note = root.querySelector(".sfd-note");
        if (s) { s.hidden = !done; s.href = smsHref(phone, message(business, p, a, r)); }
        if (note) note.hidden = !done;
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
