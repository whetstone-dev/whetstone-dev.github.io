import type { Metadata } from 'next';
import { defaultLocale, localeNames, locales } from '@/i18n/config';
import { LANG_KEY } from '@/lib/site';

export const metadata: Metadata = {
  title: 'whetstone-dev',
  robots: { index: false },
  alternates: { canonical: `/${defaultLocale}/` },
};

// Static export: there is no middleware, so the language is chosen in the browser.
// English by default; another language is used only if the visitor picked it in the switcher before.
const script = `(function(){
  var supported=${JSON.stringify(locales)}, chosen='${defaultLocale}';
  try{var saved=localStorage.getItem('${LANG_KEY}');if(supported.indexOf(saved)>=0)chosen=saved}catch(e){}
  location.replace('/'+chosen+'/'+location.hash);
})();`;

export default function RootRedirect() {
  return (
    <main className="redirect">
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <p>
          {locales.map((l) => (
            <a key={l} href={`/${l}/`}>{localeNames[l]}</a>
          ))}
        </p>
      </noscript>
    </main>
  );
}
