import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { CollectiveCategory } from '../constants/collectives';
import withIntl from '../lib/withIntl';

const TranslatedTags = defineMessages({
  [CollectiveCategory.ASSOCIATION]: {
    id: 'Tags.ASSOCIATION',
    defaultMessage: 'Association',
  },
  [CollectiveCategory.COLLECTIVE]: {
    id: 'Tags.COLLECTIVE',
    defaultMessage: 'Collective',
  },
  [CollectiveCategory.CONFERENCE]: {
    id: 'Tags.CONFERENCE',
    defaultMessage: 'Conference',
  },
  [CollectiveCategory.COOPERATIVE]: {
    id: 'Tags.COOPERATIVE',
    defaultMessage: 'Cooperative',
  },
  [CollectiveCategory.OPEN_SOURCE]: {
    id: 'Tags.OPEN_SOURCE',
    defaultMessage: 'Open source',
  },
  [CollectiveCategory.MEDIA]: {
    id: 'Tags.MEDIA',
    defaultMessage: 'Media',
  },
  [CollectiveCategory.MEETUP]: {
    id: 'Tags.MEETUP',
    defaultMessage: 'Meetup',
  },
  [CollectiveCategory.MOVEMENT]: {
    id: 'Tags.MOVEMENT',
    defaultMessage: 'Movement',
  },
  [CollectiveCategory.POLITICS]: {
    id: 'Tags.POLITICS',
    defaultMessage: 'Politics',
  },
  [CollectiveCategory.TECH_MEETUP]: {
    id: 'Tags.TECH_MEETUP',
    defaultMessage: 'Tech meetup',
  },
  [CollectiveCategory.US_NONPROFIT]: {
    id: 'Tags.US_NONPROFIT',
    defaultMessage: 'US nonprofit',
  },
});

/** Translates a list of tags */
const I18nCollectiveTags = ({ intl, children, tags, ignoreUntranslated }) => {
  if (typeof tags === 'string') {
    tags = [tags];
  }

  const processedTags = tags.map(tag => {
    if (TranslatedTags[tag]) {
      return { value: intl.formatMessage(TranslatedTags[tag]), isTranslated: true };
    } else {
      return { value: tag, isTranslated: false };
    }
  });

  return children(ignoreUntranslated ? processedTags.filter(t => t.isTranslated) : processedTags);
};

I18nCollectiveTags.propTypes = {
  /** A tag or a list of tags */
  tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  /** Ignore tags if translation is missing */
  ignoreUntranslated: PropTypes.bool,
  /** A function used to render the tag */
  children: PropTypes.func.isRequired,
  /** @ignore */
  intl: PropTypes.object,
};

I18nCollectiveTags.defaultProps = {
  ignoreUntranslated: false,
  /** Default renderer, will render a string list */
  children: tags => {
    return tags.map((tag, index, translatedTags) => {
      if (index === translatedTags.length - 1) {
        return tag.value;
      } else {
        return `${tag.value}, `;
      }
    });
  },
};

export default withIntl(I18nCollectiveTags);
