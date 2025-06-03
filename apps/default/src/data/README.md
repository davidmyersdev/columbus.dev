# Data Scraping

https://mccarthylg.com/is-web-scraping-legal-a-2025-breakdown-of-what-you-need-to-know/

## Sources

- https://www.meetup.com/robots.txt
- https://www.meetup.com/cities_sitemap_1.xml
- https://www.meetup.com/find/us--oh--columbus/

## GraphQL

- API: https://api.meetup.com/gql-ext
- Playground: https://www.meetup.com/api/playground/

### Categories

```gql
fragment PageInfoFragment on PageInfo {
  __typename
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}

query topicCategories {
  topicCategories {
    __typename
    edges {
      __typename
      cursor
      node {
        __typename
        id
        color
        defaultTopic {
          __typename
          id
          description
          name
          urlkey
        }
        imageUrl
        name
        topics {
          __typename
          edges {
            __typename
            cursor
            node {
              __typename
              id
              description
              name
              urlkey
            }
          }
          pageInfo {
            ...PageInfoFragment
          }
          totalCount
        }
        urlkey
      }
    }
    pageInfo {
      ...PageInfoFragment
    }
    totalCount
  }
}
```

### Groups

```gql
fragment EventFragment on Event {
  __typename
  id
  createdTime
  dateTime
  description
  duration
  endTime
  eventHosts {
    ...EventHostFragment
  }
  eventType
  eventUrl
  guestLimit
  guestsAllowed
  howToFindUs
  speakerDetails {
    ...SpeakerDetailsFragment
  }
  status
  title
  token
  topics {
    ...TopicsConnectionFragment
  }
  venues {
    ...VenueFragment
  }
}

fragment EventEdgeFragment on EventEdge {
  __typename
  event: node {
    ...EventFragment
  }
}

fragment EventHostFragment on EventHost {
  __typename
  name
  member {
    ...MemberFragment
  }
}

fragment EventsConnectionFragment on GroupEventConnection {
  __typename
  edges {
    ...EventEdgeFragment
  }
}

fragment GroupFragment on Group {
  __typename
  id
  activeTopics {
    ...TopicFragment
  }
  city
  country
  description
  emailAnnounceAddress
  events {
    ...EventsConnectionFragment
  }
  foundedDate
  keyGroupPhoto {
    __typename
    id
    baseUrl
    highResUrl
    standardUrl
    thumbUrl
  }
  lat
  lon
  name
  organizer {
    ...MemberFragment
  }
  socialNetworks {
    ...SocialNetworkFragment
  }
  state
  stats {
    __typename
    memberCounts {
      __typename
      all
      leadership
    }
  }
  status
  urlname
  welcomeBlurb
  zip
}

fragment MemberFragment on Member {
  __typename
  id
  email
  memberUrl
  name
  username
}

fragment SocialNetworkFragment on SocialNetwork {
  __typename
  identifier
  service
  url
}

fragment SpeakerDetailsFragment on SpeakerDetails {
  __typename
  description
  name
}

fragment TopicFragment on Topic {
  __typename
  id
  description
  name
  urlkey
}

fragment TopicEdgeFragment on TopicEdge {
  __typename
  topic: node {
    ...TopicFragment
  }
}

fragment TopicsConnectionFragment on TopicsConnection {
  __typename
  edges {
    ...TopicEdgeFragment
  }
}

fragment VenueFragment on Venue {
  __typename
  id
  address
  city
  country
  lat
  lon
  name
  postalCode
  state
  venueType
}

query groupSearch($filter: GroupSearchFilter!) {
  groupSearch(filter: $filter) {
    __typename
    edges {
      group: node {
        ...GroupFragment
      }
    }
  }
}
```

```json
{
  "filter": {
    "lat": 39.9831679,
    "lon": -83.1556238,
    "query": "dev"
  }
}
```

### Self

```gql
query self {
  self {
    id
    name
  }
}
```
