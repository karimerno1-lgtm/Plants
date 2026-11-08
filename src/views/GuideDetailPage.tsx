import React from 'react';
import { GUIDES_DATA, CareGuide } from '../data/guides';
import { TOOLS_DATA } from '../data/tools';
import { PLANTS_DATA } from '../data/plants';
import { AdSlot } from '../components/ads/AdSlot';
import { ChevronRight, Clock, Calendar, CheckCircle2, HelpCircle, Wrench, Leaf, ArrowRight, Share2 } from 'lucide-react';
import { BotanicalImage } from '../components/ui/BotanicalImage';

interface GuideDetailPageProps {
  guideSlug: string;
  onNavigate: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guideSlug, onNavigate }) => {
  const guide = GUIDES_DATA.find(g => g.slug === guideSlug) || GUIDES_DATA[0];

  const relatedTool = TOOLS_DATA.find(t => t.slug === guide.relatedToolSlug);
  const relatedPlants = PLANTS_DATA.filter(p => guide.relatedPlantSlugs?.includes(p.slug) || false);
  const otherGuides = GUIDES_DATA.filter(g => g.slug !== guide.slug).slice(0, 2);

  return (
    <article className="space-y-10 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500">
        <button onClick={() => onNavigate('/')} className="hover:text-emerald-800 cursor-pointer">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => onNavigate('/guides')} className="hover:text-emerald-800 cursor-pointer">Guides</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-semibold text-stone-900 truncate">{guide.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950">
            {guide.category}
          </span>
          <span className="text-xs text-stone-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {guide.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-editorial text-stone-900 leading-tight">
          {guide.title}
        </h1>

        {/* Author Bio Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-200 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <img src={guide.author.avatar} alt={guide.author.name} className="w-10 h-10 rounded-full object-cover border border-stone-200" />
            <div>
              <div className="font-bold text-stone-900">{guide.author.name}</div>
              <div className="text-[11px] text-stone-500">{guide.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Updated: {guide.updatedDate}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Hero Image */}
      <div className="aspect-16/9 rounded-3xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200/80">
        <BotanicalImage
          src={guide.heroImage}
          alt={guide.heroAlt}
          className="w-full h-full"
        />
      </div>

      {/* GEO & AEO Direct Answer Callout Box */}
      <div className="rounded-2xl border-2 border-emerald-800/30 bg-[#EAF1EC]/70 p-6 sm:p-7 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-800" />
          <span>Executive Summary / Direct Answer</span>
        </div>
        <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed">
          {guide.quickAnswer}
        </p>
      </div>

      {/* Article Body Sections */}
      <div className="space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base">
        {guide.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 pt-2">
              {section.heading}
            </h2>
            <p className="leading-relaxed">
              {section.content}
            </p>

            {section.callout && (
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border-l-4 border-emerald-700 space-y-1">
                <h3 className="font-bold text-stone-900 text-sm">
                  {section.callout.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {section.callout.text}
                </p>
              </div>
            )}

            {section.bulletPoints && (
              <ul className="space-y-2 pl-2">
                {section.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0 mt-2"></span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* AdSense Placement 1: Responsive display ad between substantial content sections */}
            {idx === 0 && (
              <div className="my-6">
                <AdSlot type="responsive" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Relevant Interactive Tool Integration */}
      {relatedTool && (
        <div className="rounded-2xl border-2 border-emerald-700/20 bg-emerald-50/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-emerald-700" /> Interactive Laboratory Tool
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              Calculate Your Exact Metrics with the {relatedTool.name}
            </h3>
            <p className="text-xs text-stone-600 max-w-xl">
              {relatedTool.description}
            </p>
          </div>
          <button
            onClick={() => onNavigate(`/tools/${relatedTool.slug}`)}
            className="px-5 py-2.5 rounded-xl bg-[#315B43] hover:bg-[#254A36] text-white text-xs font-semibold shadow-xs shrink-0 cursor-pointer"
          >
            Launch Calculator →
          </button>
        </div>
      )}

      {/* Species Referenced in this Guide */}
      {relatedPlants.length > 0 && (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 space-y-4">
          <h3 className="text-base font-bold font-editorial text-stone-900 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-700" />
            Species Studied in this Guide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedPlants.map(plant => (
              <button
                key={plant.slug}
                onClick={() => onNavigate(`/plants/${plant.slug}`)}
                className="p-3 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200/70 transition-colors flex items-center gap-3 cursor-pointer group"
              >
                <img src={plant.imageUrl} alt={plant.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 truncate">
                    {plant.name}
                  </div>
                  <div className="text-[10px] text-stone-500 italic truncate">
                    {plant.botanicalName}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions (FAQPage AEO) */}
      {guide.faqs.length > 0 && (
        <section className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 space-y-4">
          <h3 className="text-xl font-bold font-editorial text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {guide.faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AdSense Placement 2: Multiplex unit near related guides/end of article */}
      <AdSlot type="multiplex" />
    </article>
  );
};
