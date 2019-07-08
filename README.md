# My Starred Github Repositories

This will create a static site that grabs the starred repositories from my account each day at 9am.
It'll create a list and detail pages from each of their readme.md files.
This was my first dip into Gatsby.

## Make your own starred repo site

1. Clone it down: `npx degit ben-rogerson/starred-repositories starred-repositories`
2. Replace the [authorisation token](https://github.com/ben-rogerson/starred-repositories/blob/master/gatsby-config.js#L11). You can generate a new [public auth token here](https://github.com/settings/tokens)
3. Add your repo to Netlify
4. Start up an automatic deployment schedule, I trigger mine daily with a [Zapier integration](https://zapier.com/apps/netlify/integrations/schedule/29330/start-a-new-deploy-of-a-netlify-site-on-a-daily-schedule).

## My starred site

[https://stars.benrogerson.com.au/](https://stars.benrogerson.com.au/)
