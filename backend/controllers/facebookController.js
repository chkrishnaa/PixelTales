const FACEBOOK_GRAPH_VERSION = "v26.0";

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

async function facebookGet(path, params = {}) {
  if (!PAGE_ID || !PAGE_ACCESS_TOKEN) {
    throw new Error("Facebook environment variables are not configured.");
  }

  const url = new URL(
    `https://graph.facebook.com/${FACEBOOK_GRAPH_VERSION}/${path}`,
  );

  Object.entries({
    ...params,
    access_token: PAGE_ACCESS_TOKEN,
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url);

  const json = await response.json();

  if (!response.ok || json.error) {
    throw new Error(
      json.error?.message || "Facebook Graph API request failed.",
    );
  }

  return json;
}

/**
 * GET /api/facebook/stats
 *
 * Returns:
 * - follower count
 * - recent post count
 * - total reactions/comments/shares for fetched posts
 * - daily engagement trend
 */
export const getFacebookStats = async (req, res, next) => {
  try {
    const days = 30;

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    /*
     * We fetch posts with their engagement summaries.
     *
     * limit=100 gives us a large batch.
     * If Facebook returns a paging.next URL, we continue following it.
     */
    const posts = [];

    let nextUrl = new URL(
      `https://graph.facebook.com/${FACEBOOK_GRAPH_VERSION}/${PAGE_ID}/posts`,
    );

    nextUrl.searchParams.set(
      "fields",
      "id,message,created_time,reactions.summary(true),comments.summary(true),shares",
    );

    nextUrl.searchParams.set("limit", "100");

    nextUrl.searchParams.set(
      "since",
      Math.floor(sinceDate.getTime() / 1000).toString(),
    );

    nextUrl.searchParams.set("access_token", PAGE_ACCESS_TOKEN);

    /*
     * Follow Facebook pagination until there are no more pages.
     *
     * Safety limit prevents accidentally making hundreds/thousands
     * of requests.
     */
    let pageCount = 0;

    while (nextUrl && pageCount < 10) {
      const response = await fetch(nextUrl);
      const json = await response.json();

      if (!response.ok || json.error) {
        throw new Error(
          json.error?.message || "Failed to fetch Facebook posts.",
        );
      }

      if (Array.isArray(json.data)) {
        posts.push(...json.data);
      }

      if (json.paging?.next) {
        nextUrl = new URL(json.paging.next);
      } else {
        nextUrl = null;
      }

      pageCount++;
    }

    /*
     * Create one trend entry for every day.
     */
    const trendMap = {};

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = date.toISOString().slice(0, 10);

      trendMap[key] = {
        date: key,
        reactions: 0,
        comments: 0,
        shares: 0,
        engagement: 0,
        posts: 0,
      };
    }

    let totalReactions = 0;
    let totalComments = 0;
    let totalShares = 0;

    for (const post of posts) {
      if (!post.created_time) continue;

      const date = new Date(post.created_time).toISOString().slice(0, 10);

      if (!trendMap[date]) continue;

      const reactions = post.reactions?.summary?.total_count || 0;

      const comments = post.comments?.summary?.total_count || 0;

      const shares = post.shares?.count || 0;

      const engagement = reactions + comments + shares;

      trendMap[date].reactions += reactions;
      trendMap[date].comments += comments;
      trendMap[date].shares += shares;
      trendMap[date].engagement += engagement;
      trendMap[date].posts += 1;

      totalReactions += reactions;
      totalComments += comments;
      totalShares += shares;
    }

    /*
     * Facebook Page information.
     */
    const page = await facebookGet(PAGE_ID, {
      fields: "id,name,followers_count",
    });

    const trend = Object.values(trendMap).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    res.json({
      success: true,

      data: {
        page: {
          id: page.id,
          name: page.name,
          followers: page.followers_count || 0,
        },

        postsFetched: posts.length,

        engagement: {
          reactions: totalReactions,
          comments: totalComments,
          shares: totalShares,
          total: totalReactions + totalComments + totalShares,
        },

        trend,
      },
    });
  } catch (err) {
    next(err);
  }
};
