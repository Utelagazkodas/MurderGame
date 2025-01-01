import { V as store_get, W as ensure_array_like, X as unsubscribe_stores, R as pop, P as push } from "../../chunks/index.js";
import { w as writable } from "../../chunks/index2.js";
import "typescript-cookie";
import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
let thisUser = writable(void 0);
let otherUsers = writable(void 0);
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let id = "";
  $$payload.out += `<div class="w-screen h-screen flex place-content-center items-center bg-gray-800"><div class="max-w-screen max-h-screen bg-gray-700 rounded-2xl p-6 m-5 h-[90vh] aspect-9/16 md:aspect-13/16 border border-gray-400 text-gray-200"><div>W6 (+Léna) gyilkosos játék dolog</div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<form><input type="text"${attr("value", id)}${attr("maxlength", 16)} placeholder="írd ide a kódot"></form>`;
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$thisUser", thisUser)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button>Kilépés</button> <br> Szia ${escape_html(store_get($$store_subs ??= {}, "$thisUser", thisUser).name)} `;
    if (!store_get($$store_subs ??= {}, "$thisUser", thisUser).alive) {
      $$payload.out += "<!--[-->";
      $$payload.out += `halott vagy:(`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <br> `;
    if (!store_get($$store_subs ??= {}, "$thisUser", thisUser).isKiller) {
      $$payload.out += "<!--[-->";
      $$payload.out += `NEM te vagy a gyilkos`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `TE VAGY A GYILKOS`;
    }
    $$payload.out += `<!--]--> <hr> <button aria-label="Refresh"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg></button> `;
    if (store_get($$store_subs ??= {}, "$otherUsers", otherUsers)) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$otherUsers", otherUsers));
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let user = each_array[$$index];
        $$payload.out += `<br> ${escape_html(user.name)} `;
        if (user.alive) {
          $$payload.out += "<!--[-->";
          $$payload.out += `él `;
          if (store_get($$store_subs ??= {}, "$thisUser", thisUser).isKiller) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<button>megölés</button>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `HALOTT`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
