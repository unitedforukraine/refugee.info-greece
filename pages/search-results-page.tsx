import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import {
  default as DefaultSearchResultsPage,
  SearchResultsPageStrings,
} from '@ircsignpost/signpost-base/dist/src/search-results-page';
import {
  CategoryWithSections,
  ZendeskCategory,
  getCategories,
  getCategoriesWithSections,
  getTranslationsFromDynamicContent,
} from '@ircsignpost/signpost-base/dist/src/zendesk';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';

import {
  CATEGORIES_TO_HIDE,
  CATEGORY_ICON_NAMES,
  GOOGLE_ANALYTICS_IDS,
  MENU_CATEGORIES_TO_HIDE,
  REVALIDATION_TIMEOUT_SECONDS,
  SEARCH_BAR_INDEX,
  SEARCH_RESULTS_PAGE_INDEX,
  SECTION_ICON_NAMES,
  SITE_TITLE,
  USE_CAT_SEC_ART_CONTENT_STRUCTURE,
  ZENDESK_AUTH_HEADER,
} from '../lib/constants';
import {
  LOCALES,
  Locale,
  getLocaleFromCode,
  getZendeskLocaleId,
} from '../lib/locale';
import { getHeaderLogoProps } from '../lib/logo';
import { getFooterItems, getMenuItems } from '../lib/menu';
import {
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  SEARCH_RESULTS_PLACEHOLDERS,
  populateCookieBannerStrings,
  populateMenuOverlayStrings,
  populateSearchResultsPageStrings,
} from '../lib/translations';
import { getSiteUrl, getZendeskUrl } from '../lib/url';

interface SearchResultsPageProps {
  currentLocale: Locale;
  strings: SearchResultsPageStrings;
  // A list of |MenuOverlayItem|s to be displayed in the header and side menu.
  menuOverlayItems: MenuOverlayItem[];
  // Page title.
  title: string;
  // The site's url, e.g., 'https://unitedforukraine.org'.
  siteUrl: string;
  // A map of dynamic content placeholders to their string values.
  dynamicContent: { [key: string]: string };
  footerLinks?: MenuOverlayItem[];
}

export default function SearchResultsPage({
  currentLocale,
  strings,
  menuOverlayItems,
  title,
  dynamicContent,
  siteUrl,
  footerLinks,
}: SearchResultsPageProps) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <DefaultSearchResultsPage
      currentLocale={currentLocale}
      locales={LOCALES}
      pageTitle={title}
      articleSearchResultsIndex={SEARCH_RESULTS_PAGE_INDEX}
      searchResultsFilters={{ categoriesToHide: CATEGORIES_TO_HIDE }}
      searchBarIndex={SEARCH_BAR_INDEX}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      strings={strings}
      siteUrl={siteUrl}
      informationFilter={[4768127626007]}
      servicesFilter={[4420351005975]}
      footerLinks={footerLinks}
      signpostVersion={publicRuntimeConfig?.version}
      cookieBanner={
        <CookieBanner
          strings={populateCookieBannerStrings(dynamicContent)}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale: Locale = getLocaleFromCode(locale ?? 'en-us');

  const dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(SEARCH_RESULTS_PLACEHOLDERS),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );

  let categories: ZendeskCategory[] | CategoryWithSections[];
  let menuCategories: ZendeskCategory[] | CategoryWithSections[];
  if (USE_CAT_SEC_ART_CONTENT_STRUCTURE) {
    categories = await getCategoriesWithSections(
      currentLocale,
      getZendeskUrl(),
      (c) => !CATEGORIES_TO_HIDE.includes(c.id)
    );
    categories.forEach(({ sections }) => {
      sections.forEach(
        (s) => (s.icon = SECTION_ICON_NAMES[s.id] || 'help_outline')
      );
    });
    menuCategories = await getCategoriesWithSections(
      currentLocale,
      getZendeskUrl(),
      (c) => !MENU_CATEGORIES_TO_HIDE.includes(c.id)
    );
  } else {
    categories = await getCategories(currentLocale, getZendeskUrl());
    categories = categories.filter((c) => !CATEGORIES_TO_HIDE.includes(c.id));
    categories.forEach(
      (c) => (c.icon = CATEGORY_ICON_NAMES[c.id] || 'help_outline')
    );
    menuCategories = await getCategories(currentLocale, getZendeskUrl());
    menuCategories = menuCategories.filter(
      (c) => !MENU_CATEGORIES_TO_HIDE.includes(c.id)
    );
  }

  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent),
    menuCategories
  );

  const footerLinks = getFooterItems(
    populateMenuOverlayStrings(dynamicContent),
    menuCategories
  );

  const strings = populateSearchResultsPageStrings(dynamicContent);

  return {
    props: {
      currentLocale,
      strings,
      menuOverlayItems,
      title: SITE_TITLE,
      siteUrl: getSiteUrl(),
      dynamicContent,
      footerLinks,
    },
    revalidate: REVALIDATION_TIMEOUT_SECONDS,
  };
};
