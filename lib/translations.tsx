import { Custom404Strings } from '@ircsignpost/signpost-base/dist/src/404-page';
import { ArticleContentStrings } from '@ircsignpost/signpost-base/dist/src/article-content';
import { ArticlePageStrings } from '@ircsignpost/signpost-base/dist/src/article-page';
import { CategoryStrings } from '@ircsignpost/signpost-base/dist/src/category-page';
import { CookieBannerStrings } from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { ErrorProps } from '@ircsignpost/signpost-base/dist/src/error';
import { FooterStrings } from '@ircsignpost/signpost-base/dist/src/footer';
import { HeaderBannerStrings } from '@ircsignpost/signpost-base/dist/src/header-banner';
import { HomePageStrings } from '@ircsignpost/signpost-base/dist/src/home-page';
import { CardsListStrings } from '@ircsignpost/signpost-base/dist/src/home-page-cards-list';
import { PopupStrings } from '@ircsignpost/signpost-base/dist/src/map';
import { SearchBarStrings } from '@ircsignpost/signpost-base/dist/src/search-bar';
import { SearchResultsPageStrings } from '@ircsignpost/signpost-base/dist/src/search-results-page';
import { SearchResultsStrings } from '@ircsignpost/signpost-base/dist/src/search-results-page-content';
import { SectionStrings } from '@ircsignpost/signpost-base/dist/src/section-page';
import { ServiceMapStrings } from '@ircsignpost/signpost-base/dist/src/service-map';
import { ServicePageStrings } from '@ircsignpost/signpost-base/dist/src/service-page';
import { ShareButtonStrings } from '@ircsignpost/signpost-base/dist/src/share-button';

import { CustomMenuOverlayStrings } from './menu';
import { SocialMediaLinks } from './social-media';

/** General strings used on various pages. */
export const COMMON_DYNAMIC_CONTENT_PLACEHOLDERS = [
  // Header strings.
  'default_menu_home_title',
  'default_information_title',
  'default_menu_about_title',
  // Cookie banner strings.
  'default_cookie_banner',
  'default_accept',
  'default_reject',
  // General strings.
  'default_search_hint',
  'default_share',
  'default_share_notification_text',
  'default_download',
  'default_last_updated',
  'default_article_reader_title',
  'default_banner_link_share_title',
  'default_filter_label',
  'default_most_recent_filter_option',
  'default_most_popular_filter_option',
  'default_home_disclaimer',
];

export const HOME_PAGE_DYNAMIC_CONTENT_PLACEHOLDERS = [
  // Header banner and social media strings.
  'ri_greece_mission_statement',
  'default_banner_social_media_title',
  'default_banner_social_media_description',
  'ri_greece_banner_social_media_description',
  'default_banner_facebook_title',
  'default_banner_messenger_title',
  'default_banner_whatsapp_title',
  'default_banner_telegram_title',
  'ri_greece_facebook_link',
  'ri_greece_messenger_link',
  'ri_greece_whatsapp_link',
  'ri_greece_telegram_link',
  // Main body strings.
  'default_information_title',
  'ri_greece_information_description',
  'default_service_map_title',
  'ri_greece_service_map_description',
  'default_service_map_select_region',
  'default_service_map_all_regions',
  'default_service_map_select_city',
  'default_service_map_all_cities',
  'default_service_map_select_services',
  'default_services_list_count_of',
  'default_services_list_count_services',
  'default_service_map_map_tab',
  'default_service_map_list_tab',
  'default_service_map_all_services',
  'default_service_map_all_regions_option',
  'default_service_map_all_cities_option',
  'default_service_map_all_categories_option',
  'default_service_map_my_location_option',
  'HC_RI_GREECE_WELCOME_BANNER_TEXT_UCL',
  'default_all_services_type_option',
  'default_all_providers_option',
  'default_all_populations_option',
  'default_all_accessibilities_option',
  'default_distance_away_tooltip',
  'default_contact_button_label',
  'default_view_service_label',
];

export const CATEGORY_PLACEHOLDERS = [
  'default_select_topic',
  'default_select_subtopic',
];

export const SECTION_PLACEHOLDERS = ['default_select_topic'];

export const SEARCH_RESULTS_PLACEHOLDERS = [
  'default_search_results_found',
  'default_all_results_tab',
  'default_information_results_tab',
  'default_services_results_tab',
];

export const ERROR_DYNAMIC_CONTENT_PLACEHOLDERS = [
  'default_error_indicator',
  'default_error_page_does_not_exist',
  'default_error_page_under_construction',
  'default_error_translation_missing',
  'default_error_home_button_title',
];

export function populateSocialMediaLinks(dynamicContent: {
  [key: string]: string;
}): SocialMediaLinks {
  return {
    facebookLink: {
      title: dynamicContent['default_banner_facebook_title'],
      href: dynamicContent['ri_greece_facebook_link'],
    },
    messengerLink: {
      title: dynamicContent['default_banner_messenger_title'],
      href: dynamicContent['ri_greece_messenger_link'],
    },
    whatsappLink: {
      title: dynamicContent['default_banner_whatsapp_title'],
      href: dynamicContent['ri_greece_whatsapp_link'],
    },
  };
}

export function populateHeaderBannerStrings(dynamicContent: {
  [key: string]: string;
}): HeaderBannerStrings {
  return {
    welcomeTitle: dynamicContent['ri_greece_mission_statement'],
    socialMediaTitle: dynamicContent['default_banner_social_media_title'],
    socialMediaDescription:
      dynamicContent['default_banner_social_media_description'],
  };
}

export function populateServiceMapStrings(dynamicContent: {
  [key: string]: string;
}): ServiceMapStrings {
  return {
    title: dynamicContent['default_service_map_title'],
    description: dynamicContent['ri_greece_service_map_description'],
    selectRegionTitle: dynamicContent['default_service_map_select_region'],
    regionDefaultValue: dynamicContent['default_service_map_all_regions'],
    selectCityTitle: dynamicContent['default_service_map_select_city'],
    cityDefaultValue: dynamicContent['default_service_map_all_cities'],
    selectServiceTitle: dynamicContent['default_service_map_all_services'],
    serviceDefaultValue: dynamicContent['default_service_map_select_services'],
    serviceListStringOf: dynamicContent['default_services_list_count_of'],
    serviceListStringServices:
      dynamicContent['default_services_list_count_services'],
    mapTab: dynamicContent['default_service_map_map_tab'],
    listTab: dynamicContent['default_service_map_list_tab'],
    allRegionsOption: dynamicContent['DEFAULT_SERVICE_MAP_ALL_REGIONS_OPTION'],
    allCitiesOption: dynamicContent['DEFAULT_SERVICE_MAP_ALL_CITIES_OPTION'],
    allCategoriesOption:
      dynamicContent['DEFAULT_SERVICE_MAP_ALL_CATEGORIES_OPTION'],
    myLocationOption: dynamicContent['default_service_map_my_location_option'],
    allServicesTypeOption: dynamicContent['default_all_services_type_option'],
    allProvidersOption: dynamicContent['default_all_providers_option'],
    allPopulationsOption: dynamicContent['default_all_populations_option'],
    allAccessibilitiesOption:
      dynamicContent['default_all_accessibilities_option'],
    distanceAwayStrings: {
      informationTooltip: dynamicContent['default_distance_away_tooltip'],
    },
    popupStrings: populatePopupStrings(dynamicContent),
  };
}

/** Populate localized categories section strings from Dynamic content. */
export function populateCategoriesSectionStrings(dynamicContent: {
  [key: string]: string;
}): CardsListStrings {
  return {
    title: dynamicContent['default_information_title'],
    description: dynamicContent['ri_greece_information_description'],
  };
}

export function populateCookieBannerStrings(dynamicContent: {
  [key: string]: string;
}): CookieBannerStrings {
  return {
    content: dynamicContent['default_cookie_banner'],
    accept: dynamicContent['default_accept'],
    reject: dynamicContent['default_reject'],
  };
}

export function getLastUpdatedLabel(dynamicContent: {
  [key: string]: string;
}): string {
  return dynamicContent['default_last_updated'];
}

export function getShareButtonStrings(dynamicContent: {
  [key: string]: string;
}): ShareButtonStrings {
  return {
    label: dynamicContent['default_share'],
    notificationText: dynamicContent['default_share_notification_text'],
    linkShareButton: dynamicContent['default_banner_link_share_title'],
  };
}

export function generateArticleErrorProps(dynamicContent: {
  [key: string]: string;
}): ErrorProps {
  return {
    title: dynamicContent['default_error_indicator'],
    subtitle: dynamicContent['default_error_page_under_construction'],
    description: dynamicContent['default_error_translation_missing'],
    homeButtonLabel: dynamicContent['default_error_home_button_title'],
  };
}

export function generate404ErrorProps(dynamicContent: {
  [key: string]: string;
}): ErrorProps {
  return {
    title: dynamicContent['default_error_indicator'],
    subtitle: dynamicContent['default_error_page_does_not_exist'],
    homeButtonLabel: dynamicContent['default_error_home_button_title'],
  };
}

export function populateSearchResultsStrings(dynamicContent: {
  [key: string]: string;
}): SearchResultsStrings {
  return {
    lastEditedLabel: dynamicContent['default_last_updated'],
    resultSummaryStringTemplate: (
      firstOnPage: number,
      lastOnPage: number,
      totalCount: number,
      query: string
    ) => {
      return `${totalCount} ${dynamicContent['default_search_results_found']} "${query}"`;
    },
  };
}

export function getSelectTopicLabel(dynamicContent: {
  [key: string]: string;
}): string {
  return dynamicContent['default_select_topic'];
}

export function populateArticleContentStrings(dynamicContent: {
  [key: string]: string;
}): ArticleContentStrings {
  return {
    textReaderTitle: dynamicContent['default_article_reader_title'],
    shareButtonStrings: getShareButtonStrings(dynamicContent),
  };
}

export function populateMenuOverlayStrings(dynamicContent: {
  [key: string]: string;
}): CustomMenuOverlayStrings {
  return {
    home: dynamicContent['default_menu_home_title'],
    information: dynamicContent['default_information_title'],
    about: dynamicContent['default_menu_about_title'],
  };
}

export function populateHomePageStrings(dynamicContent: {
  [key: string]: string;
}): HomePageStrings {
  return {
    cardsListStrings: populateCategoriesSectionStrings(dynamicContent),
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    serviceMapStrings: populateServiceMapStrings(dynamicContent),
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    topBannerString: dynamicContent['HC_RI_GREECE_WELCOME_BANNER_TEXT_UCL'],
    footerStrings: populateFooterStrings(dynamicContent),
  };
}

export function populateSearchBarStrings(dynamicContent: {
  [key: string]: string;
}): SearchBarStrings {
  return {
    searchHint: dynamicContent['default_search_hint'],
  };
}

export function populateFilterSelectStrings(dynamicContent: {
  [key: string]: string;
}) {
  return {
    filterLabel: dynamicContent['default_filter_label'],
    mostRecent: dynamicContent['default_most_recent_filter_option'],
    mostPopular: dynamicContent['default_most_popular_filter_option'],
  };
}

export function populateCategoryStrings(dynamicContent: {
  [key: string]: string;
}): CategoryStrings {
  return {
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    selectTopicLabel: getSelectTopicLabel(dynamicContent),
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    footerStrings: populateFooterStrings(dynamicContent),
    selectSubTopicLabel: dynamicContent['default_select_subtopic'],
  };
}

export function populateSectionStrings(dynamicContent: {
  [key: string]: string;
}): SectionStrings {
  return {
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    selectTopicLabel: getSelectTopicLabel(dynamicContent),
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    footerStrings: populateFooterStrings(dynamicContent),
  };
}

export function populateCustom404Strings(dynamicContent: {
  [key: string]: string;
}): Custom404Strings {
  return {
    errorStrings: generate404ErrorProps(dynamicContent),
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    footerStrings: populateFooterStrings(dynamicContent),
  };
}

export function populateSearchResultsPageStrings(dynamicContent: {
  [key: string]: string;
}): SearchResultsPageStrings {
  return {
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    lastEditedLabel: getLastUpdatedLabel(dynamicContent),
    resultsFoundForQuery: dynamicContent['default_search_results_found'],
    allResultsTabString: dynamicContent['default_all_results_tab'],
    informationTabString: dynamicContent['default_information_results_tab'],
    servicesTabString: dynamicContent['default_services_results_tab'],
    footerStrings: populateFooterStrings(dynamicContent),
  };
}

export function populateArticlePageStrings(dynamicContent: {
  [key: string]: string;
}): ArticlePageStrings {
  return {
    articleContentStrings: populateArticleContentStrings(dynamicContent),
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    articleErrorStrings: generateArticleErrorProps(dynamicContent),
    lastUpdatedLabel: getLastUpdatedLabel(dynamicContent),
    footerStrings: populateFooterStrings(dynamicContent),
  };
}

export function populateFooterStrings(dynamicContent: {
  [key: string]: string;
}): FooterStrings {
  return {
    disclaimerSummary: dynamicContent['default_home_disclaimer'],
  };
}

export function populatePopupStrings(dynamicContent: {
  [key: string]: string;
}): PopupStrings {
  return {
    contactButtonLabel: dynamicContent['default_contact_button_label'],
    viewServiceLabel: dynamicContent['default_view_service_label'],
  };
}

export function populateServicePageStrings(dynamicContent: {
  [key: string]: string;
}): ServicePageStrings {
  return {
    serviceContentStrings: populateArticleContentStrings(dynamicContent),
    searchBarStrings: populateSearchBarStrings(dynamicContent),
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    serviceErrorStrings: generateArticleErrorProps(dynamicContent),
    lastUpdatedLabel: getLastUpdatedLabel(dynamicContent),
    footerStrings: populateFooterStrings(dynamicContent),
  };
}
