import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import FeatureIcon from '@/app/components/FeatureIcon';
import BookingBox from '@/app/components/BookingBox';
import Header from "@/app/components/Header";
import HeroReservation from "@/app/components/HeroReservation";
import Footer from "@/app/components/Footer";
import {
  properties,
  getProperty,
  copyOf,
  formatPrice,
  placeLabel,
  whatsappUrl,
} from '@/lib/biens';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => properties.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  const c = copyOf(p, locale);
  return {
    title: c.title,
    description: c.description,
    openGraph: { title: c.title, description: c.description, images: [p.images[0]] },
  };
}

export default async function BienPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const p = getProperty(slug);
  if (!p) notFound();

  const t = await getTranslations({ locale, namespace: 'biens' });
  const c = copyOf(p, locale);
  const power = c.electricity_included ? t('electricityIncluded') : c.notes;
  const unit = p.price.period === 'total' ? null : t(`units.${p.price.period}`);
  const [main, ...others] = p.images;

  return (
    <>
    <Header/>
    <HeroReservation/>
    <main className="bien">
      <div className="wrap">
        <Link href="/#biens" className="back">
          ← {t('back')}
        </Link>

        <span className="eyebrow">{t(`offerTag.${p.offer}`)}</span>
        <h1>{c.title}</h1>
        <p className="loc">
          {placeLabel(p)}, {p.location.city}
        </p>

        <div className="bien-hero">
          <Image src={main} alt={c.title} fill priority sizes="(max-width: 1120px) 100vw, 1120px" />
        </div>
        <div className="gal">
          {others.map((src, i) => (
            <div className="g" key={src}>
              <Image src={src} alt={`${c.title} ${i + 2}`} fill sizes="(max-width: 640px) 100vw, 270px" />
            </div>
          ))}
        </div>

        <div className="bien-cols">
          <div>
            <p>{c.description}</p>
            <h2>{t('features')}</h2>
            <ul className="feat-grid">
              {c.features.map((f) => (
                <li key={f} className="feat-card">
                  <FeatureIcon text={f} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="bien-box">
            {p.offer === 'stay' ? (
              <BookingBox title={c.title} amount={p.price.amount} note={power} />
            ) : (
              <>
                <div>
                  <span className="price">{formatPrice(p.price.amount, locale)}</span>
                  {unit ? ` ${unit}` : null}
                </div>
                {power ? <p className="am">{power}</p> : null}
                <a
                  className="btn"
                  href={whatsappUrl(p.contact.phone, t(`ctaMessage.${p.offer}`, { title: c.title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`cta.${p.offer}`)}
                </a>
              </>
            )}
          </aside>
        </div>
      </div>
    </main>
     <Footer />
     </>
  );
 
}