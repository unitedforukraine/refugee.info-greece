import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import SectionPage, {
  SectionStrings,
} from '@ircsignpost/signpost-base/dist/src/section-page';
import { getSectionRedirectServerSideProps } from '@ircsignpost/signpost-base/dist/src/section-page';
import { MenuItem } from '@ircsignpost/signpost-base/dist/src/select-menu';
import {
  Article,
  Section,
} from '@ircsignpost/signpost-base/dist/src/topic-with-articles';
import {
  getArticlesForSection,
  getCategoriesWithSections,
  getSection,
  getSections,
  getTranslationsFromDynamicContent,
} from '@ircsignpost/signpost-base/dist/src/zendesk';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';

import {
  CATEGORIES_TO_HIDE,
  GOOGLE_ANALYTICS_IDS,
  MENU_CATEGORIES_TO_HIDE,
  REVALIDATION_TIMEOUT_SECONDS,
  SEARCH_BAR_INDEX,
  SECTION_ICON_NAMES,
  SITE_TITLE,
  USE_CAT_SEC_ART_CONTENT_STRUCTURE,
  ZENDESK_AUTH_HEADER,
} from '../../lib/constants';
import {
  LOCALES,
  Locale,
  getLocaleFromCode,
  getZendeskLocaleId,
} from '../../lib/locale';
import { getHeaderLogoProps } from '../../lib/logo';
import { getFooterItems, getMenuItems } from '../../lib/menu';
import {
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  SECTION_PLACEHOLDERS,
  getLastUpdatedLabel,
  populateFilterSelectStrings,
  populateMenuOverlayStrings,
  populateSectionStrings,
} from '../../lib/translations';
import { getZendeskUrl } from '../../lib/url';

interface CategoryProps {
  currentLocale: Locale;
  pageTitle: string;
  sectionId: number;
  sectionItems: MenuItem[];
  section: Section;
  // A list of |MenuOverlayItem|s to be displayed in the header and side menu.
  menuOverlayItems: MenuOverlayItem[];
  strings: SectionStrings;
  selectFilterLabel: string;
  filterItems: MenuItem[];
  footerLinks?: MenuOverlayItem[];
}

export default function Category({
  currentLocale,
  pageTitle,
  sectionId,
  sectionItems,
  section,
  menuOverlayItems,
  strings,
  selectFilterLabel,
  filterItems,
  footerLinks,
}: CategoryProps) {
  const [sectionDisplayed, setSectionDisplayed] = useState<Section>(section);
  const { publicRuntimeConfig } = getConfig();

  const handleFilterSectionChange = async (val: string) => {
    const dynamicContent = await getTranslationsFromDynamicContent(
      getZendeskLocaleId(currentLocale),
      COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(SECTION_PLACEHOLDERS),
      getZendeskUrl(),
      { Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_ZENDESK_OAUTH_TOKEN }
    );

    const articles: Article[] = (
      await getArticlesForSection(
        currentLocale,
        sectionId,
        getZendeskUrl(),
        val
      )
    ).map((article) => {
      return {
        id: article.id,
        title: article.title,
        lastEdit: {
          label: getLastUpdatedLabel(dynamicContent),
          value: article.updated_at,
          locale: currentLocale,
        },
      };
    });

    const section: Section = {
      id: sectionDisplayed.id,
      name: sectionDisplayed.name,
      description: sectionDisplayed.description,
      articles,
    };

    setSectionDisplayed(section);
  };

  useEffect(() => {
    setSectionDisplayed(section);
  }, [section]);

  return (
    <SectionPage
      currentLocale={currentLocale}
      locales={LOCALES}
      pageTitle={pageTitle}
      sectionId={sectionId}
      sectionItems={sectionItems}
      section={sectionDisplayed}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      searchBarIndex={SEARCH_BAR_INDEX}
      cookieBanner={
        <CookieBanner
          strings={strings.cookieBannerStrings}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
      strings={strings}
      selectFilterLabel={selectFilterLabel}
      filterSelect={true}
      filterItems={filterItems}
      onSelectFilterChange={handleFilterSectionChange}
      footerLinks={footerLinks}
      signpostVersion={publicRuntimeConfig?.version}
    />
  );
}

async function getStaticParams() {
  const sections = await Promise.all(
    Object.values(LOCALES).map(
      async (locale) => await getSections(locale, getZendeskUrl())
    )
  );

  return sections.flat().map((section) => {
    return {
      section: section.id.toString(),
      locale: section.locale,
    };
  });
}

export async function getStaticPaths() {
  if (!USE_CAT_SEC_ART_CONTENT_STRUCTURE) {
    // Section page is not statically prerendered in this type of content structure.
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const sectionParams = await getStaticParams();

  return {
    paths: sectionParams.map(({ section, locale }) => {
      return {
        params: { section },
        locale,
      };
    }),
    fallback: 'blocking',
  };
}

function getStringPath(section: string, locale: string): string {
  return `/${locale}/sections/${section}`;
}

export async function getStringPaths(): Promise<string[]> {
  if (!USE_CAT_SEC_ART_CONTENT_STRUCTURE) {
    // Section page does not exist in this type of content structure.
    return [];
  }
  const params = await getStaticParams();
  return params.map((param) => getStringPath(param.section, param.locale));
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!locale) {
    throw new Error(
      `Failed to get static props for a section (id: ${params?.section}): missing locale.`
    );
  }

  if (!params?.section) return { notFound: true };

  const currentLocale = getLocaleFromCode(locale);

  if (!USE_CAT_SEC_ART_CONTENT_STRUCTURE) {
    // For this type of structure section page redirects to the corresponding category page.
    return getSectionRedirectServerSideProps(
      currentLocale,
      Number(params.section),
      getZendeskUrl()
    );
  }

  const zendeskSection = await getSection(
    currentLocale,
    Number(params.section),
    getZendeskUrl()
  );
  if (!zendeskSection) return { notFound: true };

  const dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(SECTION_PLACEHOLDERS),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );
  const strings: SectionStrings = populateSectionStrings(dynamicContent);

  const articles: Article[] = (
    await getArticlesForSection(
      currentLocale,
      Number(params?.section),
      getZendeskUrl()
    )
  ).map((article) => {
    return {
      id: article.id,
      title: article.title,
      lastEdit: {
        label: getLastUpdatedLabel(dynamicContent),
        value: article.edited_at,
        locale: currentLocale,
      },
    };
  });

  const section: Section = {
    id: zendeskSection.id,
    name: zendeskSection.name,
    description: zendeskSection.description,
    articles,
  };

  const categories = await getCategoriesWithSections(
    currentLocale,
    getZendeskUrl(),
    (c) => !CATEGORIES_TO_HIDE.includes(c.id)
  );
  categories.forEach(({ sections }) => {
    sections.forEach(
      (s) => (s.icon = SECTION_ICON_NAMES[s.id] || 'help_outline')
    );
  });

  const menuCategories = await getCategoriesWithSections(
    currentLocale,
    getZendeskUrl(),
    (c) => !MENU_CATEGORIES_TO_HIDE.includes(c.id)
  );

  const sectionItems = categories
    .flatMap((c) => c.sections)
    .map((section) => {
      return {
        name: section.name,
        value: section.id,
        iconName: section.icon,
        link: '/sections/' + section.id.toString(),
      };
    });

  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent),
    menuCategories
  );

  const footerLinks = getFooterItems(
    populateMenuOverlayStrings(dynamicContent),
    menuCategories
  );

  const filterSelectStrings = populateFilterSelectStrings(dynamicContent);

  const filterItems: MenuItem[] = [
    { name: filterSelectStrings.mostRecent, value: 'updated_at' },
  ];

  return {
    props: {
      currentLocale,
      pageTitle: SITE_TITLE,
      sectionId: Number(params.section),
      sectionItems,
      section,
      menuOverlayItems,
      strings,
      selectFilterLabel: filterSelectStrings.filterLabel,
      filterItems,
      footerLinks,
    },
    revalidate: REVALIDATION_TIMEOUT_SECONDS,
  };
};
