# Rhythm Pizza tracking

Rhythm Pizza records aggregate, session-level visit and first-play counters. It does not store names, email addresses, exact locations, or IP addresses.

## Traffic source codes

1 direct
2 google
3 vtm
4 facebook
5 instagram
6 pinterest
7 tpt
8 bing
9 chatgpt
10 referral
11 campaign

## Last-event encoding

`countryNumber * 100 + sourceCode`

Country number for a two-letter ISO code is `(firstLetter - 64) * 26 + (secondLetter - 64)`. A zero country number means the country lookup failed.

The client also writes aggregate counters by country, source and country/source combination for both visits and plays.